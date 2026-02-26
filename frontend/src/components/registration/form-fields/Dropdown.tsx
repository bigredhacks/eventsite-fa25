import { useState, useRef, useEffect, useMemo } from "react";
import type { DropdownFormField } from "@/lib/formConfig";
import { loadCsvOptions } from "@/lib/loadCsvOptions";

interface DropdownProps {
  field: DropdownFormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function Dropdown({ field, value, onChange, error }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedOptions, setLoadedOptions] = useState<string[] | null>(null);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!field.optionsSource || field.optionsSource.type !== "csv") {
      setLoadedOptions(null);
      setIsLoadingOptions(false);
      setOptionsError(null);
      return;
    }

    let isActive = true;
    setIsLoadingOptions(true);
    setOptionsError(null);

    loadCsvOptions(field.optionsSource.url)
      .then((options) => {
        if (isActive) {
          setLoadedOptions(options);
        }
      })
      .catch(() => {
        if (isActive) {
          setLoadedOptions([]);
          setOptionsError("Unable to load options");
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingOptions(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [field.optionsSource]);

  const availableOptions = useMemo(() => {
    if (loadedOptions === null) {
      return field.options;
    }

    return [...new Set([...loadedOptions, ...field.options])];
  }, [field.options, loadedOptions]);

  const filteredOptions = useMemo(() => {
    if (!field.searchable) {
      return availableOptions;
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return availableOptions;
    }

    return availableOptions.filter((option) => option.toLowerCase().includes(normalizedQuery));
  }, [availableOptions, field.searchable, searchQuery]);

  const customValue = useMemo(() => {
    if (!field.allowCustomValue || !field.searchable) {
      return null;
    }

    const candidate = searchQuery.trim();
    if (!candidate) {
      return null;
    }

    const hasExactMatch = availableOptions.some(
      (option) => option.toLowerCase() === candidate.toLowerCase()
    );
    if (hasExactMatch) {
      return null;
    }

    return candidate;
  }, [availableOptions, field.allowCustomValue, field.searchable, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="relative w-full max-w-md" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border border-[#636363] rounded-lg px-3 py-2.5 w-full flex items-center justify-between text-sm"
        >
          <span className={`truncate ${value ? "text-black" : "text-[#d6d3cf]"}`}>
            {value || "Select"}
          </span>
          <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[12.8px] h-[8px]">
            <path d="M1 1L6.5 6.5L12 1" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[#636363] rounded-lg shadow-lg overflow-hidden">
            {field.searchable && (
              <div className="bg-white p-2 border-b border-[#e5e5e5]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full border border-[#d6d3cf] rounded-md px-2 py-1.5 text-sm text-black placeholder:text-[#9b9b9b] focus:outline-none"
                />
              </div>
            )}

            {isLoadingOptions && (
              <p className="px-3 py-2 text-sm text-gray-600">Loading options...</p>
            )}

            {!isLoadingOptions && optionsError && (
              <p className="px-3 py-2 text-sm text-red-600">{optionsError}</p>
            )}

            {!isLoadingOptions && !optionsError && !customValue && filteredOptions.length === 0 && (
              <p className="px-3 py-2 text-sm text-gray-600">No matches found</p>
            )}

            {!isLoadingOptions && !optionsError && (
              <div className="max-h-48 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                {customValue && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange(customValue);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 font-medium"
                  >
                    Use "{customValue}"
                  </button>
                )}
                {filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
