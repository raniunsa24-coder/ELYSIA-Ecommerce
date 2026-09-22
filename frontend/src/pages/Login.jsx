import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(form);

      if (data.token) {
        localStorage.setItem("elysia-token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "elysia-user",
          JSON.stringify(data.user)
        );
      }

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <span>WELCOME BACK</span>

        <h1>Sign in.</h1>

        <p>
          Enter your details to continue your ELYSIA
          experience.
        </p>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <label>
            Email address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={16}
                  className="loading-icon"
                />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </main>
  );
}

export default Login;