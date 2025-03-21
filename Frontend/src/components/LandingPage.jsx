import React from 'react';
import { ArrowRight, Award, BookOpen, CheckCircle, ShieldCheck, Brain } from 'lucide-react';

const LandingPage = ({ onOptionSelect }) => {
  return (
    <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800 opacity-90"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-400 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-400 rounded-full opacity-20"></div>
        
        <div className="relative p-10 text-white">
          <div className="flex items-center mb-3">
            <Brain className="mr-2" size={28} />
            <h1 className="text-3xl font-bold">Therapy Practice Simulator</h1>
          </div>
          <p className="text-indigo-100 max-w-2xl">
            An interactive training environment designed to help therapists develop their skills 
            through realistic patient simulations and targeted scenarios.
          </p>
          
          <div className="flex flex-wrap mt-6 space-x-4">
            <div className="flex items-center text-sm">
              <CheckCircle size={16} className="mr-1 text-indigo-200" />
              <span className="text-indigo-100">Evidence-based scenarios</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle size={16} className="mr-1 text-indigo-200" />
              <span className="text-indigo-100">Practice at your own pace</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle size={16} className="mr-1 text-indigo-200" />
              <span className="text-indigo-100">Develop real-world skills</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Select your experience level</h2>
        <p className="text-gray-600 mb-6">Your selection will customize the patient scenario to match your skills</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onOptionSelect('experienced')}
            className="group relative flex flex-col h-full border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <Award size={32} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Experienced Therapist</h3>
              <p className="text-gray-600 mb-4">For practitioners with clinical experience who want to challenge themselves with complex cases.</p>
              
              <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-indigo-100">
                <h4 className="font-medium text-indigo-800 mb-2 flex items-center">
                  <ShieldCheck size={16} className="mr-2" />
                  You'll receive:
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start">
                    <ArrowRight size={14} className="text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">A resistant or challenging patient scenario</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={14} className="text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Practice with advanced resistance patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </button>

          <button
            onClick={() => onOptionSelect('new')}
            className="group relative flex flex-col h-full border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <BookOpen size={32} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">New to Therapy</h3>
              <p className="text-gray-600 mb-4">For students and new practitioners looking to build foundational therapeutic skills.</p>
              
              <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-indigo-100">
                <h4 className="font-medium text-indigo-800 mb-2 flex items-center">
                  <ShieldCheck size={16} className="mr-2" />
                  You'll receive:
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start">
                    <ArrowRight size={14} className="text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">A straightforward, receptive patient</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={14} className="text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Practice basic therapeutic techniques</span>
                  </li>
                </ul>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-indigo-100">
          <h3 className="font-medium text-indigo-900 mb-3 flex items-center">
            <Brain size={18} className="mr-2 text-indigo-600" />
            Educational Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-indigo-50">
              <h4 className="font-medium text-indigo-800 mb-1 text-sm">Safe Practice Environment</h4>
              <p className="text-xs text-gray-600">Build confidence without real-world consequences</p>
            </div>
            <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-indigo-50">
              <h4 className="font-medium text-indigo-800 mb-1 text-sm">Technique Development</h4>
              <p className="text-xs text-gray-600">Refine your therapeutic approach with feedback</p>
            </div>
            <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-indigo-50">
              <h4 className="font-medium text-indigo-800 mb-1 text-sm">Diverse Scenarios</h4>
              <p className="text-xs text-gray-600">Prepare for various client presentations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;