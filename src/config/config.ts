interface Track {
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const tracks: Track[] = [
  {
    title: "BIG RED",
    description:
      "The main track judged on technical skill, design, creativity, impact, and theme.",
  },
  {
    title: "HARDWARE",
    description:
      "Optional track focused on hardware use and technical implementation.",
  },
  {
    title: "SOFTWARE",
    description:
      "Optional track focused on software development and technical depth.",
  },
  {
    title: "DESIGN",
    description:
      "Optional track evaluating design quality and visual presentation.",
  },
  {
    title: "BEGINNER",
    description:
      "For first-time hackers, rewarding the best overall beginner project.",
  },
  {
    title: "PEOPLE'S CHOICE",
    description: "Voted on by participants for favorite project overall.",
  },
];

export const faqData: FAQItem[] = [
  {
    question: "What's a hackathon?",
    answer:
      "A hackathon is a weekend-long event where hundreds of students from around the globe come together to attend seminars and work on creative software and hardware projects based on a chosen theme.",
  },
  {
    question: "How can I ask a question?",
    answer:
      "You can ask a question by emailing bigredhacks@cornell.edu or by filling in the form on the Contact Us page.",
  },
  {
    question: "Who can participate in the hackathon?",
    answer:
      "We are open to everyone who is above 18 years old and is currently enrolled in a university.",
  },
  {
    question: "How can I sign up?",
    answer: "You can sign up through the form on our registration page!",
  },
  // {
  //     question: "Can I pick my team?",
  //     answer: "Yes, you can enter the competition with a team of at most 4 members."
  // },
  // {
  //     question: "Can I sign up without a team?",
  //     answer: "Yes, you can sign up without a team! Before and during the event, we will provide opportunities for you to meet people with matching interests to build a project with."
  // },
  {
    question: "Where and when is the hackathon?",
    answer:
      "This fall, hackathon will take place October 4th-6th at the Physical Sciences Building on Cornell University's Ithaca Campus.",
  },
  {
    question: "Will food be provided?",
    answer:
      "Yes, breakfast, lunch, and dinner will be provided throughout the whole event!",
  },
  {
    question: "Are there overnight accommodations?",
    answer: "Yes, overnight accommodations will be provided at the event site.",
  },
  // {
  //     question: "What is a Hackathon?",
  //     answer: "The BigRed//Hacks Hackathon is a weekend-long event where students from Cornell and beyond come together to develop projects. They have the opportunity to learn from workshops, use provided hardware and materials, and collaborate within a team to build a product with the power of their imagination. It's a fun experience for anyone that wants to create!"
  // },
  // {
  //     question: "When will the next Hackathon be?",
  //     answer: "The next BigRed//Hacks hackathon will take place from September 19th to 21st. Stay tuned and hyped for more information!"
  // },
  // {
  //     question: "What are the roles of each sub-team?",
  //     answer: "You can find details about our subteams on the \"Teams page\" <link>!"
  // },
  // {
  //     question: "How can I get involved?",
  //     answer: "We will be recruiting new members for our organizing team in Fall 2025 following our next Hackathon. If you want to participate in our Hackathon, follow our social media pages and we'll release more information there!"
  // },
  // {
  //     question: "I have a concern or question that is not answered in your FAQs, what should I do?",
  //     answer: "You can contact us at our email bigredhacks@cornell.edu, Instagram @bigredhacks, or fill in the form on the Contact Us page!"
  // }
];
