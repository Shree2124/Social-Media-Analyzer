import PropTypes from "prop-types";

const Input = ({
  className,
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  required = false,
  error = "",
  rightElement = null,
}) => {
  const inputId = `${name}-input`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      {label && (
        <label
        className="dark:text-white text-gray-900"
          htmlFor={inputId}
          style={{ fontSize: "0.9rem", fontWeight: 600 }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input
          className={className}
          id={inputId}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          style={{
            width: "100%",
            padding: rightElement
              ? "0.65rem 2.75rem 0.65rem 0.85rem"
              : "0.65rem 0.85rem",
            borderRadius: "0.5rem",
            border: error ? "1px solid #dc2626" : "1px solid #cbd5f5",
            fontSize: "1rem",
            outline: "none",
            transition: "border 0.2s ease-in-out",
          }}
        />
        {rightElement && (
          <span
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {rightElement}
          </span>
        )}
      </div>
      {error && (
        <span style={{ color: "#dc2626", fontSize: "0.8rem" }}>{error}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string,
  rightElement: PropTypes.node,
};

Input.defaultProps = {
  onBlur: undefined,
};

export default Input;
