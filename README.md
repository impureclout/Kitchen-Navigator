# Kitchen Navigator MVP

Kitchen Navigator is a web application that allows restaurant owners to generate menus based on available ingredients. This MVP (Minimum Viable Product) is designed to showcase the core functionality.

## Project Goal

Develop an MVP of Kitchen Navigator to secure investment for future development and scaling. The application demonstrates ingredient-based recipe matching using a curated mock database.

## Monetization Strategy (Proposed)

Monthly Subscription Model.

## Features Implemented in MVP

*   **User Authentication:** Secure registration and login for users.
*   **Ingredient Input:** Users can input a list of available ingredients.
*   **Recipe Generation:** The system matches user ingredients against a mock database of recipes.
    *   Considers "always available" staple ingredients (e.g., salt, pepper, oil).
*   **Recipe Preview:** Users can view details of generated recipes (description, full ingredients, instructions, prep/cook time, yield).
*   **Menu Building:** Users can select dishes from the generated results to build a custom menu.
    *   Ability to set a menu title.
    *   Reorder and remove items from the current menu.
*   **Printable Outputs:**
    *   Generate and print a formatted restaurant-style menu.
    *   Generate and print a list of full recipes for selected menu items.
*   **In-Memory Database:** Uses in-memory arrays for users, subscriptions (dummy), mock recipes, and always available ingredients for MVP demonstration.

## Technology Stack

**Frontend:**
*   React.js
*   Tailwind CSS
*   Axios (for API calls)
*   React Router DOM (for navigation)
*   React-to-Print (for printing functionality)

**Backend:**
*   Node.js with Express.js
*   bcryptjs (for password hashing)
*   jsonwebtoken (for JWT authentication)
*   cors (for cross-origin requests)
*   dotenv (for environment variables - though `.env` is gitignored)
*   uuid (for generating unique IDs for in-memory data)

**Development:**
*   Git for version control.

## Project Structure

```
RestuarantMenuCreator/
├── backend/
│   ├── controllers/      # Request handling logic
│   ├── data/             # Mock JSON data (recipes, ingredients)
│   ├── db/               # In-memory DB setup (users, subscriptions)
│   ├── middleware/       # Authentication middleware
│   ├── models/           # Placeholder for future database models
│   ├── routes/           # API route definitions
│   ├── package.json
│   └── server.js         # Main Express application file
├── frontend/
│   ├── public/           # Static assets and HTML template
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page-level components
│   │   ├── App.js        # Main React app component
│   │   ├── index.css     # Global styles (including Tailwind directives)
│   │   └── index.js      # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
└── README.md             # This file
```

## Setup and Running Instructions

### Prerequisites

*   Node.js and npm (or Yarn) installed globally.
*   Git installed.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the backend server:**
    ```bash
    npm start
    ```
    (Assuming `scripts: {"start": "node server.js"}` is in `backend/package.json`. If not, use `node server.js`)
    The backend server will typically run on `http://localhost:5001`.

### Frontend Setup

1.  **Navigate to the frontend directory (from the project root):**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The React development server will typically open the application in your browser at `http://localhost:3000`.

### Usage

1.  Open the application in your browser (usually `http://localhost:3000`).
2.  Register a new user account or log in if you have an existing one.
3.  On the homepage, enter ingredients you have available.
4.  Click "Generate Dishes" to see suggested recipes.
5.  Click on a recipe card to view its details in a modal.
6.  From the modal, add recipes to your "Current Menu".
7.  Manage your menu on the right sidebar: set a title, reorder items, or remove them.
8.  Use the "Generate Printable Menu" or "Generate Recipe List" buttons to open print dialogs for your created menu or its recipes.

## Future Enhancements (Post-MVP / Post-Investment)

*   **Real Recipe API Integration:** Transition from mock database to paid APIs (e.g., Spoonacular, Edamam).
*   **Database Integration:** Replace in-memory data with a persistent database like PostgreSQL.
*   **Payment Gateway Integration:** Implement Stripe/PayPal for actual subscription management.
*   **User Saved Menus & Recipes:** Allow users to save their generated menus and favorite recipes.
*   **Advanced Filtering:** Dietary filters (vegetarian, vegan, gluten-free), cuisine filters.
*   **Costing & Pricing Tools:** Allow input of ingredient costs and generate menu prices.
*   **Inventory Management:** Track ingredient quantities.
*   **Shopping List Generation:** Create shopping lists based on selected menu items.
*   **Scalability Improvements:** Optimize database queries, implement caching.
*   **Admin Dashboard:** For managing users, subscriptions, and application data. 