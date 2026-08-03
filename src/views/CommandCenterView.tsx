import React, { useState } from 'react';

export const CommandCenterView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setStep(2);
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">SyncVerse Persona A: Command Center</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="자연어로 지시를 입력하세요 (예: 신규 프로모션 데이터 CRUD 조작)..."
          className="w-full h-32 p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
        >
          AI DLC 지시 전송
        </button>
      </form>

      <div className="border-t border-gray-800 pt-4">
        <h3 className="text-lg font-semibold mb-2">AI DLC 6-Step 워크플로우 진행 상태</h3>
        <div className="flex items-center space-x-2">
          {['1. 요구사항 분석', '2. SDK 개발', '3. 무인 QA', '4. Dev PR', '5. UAT & 배포', '6. 리포팅'].map((name, idx) => (
            <div
              key={idx}
              className={`flex-1 p-2 text-center text-xs font-semibold rounded ${
                step > idx ? 'bg-green-600 text-white' : step === idx + 1 ? 'bg-blue-600 text-white animate-pulse' : 'bg-gray-800 text-gray-400'
              }`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandCenterView;
