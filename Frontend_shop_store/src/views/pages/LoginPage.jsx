import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthController } from "../../controllers/useAuthController";
import Button from "../components/Button";

function LoginPage() {
  const { login, loading, error } = useAuthController();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="centered-page">
      <div className="form-card">
        <span className="eyebrow">Welcome back</span>
        <h1 className="heading-xl" style={{ marginTop: "8px" }}>
          Log in to your account
        </h1>
        <p className="caption text-muted" style={{ margin: "8px 0 24px" }}>
          Access your store dashboard and manage products.
        </p>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input-field"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="caption text-muted" style={{ marginTop: "24px", textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{ textDecoration: "underline" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
