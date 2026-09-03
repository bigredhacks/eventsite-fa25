import { useMemo, useState } from "react";
import DynamicForm from "@/components/registration/DynamicForm";
import { hackathonRegistrationFormConfig } from "@/lib/formConfig";
import RegistrationLayout from "@/components/layouts/RegistrationLayout";
import { useToast } from "@/components/Toast/ToastProvider";

const STORAGE_KEY = "brh_profile";

function buildInitialValues(): Record<string, any> {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      first_name: saved.firstName || "",
      last_name: saved.lastName || "",
      email: saved.email || "",
      phone_number: saved.phoneNumber || "",
      age: saved.age || "",
      school: saved.university || "",
      major: saved.major || "",
      gender: saved.gender || "",
      shirt_size: saved.shirtSize || "",
      dietary_restrictions: saved.dietaryRestrictions || [],
    };
  } catch {
    return {};
  }
}

export default function ApplyPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialValues = useMemo(() => buildInitialValues(), []);

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
      showToast("Failed to submit application. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <RegistrationLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="max-w-md mx-auto text-center bg-red7 p-10 rounded-2xl shadow-sm">
            <p className="text-5xl font-jersey10 text-red5 mb-4">BigRed<span className="text-purple9">//</span>Hacks</p>
            <h2 className="text-2xl font-poppins font-bold text-red6 mb-3">
              Application Submitted!
            </h2>
            <p className="font-poppins text-gray-600 text-sm leading-relaxed">
              Thanks for applying to Big Red Hacks 2026. We'll review your application and reach out soon — keep an eye on your inbox.
            </p>
          </div>
        </div>
      </RegistrationLayout>
    );
  }

  return (
    <RegistrationLayout className="bg-[#fffdfa]">
      <div className="py-10 px-4">
        <DynamicForm
          config={hackathonRegistrationFormConfig}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          initialValues={initialValues}
        />
      </div>
    </RegistrationLayout>
  );
}
