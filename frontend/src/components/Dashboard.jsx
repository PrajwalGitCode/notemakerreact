import React, { useState, useEffect } from "react";
import { getNotesAPI, saveNoteAPI, deleteNoteAPI } from "../api"; // import centralized API

const Dashboard = ({ user, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await getNotesAPI(user.token);
        setNotes(Array.isArray(data) ? data : data.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Could not fetch notes.");
      }
    };
    fetchNotes();
  }, [user.token]);

  // Add or update note
  const saveNote = async () => {
    if (!title.trim()) return;
    try {
      const notePayload = { title, content };
      const response = await saveNoteAPI({
        token: user.token,
        note: notePayload,
        editingNoteId: editingNote?._id,
      });

      const savedNote = response.data;

      if (editingNote) {
        setNotes((prev) =>
          prev.map((note) => (note._id === savedNote._id ? savedNote : note))
        );
        setEditingNote(null);
      } else {
        setNotes((prev) => [savedNote, ...prev]);
      }

      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error saving note:", err);
      setError("Could not save note.");
    }
  };

  // Edit note
  const editNote = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await deleteNoteAPI(id, user.token);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Could not delete note.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            onClick={onLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* Add/Edit Note */}
        <div className="mb-6 p-4 bg-gray-800 rounded">
          <h3 className="text-xl font-semibold mb-2">
            {editingNote ? "Edit Note" : "Add Note"}
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={saveNote}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingNote ? "Update Note" : "Add Note"}
          </button>
          {editingNote && (
            <button
              onClick={() => {
                setEditingNote(null);
                setTitle("");
                setContent("");
              }}
              className="ml-2 bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note._id}
                className="p-4 bg-gray-800 rounded shadow-sm flex justify-between items-start"
              >
                <div>
                  <h4 className="font-bold text-lg">{note.title}</h4>
                  <p className="mt-1">{note.content}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editNote(note)}
                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
