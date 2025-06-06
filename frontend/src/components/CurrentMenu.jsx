import React from 'react';
import { PrinterIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';

const CurrentMenu = ({ 
  menuTitle, 
  onSetMenuTitle, 
  currentMenuItems, 
  onRemoveItem, 
  onReorderItem, 
  onGeneratePrintableMenu, // For Phase 4
  onGenerateRecipeList // For Phase 4
}) => {

  const moveItem = (index, direction) => {
    if (direction === 'up' && index > 0) {
      onReorderItem(index, index - 1);
    }
    if (direction === 'down' && index < currentMenuItems.length - 1) {
      onReorderItem(index, index + 1);
    }
  };

  const handleSaveMenu = () => {
    // Placeholder for future backend integration
    alert('Feature in development: This will save the current menu to your account.');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-neutral-200 sticky top-8">
      <h2 className="text-2xl font-semibold text-neutral-700 mb-6 border-b border-neutral-300 pb-3">Current Menu</h2>
      
      <div className="mb-6">
        <label htmlFor="menuTitle" className="block text-sm font-medium text-neutral-600 mb-1.5">
          Menu Title
        </label>
        <input 
          type="text"
          id="menuTitle"
          name="menuTitle"
          className="shadow-sm appearance-none border border-neutral-300 rounded-lg w-full py-2.5 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="e.g., Dinner Specials - July 2025"
          value={menuTitle}
          onChange={(e) => onSetMenuTitle(e.target.value)}
        />
      </div>

      {currentMenuItems.length === 0 ? (
        <p className="text-sm text-neutral-500 italic py-4">No dishes added yet. Explore recipes and add them here!</p>
      ) : (
        <ul className="space-y-3 mb-6 max-h-[28rem] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 pr-1">
          {currentMenuItems.map((item, index) => (
            <li 
              key={item.id + '-' + index} 
              className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg shadow-sm hover:bg-neutral-200/70 transition-colors duration-150 border border-neutral-200"
            >
              <span className="text-neutral-700 font-medium truncate pr-2 max-w-[calc(100%-100px)]" title={item.name}>{index + 1}. {item.name}</span>
              <div className="flex items-center space-x-1.5">
                <button 
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="text-emerald-600 hover:text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed p-1.5 rounded-md hover:bg-emerald-100 transition-colors"
                  aria-label="Move up"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414L5.707 9.707a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === currentMenuItems.length - 1}
                  className="text-emerald-600 hover:text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed p-1.5 rounded-md hover:bg-emerald-100 transition-colors"
                  aria-label="Move down"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 17a1 1 0 00.707-.293l5-5a1 1 0 00-1.414-1.414L11 13.586V4a1 1 0 10-2 0v9.586L5.707 10.293a1 1 0 00-1.414 1.414l5 5A1 1 0 0010 17z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={() => onRemoveItem(item.id, index)} 
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-100 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Buttons for Phase 4 - Generate Printable Menu and Recipe List */}
      {currentMenuItems.length > 0 && (
        <div className="mt-8 space-y-3 pt-4 border-t border-neutral-200">
          <button 
            onClick={onGeneratePrintableMenu} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
          >
            Generate Printable Menu
          </button>
          <button 
            onClick={onGenerateRecipeList} 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
          >
            Generate Recipe List
          </button>
        </div>
      )}

      <div className="space-y-3 mt-4">
        <button
          onClick={handleSaveMenu}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition duration-150"
        >
          <DocumentArrowDownIcon className="w-5 h-5 mr-2.5" />
          Save Menu
        </button>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onGeneratePrintableMenu}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-neutral-300 rounded-lg shadow-sm text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-medium transition duration-150"
          >
            <PrinterIcon className="w-5 h-5 mr-2" />
            Menu
          </button>
          <button 
            onClick={onGenerateRecipeList}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-neutral-300 rounded-lg shadow-sm text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-medium transition duration-150"
          >
            <PrinterIcon className="w-5 h-5 mr-2" />
            Recipes
          </button>
        </div>
      </div>

    </div>
  );
};

export default CurrentMenu; 