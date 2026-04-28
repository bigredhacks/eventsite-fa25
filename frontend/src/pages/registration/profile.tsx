import { useState, useEffect } from "react";
import RegistrationLayout from "../../components/layouts/RegistrationLayout";
import { supabase } from "../../config/supabase";

const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => String(i + 16));

const UNIVERSITY_OPTIONS = [
  "Cornell University",
  "Other",
];

const MAJOR_OPTIONS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Information Science",
  "Mathematics",
  "Physics",
  "Business",
  "Other",
];

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say", "Other"];

const DIETARY_OPTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Nut Allergy",
  "Other",
];

const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
  graduationYear: string;
  university: string;
  major: string;
  gender: string;
  dietaryRestrictions: string;
  shirtSize: string;
}


const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-gray-700 font-medium">
      {label}
      {required && <span className="text-red5 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);


const Chevron = () => (
  <svg
    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const inputCls = "w-full bg-white border border-red2 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red5 transition-colors";
const selectCls = "w-full bg-white border border-red2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red5 transition-colors appearance-none cursor-pointer pr-8";

const Profile = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: "",
    graduationYear: "",
    university: "",
    major: "",
    gender: "",
    dietaryRestrictions: "",
    shirtSize: "",
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load existing profile on mount
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) return;
      const profile = await res.json();
      setForm({
        firstName: profile.first_name ?? "",
        lastName: profile.last_name ?? "",
        email: profile.email ?? session.user.email ?? "",
        phoneNumber: profile.phone_number ?? "",
        age: profile.age != null ? String(profile.age) : "",
        graduationYear: profile.graduation_year != null ? String(profile.graduation_year) : "",
        university: profile.university ?? "",
        major: profile.major ?? "",
        gender: profile.gender ?? "",
        dietaryRestrictions: profile.dietary_restrictions ?? "",
        shirtSize: profile.shirt_size ?? "",
      });
    });
  }, []);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
    setSaveError(null);
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    if (digits.length > 0) formatted = `(${digits.slice(0, 3)}`;
    if (digits.length >= 4) formatted += `) ${digits.slice(3, 6)}`;
    if (digits.length >= 7) formatted += `-${digits.slice(6, 10)}`;
    handleChange("phoneNumber", formatted);
  };

  const handleSave = async () => {
    setSaveError(null);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaveError("Not authenticated"); return; }

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phoneNumber,
        age: form.age ? Number(form.age) : undefined,
        graduation_year: form.graduationYear ? Number(form.graduationYear) : undefined,
        university: form.university,
        major: form.major,
        gender: form.gender,
        dietary_restrictions: form.dietaryRestrictions,
        shirt_size: form.shirtSize,
      }),
    });

    if (!res.ok) {
      setSaveError("Failed to save. Please try again.");
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <RegistrationLayout>
      <div className="h-full">
        <h1 className="text-3xl font-bold text-red5 mb-6">Profile</h1>

        <div className="bg-[#fbeae9] rounded-2xl p-8 max-w-3xl">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">

            <Field label="First Name" required>
              <input
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Last Name" required>
              <input type="text" placeholder="Last Name" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={inputCls}/>
            </Field>

            <Field label="Email" required>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={`${inputCls} flex-1`}/>
                <button
                  onClick={() => setEmailVerified(true)}
                  className={`px-3 py-2 rounded-lg text-white text-sm font-semibold whitespace-nowrap font-poppins transition-colors ${
                    emailVerified
                      ? "bg-green-500"
                      : "bg-red5 hover:bg-red-700"
                  }`}
                >
                  {emailVerified ? "✓ Verified" : "Verify Email"}
                </button>
              </div>
            </Field>

            <Field label="Phone Number" required>
              <input type="tel" placeholder="(__) ___-____" value={form.phoneNumber} onChange={(e) => handlePhoneChange(e.target.value)} className={inputCls}/>
            </Field>

            <Field label="Age" required>
              <div className="relative">
                <select
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className={`${selectCls} ${!form.age ? "text-gray-400" : "text-gray-800"}`}
                >
                  <option value="" disabled>Select your Age</option>
                  {AGE_OPTIONS.map((age) => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>

            <Field label="Graduation Year" required>
              <input type="number" placeholder="Graduation Year"  value={form.graduationYear} onChange={(e) => handleChange("graduationYear", e.target.value)} className={inputCls} min={2020} max={2035}/>
            </Field>

            <Field label="University" required>
              <div className="relative">
                <select
                  value={form.university}
                  onChange={(e) => handleChange("university", e.target.value)}
                  className={`${selectCls} ${!form.university ? "text-gray-400" : "text-gray-800"}`}
                >
                  <option value="" disabled>University</option>
                  {UNIVERSITY_OPTIONS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>

            <Field label="Major/Field of Study">
              <div className="relative">
                <select
                  value={form.major}
                  onChange={(e) => handleChange("major", e.target.value)}
                  className={`${selectCls} ${!form.major ? "text-gray-400" : "text-gray-800"}`}
                >
                  <option value="" disabled>Major/Field of Study</option>
                  {MAJOR_OPTIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>

            <Field label="Gender">
              <div className="relative">
                <select
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={`${selectCls} ${!form.gender ? "text-gray-400" : "text-gray-800"}`}
                >
                  <option value="" disabled>Gender</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>

            <Field label="Dietary Restrictions/Allergies">
              <div className="relative">
                <select
                  value={form.dietaryRestrictions}
                  onChange={(e) => handleChange("dietaryRestrictions", e.target.value)}
                  className={`${selectCls} ${!form.dietaryRestrictions ? "text-gray-400" : "text-gray-800"}`}
                >
                  <option value="" disabled>Dietary Restrictions/Allergies</option>
                  {DIETARY_OPTIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>

          </div>

          <div className="mt-5">
            <Field label="Shirt Size (US sizing)">
              <div className="flex items-center gap-5 mt-0.5">
                {SHIRT_SIZES.map((size) => (
                  <label key={size} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="shirtSize" value={size} checked={form.shirtSize === size} onChange={() => handleChange("shirtSize", size)} className="accent-red5 w-4 h-4 cursor-pointer"/>
                    <span
                      className={`text-sm font-poppins transition-colors ${
                        form.shirtSize === size
                          ? "text-red5 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="flex flex-col items-center gap-2 mt-8">
            {saveError && (
              <p className="text-red-600 text-sm font-medium">{saveError}</p>
            )}
            <button
              onClick={handleSave}
              className={`w-72 py-3 rounded-lg text-white font-semibold text-base font-poppins transition-all duration-200 active:scale-95 ${
                saved ? "bg-green-500" : "bg-red5 hover:bg-red-700"
              }`}
            >
              {saved ? "Changes Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default Profile;