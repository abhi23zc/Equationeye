import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { Camera } from './components/Camera';
import { LanguageSelector } from './components/LanguageSelector';
import { Solution } from './components/Solution';
import { languages } from './utils/languages';
import { analyzeMathProblem } from './utils/gemini';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = async (imageData) => {
    console.log("Capturing")
    try {
      setLoading(true);
      const result = await analyzeMathProblem(imageData);
      console.log(result)
      setSolution(result);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const speakSolution = () => {
    if (!solution) return;
    
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `Problem: ${solution.problem}. Solution: ${solution.solution}. Steps: ${solution.steps}`;
    utterance.lang = selectedLanguage.code;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Visual Learning Assistant
              </h1>
            </div>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Capture Mathematical Problem
            </h2>
            <Camera onCapture={handleCapture} />
          </div>
          
          <div>
            {loading && (
              <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                <p className="text-gray-600">Analyzing image...</p>
              </div>
            )}
            {!loading && solution && (
              <Solution
                solution={solution}
                onSpeak={speakSolution}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;