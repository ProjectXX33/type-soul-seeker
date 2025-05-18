
export const gardnerQuestions = [
  // Linguistic Intelligence
  { id: 1, text: "I enjoy reading books and articles", type: "linguistic" },
  { id: 2, text: "I find it easy to explain complex concepts to others", type: "linguistic" },
  { id: 3, text: "I like to write stories or keep a journal", type: "linguistic" },
  { id: 4, text: "I am good at word games like Scrabble or crossword puzzles", type: "linguistic" },
  { id: 5, text: "I enjoy learning new words and their meanings", type: "linguistic" },
  
  // Logical-Mathematical Intelligence
  { id: 6, text: "I enjoy solving math problems or puzzles", type: "logical" },
  { id: 7, text: "I can easily work with numbers in my head", type: "logical" },
  { id: 8, text: "I like to analyze situations and look for logical explanations", type: "logical" },
  { id: 9, text: "I enjoy creating systems or strategies", type: "logical" },
  { id: 10, text: "I can identify patterns easily", type: "logical" },
  
  // Visual-Spatial Intelligence
  { id: 11, text: "I can easily visualize objects, buildings, or scenarios", type: "spatial" },
  { id: 12, text: "I enjoy activities like drawing, painting, or photography", type: "spatial" },
  { id: 13, text: "I have a good sense of direction", type: "spatial" },
  { id: 14, text: "I enjoy putting puzzles together", type: "spatial" },
  { id: 15, text: "I can easily read maps and charts", type: "spatial" },
  
  // Musical Intelligence
  { id: 16, text: "I can easily remember melodies and songs", type: "musical" },
  { id: 17, text: "I notice different musical elements like rhythm and tone", type: "musical" },
  { id: 18, text: "I play (or would like to play) a musical instrument", type: "musical" },
  { id: 19, text: "I find myself humming or singing often", type: "musical" },
  { id: 20, text: "I can tell when a note is off-key", type: "musical" },
  
  // Bodily-Kinesthetic Intelligence
  { id: 21, text: "I enjoy physical activities and sports", type: "kinesthetic" },
  { id: 22, text: "I learn best by doing rather than reading or watching", type: "kinesthetic" },
  { id: 23, text: "I have good coordination and balance", type: "kinesthetic" },
  { id: 24, text: "I enjoy working with my hands (crafts, building, etc.)", type: "kinesthetic" },
  { id: 25, text: "I use hand gestures and body movements when talking", type: "kinesthetic" },
  
  // Interpersonal Intelligence
  { id: 26, text: "I enjoy meeting and talking with different people", type: "interpersonal" },
  { id: 27, text: "I'm good at understanding other people's feelings", type: "interpersonal" },
  { id: 28, text: "I work well in groups or teams", type: "interpersonal" },
  { id: 29, text: "People often come to me for advice", type: "interpersonal" },
  { id: 30, text: "I can sense how others are feeling", type: "interpersonal" },
  
  // Intrapersonal Intelligence
  { id: 31, text: "I have a good understanding of my own strengths and weaknesses", type: "intrapersonal" },
  { id: 32, text: "I enjoy spending time alone reflecting on my thoughts", type: "intrapersonal" },
  { id: 33, text: "I have strong opinions and beliefs", type: "intrapersonal" },
  { id: 34, text: "I prefer working on independent projects", type: "intrapersonal" },
  { id: 35, text: "I am self-motivated and set my own goals", type: "intrapersonal" },
  
  // Naturalist Intelligence
  { id: 36, text: "I enjoy spending time outdoors in nature", type: "naturalist" },
  { id: 37, text: "I notice patterns in the environment and can identify different plants or animals", type: "naturalist" },
  { id: 38, text: "I am concerned about environmental issues", type: "naturalist" },
  { id: 39, text: "I enjoy gardening or taking care of plants/animals", type: "naturalist" },
  { id: 40, text: "I am good at understanding natural cycles and systems", type: "naturalist" },
];

export const gardnerTypes = {
  linguistic: {
    name: "Linguistic",
    description: "You have a strong ability to use words effectively, whether in writing or speaking. You're sensitive to the meaning, sounds, and rhythm of words.",
    strengths: ["Writing", "Public Speaking", "Explaining Concepts", "Language Learning", "Storytelling"],
    careers: ["Writer", "Journalist", "Teacher", "Lawyer", "Public Relations", "Translator", "Editor", "Public Speaker"]
  },
  logical: {
    name: "Logical-Mathematical",
    description: "You excel at logical reasoning, detecting patterns, and working with abstract concepts. You have strong analytical and problem-solving skills.",
    strengths: ["Problem-solving", "Critical Thinking", "Data Analysis", "Pattern Recognition", "Abstract Reasoning"],
    careers: ["Scientist", "Mathematician", "Computer Programmer", "Engineer", "Accountant", "Analyst", "Researcher"]
  },
  spatial: {
    name: "Visual-Spatial",
    description: "You have the ability to perceive the visual-spatial world accurately and transform those perceptions. You can visualize objects and spaces in your mind.",
    strengths: ["Visual Thinking", "Reading Maps", "Drawing/Art", "Sense of Direction", "Design"],
    careers: ["Architect", "Artist", "Photographer", "Designer", "Navigator", "Engineer", "Surgeon", "Game Designer"]
  },
  musical: {
    name: "Musical",
    description: "You have a sensitivity to rhythm, pitch, melody, and tone. You appreciate and understand music and may have the ability to produce it.",
    strengths: ["Recognizing Patterns", "Remembering Melodies", "Creating Music", "Rhythm", "Tonal Memory"],
    careers: ["Musician", "Music Teacher", "Sound Engineer", "Composer", "DJ", "Music Therapist", "Sound Designer"]
  },
  kinesthetic: {
    name: "Bodily-Kinesthetic",
    description: "You have excellent body coordination and are skilled at using your whole body or hands to solve problems or create products.",
    strengths: ["Physical Coordination", "Manual Dexterity", "Athletic Ability", "Hands-on Learning", "Physical Expression"],
    careers: ["Athlete", "Dancer", "Surgeon", "Physical Therapist", "Craftsperson", "Actor", "Fire Fighter", "Mechanic"]
  },
  interpersonal: {
    name: "Interpersonal",
    description: "You understand and interact effectively with others. You're sensitive to others' moods, temperaments, motivations, and feelings.",
    strengths: ["Empathy", "Communication", "Team Building", "Conflict Resolution", "Leadership"],
    careers: ["Therapist", "Teacher", "Manager", "Social Worker", "HR Professional", "Salesperson", "Counselor", "Healthcare Provider"]
  },
  intrapersonal: {
    name: "Intrapersonal",
    description: "You have a deep understanding of yourself - your strengths, weaknesses, goals, and desires. You're self-reflective and have strong metacognition.",
    strengths: ["Self-awareness", "Emotional Processing", "Goal Setting", "Independent Work", "Self-motivation"],
    careers: ["Philosopher", "Psychologist", "Writer", "Researcher", "Entrepreneur", "Counselor", "Artist", "Theologian"]
  },
  naturalist: {
    name: "Naturalist",
    description: "You have the ability to recognize, categorize and appreciate elements of the natural environment. You're attuned to patterns in nature.",
    strengths: ["Pattern Recognition", "Classification", "Environmental Awareness", "Observation Skills", "System Thinking"],
    careers: ["Biologist", "Park Ranger", "Veterinarian", "Farmer", "Environmental Scientist", "Zoologist", "Botanist", "Geologist"]
  }
};
