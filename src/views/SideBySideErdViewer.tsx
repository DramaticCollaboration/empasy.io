import React from 'react';

export const SideBySideErdViewer: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Persona B: ERD Diff Viewer (DDL Proposal Approval)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">기존 DB 스키마 (Current)</h3>
          <pre className="text-xs bg-gray-900 p-2 rounded text-green-400 font-mono">
            {`TABLE sys_user (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  status VARCHAR(20) -- DROP 예정
)`}
          </pre>
        </div>
        <div className="p-4 bg-gray-800 rounded border border-red-700">
          <h3 className="text-sm font-semibold text-red-400 mb-2">제안된 변경안 (Proposed Diff)</h3>
          <pre className="text-xs bg-gray-900 p-2 rounded text-red-400 font-mono">
            {`TABLE sys_user (
  id INT PRIMARY KEY,
  username VARCHAR(50)
  -- [WARNING: Data Loss] status 컬럼 삭제됨
)`}
          </pre>
        </div>
      </div>
      <div className="mt-4 flex space-x-3">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold">
          DDL 변경 승인 (Approve)
        </button>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-bold">
          DDL 반려 (Reject)
        </button>
      </div>
    </div>
  );
};

export default SideBySideErdViewer;
