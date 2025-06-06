-- Kitchen Navigator Schema v2
-- This file adds tables for saving user-created menus.
-- Run this after the initial schema.sql to update your database.

-- Create a table to store the saved menus
CREATE TABLE IF NOT EXISTS saved_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a join table to link saved menus to the mock recipes
-- This table stores which recipes belong to which menu and in what order
CREATE TABLE IF NOT EXISTS saved_menu_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id UUID NOT NULL REFERENCES saved_menus(id) ON DELETE CASCADE,
    recipe_id VARCHAR(255) NOT NULL, -- This will store the string ID from mockRecipes.json (e.g., "recipe_001")
    sort_order INTEGER NOT NULL -- To maintain the order of recipes in the menu
);

-- Optional: Add an index for faster lookups of menus by user
CREATE INDEX IF NOT EXISTS idx_saved_menus_user_id ON saved_menus(user_id);

-- Optional: Add an index for faster lookups of recipes by menu
CREATE INDEX IF NOT EXISTS idx_saved_menu_recipes_menu_id ON saved_menu_recipes(menu_id);

-- A function to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- A trigger to use the function on the saved_menus table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON saved_menus
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Note: The 'users' and 'subscriptions' tables from the initial schema are assumed to exist. 