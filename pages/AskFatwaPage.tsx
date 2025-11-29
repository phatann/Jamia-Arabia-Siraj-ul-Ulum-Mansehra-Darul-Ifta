import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { getGeminiResponse } from '../services/geminiService';
import { Send, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';

const AskFatwaPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: CATEGORIES[0],
    title: '',
    details: ''
  });
  
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetAiHelp = async () => {
    if (!formData.details || formData.details.length < 10) return;
    
    setIsLoading(true);
    const response = await getGeminiResponse(
      `Question Title: ${formData.title}. Details: ${formData.details}`,
      "Use typical Hanafi Fiqh methodology if applicable, but keep it general if unsure."
    );
    setAiSuggestion(response);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setIsSubmitted(true);
        window.scrollTo(0,0);
    }, 1000);
  };

  if (isSubmitted) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
              <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Question Submitted</h2>
                  <p className="text-gray-600 mb-6">Your question has been received. Our Muftis will review it and provide an answer via email shortly. Your tracking ID is #TMP-2024</p>
                  <button 
                    onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', category: CATEGORIES[0], title: '', details: '' });
                        setAiSuggestion(null);
                    }}
                    className="text-primary-600 font-medium hover:underline"
                  >
                      Ask another question
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-primary-800 p-8 text-white">
            <h1 className="text-3xl font-serif font-bold mb-2">Ask a Question</h1>
            <p className="text-primary-200">Submit your query for a Shar'i ruling.</p>
          </div>

          <div className="p-8">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">Important Note</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Please search for similar questions before asking. Be concise and specific.
                    This service handles religious queries only.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Title</label>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Ruling on..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                <textarea
                  required
                  name="details"
                  rows={6}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Describe your situation clearly..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                />
              </div>

              {/* AI Assistance Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-bold text-gray-700 flex items-center">
                        <Sparkles className="w-4 h-4 mr-1 text-purple-500"/>
                        AI Assistant
                    </h4>
                    {!aiSuggestion && (
                        <button
                            type="button"
                            onClick={handleGetAiHelp}
                            disabled={isLoading || formData.details.length < 10}
                            className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Analyzing...' : 'Get Instant Insight'}
                        </button>
                    )}
                </div>
                
                {!aiSuggestion && !isLoading && (
                    <p className="text-xs text-gray-500">
                        Want an immediate preliminary answer? Click the button above to ask our AI assistant for references before submitting to a Mufti.
                    </p>
                )}

                {aiSuggestion && (
                    <div className="mt-3 text-sm text-gray-700 bg-white p-3 rounded border border-purple-100">
                        <p className="whitespace-pre-line">{aiSuggestion}</p>
                        <p className="mt-2 text-xs text-red-500 font-semibold border-t pt-2">
                            Disclaimer: This is an AI generated response and is NOT a fatwa. Please submit your question for a formal ruling.
                        </p>
                    </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Question to Mufti
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskFatwaPage;