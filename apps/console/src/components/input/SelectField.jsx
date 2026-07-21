import React from "react";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error,
  className = "",
  selectClassName = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-white/80 font-[500px] text-[14px] ml-1">
          {label} {required && <span className="text-[#EFFC76]">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`border-[1px] border-white/20 py-2.5 px-4 rounded-[6px] bg-black/40 text-white w-full outline-none focus:border-[#EFFC76] ${
          error ? "border-red-500" : ""
        } ${disabled ? "bg-gray-800 cursor-not-allowed opacity-50" : ""} ${selectClassName}`}
        {...props}
      >
        <option value="" className="bg-[#0A0A0A] text-white">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#0A0A0A] text-white">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
