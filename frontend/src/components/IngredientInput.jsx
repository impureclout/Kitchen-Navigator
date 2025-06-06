import React, { useState } from 'react';

const IngredientInput = ({ onGenerate, isLoading }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '' && !ingredientsList.includes(currentIngredient.trim().toLowerCase())) {
      setIngredientsList([...ingredientsList, currentIngredient.trim().toLowerCase()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredientsList(ingredientsList.filter(ing => ing !== ingredientToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if wrapped in a form
      handleAddIngredient();
    }
  };

  const handleGenerateClick = () => {
    if (ingredientsList.length > 0) {
      onGenerate(ingredientsList);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-neutral-200">
      <h2 className="text-xl font-semibold text-neutral-700 mb-5">Enter Your Ingredients</h2>
      <div className="flex items-center mb-4">
        <input 
          type="text"
          className="shadow-sm appearance-none border border-neutral-300 rounded-lg w-full py-3 px-4 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 flex-grow"
          placeholder="e.g., chicken, broccoli, garlic"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          onClick={handleAddIngredient}
          className="ml-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out"
        >
          Add
        </button>
      </div>
      <div className="mb-5 min-h-[60px]">
        {ingredientsList.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {ingredientsList.map((ing, index) => (
              <li 
                key={index} 
                className="flex items-center bg-stone-200 text-stone-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm"
              >
                {ing}
                <button 
                  onClick={() => handleRemoveIngredient(ing)}
                  className="ml-2.5 text-red-500 hover:text-red-700 font-semibold text-lg"
                  aria-label={`Remove ${ing}`}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500 pt-3">No ingredients added yet. Type an ingredient and click "Add".</p>
        )}
      </div>
      <button 
        onClick={handleGenerateClick}
        disabled={ingredientsList.length === 0 || isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-transform transform hover:scale-105 duration-150 ease-in-out"
      >
        {isLoading ? 'Generating...' : 'Generate Dishes'}
      </button>
    </div>
  );
};

export default IngredientInput; 