import React from 'react';

export const FinOpsDashboardView: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Persona C: FinOps 비용 실시간 통제 대시보드</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-xs text-gray-400">총 토큰 사용량</div>
          <div className="text-2xl font-bold text-blue-400">1,250,000</div>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-xs text-gray-400">누적 추론 비용 (USD)</div>
          <div className="text-2xl font-bold text-green-400">$3.75</div>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <div className="text-xs text-gray-400">KillSwitch 상태</div>
          <div className="text-2xl font-bold text-yellow-400">NORMAL</div>
        </div>
      </div>
    </div>
  );
};

export default FinOpsDashboardView;
