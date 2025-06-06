import React, { useState, useRef } from 'react';
import axios from 'axios';
import IngredientInput from '../components/IngredientInput';
import RecipeResults from '../components/RecipeResults';
import RecipeDetailsModal from '../components/RecipeDetailsModal';
import CurrentMenu from '../components/CurrentMenu';
import { useReactToPrint } from 'react-to-print';
import PrintableMenu from '../components/PrintableMenu';
import PrintableRecipeList from '../components/PrintableRecipeList';
import ProfileDropdown from '../components/ProfileDropdown';

const HomePage = ({ setIsAuthenticated }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null); 

  // State for Phase 3: Menu Management
  const [currentMenuItems, setCurrentMenuItems] = useState([]);
  const [menuTitle, setMenuTitle] = useState('');

  // Refs for printable components
  const printableMenuRef = useRef();
  const printableRecipeListRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleGenerateRecipes = async (userIngredients) => {
    setIsLoadingRecipes(true);
    setError(null);
    setRecipes([]);
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication token not found. Please log in again.');
      setIsLoadingRecipes(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/api/recipes/generate',
        { userIngredients },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setRecipes(response.data);
    } catch (err) {
      console.error('Error generating recipes:', err);
      setError(err.response?.data?.message || 'Failed to fetch recipes. Please try again.');
      setRecipes([]);
    }
    setIsLoadingRecipes(false);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const handleAddToMenu = (recipe) => {
    // For MVP, allow adding the same recipe multiple times
    setCurrentMenuItems(prevItems => [...prevItems, recipe]);
    // Optionally close modal after adding, or let user do it manually
    // handleCloseModal(); 
  };

  const handleRemoveFromMenu = (recipeIdToRemove, indexToRemove) => {
    // If recipes can be added multiple times, index is more reliable for removal
    setCurrentMenuItems(prevItems => prevItems.filter((item, index) => index !== indexToRemove));
  };

  const handleReorderMenuItem = (startIndex, endIndex) => {
    const result = Array.from(currentMenuItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setCurrentMenuItems(result);
  };

  // Placeholder functions for Phase 4 print generation
  const handlePrintMenu = useReactToPrint({
    content: () => printableMenuRef.current,
    documentTitle: () => menuTitle || 'Menu',
  });

  const handlePrintRecipeList = useReactToPrint({
    content: () => printableRecipeListRef.current,
    documentTitle: 'Recipe List',
  });

  const handleGeneratePrintableMenu = () => {
    console.log('Generate Printable Menu clicked. Title:', menuTitle, 'Items:', currentMenuItems);
    if (currentMenuItems.length === 0) {
      alert('Please add items to your menu first.');
      return;
    }
    handlePrintMenu();
  };

  const handleGenerateRecipeList = () => {
    console.log('Generate Recipe List clicked. Items:', currentMenuItems);
    if (currentMenuItems.length === 0) {
      alert('Please add items to your menu first to generate a recipe list.');
      return;
    }
    handlePrintRecipeList();
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-800">
      <header className="bg-stone-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold text-emerald-400 mb-4 sm:mb-0">
            Kitchen Navigator
          </h1>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-neutral-300 bg-emerald-700/50 border border-emerald-600 px-3 py-1 rounded-full">
              Subscription: Active (MVP)
            </span>
            <ProfileDropdown onLogout={handleLogout} />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 mt-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content area for ingredient input and recipe results */}
          <div className="lg:w-2/3 space-y-8">
            <IngredientInput onGenerate={handleGenerateRecipes} isLoading={isLoadingRecipes} />

            {error && (
              <div className="my-4 p-5 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-neutral-700 mb-6 pb-2 border-b border-neutral-300">Suggested Dishes</h2>
              <RecipeResults 
                recipes={recipes} 
                isLoading={isLoadingRecipes} 
                onRecipeSelect={handleRecipeSelect} 
              />
            </div>
          </div>

          {/* Sidebar for Current Menu */} 
          <div className="lg:w-1/3 lg:sticky top-8 self-start">
            <CurrentMenu 
              menuTitle={menuTitle}
              onSetMenuTitle={setMenuTitle}
              currentMenuItems={currentMenuItems}
              onRemoveItem={handleRemoveFromMenu}
              onReorderItem={handleReorderMenuItem}
              onGeneratePrintableMenu={handleGeneratePrintableMenu}
              onGenerateRecipeList={handleGenerateRecipeList}
            />
          </div>
        </div>
      </div>

      {selectedRecipe && (
        <RecipeDetailsModal 
          recipe={selectedRecipe} 
          onClose={handleCloseModal} 
          onAddToMenu={handleAddToMenu} 
        />
      )}

      {/* Hidden components for printing */}
      <div style={{ display: 'none' }}>
        <PrintableMenu ref={printableMenuRef} menuTitle={menuTitle} menuItems={currentMenuItems} />
        <PrintableRecipeList ref={printableRecipeListRef} menuItems={currentMenuItems} />
      </div>

      <footer className="text-center py-10 mt-16 border-t border-neutral-200 bg-neutral-50 text-neutral-600">
        <p className="text-sm">&copy; {new Date().getFullYear()} Kitchen Navigator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage; 