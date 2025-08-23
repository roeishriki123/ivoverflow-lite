import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../slices/questionsSlice";
import { fetchAnswers, addAnswer } from "../slices/answersSlice";
import RequireAuthNotice from "../components/RequireAuthNotice.jsx";

export default function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, status } = useSelector((s) => s.questions);
  const question = list.find((q) => q._id === id);
  const answers = useSelector((s) => s.answers[id] || []);
  const token = useSelector((s) => s.auth.token);

  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(fetchQuestions());
    dispatch(fetchAnswers(id));
  }, [dispatch, id, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = answerText.trim();
  
    if (!text) {
      alert("Answer cannot be empty.");
      return;
    }
  
    await dispatch(addAnswer({ questionId: id, body: text }));
    setAnswerText("");
  };
  

  if (!question) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "left", maxWidth: 800, margin: "0 auto" }}>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      <small>{question.tags?.join(", ")}</small>
      <hr />
      <h3>Answers</h3>
      {answers.length === 0 && <p>No answers yet.</p>}
      {answers.map((a) => (
        <div key={a._id} style={{ padding: "0.75rem 0", borderBottom: "1px solid #333" }}>
          <p>{a.body}</p>
          <small>by {a.author?.nickname}</small>
        </div>
      ))}

      {!token ? (
        <div style={{ marginTop: 16 }}>
          <RequireAuthNotice action="post an answer" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, marginTop: 16 }}>
          <textarea
            placeholder="Write your answer..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            rows={4}
          />
          <button type="submit">Add Answer</button>
        </form>
      )}
    </div>
  );
}
