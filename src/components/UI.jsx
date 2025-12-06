import React from 'react';

// Reusable Button Component
export const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Reusable Input Component
export const Input = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1.5 mb-4">
    {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
    />
  </div>
);

// Reusable Select Component
export const Select = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1.5 mb-4">
    {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
    >
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);