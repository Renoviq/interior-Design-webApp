import React from 'react';

const roomTypes = [
  'Kitchen',
  'Living Room',
  'Bedroom',
  'Bathroom',
  'Dining Room',
  'Office',
  'Other',
];

interface RoomTypeProps {
  selectedRoom: string;
  onChange: (room: string) => void;
}

export const RoomType: React.FC<RoomTypeProps> = ({ selectedRoom, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="roomType" className="block mb-2 font-semibold text-gray-700">
        Select Room Type *
      </label>
      <select
        id="roomType"
        value={selectedRoom}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        {roomTypes.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
      </select>
    </div>
  );
};
