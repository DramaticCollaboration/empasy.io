import React from 'react';

export const ImpactAnalysisGraphView: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Persona C: 장애 및 변경 사항 영향도 그래프 (Impact Analysis)</h2>
      <div className="p-4 bg-gray-800 rounded border border-gray-700">
        <div className="text-sm font-semibold mb-2">영향받는 API 및 서비스:</div>
        <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
          <li>/api/v1/shop/products (SyncShop)</li>
          <li>/api/v1/boot/catalog (SyncBoot)</li>
          <li>/api/v1/cms/articles (SyncCMS)</li>
        </ul>
      </div>
    </div>
  );
};

export default ImpactAnalysisGraphView;
