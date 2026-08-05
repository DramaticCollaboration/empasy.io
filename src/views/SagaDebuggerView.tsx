import React from 'react';

export const SagaDebuggerView: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Persona B: Saga 분산 트랜잭션 실시간 디버거</h2>
      <div className="space-y-3">
        <div className="p-3 bg-gray-800 border-l-4 border-green-500 rounded">
          <div className="text-sm font-semibold">Step 1: SyncShop.manage_product_catalog</div>
          <div className="text-xs text-gray-400">Status: COMPLETED (Compensation: revert_shop_state)</div>
        </div>
        <div className="p-3 bg-gray-800 border-l-4 border-red-500 rounded">
          <div className="text-sm font-semibold">Step 2: SyncBoot.manage_database_catalog</div>
          <div className="text-xs text-gray-400">Status: FAILED (Compensation Triggered)</div>
        </div>
        <div className="p-3 bg-yellow-900 border-l-4 border-yellow-500 rounded">
          <div className="text-sm font-semibold">Compensation Coordinator Active</div>
          <div className="text-xs text-yellow-300">Reverting Step 1 (revert_shop_state) SUCCESS</div>
        </div>
      </div>
    </div>
  );
};

export default SagaDebuggerView;
