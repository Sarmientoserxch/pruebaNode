const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connection} = require('./settings/dataBase.')
const {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame,
} = require('./controllers/videoGamesController')

const app = express();
const port = process.env.PORT || 3069;

app.use(cors());
app.use(express.json());

const message = " ________  ________  ___                 ________  ________  _____ ______   _______   ________      \n" + "|\\   __  \\|\\   __  \\|\\  \\               |\\   ____\\|\\   __  \\|\\   _ \\  _   \\|\\  ___ \\ |\\   ____\\     \n" + "\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\  ____________\\ \\  \\___|\\ \\  \\|\\  \\ \\  \\\\\\__\\ \\  \\ \\   __/|\\ \\  \\___|_    \n" + " \\ \\   __  \\ \\   ____\\ \\  \\|\\____________\\ \\  \\  __\\ \\   __  \\ \\  \\\\|__| \\  \\ \\  \\_|/_\\ \\_____  \\   \n" + "  \\ \\  \\ \\  \\ \\  \\___|\\ \\  \\|____________|\\ \\  \\|\\  \\ \\  \\ \\  \\ \\  \\    \\ \\  \\ \\  \\_|\\ \\|____|\\  \\  \n" + "   \\ \\__\\ \\__\\ \\__\\    \\ \\__\\              \\ \\_______\\ \\__\\ \\__\\ \\__\\    \\ \\__\\ \\_______\\____\\_\\  \\ \n" + "    \\|__|\\|__|\\|__|     \\|__|               \\|_______|\\|__|\\|__|\\|__|     \\|__|\\|_______|\\_________\\\n" + "                                                                                        \\|_________|\n" + "                                                                                                    \n" + "                                                                                                    "


const startServer = async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(message);
            console.log(`Server is running on port ${port}`);
        })
    } catch (e) {
        console.error(`Error while starting server: ${e.message}`);
    }
}

app.get('/api/videogames', (req, res) => {
    getAllVideoGames(req, res).then(()=>console.log("getAllVideos"));
});

app.get('/api/videogame/:id', (req, res) => {
    getVideoGameById(req, res).then(()=>console.log("getById"));
});

app.post('/api/videogames', (req, res) => {
    createVideoGame(req, res).then(()=>console.log("CreateVideoGame"));
});

app.put("/api/videogames/:id", (req, res) => {
    updateVideoGame(req, res).then(()=>console.log("UpdateVideoGame"));
})

app.delete("/api/videogames/:id", (req, res) => {
    deleteVideoGame(req, res).then(()=>console.log("DeleteVideoGame"));
})

startServer().then(() => {
    console.log()
});

