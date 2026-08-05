import React from 'react';

export const InteractiveCodeReviewer: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Persona B: AI 생성 코드 Diff 및 리뷰어</h2>
      <div className="bg-gray-800 p-4 rounded border border-gray-700 font-mono text-xs">
        <div className="text-gray-400">--- src/main/java/com/empasy/syncboot/UserService.java</div>
        <div className="text-gray-400">+++ src/main/java/com/empasy/syncboot/UserService.java</div>
        <div className="text-red-400">- public User getUser(Long id) &#123; return repo.findById(id); &#125;</div>
        <div className="text-green-400">+ public User getUser(Long id) &#123; return repo.findById(id).orElseThrow(); &#125;</div>
      </div>
    </div>
  );
};

export default InteractiveCodeReviewer;
