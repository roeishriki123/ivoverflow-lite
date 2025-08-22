import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../slices/questionsSlice";
import { useNavigate } from "react-router-dom";

export default function NewQuestion() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addQuestion({ title, body, tags: tags.split(",") }));
    navigate("/questions");
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit} style={{display:"grid", gap:8, maxWidth:520, margin:"0 auto"}}>
        <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea placeholder="Body" value={body} onChange={(e)=>setBody(e.target.value)} rows={5} />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
