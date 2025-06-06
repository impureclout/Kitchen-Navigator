const pool = require('../db/db'); // Assuming your db connection pool is here

const saveMenu = async (req, res) => {
    const { title, menuItems } = req.body;
    const userId = req.user.id; // From authMiddleware

    if (!title || !menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
        return res.status(400).json({ message: "Menu title and a non-empty array of menu items are required." });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Insert into saved_menus table
        const menuInsertQuery = 'INSERT INTO saved_menus (user_id, title) VALUES ($1, $2) RETURNING id';
        const menuResult = await client.query(menuInsertQuery, [userId, title]);
        const newMenuId = menuResult.rows[0].id;

        // Insert into saved_menu_recipes table
        for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i];
            const recipeInsertQuery = 'INSERT INTO saved_menu_recipes (menu_id, recipe_id, sort_order) VALUES ($1, $2, $3)';
            await client.query(recipeInsertQuery, [newMenuId, item.id, i]);
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Menu saved successfully!', menuId: newMenuId });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error saving menu:', error);
        res.status(500).json({ message: 'Server error while saving menu.' });
    } finally {
        client.release();
    }
};

const getSavedMenus = async (req, res) => {
    const userId = req.user.id;
    try {
        // This query joins the tables to get the menu and a count of its items.
        const query = `
            SELECT sm.id, sm.title, sm.created_at, COUNT(smr.id) as item_count
            FROM saved_menus sm
            LEFT JOIN saved_menu_recipes smr ON sm.id = smr.menu_id
            WHERE sm.user_id = $1
            GROUP BY sm.id
            ORDER BY sm.created_at DESC;
        `;
        const { rows } = await pool.query(query, [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching saved menus:', error);
        res.status(500).json({ message: 'Server error while fetching menus.' });
    }
};

const deleteMenu = async (req, res) => {
    const { id } = req.params; // menu id
    const userId = req.user.id;
    try {
        // Ensure the menu belongs to the user trying to delete it
        const deleteQuery = 'DELETE FROM saved_menus WHERE id = $1 AND user_id = $2';
        const result = await pool.query(deleteQuery, [id, userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Menu not found or you do not have permission to delete it.' });
        }
        res.json({ message: 'Menu deleted successfully.' });
    } catch (error) {
        console.error('Error deleting menu:', error);
        res.status(500).json({ message: 'Server error while deleting menu.' });
    }
};


module.exports = {
    saveMenu,
    getSavedMenus,
    deleteMenu,
}; 