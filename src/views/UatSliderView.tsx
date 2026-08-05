import React, { useState } from 'react';

export const UatSliderView: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Persona A: UAT 화면 A/B 변경 전후 비교 슬라이더</h2>
      <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="absolute inset-0 bg-blue-900 flex items-center justify-center font-bold text-2xl">
          [변경 전 (Before)]
        </div>
        <div
          className="absolute top-0 bottom-0 left-0 bg-indigo-900 flex items-center justify-center font-bold text-2xl border-r-2 border-yellow-400 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <span className="whitespace-nowrap">[변경 후 (After)]</span>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="w-full mt-4"
      />
    </div>
  );
};

export default UatSliderView;
