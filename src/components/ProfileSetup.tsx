import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload, User, Briefcase, BookOpen, Target } from 'lucide-react';
import { CarvixLogo } from './CarvixLogo';
import { ThemeToggle } from './ThemeToggle';

interface ProfileData {
  name: string;
  email: string;
  education: string;
  degree: string;
  graduationYear: string;
  technicalSkills: string;
  softSkills: string;
  experience: string;
  interests: string;
  careerGoals: string;
  resumeText: string;
}

export function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    education: '',
    degree: '',
    graduationYear: '',
    technicalSkills: '',
    softSkills: '',
    experience: '',
    interests: '',
    careerGoals: '',
    resumeText: '',
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        handleInputChange('resumeText', text);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    // Save to localStorage for demo purposes
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-4 sm:py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Branding */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <CarvixLogo size="md" showText={true} />
          <ThemeToggle />
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6 transition-colors">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`flex-1 h-2 sm:h-3 rounded-full mx-1 transition-colors ${
                  num <= step
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Step {step} of 4
          </p>
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg transition-colors">
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
                <h2 className="text-3xl text-gray-900 dark:text-white">Basic Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Current Education Level *</label>
                  <select
                    value={profileData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select...</option>
                    <option value="final-year">Final Year Student</option>
                    <option value="graduate">Recent Graduate</option>
                    <option value="working">Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Degree/Field of Study *</label>
                  <input
                    type="text"
                    value={profileData.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="B.Tech in Computer Science, BCA, MCA, etc."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Graduation Year *</label>
                  <input
                    type="text"
                    value={profileData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="2024, 2025, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
                <h2 className="text-3xl text-gray-900 dark:text-white">Skills & Experience</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Technical Skills *</label>
                  <textarea
                    value={profileData.technicalSkills}
                    onChange={(e) => handleInputChange('technicalSkills', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="List your technical skills (e.g., Python, Java, React, SQL, AWS, etc.)"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Separate with commas</p>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Soft Skills</label>
                  <textarea
                    value={profileData.softSkills}
                    onChange={(e) => handleInputChange('softSkills', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                    placeholder="e.g., Communication, Teamwork, Problem-solving, Leadership"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Experience & Projects</label>
                  <textarea
                    value={profileData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="Describe your internships, projects, freelance work, or any relevant experience"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
                <h2 className="text-3xl text-gray-900 dark:text-white">Career Interests & Goals</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Areas of Interest *</label>
                  <textarea
                    value={profileData.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="What excites you? (e.g., Web Development, AI/ML, Cloud Computing, Cybersecurity, Data Science, Mobile Development, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Career Goals *</label>
                  <textarea
                    value={profileData.careerGoals}
                    onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="What do you want to achieve? (e.g., Become a full-stack developer, Work in a startup, Get a job at FAANG, Start my own tech company, etc.)"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
                <h2 className="text-3xl text-gray-900 dark:text-white">Upload Resume (Optional)</h2>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Upload your resume for more detailed analysis</p>
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                  >
                    Choose File
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Supported formats: TXT, PDF, DOC, DOCX</p>
                  {profileData.resumeText && (
                    <p className="text-green-600 dark:text-green-400 mt-2">✓ Resume uploaded successfully</p>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Note:</strong> Your data is processed locally and used only to generate your personalized career guidance. We do not store your personal information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
              >
                Generate Analysis
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}