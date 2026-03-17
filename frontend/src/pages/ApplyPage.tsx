import { useState } from "react";
import DynamicForm from "@/components/registration/DynamicForm";
import { hackathonRegistrationFormConfig } from "@/lib/formConfig";
import RegistrationLayout from "@/components/layouts/RegistrationLayout";

export default function ApplyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (data: Record<string, any>) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <RegistrationLayout className="bg-[#fffdfa]">
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600">
              Thank you for applying. We'll review your application and get back to you soon.
            </p>
          </div>
        </div>
      </RegistrationLayout>
    );
  }

  return (
    <RegistrationLayout className="bg-[#fffdfa]">
      <div className="py-12 px-4">
        <DynamicForm
          config={hackathonRegistrationFormConfig}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </RegistrationLayout>
  );
}