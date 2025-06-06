import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, BookOpenIcon } from '@heroicons/react/24/solid';

const SavedMenusPage = () => {
  // Placeholder data for saved menus. In a real app, this would come from an API.
  const savedMenus = [
    { id: 1, title: "July Dinner Specials", date: "2024-07-15", itemCount: 5 },
    { id: 2, title: "Weekend Brunch Menu", date: "2024-07-12", itemCount: 8 },
    { id: 3, title: "Summer Seafood Fest", date: "2024-07-05", itemCount: 6 },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-neutral-600 hover:text-emerald-700">
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-neutral-800 mt-2">Saved Menus</h1>
        </div>
      </header>

      <main className="container mx-auto p-6 mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-700 border-b pb-4 mb-6">Your Collection</h2>
          
          {savedMenus.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
                <BookOpenIcon className="mx-auto h-12 w-12 text-neutral-300" />
                <h3 className="mt-2 text-lg font-medium text-neutral-800">No Saved Menus Yet</h3>
                <p className="mt-1 text-sm text-neutral-500">Go back to the dashboard to build and save your first menu.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {savedMenus.map((menu) => (
                <li key={menu.id} className="p-4 border border-neutral-200 rounded-lg flex justify-between items-center hover:bg-neutral-50 hover:shadow-sm transition-all">
                  <div>
                    <h3 className="font-semibold text-emerald-800">{menu.title}</h3>
                    <p className="text-sm text-neutral-500">
                      Saved on {new Date(menu.date).toLocaleDateString()} &bull; {menu.itemCount} items
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button className="font-medium text-sm text-emerald-600 hover:text-emerald-500 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 hover:bg-emerald-100">View</button>
                    <button className="font-medium text-sm text-red-600 hover:text-red-500 px-3 py-1 rounded-md bg-red-50 border border-red-200 hover:bg-red-100">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedMenusPage; 