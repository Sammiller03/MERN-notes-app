import Note from "../models/Note.js"

export async function getAllNotes(_, res) {
    try {
        // returns all notes in the mongodb collection
        const notes = await Note.find().sort({ createdAt: -1 }); // will sort latest note at the top
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message : "Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Need to get the _id of the note we want to update
// Get the req.body then update the variable we want to update
// params in findByIdAndUpdate is the same variable name as that in the routes for put
export async function editNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if (!updatedNote) return res.status(404).json({message : "Note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in editNote controller", error);
        res.status(500).json({message: "Internal server error"}); 
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({message : "Note not found"});

        res.status(200).json({message : "Note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"}); 
    }
}

