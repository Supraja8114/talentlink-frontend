import React, { useState, useEffect } from 'react';
import api from '../services/api'; 

const FreelancerProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    skills: '',
    hourly_rate: '',
    portfolio_link: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Profile Data (READ)
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile/'); 
      setProfile(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load profile", error);
      setLoading(false);
    }
  };

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 3. Save Updated Data (UPDATE)
  const handleSave = async () => {
    try {
      await api.put('/profile/', profile);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading Profile...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Freelancer Profile</h2>

      {/* Basic Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" value={profile.username} disabled className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md" />
      </div>

      {/* Editable Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
        <input
          type="text"
          name="skills"
          value={profile.skills || ''}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Python, React, Django"
          className={mt-1 block w-full rounded-md shadow-sm ${isEditing ? 'border-blue-500 border-2' : 'bg-gray-50 border-gray-300'}}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
        <input
          type="number"
          name="hourly_rate"
          value={profile.hourly_rate || ''}
          disabled={!isEditing}
          onChange={handleChange}
          className={mt-1 block w-full rounded-md shadow-sm ${isEditing ? 'border-blue-500 border-2' : 'bg-gray-50 border-gray-300'}}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 mt-4">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
        ) : (
          <>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Changes</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;