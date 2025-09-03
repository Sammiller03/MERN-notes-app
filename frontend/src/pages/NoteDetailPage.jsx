import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  // When note detail page renders we want to fetch the note from the API using the useEffect
  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);  
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

      fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content")
      return;
    }

    setSaving(true);

    try {
      await axiosInstance.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // if in the loading state show spinning icon
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  // ui
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes              
            </Link>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="text" 
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                    placeholder="Enter title"
                  />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="text" 
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                    placeholder="Enter content"
                  />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NoteDetailPage;

