function Button({ children, variant = "primary", className = "", ...props }) {
  const variantClass = {
    primary: "btn-primary",
    "outline-dark": "btn-outline-dark",
    "outline-light": "btn-outline-light",
    aloe: "btn-aloe",
    danger: "btn-danger",
  }[variant];

  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
