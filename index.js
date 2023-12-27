require("dotenv").config();
const cors = require("cors"); 
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require('./models/Notes')

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Get All Notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});

    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching notes..." });
  }
});

// Get Notes by id
app.get("/api/notes/:id", async (req, res) => {
  try {

    const noteId = req.params.id;
    const data = await Notes.findById(noteId);

    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching notes..." });
  }
});

// create note
app.post("/api/notes/", async (req, res) => {
  try {
    const {title, description} = req.body;
    const data = await Notes.create({title, description});

    if (!data) {
      throw new Error("An error occured while creating notes.");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating notes..." });
  }
});

// update note
app.put("/api/notes/:id", async (req, res) => {
  try {

    const noteId = req.params.id;
    const {title, description} = req.body;
    const data = await Notes.findByIdAndUpdate(noteId ,{title, description});

    if (!data) {
      throw new Error("An error occured while updating notes.");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while updating notes..." });
  }
});

// delete note by id
app.delete("/api/notes/:id", async (req, res) => {
  try {

    const noteId = req.params.id;
    const data = await Notes.findByIdAndDelete(noteId);

    if (!data) {
      throw new Error("An error occured while deleting notes.");
    }

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error deleting while updating notes..." });
  }
});




app.get("/", (req,res) =>{
    res.json("hello")
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
})