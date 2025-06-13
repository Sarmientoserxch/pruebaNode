const {pool} = require('../settings/database.');

const getAllVideoGames =  async (req, res) => {
    try {
        const query = "SELECT * FROM videogames ORDER BY id ASC";
        const result = await pool.query(query);

        res.json({
            exit: true,
            message:'video games list:',
            result: result.rows,
            total: result.rows.length
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({
            exit: false,
            message: "Error al obtener los videojuegos",
            error: err.message});
    }
};


module.exports = {getAllVideoGames};