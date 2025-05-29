import React, { useState } from 'react';
import StarIcon from './icons/StarIcon'; // Will be created

interface SettingsGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsGroup: React.FC<SettingsGroupProps> = ({ title, children, className }) => (
  <div className={`mb-6 ${className}`}>
    {title && <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-semibold px-4 sm:px-1">{title}</h2>}
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden mx-2 sm:mx-0">
      {children}
    </div>
  </div>
);

interface SettingsRowProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  noBorder?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ label, value, children, onClick, noBorder = false }) => (
  <div
    className={`flex justify-between items-center p-4 min-h-[44px] ${!noBorder ? 'border-b border-slate-700/50' : ''} last:border-b-0 ${onClick ? 'cursor-pointer hover:bg-slate-700/40 transition-colors duration-150' : ''}`}
    onClick={onClick}
  >
    <span className="text-gray-100 text-sm sm:text-base">{label}</span>
    {value && <span className="text-gray-300 text-sm sm:text-base">{value}</span>}
    {children}
  </div>
);


const SettingsView: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState<boolean>(false);
  const [submittedDetails, setSubmittedDetails] = useState<{ rating: number; text: string } | null>(null);

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleStarMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) return; // Should be disabled, but as a safeguard
    setSubmittedDetails({ rating, text: feedbackText });
    setIsFeedbackSubmitted(true);
  };

  const handleResetFeedbackForm = () => {
    setIsFeedbackSubmitted(false);
    setRating(0);
    setHoverRating(0);
    setFeedbackText("");
    setSubmittedDetails(null);
  };

  return (
    <div className="flex-grow flex flex-col p-4 sm:p-6 items-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-8">Settings</h1>
      
      <div className="w-full max-w-md">
        <SettingsGroup title="App Information">
          <SettingsRow label="App Version" value="iOS 18 Developer" />
          <SettingsRow label="Developer" value="Prakhar Vardhan" noBorder={true}/>
        </SettingsGroup>

        {!isFeedbackSubmitted ? (
          <>
            <SettingsGroup title="Feedback">
              <div className="p-4">
                <div className="flex justify-center items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarMouseEnter(star)}
                      onMouseLeave={handleStarMouseLeave}
                      className="focus:outline-none p-1"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <StarIcon
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-150 ${
                          (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Describe your experience or suggest improvements..."
                  rows={4}
                  className="w-full bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg p-3 text-sm sm:text-base text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 transition-colors"
                />
              </div>
            </SettingsGroup>
            <button
              onClick={handleSubmitFeedback}
              disabled={rating === 0}
              className={`w-full font-sf text-base sm:text-lg font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-70
                ${rating > 0 ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
            >
              Submit Feedback
            </button>
          </>
        ) : (
          <SettingsGroup title="Thank You!" className="text-center">
            <div className="p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg text-gray-100 mb-2">Your feedback has been received!</p>
              {submittedDetails && (
                <div className="text-sm text-gray-300 mb-4">
                  <p>Rating: {'★'.repeat(submittedDetails.rating)}{'☆'.repeat(5 - submittedDetails.rating)}</p>
                  {submittedDetails.text && <p className="mt-1">Comment: "{submittedDetails.text}"</p>}
                </div>
              )}
              <button
                onClick={handleResetFeedbackForm}
                className="w-full sm:w-auto mt-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                Submit New Feedback
              </button>
            </div>
          </SettingsGroup>
        )}
      </div>
    </div>
  );
};

export default SettingsView;
