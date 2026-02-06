import { useState } from "react";
import DynamicForm from "@/components/registration/DynamicForm";
import { hackathonRegistrationFormConfig, teamMatchingFormConfig} from "@/lib/formConfig";

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
        throw new Error(err.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            BigRed<span className="text-red-600">//</span>Hacks
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-600">
            Thank you for applying. We'll review your application and get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">
        {/*ADD THE SIDE BAR HERE PLS TY */}
        <div className="flex-1 py-12 px-4">
          <DynamicForm
            config={teamMatchingFormConfig}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
