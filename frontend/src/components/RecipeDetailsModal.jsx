import React from 'react';

const RecipeDetailsModal = ({ recipe, onClose, onAddToMenu }) => {
  if (!recipe) return null;

  const handleAddToMenuClick = () => {
    onAddToMenu(recipe);
    // onClose(); // Optionally close modal after adding to menu, or let user close manually
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-50 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-neutral-300">
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-200">
          <div className="flex justify-between items-start mb-5">
            <h2 className="text-3xl font-semibold text-emerald-700">{recipe.name}</h2>
            <button 
              onClick={onClose} 
              className="text-neutral-500 hover:text-red-600 text-3xl font-light p-1 -m-1 leading-none rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          
          <img 
            src={recipe.imageUrl || 'https://via.placeholder.com/600x400.png?text=No+Image'} 
            alt={recipe.name} 
            className="w-full h-64 sm:h-72 object-cover rounded-lg mb-6 shadow-md border border-neutral-200"
          />

          <p className="text-neutral-700 mb-6 text-base leading-relaxed hyphens-auto">{recipe.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg shadow-sm">
              <strong className="block text-emerald-800 mb-1">Prep Time:</strong> <span className="text-neutral-700">{recipe.prepTime}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg shadow-sm">
              <strong className="block text-emerald-800 mb-1">Cook Time:</strong> <span className="text-neutral-700">{recipe.cookTime}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg shadow-sm">
              <strong className="block text-emerald-800 mb-1">Yield:</strong> <span className="text-neutral-700">{recipe.yield}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold text-neutral-700 mb-3 border-b border-neutral-300 pb-2">Ingredients:</h4>
            <ul className="list-disc list-inside pl-2 space-y-1.5 text-neutral-600 columns-1 sm:columns-2 gap-x-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-neutral-700 mb-3 border-b border-neutral-300 pb-2">Instructions:</h4>
            <ol className="list-decimal list-inside pl-2 space-y-3 text-neutral-700 leading-relaxed">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="mb-1">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="p-6 bg-neutral-100 border-t border-neutral-300 rounded-b-xl">
          <button 
            onClick={handleAddToMenuClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Add to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsModal; 