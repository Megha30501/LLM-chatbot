import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const chooseExperience = (level) => {
    // Redirect based on experience level
    navigate(`/chat?persona=${level}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Ready to Meet Your Patient?
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Choose your experience level to start a conversation with a virtual therapy patient.
        </p>
        <div className="mt-8 space-x-4">
          <button
            onClick={() => chooseExperience("easy")}
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Experienced Therapist
          </button>
          <button
            onClick={() => chooseExperience("hard")}
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg"
          >
            New to Therapy
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
