import express from "express"
import { createNote, deleteNote, editNote, getAllNotes, getNoteById} from "../controllers/notesController.js";

const router = express.Router();

// All of these include the /api/notes

// router - instance of express.Router()
// get - the http method
// "/" - path on the server
// getAllNotes - the handler which is the method called at this endpoint
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", editNote);
router.delete("/:id", deleteNote);


export default router
