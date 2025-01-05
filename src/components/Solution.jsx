import React from 'react';
import { Volume2 } from 'lucide-react';

export const Solution = ({ solution, onSpeak }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Solution</h2>
        <button
          onClick={onSpeak}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Volume2 size={20} />
          <span>Listen</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Problem:</h3>
          <p className="text-gray-600">{solution.problem}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-700">Solution:</h3>
          <p className="text-gray-600">{solution.solution}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-700">Steps:</h3>
          <ol className="list-decimal list-inside space-y-2">
            {solution.steps.map((step, index) => (
              <li key={index} className="text-gray-600">{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};