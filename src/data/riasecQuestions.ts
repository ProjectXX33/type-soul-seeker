
export const riasecQuestions = [
  // Realistic (R)
  { id: 1, text: "I enjoy working with tools and machines", type: "R" },
  { id: 2, text: "I like to build things with my hands", type: "R" },
  { id: 3, text: "I prefer physical, outdoor work", type: "R" },
  { id: 4, text: "I enjoy working on mechanical problems", type: "R" },
  { id: 5, text: "I like to fix electrical things", type: "R" },
  
  // Investigative (I)
  { id: 6, text: "I enjoy solving math problems", type: "I" },
  { id: 7, text: "I like science", type: "I" },
  { id: 8, text: "I enjoy trying to understand how things work", type: "I" },
  { id: 9, text: "I enjoy analyzing data and facts", type: "I" },
  { id: 10, text: "I like to investigate why something happens", type: "I" },
  
  // Artistic (A)
  { id: 11, text: "I enjoy creative writing", type: "A" },
  { id: 12, text: "I like to play musical instruments", type: "A" },
  { id: 13, text: "I enjoy drawing or painting", type: "A" },
  { id: 14, text: "I like acting in plays", type: "A" },
  { id: 15, text: "I enjoy creative activities", type: "A" },
  
  // Social (S)
  { id: 16, text: "I enjoy working with others", type: "S" },
  { id: 17, text: "I like teaching people how to do things", type: "S" },
  { id: 18, text: "I enjoy helping others with their problems", type: "S" },
  { id: 19, text: "I like to care for people who are sick or elderly", type: "S" },
  { id: 20, text: "I enjoy talking with people about personal issues", type: "S" },
  
  // Enterprising (E)
  { id: 21, text: "I enjoy selling things", type: "E" },
  { id: 22, text: "I like to lead group activities", type: "E" },
  { id: 23, text: "I enjoy persuading others to my point of view", type: "E" },
  { id: 24, text: "I like to manage the work of others", type: "E" },
  { id: 25, text: "I enjoy competitive activities", type: "E" },
  
  // Conventional (C)
  { id: 26, text: "I like to organize things", type: "C" },
  { id: 27, text: "I enjoy working with numbers", type: "C" },
  { id: 28, text: "I like to follow clearly defined procedures", type: "C" },
  { id: 29, text: "I enjoy keeping detailed records", type: "C" },
  { id: 30, text: "I like activities that require attention to detail", type: "C" },
];

export const riasecTypes = {
  R: {
    name: "Realistic",
    description: "You are practical, physical, hands-on, and enjoy working with tools, machines, or nature. You prefer concrete problems over abstract ones.",
    careers: ["Engineer", "Mechanic", "Carpenter", "Electrician", "Pilot", "Farmer", "Chef", "Surveyor", "Fitness Trainer"]
  },
  I: {
    name: "Investigative",
    description: "You are analytical, intellectual, scientific, and enjoy research, mathematical or scientific activities. You like solving abstract problems.",
    careers: ["Scientist", "Researcher", "Doctor", "Engineer", "Programmer", "Mathematician", "Economist", "Psychologist", "Detective"]
  },
  A: {
    name: "Artistic",
    description: "You are creative, original, independent, and enjoy creative activities like art, drama, crafts, dance, music, or creative writing.",
    careers: ["Artist", "Writer", "Musician", "Designer", "Actor", "Architect", "Photographer", "Interior Designer", "Creative Director"]
  },
  S: {
    name: "Social",
    description: "You are helpful, friendly, and trustworthy. You enjoy working with and helping people, and you're concerned about social issues.",
    careers: ["Teacher", "Counselor", "Social Worker", "Nurse", "Therapist", "HR Specialist", "Coach", "Community Organizer", "Healthcare Worker"]
  },
  E: {
    name: "Enterprising",
    description: "You are energetic, ambitious, adventurous, and enjoy leading, persuading, and performing. You like influencing others and taking risks.",
    careers: ["Manager", "Salesperson", "Entrepreneur", "Lawyer", "Politician", "Real Estate Agent", "Marketing Executive", "Business Developer"]
  },
  C: {
    name: "Conventional",
    description: "You are organized, practical, and detail-oriented. You enjoy working with data, numbers, and carrying out tasks in detail or following through on instructions.",
    careers: ["Accountant", "Banker", "Administrative Assistant", "Bookkeeper", "Financial Analyst", "Auditor", "Insurance Agent", "Office Manager"]
  }
};
