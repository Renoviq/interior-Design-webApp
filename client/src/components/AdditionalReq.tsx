import React from 'react';

interface AdditionalReqProps {
  value: string;
  onChange: (value: string) => void;
}

export const AdditionalReq: React.FC<AdditionalReqProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="additionalReq" className="block mb-2 font-semibold text-gray-700">
        Enter Additional Requirements (Optional)
      </label>
      <textarea
        id="additionalReq"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full border border-gray-300 rounded-md p-2 resize-none"
        placeholder="Enter any additional requirements here..."
      />
    </div>
  );
};
