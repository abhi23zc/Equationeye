import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyB4xf6xn5sBqfUYHrMVsmJtDbvsvzrg4PA"|| "");

export async function analyzeMathProblem(imageData) {
  const errorResponse = {
    problem: "Error occurred",
    solution: "Unable to process",
    steps: ["Please try again"]
  };

  try {
    if (!imageData || !imageData.includes('base64')) {
      return {
        ...errorResponse,
        problem: "Invalid image data",
        steps: ["Please provide a valid base64 encoded image"]
      };
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = "Analyze this math problem from the image. Return ONLY a JSON object in this exact format, with no markdown or additional text: { \"problem\": \"[write the exact math problem]\", \"solution\": \"[write the final answer]\", \"steps\": [\"[step 1]\", \"[step 2]\", ...] }";
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData.split(',')[1],
          mimeType: 'image/jpeg'
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    const cleanedText = cleanResponseText(text);
    
    try {
      const parsedResponse = JSON.parse(cleanedText);
      
      if (!parsedResponse.problem || !parsedResponse.solution || !Array.isArray(parsedResponse.steps)) {
        throw new Error('Invalid response structure');
      }
      
      return parsedResponse;
      
    } catch (parseError) {
      console.error('Response parsing failed:', cleanedText);
      
      return extractFromMalformedResponse(text);
    }
  } catch (error) {
    console.error('Error in math problem analysis:', error);
    return errorResponse;
  }
}

function cleanResponseText(text) {
  return text
    .replace(/\*\*.*?\*\*/g, '')
    .replace(/```json\s*|\s*```/g, '')
    .replace(/^\s*\d+\.\s*/gm, '')
    .trim();
}

function extractFromMalformedResponse(text) {
  const result = {
    problem: "Could not parse problem",
    solution: "",
    steps: []
  };

  try {
    const problemMatch = text.match(/problem":\s*"([^"]+)"/);
    if (problemMatch) result.problem = problemMatch[1];

    const solutionMatch = text.match(/solution":\s*"([^"]+)"/);
    if (solutionMatch) result.solution = solutionMatch[1];

    const stepsMatch = text.match(/steps":\s*\[(.*?)\]/s);
    if (stepsMatch) {
      const stepsText = stepsMatch[1];
      const steps = stepsText.match(/"([^"]+)"/g);
      if (steps) {
        result.steps = steps.map(step => step.replace(/"/g, ''));
      }
    }

    return result;
  } catch (e) {
    console.error('Error in extractFromMalformedResponse:', e);
    return {
      problem: "Could not parse problem",
      solution: text,
      steps: ["Please try capturing the image again"]
    };
  }
}