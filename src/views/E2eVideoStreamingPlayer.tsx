import React from 'react';

export const E2eVideoStreamingPlayer: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Persona B: SyncETA QA 비디오 스트리밍 플레이어</h2>
      <div className="w-full h-48 bg-black rounded flex items-center justify-center border border-gray-700 text-gray-500">
        🎥 SyncETA Playwright E2E 녹화 비디오 재생 중...
      </div>
    </div>
  );
};

export default E2eVideoStreamingPlayer;
