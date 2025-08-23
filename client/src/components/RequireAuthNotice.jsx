import { Link, useLocation } from "react-router-dom";

// Shows a message when user tries to do something that requires login
export default function RequireAuthNotice({ action = "view this page" }) {
  const location = useLocation();
  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, background: "#fff9f0" }}>
      <h2 style={{ marginTop: 0 }}>Sign in required</h2>
      <p>You need to log in to {action}.</p>
      <Link
        to="/login"
        state={{ from: location }}
        style={{ display: "inline-block", padding: "8px 12px", border: "1px solid #333", borderRadius: 6, textDecoration: "none" }}
      >
        Go to Login
      </Link>
    </div>
  );
}
