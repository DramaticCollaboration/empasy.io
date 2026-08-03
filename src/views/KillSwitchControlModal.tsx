import React from 'react';

export const KillSwitchControlModal: React.FC = () => {
  return (
    <div className="p-6 bg-red-950 text-white rounded-lg border border-red-800">
      <h2 className="text-xl font-bold mb-2 text-red-400">🚨 긴급 KillSwitch 제어 모달</h2>
      <p className="text-sm text-gray-300 mb-4">비상 시 모든 하위 에이전트의 LLM 추론 호출을 즉시 차단합니다.</p>
      <button className="px-6 py-2 bg-red-600 hover:bg-red-700 font-bold rounded">
        긴급 차단 실행 (ACTIVATE KILL SWITCH)
      </button>
    </div>
  );
};

export default KillSwitchControlModal;
