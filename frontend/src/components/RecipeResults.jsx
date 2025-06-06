import React from 'react';

const RecipeResults = ({ recipes, isLoading, onRecipeSelect }) => {
  if (isLoading) {
    return <div className="text-center p-10"><p className="text-lg text-neutral-500">Loading recipes...</p></div>;
  }

  if (!recipes || recipes.length === 0) {
    return <div className="text-center p-10"><p className="text-lg text-neutral-500">No recipes found matching your ingredients. Try adding more!</p></div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map(recipe => (
        <div 
          key={recipe.id} 
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-neutral-200 flex flex-col"
          onClick={() => onRecipeSelect(recipe)}
        >
          <img 
            src={recipe.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image'} 
            alt={recipe.name} 
            className="w-full h-52 object-cover"
          />
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-neutral-700 mb-2 truncate" title={recipe.name}>{recipe.name}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 flex-grow">{recipe.description}</p>
            <button 
              aria-hidden="true" 
              tabIndex="-1"
              className="mt-4 w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-2 px-4 rounded-lg text-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeResults; 