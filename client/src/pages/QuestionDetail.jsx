import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../slices/questionsSlice";
import { fetchAnswers, addAnswer } from "../slices/answersSlice";

export default function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, status } = useSelector((s) => s.questions);
  const question = list.find((q) => q._id === id);
  const answers = useSelector((s) => s.answers[id] || []);

  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    // מבטיח שיש שאלות ב־store
    if (status === "idle") dispatch(fetchQuestions());
    // מביא תשובות לשאלה הזו
    dispatch(fetchAnswers(id));
  }, [dispatch, id, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;
    await dispatch(addAnswer({ questionId: id, body: answerText.trim() }));
    setAnswerText("");
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div style={{textAlign:"left", maxWidth:800, margin:"0 auto"}}>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      <small>{question.tags?.join(", ")}</small>
      <hr />
      <h3>Answers</h3>
      {answers.length === 0 && <p>No answers yet.</p>}
      {answers.map((a) => (
        <div key={a._id} style={{padding:"0.75rem 0", borderBottom:"1px solid #333"}}>
          <p>{a.body}</p>
          <small>by {a.author?.nickname}</small>
        </div>
      ))}
      <form onSubmit={handleSubmit} style={{display:"grid", gap:8, marginTop:16}}>
        <textarea
          placeholder="Write your answer..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          rows={4}
        />
        <button type="submit">Add Answer</button>
      </form>
    </div>
  );
}
