import React from 'react';

const PrintableRecipeList = React.forwardRef(({ menuItems }, ref) => {
  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="p-8 font-sans">
      <style>
        {`
          @media print {
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif; /* Clear sans-serif for recipes */
            }
            .printable-recipe-list-container {
              width: 100%;
              margin: 0 auto;
            }
            .recipe-list-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 15px;
            }
            .recipe-list-title {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
            }
            .recipe-entry {
              margin-bottom: 30px;
              page-break-inside: avoid; /* Avoid breaking recipes across pages */
            }
            .recipe-name {
              font-size: 20px;
              font-weight: bold;
              color: #444;
              margin-bottom: 10px;
              border-bottom: 1px dashed #ccc;
              padding-bottom: 5px;
            }
            .recipe-detail-section {
              margin-bottom: 10px;
            }
            .recipe-detail-label {
              font-weight: bold;
              color: #555;
            }
            .recipe-ingredients-list,
            .recipe-instructions-list {
              list-style-position: inside;
              padding-left: 5px; /* Adjusted for better alignment */
              margin-top: 5px;
            }
            .recipe-ingredients-list li,
            .recipe-instructions-list li {
              margin-bottom: 5px;
              line-height: 1.4;
            }
            .recipe-image-print {
                display: none; /* Hide images by default for recipe list print to save ink */
            }
            .no-print {
              display: none;
            }
          }
        `}
      </style>
      <div className="printable-recipe-list-container">
        <div className="recipe-list-header">
          <h1 className="recipe-list-title">Recipe List</h1>
          <p className="text-sm text-gray-500">Generated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {menuItems.map((recipe, index) => (
          <div key={recipe.id + '-' + index} className="recipe-entry">
            <h2 className="recipe-name">{recipe.name}</h2>
            
            {recipe.imageUrl && 
              <img 
                src={recipe.imageUrl} 
                alt={recipe.name} 
                className="w-full h-48 object-cover rounded-md mb-4 recipe-image-print" 
              />
            }
            
            <p className="text-sm text-gray-700 mb-2"><strong>Description:</strong> {recipe.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3 text-xs">
              <div><span className="recipe-detail-label">Prep Time:</span> {recipe.prepTime}</div>
              <div><span className="recipe-detail-label">Cook Time:</span> {recipe.cookTime}</div>
              <div><span className="recipe-detail-label">Yield:</span> {recipe.yield}</div>
            </div>

            <div className="recipe-detail-section">
              <h4 className="recipe-detail-label">Ingredients:</h4>
              <ul className="list-disc recipe-ingredients-list text-sm text-gray-700">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="recipe-detail-section">
              <h4 className="recipe-detail-label">Instructions:</h4>
              <ol className="list-decimal recipe-instructions-list text-sm text-gray-700">
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PrintableRecipeList; 