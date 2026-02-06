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

export interface DropdownFormField extends BaseFormField {
  type: "dropdown";
  options: string[];
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
      id: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "your.email@cornell.edu",
    },
    {
      id: "full_name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Jane Smith",
    },
    {
      id: "university",
      label: "University",
      type: "dropdown",
      required: true,
      options: [
        "Cornell University",
        "MIT",
        "Stanford University",
        "Harvard University",
        "UC Berkeley",
        "Carnegie Mellon University",
        "Other",
      ],
    },
    {
      id: "major",
      label: "Major / Field of Study",
      type: "text",
      required: false,
      placeholder: "Computer Science",
    },
    {
      id: "year",
      label: "Year of Study",
      type: "radio",
      required: true,
      options: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Other"],
    },
    {
      id: "dietary_restrictions",
      label: "Dietary Restrictions",
      type: "checkboxGroup",
      required: false,
      options: [
        "Vegetarian",
        "Vegan",
        "Gluten-Free",
        "Dairy-Free",
        "Nut Allergy",
        "Halal",
        "Kosher",
        "None",
      ],
    },
    {
      id: "resume",
      label: "Upload Resume (Optional)",
      type: "file",
      required: false,
      accept: ".pdf,.doc,.docx",
      multiple: false,
    },
    {
      id: "workshop_interests",
      label: "Which workshops are you interested in?",
      type: "multipleChoiceGrid",
      required: false,
      rows: [
        "Introduction to React",
        "Machine Learning Basics",
        "Mobile Development with Flutter",
        "Web3 and Blockchain",
      ],
      columns: ["Not Interested", "Maybe", "Very Interested"],
    },
    {
      id: "event_preferences",
      label: "Rate your interest in the following events",
      type: "preferenceGrid",
      required: false,
      description: "Rate from 1 (Not Interested) to 5 (Very Interested)",
      rows: [
        "Opening Ceremony",
        "Tech Talks",
        "Career Fair",
        "Team Building Activities",
        "Closing Ceremony",
      ],
      columns: ["1", "2", "3", "4", "5"],
    },
    {
      id: "terms",
      label: "Terms and Conditions",
      type: "checkbox",
      required: true,
      checkboxText: "I agree to the",
      linkText: "terms and conditions",
      linkUrl: "https://example.com/terms",
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
