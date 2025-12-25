import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Input } from "../../utils/index.js";
import { Button, SocialButton } from "../index.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getFieldError = (field, value) => {
    if (field === "email") {
      if (!value.trim()) return "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Enter a valid email address.";
    }

    if (field === "password") {
      if (!value.trim()) return "Password is required.";
      if (value.length < 8) return "Password must be at least 8 characters.";
    }

    return "";
  };

  const validate = () => {
    const nextErrors = {};

    Object.entries(formData).forEach(([field, value]) => {
      const errorMessage = getFieldError(field, value);
      if (errorMessage) {
        nextErrors[field] = errorMessage;
      }
    });

    return nextErrors;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const message = getFieldError(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate async login request
    setTimeout(() => {
      console.log("Logging in with", formData);
      setIsSubmitting(false);
    }, 800);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
  };

  const socialProviders = [
    {
      //   label: "Continue with Google",
      icon: <FontAwesomeIcon icon={faGoogle} />,
      provider: "Google",
    },
    {
      //   label: "Continue with GitHub",
      icon: <FontAwesomeIcon icon={faInstagram} />,
      provider: "GitHub",
    },
    {
      //   label: "Continue with GitHub",
      icon: <FontAwesomeIcon icon={faXTwitter} />,
      provider: "GitHub",
    },
  ];

  return (
    <section
      className="bg-white dark:bg-gray-800 "
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-2xl"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <header style={{ textAlign: "center" }}>
          <h2 className="dark:text-white text-black" style={{ margin: 0, fontSize: "1.75rem" }}>
            Welcome back
          </h2>
        </header>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "0.65rem",
          }}
        >
          {socialProviders.map(({ label, icon, provider }) => (
            <SocialButton
              key={provider}
              icon={icon}
              label={label}
              onClick={() => handleSocialLogin(provider)}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: "#94a3b8",
            fontSize: "0.9rem",
          }}
        >
          <span style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          or
          <span style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
        </div>

        <Input
          className="bg-white dark:bg-gray-900 shadow-md"
          label="Email address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.email}
        />

        <Input
          className="bg-white dark:bg-gray-900 shadow-lg"
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.password}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#475569",
                fontSize: "1rem",
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          }
        />

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>

        <p
          style={{ textAlign: "center", color: "#475569", fontSize: "0.95rem" }}
        >
          New here?{" "}
          <Link to="/register" style={{ color: "#2563eb", fontWeight: 600 }}>
            Create an account
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
