import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthController } from "../../controllers/useAuthController";
import Button from "../components/Button";

function RegisterPage() {
  const { register, loading, error } = useAuthController();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="centered-page">
      <div className="form-card">
        <span className="eyebrow">Get started</span>
        <h1 className="heading-xl" style={{ marginTop: "8px" }}>
          Create your account
        </h1>
        <p className="caption text-muted" style={{ margin: "8px 0 24px" }}>
          Start your free trial and build your online store today.
        </p>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="input-field"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
              minLength={6}
            />
          </div>
          <Button type="submit" variant="aloe" disabled={loading}>
            {loading ? "Creating account..." : "Start free trial"}
          </Button>
        </form>

        <p className="caption text-muted" style={{ marginTop: "24px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
