// Form field types
export type FormFieldType =
  | "text"
  | "email"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "checkboxGroup"
  | "file"
  | "multipleChoiceGrid"
  | "preferenceGrid";

export interface BaseFormField {
  id: string;
  label: string;
  required: boolean;
  type: FormFieldType;
  description?: string;
}

export interface TextFormField extends BaseFormField {
  type: "text";
  placeholder?: string;
}

export interface EmailFormField extends BaseFormField {
  type: "email";
  placeholder?: string;
}

export interface CsvOptionsSource {
  type: "csv";
  url: string;
}

export interface DropdownFormField extends BaseFormField {
  type: "dropdown";
  options: string[];
  searchable?: boolean;
  allowCustomValue?: boolean;
  optionsSource?: CsvOptionsSource;
}

export interface RadioFormField extends BaseFormField {
  type: "radio";
  options: string[];
}

export interface CheckboxFormField extends BaseFormField {
  type: "checkbox";
  checkboxText: string;
  linkUrl?: string;
  linkText?: string;
}

export interface CheckboxGroupFormField extends BaseFormField {
  type: "checkboxGroup";
  options: string[];
}

export interface FileFormField extends BaseFormField {
  type: "file";
  accept?: string;
  multiple?: boolean;
}

export interface MultipleChoiceGridFormField extends BaseFormField {
  type: "multipleChoiceGrid";
  rows: string[];
  columns: string[];
}

export interface PreferenceGridFormField extends BaseFormField {
  type: "preferenceGrid";
  rows: string[];
  columns: string[];
}

export type FormField =
  | TextFormField
  | EmailFormField
  | DropdownFormField
  | RadioFormField
  | CheckboxFormField
  | CheckboxGroupFormField
  | FileFormField
  | MultipleChoiceGridFormField
  | PreferenceGridFormField;

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
}

export const teamMatchingFormConfig: FormConfig = {
  title: "BigRed//Hacks Fall 2025 Team Matching",
  description: "Help us match you with the perfect team!",
  fields: [
    {
      id: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "your.email@example.com",
    },
    {
      id: "full_name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "John Doe",
    },
    {
      id: "technical_skills",
      label: "How would you define your technical skills and experience?",
      type: "multipleChoiceGrid",
      required: true,
      rows: ["Frontend", "Backend", "Design", "Hardware"],
      columns: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      id: "preferred_role",
      label: "What is your preferred role in a team?",
      type: "preferenceGrid",
      required: true,
      description: "Rate each role from 1 (Least Preferred) to 5 (Most Preferred)",
      rows: ["Frontend", "Backend", "Design", "Hardware", "Any"],
      columns: ["1", "2", "3", "4", "5"],
    },
    {
      id: "backend_skills",
      label: "Backend skills",
      type: "text",
      required: true,
      placeholder: "Express, Flask, Django, Spring Boot, Firebase",
      description: "Separate skills with commas",
    },
    {
      id: "frontend_skills",
      label: "Frontend skills",
      type: "text",
      required: true,
      placeholder: "React, Next.JS, Tailwind, Angular",
      description: "Separate skills with commas",
    },
    {
      id: "design_skills",
      label: "Design skills",
      type: "text",
      required: true,
      placeholder: "Figma, Canva, Adobe, Blender, Unity",
      description: "Separate skills with commas",
    },
    {
      id: "first_time_hacker",
      label: "Are you a first time hacker?",
      type: "radio",
      required: true,
      options: ["Yes", "No"],
    },
  ],
};

export const hackathonRegistrationFormConfig: FormConfig = {
  title: "BigRed//Hacks Fall 2025 Registration",
  description: "Complete your registration for the hackathon",
  fields: [
    {
      id: "first_name",
      label: "First Name",
      type: "text",
      required: true,
      placeholder: "Jane",
    },
    {
      id: "last_name",
      label: "Last Name",
      type: "text",
      required: true,
      placeholder: "Smith",
    },
    {
      id: "age",
      label: "Age",
      type: "text",
      required: true,
      placeholder: "18",
    },
    {
      id: "phone_number",
      label: "Phone Number",
      type: "text",
      required: true,
      placeholder: "(123) 456-7890",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "your.email@cornell.edu",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      type: "text",
      required: false,
      placeholder: "https://www.linkedin.com/in/your-profile",
    },
    {
      id: "school",
      label: "School",
      type: "dropdown",
      required: true,
      searchable: true,
      allowCustomValue: true,
      options: [],
      optionsSource: {
        type: "csv",
        url: "/schools.csv",
      },
    },
    {
      id: "country",
      label: "Country of Residence",
      type: "dropdown",
      required: true,
      searchable: true,
      options: [],
      optionsSource: {
        type: "csv",
        url: "/countries.csv",
      },
    },
    {
      id: "level_of_study",
      label: "Level of Study",
      type: "dropdown",
      required: true,
      options: [
        "Less than Secondary / High School",
        "Secondary / High School",
        "Undergraduate University (2 year - community college or similar)",
        "Undergraduate University (3+ year)",
        "Graduate University (Masters, Professional, Doctoral, etc)",
        "Code School / Bootcamp",
        "Other Vocational / Trade Program or Apprenticeship",
        "Post Doctorate",
        "Other",
        "I'm not currently a student",
        "Prefer not to answer",
      ],
    },
    {
      id: "major",
      label: "Major",
      type: "text",
      required: false,
      placeholder: "Computer Science",
    },
    {
      id: "dietary_restrictions",
      label: "Dietary Restrictions",
      type: "checkboxGroup",
      required: false,
      options: [
        "Vegetarian",
        "Vegan",
        "Celiac Disease",
        "Allergies",
        "Kosher",
        "Halal",
      ],
    },
    {
      id: "mlh_code_of_conduct",
      label: "MLH Code of Conduct",
      type: "checkbox",
      required: true,
      checkboxText: "I have read and agree to the",
      linkText: "MLH Code of Conduct.",
      linkUrl: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
    },
    {
      id: "mlh_data_sharing_consent",
      label: "MLH Data Sharing and Terms",
      type: "checkbox",
      required: true,
      checkboxText:
        "I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy (https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md). I further agree to the terms of both the MLH Contest Terms and Conditions (https://github.com/MLH/mlh-policies/blob/main/contest-terms.md) and the MLH Privacy Policy (https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md).",
    },
    {
      id: "mlh_emails_opt_in",
      label: "MLH Emails",
      type: "checkbox",
      required: false,
      checkboxText:
        "I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.",
    },
  ],
};

export const workshopFeedbackFormConfig: FormConfig = {
  title: "Workshop Feedback Form",
  description: "Help us improve our workshops by providing your feedback",
  fields: [
    {
      id: "email",
      label: "Email (Optional)",
      type: "email",
      required: false,
      placeholder: "feedback@example.com",
    },
    {
      id: "workshop_name",
      label: "Which workshop did you attend?",
      type: "dropdown",
      required: true,
      options: [
        "Introduction to React",
        "Machine Learning Basics",
        "Mobile Development with Flutter",
        "Web3 and Blockchain",
        "Database Design",
        "UI/UX Design Principles",
      ],
    },
    {
      id: "rating",
      label: "Overall Rating",
      type: "radio",
      required: true,
      options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
    },
    {
      id: "content_quality",
      label: "Please rate the following aspects of the workshop",
      type: "multipleChoiceGrid",
      required: true,
      rows: [
        "Content Quality",
        "Instructor Knowledge",
        "Pace of Workshop",
        "Hands-on Activities",
      ],
      columns: ["Poor", "Fair", "Good", "Excellent"],
    },
    {
      id: "topics_interest",
      label: "Rate your interest in future workshop topics",
      type: "preferenceGrid",
      required: false,
      description: "Rate from 1 (Not Interested) to 5 (Very Interested)",
      rows: [
        "Advanced React Patterns",
        "DevOps and CI/CD",
        "Cybersecurity Basics",
        "Cloud Computing (AWS/Azure)",
        "Data Visualization",
      ],
      columns: ["1", "2", "3", "4", "5"],
    },
    {
      id: "improvements",
      label: "What could we improve?",
      type: "text",
      required: false,
      placeholder: "Share your suggestions...",
    },
    {
      id: "would_recommend",
      label: "Would you recommend this workshop to others?",
      type: "radio",
      required: true,
      options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"],
    },
    {
      id: "contact_preferences",
      label: "How would you like to be contacted about future events?",
      type: "checkboxGroup",
      required: false,
      options: ["Email", "Discord", "Slack", "SMS", "Don't contact me"],
    },
    {
      id: "materials",
      label: "Upload any workshop materials or notes (Optional)",
      type: "file",
      required: false,
      accept: ".pdf,.txt,.md,.zip",
      multiple: true,
    },
    {
      id: "newsletter",
      label: "Newsletter Subscription",
      type: "checkbox",
      required: false,
      checkboxText: "I want to subscribe to the newsletter for future events",
    },
  ],
};
