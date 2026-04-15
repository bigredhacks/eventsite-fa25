"use client";

import { useState } from "react";
import type { DropdownFormField } from "@/lib/formConfig";

interface DropdownProps {
  field: DropdownFormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function Dropdown({ field, value, onChange, error }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 items-start bg-white px-6 py-6 rounded-lg w-full">
      <div className="flex gap-1 items-center w-full">
        <label htmlFor={field.id} className="text-sm font-normal text-black leading-[1.5]">
          {field.label}
        </label>
        {field.required && (
          <span className="text-[#fe1736] text-[15px] leading-[normal]">*</span>
        )}
      </div>
      {field.description && (
        <p className="text-xs text-gray-600">{field.description}</p>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-[9]" onMouseDown={() => setIsOpen(false)} />
      )}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 w-full flex items-center justify-between text-sm font-poppins focus:outline-none focus:border-red5 transition-colors"
        >
          <span className={value ? "text-gray-800" : "text-gray-400"}>
            {value || "Select"}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {field.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm font-poppins text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
