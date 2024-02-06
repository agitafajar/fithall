import React from "react";

interface ProfileFormProps {
  label: string;
  id: string;
  type?: string;
}

const ProfileFormCard: React.FC<ProfileFormProps> = ({
  label,
  id,
  type = "text",
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-bold text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
    />
  </div>
);

export default ProfileFormCard;
