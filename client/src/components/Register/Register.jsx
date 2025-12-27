import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../utils/index.js";
import { Button, SocialButton } from "../index.js";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../api/Axios/axios.js";
import { register } from "../../api/routes/auth/auth.routes.js";
import toast from "react-hot-toast";

const initialState = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(
    Object.keys(initialState).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getFieldError = (field, value) => {
    const trimmed = value.trim();

    switch (field) {
      case "username":
        if (!trimmed) return "Username is required.";
        if (trimmed.length < 3)
          return "Username must be at least 3 characters.";
        if (!/^[a-zA-Z0-9_]+$/.test(trimmed))
          return "Use only letters, numbers, or underscores.";
        break;
      case "email":
        if (!trimmed) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
          return "Enter a valid email address.";
        break;
      case "firstName":
        if (!trimmed) return "First name is required.";
        break;
      case "lastName":
        if (!trimmed) return "Last name is required.";
        break;
      case "password":
        if (!trimmed) return "Password is required.";
        if (trimmed.length < 8)
          return "Password must be at least 8 characters.";
        if (
          !/[A-Z]/.test(trimmed) ||
          !/[a-z]/.test(trimmed) ||
          !/[0-9]/.test(trimmed)
        ) {
          return "Use upper, lower case letters and a number.";
        }
        break;
      case "confirmPassword":
        if (!trimmed) return "Confirm your password.";
        if (trimmed !== formData.password) return "Passwords do not match.";
        break;
      default:
        break;
    }

    return "";
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const message = getFieldError(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validate = () => {
    const nextErrors = {};

    Object.entries(formData).forEach(([field, value]) => {
      const message = getFieldError(field, value);
      if (message) {
        nextErrors[field] = message;
      }
    });

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors((prev) => ({ ...prev, ...validationErrors }));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post(register,formData)
      console.log(res.data)
      if(res.data.statusCode === 201){
        setIsSubmitting(false)
        toast.success("Register successfully! wait your redirecting to login")
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
      toast.error("Register failed please try again!")
    }

    setIsSubmitting(false)
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
          <h2
            className="dark:text-white text-black"
            style={{ margin: 0, fontSize: "1.75rem" }}
          >
            Create account
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <Input
            className="bg-white dark:bg-gray-900 shadow-md dark:text-white"
            label="First Name"
            type="text"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors.firstName}
          />

          <Input
            className="bg-white dark:bg-gray-900 shadow-md dark:text-white"
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors.lastName}
          />
        </div>

        <Input
          className="bg-white dark:bg-gray-900 shadow-md dark:text-white"
          label="Username"
          type="text"
          name="username"
          placeholder="johndoe123"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.username}
        />

        <Input
          className="bg-white dark:bg-gray-900 shadow-md dark:text-white"
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
          className="bg-white dark:bg-gray-900 shadow-md dark:text-white"
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
                color: "#6b7280",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <Input
          className="bg-white dark:bg-gray-900 shadow-md dark:text-white"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={errors.confirmPassword}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#6b7280",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#3b82f6",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign in
          </a>
        </p>
      </form>
    </section>
  );
};

export default Register;
