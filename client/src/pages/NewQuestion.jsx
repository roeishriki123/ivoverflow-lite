import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../slices/questionsSlice";
import { useNavigate } from "react-router-dom";
import RequireAuthNotice from "../components/RequireAuthNotice.jsx";


// form for creating a new question (requires login)
export default function NewQuestion() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token);

  if (!token) return <RequireAuthNotice action="create a new question" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please fill title and body.");
      return;
    }
    const tagsArr = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await dispatch(addQuestion({ title: title.trim(), body: body.trim(), tags: tagsArr }));
    navigate("/questions");
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 520, margin: "0 auto" }}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} rows={5} />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
