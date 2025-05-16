
import { personalityTypes } from "@/data/mbtiTypes";

export const calculateMbtiType = (answers: Record<number, string>) => {
  // Initialize counters for each dimension
  let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;

  // Count the answers for each dimension
  Object.entries(answers).forEach(([questionIndex, answer]) => {
    const index = parseInt(questionIndex);
    
    // E/I questions (indices 0-4)
    if (index < 5) {
      if (answer === 'a') e++;
      else if (answer === 'b') i++;
    }
    // S/N questions (indices 5-9)
    else if (index < 10) {
      if (answer === 'a') s++;
      else if (answer === 'b') n++;
    }
    // T/F questions (indices 10-14)
    else if (index < 15) {
      if (answer === 'a') t++;
      else if (answer === 'b') f++;
    }
    // J/P questions (indices 15-19)
    else {
      if (answer === 'a') j++;
      else if (answer === 'b') p++;
    }
  });

  // Determine the type based on the highest count in each dimension
  const firstLetter = e > i ? 'E' : 'I';
  const secondLetter = s > n ? 'S' : 'N';
  const thirdLetter = t > f ? 'T' : 'F';
  const fourthLetter = j > p ? 'J' : 'P';

  const mbtiType = `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;

  // Get the description and other data for this type
  const typeData = personalityTypes[mbtiType as keyof typeof personalityTypes] || {
    name: "Unknown",
    title: "Your personality type",
    description: "We couldn't determine your personality type. Please try taking the test again."
  };

  return {
    type: mbtiType,
    description: typeData.description
  };
};
