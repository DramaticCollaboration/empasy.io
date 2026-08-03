import React, { useState } from 'react';

export const StructuredPromptBuilder: React.FC = () => {
  const [domain, setDomain] = useState('SyncBoot');
  const [action, setAction] = useState('CRUD');

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md border border-gray-700">
      <h3 className="text-md font-bold mb-3">구조화 프롬프트 빌더</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">대상 도메인 에이전트</label>
          <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-sm">
            <option value="SyncBoot">SyncBoot (Backend)</option>
            <option value="SyncCMS">SyncCMS (Publisher)</option>
            <option value="SyncShop">SyncShop (Commerce)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">작업 목적</label>
          <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-sm">
            <option value="CRUD">런타임 데이터 CRUD</option>
            <option value="LOG">서버 로그 수집</option>
            <option value="REVERT">상태 원복</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StructuredPromptBuilder;
