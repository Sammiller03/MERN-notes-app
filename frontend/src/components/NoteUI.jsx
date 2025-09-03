import { Link } from "react-router"
import { PencilLine } from 'lucide-react';
import { Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


const NoteUI = ({note, setNotes}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault(); // dont really need this here
        
        if (!window.confirm("Are you sure you want to delete this note?"))
            return;

        try {
            await axiosInstance.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id));
            toast.success("Note deleted successfully");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    };

  return (
    <div className="card bg-secondary w-96 shadow-xl mx-6 my-6">
        <div className="card-body">
            <h2 className="card-title text-base-content mb-4">{note.title}</h2>
            <p className="text-base-content/70 line-clamp-3 mb-4">{note.content}</p>
            <div className="card-actions justify-between">
                <div>
                    <p className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</p>
                </div>

                <div className="space-x-4">
                    <Link to={`/note/${note._id}`} className="btn btn-square btn-success btn-outline">
                        <PencilLine className="size-4"/>
                    </Link>

                    <button className="text-error" onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2 className="size-4"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteUI

