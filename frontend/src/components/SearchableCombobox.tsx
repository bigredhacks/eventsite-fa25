import { useState, useRef, useEffect, useMemo } from "react";
import { loadCsvOptions } from "@/lib/loadCsvOptions";

interface SearchableComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  csvUrl?: string;
  staticOptions?: string[];
  className?: string;
  allowCustomValue?: boolean;
}

export default function SearchableCombobox({
  value,
  onChange,
  placeholder = "Search…",
  csvUrl,
  staticOptions = [],
  className = "",
  allowCustomValue = true,
}: SearchableComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState(value);
  const [query, setQuery] = useState("");
  const [csvOptions, setCsvOptions] = useState<string[]>([]);
  const focused = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load CSV options once (cached by loadCsvOptions)
  useEffect(() => {
    if (!csvUrl) return;
    loadCsvOptions(csvUrl).then(setCsvOptions).catch(() => {});
  }, [csvUrl]);

  const allOptions = useMemo(
    () => [...new Set([...csvOptions, ...staticOptions])],
    [csvOptions, staticOptions]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return allOptions.slice(0, 100); // cap initial list
    const q = query.toLowerCase();
    return allOptions.filter((o) => o.toLowerCase().includes(q)).slice(0, 60);
  }, [allOptions, query]);

  const handleInputChange = (text: string) => {
    setInputText(text);
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(text), 200);
  };

  const select = (option: string) => {
    onChange(option);
    setInputText(option);
    setQuery("");
    setOpen(false);
  };

  const handleFocus = () => {
    focused.current = true;
    // Sync display text from current committed value on focus
    setInputText(value);
    setOpen(true);
  };

  const handleBlur = () => {
    focused.current = false;
    if (allowCustomValue && inputText.trim()) {
      onChange(inputText.trim());
    } else if (!allowCustomValue) {
      setInputText(value);
    }
    setOpen(false);
  };

  // When not focused, always show the committed external value
  const displayValue = focused.current ? inputText : value;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[9]"
          onMouseDown={() => {
            setOpen(false);
            if (allowCustomValue && inputText.trim()) onChange(inputText.trim());
            else setInputText(value);
          }}
        />
      )}
      <div className={`relative ${className}`}>
        <input
          type="text"
          value={displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red5 transition-colors font-poppins"
        />
        {open && filtered.length > 0 && (
          <div className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); select(opt); }}
                className={`w-full px-3 py-2 text-left text-sm font-poppins text-gray-800 hover:bg-red7 transition-colors ${
                  opt === value ? "bg-red7 font-medium text-red6" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
