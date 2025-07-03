import React from "react";

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  ...props
}) {
  return (
    <div>
      {label && <label className='font-medium block'>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        {...props}
      />
    </div>
  );
}

export default Input;
