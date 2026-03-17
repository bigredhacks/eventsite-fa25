import { useState } from "react";
import brhLogo from "@/assets/brh_logo_red_text.png";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fields = [
    { id: "firstName", label: "First Name", type: "text", placeholder: "First Name" },
    { id: "lastName", label: "Last Name", type: "text", placeholder: "Last Name" },
    { id: "email", label: "Email", type: "email", placeholder: "Email" },
    { id: "password", label: "Password", type: "password", placeholder: "Password" },
    { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm Password" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red1 to-red3 flex items-center justify-center p-4">
      <div className="bg-white3 rounded-2xl p-8 w-full max-w-[450px] shadow-xl flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <img
            src={brhLogo}
            alt="Big Red Hacks Logo"
            className="w-40 mb-2"
          />
          <h1 className="text-brown1 text-xl font-medium font-poppins">Create New Account</h1>
        </div>

        <div className="w-full space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="px-4 font-poppins">
              <label htmlFor={field.id} className="block text-sm font-medium text-brown3 mb-1">
                {field.label} <span className="text-red4">*</span>
              </label>
              <input
                id={field.id}
                type={field.type}
                required
                className="text-brown3 w-full px-4 py-3 border border-brown3 rounded-lg focus:ring-2 focus:ring-red4 focus:border-transparent outline-none transition"
                placeholder={field.placeholder}
                value={(formData as Record<string, string>)[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="w-full px-4 mt-6">
          <button className="w-full bg-red4 text-white py-3 rounded-lg font-bold font-poppins hover:bg-red3 transition shadow-md">
            Create Account
          </button>
        </div>

        <p className="mt-4 text-sm text-brown3 font-poppins">
          Already have an account? <a href="/login" className="underline hover:text-red4 transition">Login</a>
        </p>
      </div>
    </div>
  );
}
