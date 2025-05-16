
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

  // Calculate percentages for each dimension
  const total = e + i;
  const ePercentage = total > 0 ? Math.round((e / total) * 100) : 0;
  const iPercentage = total > 0 ? Math.round((i / total) * 100) : 0;
  
  const sNTotal = s + n;
  const sPercentage = sNTotal > 0 ? Math.round((s / sNTotal) * 100) : 0;
  const nPercentage = sNTotal > 0 ? Math.round((n / sNTotal) * 100) : 0;
  
  const tFTotal = t + f;
  const tPercentage = tFTotal > 0 ? Math.round((t / tFTotal) * 100) : 0;
  const fPercentage = tFTotal > 0 ? Math.round((f / tFTotal) * 100) : 0;
  
  const jPTotal = j + p;
  const jPercentage = jPTotal > 0 ? Math.round((j / jPTotal) * 100) : 0;
  const pPercentage = jPTotal > 0 ? Math.round((p / jPTotal) * 100) : 0;

  // Get the description and other data for this type
  const typeData = personalityTypes[mbtiType as keyof typeof personalityTypes] || {
    name: "Unknown",
    title: "Your personality type",
    description: "We couldn't determine your personality type. Please try taking the test again."
  };

  return {
    type: mbtiType,
    description: typeData.description,
    dimensionScores: {
      ei: { e: ePercentage, i: iPercentage },
      sn: { s: sPercentage, n: nPercentage },
      tf: { t: tPercentage, f: fPercentage },
      jp: { j: jPercentage, p: pPercentage }
    },
    raw: {
      e, i, s, n, t, f, j, p
    }
  };
};

// Function to save test results
export const saveTestResult = async (userCode: string, answers: Record<number, string>) => {
  const result = calculateMbtiType(answers);
  const timestamp = new Date().toISOString();
  
  const resultData = {
    userCode,
    answers,
    result,
    timestamp
  };
  
  // For now, we'll save to localStorage as a placeholder
  // In a real app, this would be a fetch call to your API
  try {
    const existingResults = JSON.parse(localStorage.getItem('mbtiResults') || '[]');
    existingResults.push(resultData);
    localStorage.setItem('mbtiResults', JSON.stringify(existingResults));
    return { success: true, resultData };
  } catch (error) {
    console.error('Error saving result:', error);
    return { success: false, error };
  }
};

// Function to get test results (admin only)
export const getTestResults = () => {
  try {
    return JSON.parse(localStorage.getItem('mbtiResults') || '[]');
  } catch (error) {
    console.error('Error retrieving results:', error);
    return [];
  }
};

