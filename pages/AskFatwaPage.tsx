import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { getGeminiResponse } from '../services/geminiService';
import { Send, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';

const AskFatwaPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: CATEGORIES[1].labelUrdu, // Default to first actual category
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
      `Urdu Question: ${formData.title}. Details: ${formData.details}`,
      "Answer in Urdu language using Hanafi Fiqh. Keep it brief."
    );
    setAiSuggestion(response);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
        setIsSubmitted(true);
        window.scrollTo(0,0);
    }, 1000);
  };

  if (isSubmitted) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-urdu text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">سوال موصول ہو گیا</h2>
                  <p className="text-gray-600 mb-6 text-lg">آپ کا سوال دارالافتاء کو موصول ہو چکا ہے۔ جواب جلد بذریعہ ای میل ارسال کیا جائے گا۔</p>
                  <button 
                    onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', category: CATEGORIES[1].labelUrdu, title: '', details: '' });
                        setAiSuggestion(null);
                    }}
                    className="text-primary-600 font-bold hover:underline"
                  >
                      نیا سوال پوچھیں
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-urdu">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="bg-primary-800 p-8 text-white text-right">
            <h1 className="text-4xl font-bold mb-2">سوال پوچھیں</h1>
            <p className="text-primary-200 text-lg">اپنے شرعی مسائل کے حل کے لیے فارم پُر کریں</p>
          </div>

          <div className="p-8">
            <div className="bg-amber-50 border-r-4 border-amber-500 p-4 mb-8 text-right">
              <div className="flex flex-row-reverse items-start">
                <AlertCircle className="h-6 w-6 text-amber-500 ml-3 mt-0.5" />
                <div>
                  <p className="text-lg text-amber-800 font-bold">ضروری ہدایت</p>
                  <p className="text-base text-amber-700 mt-1 leading-relaxed">
                    سوال پوچھنے سے پہلے پرانے فتاویٰ میں تلاش کر لیں۔ سوال واضح لکھیں۔ یہ سروس صرف دینی مسائل کے لیے ہے۔
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-right">
                  <label className="block text-lg font-bold text-gray-700 mb-1">ای میل</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3 text-right"
                    dir="ltr"
                  />
                </div>
                <div className="text-right">
                  <label className="block text-lg font-bold text-gray-700 mb-1">نام</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3 text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="text-right">
                <label className="block text-lg font-bold text-gray-700 mb-1">کیٹیگری منتخب کریں</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3 text-right font-urdu text-lg"
                  dir="rtl"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.labelUrdu}>{cat.labelUrdu}</option>
                  ))}
                </select>
              </div>

              <div className="text-right">
                <label className="block text-lg font-bold text-gray-700 mb-1">عنوان</label>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="مثلاً: سفر میں نماز کا حکم..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3 text-right"
                  dir="rtl"
                />
              </div>

              <div className="text-right">
                <label className="block text-lg font-bold text-gray-700 mb-1">تفصیل</label>
                <textarea
                  required
                  name="details"
                  rows={8}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="اپنا مسئلہ تفصیل سے بیان کریں..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3 text-right font-urdu text-lg leading-loose"
                  dir="rtl"
                />
              </div>

              {/* AI Help */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-right">
                <div className="flex flex-row-reverse justify-between items-center mb-2">
                    <h4 className="text-sm font-bold text-gray-700 flex items-center flex-row-reverse">
                        <Sparkles className="w-4 h-4 ml-1 text-purple-500"/>
                        AI اسسٹنٹ
                    </h4>
                    {!aiSuggestion && (
                        <button
                            type="button"
                            onClick={handleGetAiHelp}
                            disabled={isLoading || formData.details.length < 10}
                            className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? '...انتظار فرمائیں' : 'فوری حوالہ حاصل کریں'}
                        </button>
                    )}
                </div>
                
                {aiSuggestion && (
                    <div className="mt-3 text-lg text-gray-700 bg-white p-4 rounded border border-purple-100 dir-rtl leading-loose">
                        <p className="whitespace-pre-line">{aiSuggestion}</p>
                        <p className="mt-2 text-xs text-red-500 font-bold border-t pt-2">
                            نوٹ: یہ جواب مصنوعی ذہانت (AI) کا ہے اور حتمی فتویٰ نہیں۔
                        </p>
                    </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  <Send className="w-5 h-5 ml-2 mt-1" />
                  فتویٰ بھیجیں
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
