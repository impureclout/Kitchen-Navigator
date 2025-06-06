import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-neutral-600 hover:text-emerald-700">
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-neutral-800 mt-2">Account Settings</h1>
        </div>
      </header>

      <main className="container mx-auto p-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Left Section: Change Password */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md border border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-700 border-b pb-4 mb-6">Change Password</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1.5" htmlFor="current-password">
                    Current Password
                  </label>
                  <input
                    className="shadow-sm appearance-none border border-neutral-300 rounded-lg w-full py-2.5 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1.5" htmlFor="new-password">
                    New Password
                  </label>
                  <input
                    className="shadow-sm appearance-none border border-neutral-300 rounded-lg w-full py-2.5 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                  />
                   <p className="mt-2 text-xs text-neutral-500">Must be at least 8 characters long.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1.5" htmlFor="confirm-password">
                    Confirm New Password
                  </label>
                  <input
                    className="shadow-sm appearance-none border border-neutral-300 rounded-lg w-full py-2.5 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-medium transition duration-150"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Section: Subscription Management */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-md border border-neutral-200 space-y-6">
               <h2 className="text-xl font-semibold text-neutral-700 border-b pb-4">Subscription</h2>
               <div>
                  <p className="text-sm font-medium text-neutral-600">Current Plan</p>
                  <p className="text-lg font-semibold text-emerald-700">MVP Basic</p>
               </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">Status</p>
                  <p className="text-base text-neutral-800">Active</p>
               </div>
               <div>
                 <p className="text-sm font-medium text-neutral-600">Billing</p>
                 <p className="text-base text-neutral-500">Not applicable for MVP</p>
               </div>
               <div className="pt-2">
                  <button
                    type="button"
                    disabled
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-neutral-400 cursor-not-allowed font-medium"
                  >
                    Manage Subscription
                  </button>
                  <p className="mt-2 text-xs text-neutral-500 text-center">Full subscription management will be available after our official launch.</p>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SettingsPage; 