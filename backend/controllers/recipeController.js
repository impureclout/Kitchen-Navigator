const generateRecipes = (req, res) => {
  const { userIngredients } = req.body;
  const mockRecipes = req.app.get('mockRecipes');
  const alwaysAvailableIngredients = req.app.get('alwaysAvailableIngredients');

  if (!userIngredients || !Array.isArray(userIngredients)) {
    return res.status(400).json({ message: 'userIngredients is required and must be an array.' });
  }

  // Validate that all ingredients are strings and normalize them
  let normalizedUserIngredients;
  try {
    normalizedUserIngredients = userIngredients
      .map(ing => {
        if (typeof ing !== 'string') {
          throw new Error('All ingredients must be strings.');
        }
        return ing.toLowerCase().trim();
      })
      .filter(ing => ing.length > 0); // Remove empty strings after trimming
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (normalizedUserIngredients.length === 0 && userIngredients.length > 0) {
    // This case means user sent strings that were all whitespace, or only empty strings
    return res.status(400).json({ message: 'No valid ingredients provided after normalization.' });
  }
  
  // It's possible userIngredients was initially empty, which is handled by frontend, but if it reaches here empty:
  // Or if normalizedUserIngredients is empty because all items were filtered by alwaysAvailable.
  // The current logic will result in an empty matchingRecipes, which is acceptable.
  // The primary concern is valid, non-empty strings for the matching process.

  if (!mockRecipes || !alwaysAvailableIngredients) {
    console.error('Recipe data not loaded into app context');
    return res.status(500).json({ message: 'Recipe data is not available on the server.' });
  }

  // Filter out "always available" ingredients from the user's list
  const alwaysAvailableLower = alwaysAvailableIngredients.map(ing => ing.toLowerCase());
  const filteredUserIngredients = normalizedUserIngredients.filter(
    ing => !alwaysAvailableLower.includes(ing)
  );

  // If after filtering out always available ingredients, the list is empty,
  // but the user *did* provide some ingredients, it implies they only provided staples.
  // The current logic handles this by potentially matching recipes that are all staples.
  // If filteredUserIngredients is empty, only recipes consisting solely of always-available items can match.

  const matchingRecipes = mockRecipes.filter(recipe => {
    if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
      return false; // Skip recipes with invalid ingredient format
    }

    // Get the recipe's ingredients, normalized to lowercase
    const recipeIngredientsLower = recipe.ingredients.map(ing => ing.toLowerCase().trim());

    // Filter out "always available" ingredients from this recipe's ingredients list
    const essentialRecipeIngredients = recipeIngredientsLower.filter(
      ing => !alwaysAvailableLower.includes(ing)
    );

    // If there are no essential ingredients in the recipe after filtering, 
    // it means all its ingredients are "always available".
    // Such a recipe should probably be matched if the user provides ANY ingredient (or none relevant).
    // For this MVP, let's assume such recipes match if they have at least one ingredient.
    // A more nuanced logic might be needed for recipes composed *only* of always-available items.
    if (essentialRecipeIngredients.length === 0 && recipe.ingredients.length > 0) {
        // Let's consider it a match if the user provided at least one ingredient that wasn't filtered out as always available
        // or if the original user ingredient list was not empty.
        // This part of the logic can be refined. For now, if all recipe items are staple, it will match.
        return true; 
    }
    if (essentialRecipeIngredients.length === 0 && recipe.ingredients.length === 0) {
        return false; // Empty recipe shouldn't match
    }


    // Check if all essential recipe ingredients are present in the user's filtered list
    return essentialRecipeIngredients.every(essentialIng =>
      filteredUserIngredients.some(userIng => essentialIng.includes(userIng))
    );
  });

  res.json(matchingRecipes);
};

module.exports = {
  generateRecipes,
}; 