const {pool} = require('../settings/database.');

const getAllVideoGames = async (req, res) => {
    try {
        const query = "SELECT * FROM videogames ORDER BY id ASC";
        const result = await pool.query(query);

        res.json({
            exit: true,
            message: 'video games list:',
            result: result.rows,
            total: result.rows.length
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({
            exit: false,
            message: "Error to get all the video games",
            error: err.message
        });
    }
};

const getVideoGameById = async (req, res) => {
    try {
        const {id} = req.params;
        const query = `SELECT *
                       FROM videogames
                       WHERE id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                exit: false,
                message: `videogame not found ${req.params.id}.`,
            })
        }
        res.json({
            exit: true,
            message: 'video game found :)',
            data: result.rows[0]
        })
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({
            exit: false,
            message: `Error to get the video game ${req.params.id}`,
            error: err.message
        });
    }
}

const createVideoGame = async (req, res) => {
    try {
        const {
            name,
            genre,
            platform,
            price,
            release_date,
            development,
            description
        } = req.body;

        const query = `INSERT INTO videogames (name, genre, platform, price, release_date, development, description)
                       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        const values = [name,
            genre,
            platform,
            price,
            release_date,
            development,
            description]

        const result = await pool.query(query, values);

        res.status(201).json({
            exit: true,
            message: 'video games created successfully.',
            data: result.rows[0]
        })

        if (!name || !genre || !platform || !price) {
            return res.status(400).json({
                exit: false,
                message: 'Please enter a valid values.'
            })
        }

    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({
            exit: false,
            message: `Error to create the video game ${req.params.id}`,
            error: err.message
        });
    }
}


const updateVideoGame = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            name,
            genre,
            platform,
            price,
            release_date,
            development,
            description
        } = req.body;

        const query = `UPDATE videogames
                       SET name         = $1,
                           genre        = $2,
                           platform     = $3,
                           price        = $4,
                           release_date = $5,
                           development  = $6,
                           description  = $7
                       where id = $8 RETURNING *`;

        const values = [name,
            genre,
            platform,
            price,
            release_date,
            development,
            description,
            id]

        const result = await pool.query(query, values);

        res.status(200).json({
            exit: true,
            message: 'video games was updated successfully.',
            data: result.rows[0]
        })

    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({
            exit: false,
            message: `Error to update the video game ${req.params.id}`,
            error: err.message
        });
    }
}

const deleteVideoGame = async (req, res) => {
    try{
        const {id} = req.params;
        const query = `DELETE FROM videogames WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) { return res.status(404).json({ exit: false, message: "Video game not found." }); }
        res.status(204).json({
            exit: true,
            message: 'video game deleted successfully.',
            data: result.rows[0]
        })

    }catch (err){
        console.log(`Error: ${err}`);
        res.status(500).json({
            exit: false,
            message: `Error to delete the video game ${req.params.id}`,
            error: err.message
        });
    }
}

module.exports = {getAllVideoGames, getVideoGameById, createVideoGame, updateVideoGame, deleteVideoGame};