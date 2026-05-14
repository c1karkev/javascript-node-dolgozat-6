import express from "express";
import * as db from "./data/database.js";

const PORT = 3080;

const app = express();
app.use(express.json());

app.get("/posts", (req, res) => {
    res.status(200).json(db.getAll());
});

app.get("/posts/:id", (req, res) => {
    const id = +req.params.id;
    const post = db.getById(id);
    if (post) {
        return res.status(200).json(post);
    }
    res.status(404).json({error: "Poszt nem található"});
});

app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({error: "Poszt adat hiány"});
    }
    const output = db.addNew(title, content);
    res.status(201).json(output);
})

app.delete("/posts/:id", (req, res) => {
    const id = +req.params.id;
    if (db.getById(id)) {
        db.remove(id);
        return res.status(204).json();
    }
    res.status(404).json({error: "Poszt nem található"})
})

app.listen(PORT, () => {
    console.log("App is running");
})