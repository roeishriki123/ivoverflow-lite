import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "../slices/questionsSlice";
import { Link } from "react-router-dom";
import RequireAuthNotice from "../components/RequireAuthNotice.jsx";

// page that lists all questions (requires login)
export default function Questions() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((s) => s.questions);
  const token = useSelector((s) => s.auth.token);

  if (!token) {
    return <RequireAuthNotice action="view all questions" />;
  }

  useEffect(() => {
    if (status === "idle") dispatch(fetchQuestions());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading questions...</p>;
  if (status === "failed") return <p style={{color:"tomato"}}>Error: {error}</p>;

  return (
    <div>
      <h2>All Questions</h2>
      <Link to="/new">Ask a Question</Link>
      {list.map((q) => (
        <div key={q._id} style={{textAlign:"left", margin:"1rem 0", padding:"1rem", border:"1px solid #444", borderRadius:8}}>
          <h3><Link to={`/questions/${q._id}`}>{q.title}</Link></h3>
          <p>{q.body}</p>
          <small>{q.tags?.join(", ")}</small>
        </div>
      ))}
    </div>
  );
}
