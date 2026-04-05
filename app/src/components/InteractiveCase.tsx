import { useState } from 'react';
import { Eye, ChevronRight, RotateCcw, Lightbulb, CheckCircle } from 'lucide-react';
import { interactiveCases, type InteractiveCase as InteractiveCaseType } from '@/data/sociologyData';

interface SelectedAnswer {
  questionId: string;
  optionId: string;
}

export default function InteractiveCase() {
  const [selectedCase, setSelectedCase] = useState<InteractiveCaseType | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleCaseSelect = (caseItem: InteractiveCaseType) => {
    setSelectedCase(caseItem);
    setSelectedAnswers([]);
    setShowAnalysis(false);
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId);
      return [...filtered, { questionId, optionId }];
    });
  };

  const getSelectedAnswer = (questionId: string) => {
    return selectedAnswers.find(a => a.questionId === questionId)?.optionId;
  };

  const resetCase = () => {
    setSelectedCase(null);
    setSelectedAnswers([]);
    setShowAnalysis(false);
  };

  const allQuestionsAnswered = selectedCase?.questions.every(q => 
    selectedAnswers.some(a => a.questionId === q.id)
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {!selectedCase ? (
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-poppins font-bold text-navy mb-2">
              Coba Pakai Kacamata Sosiologi
            </h3>
            <p className="text-slate-600">
              Pilih kasus nyata dari Indonesia, lalu lihat bagaimana berbagai perspektif sosiologi menganalisanya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {interactiveCases.map(caseItem => (
              <button
                key={caseItem.id}
                onClick={() => handleCaseSelect(caseItem)}
                className="p-5 rounded-xl border-2 border-slate-200 hover:border-sage hover:bg-sage/5 text-left transition-all group"
              >
                <h4 className="font-semibold text-navy mb-2 group-hover:text-sage transition-colors">
                  {caseItem.title}
                </h4>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {caseItem.description}
                </p>
                <div className="mt-4 flex items-center text-sage text-sm font-medium">
                  Analisis kasus
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={resetCase}
              className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Kembali ke daftar kasus
            </button>
            <span className="text-sm text-slate-500">
              Kasus: {selectedCase.title}
            </span>
          </div>

          {/* Context */}
          <div className="bg-slate-50 p-5 rounded-xl mb-6">
            <h4 className="font-semibold text-navy mb-2">Konteks</h4>
            <p className="text-slate-700">{selectedCase.context}</p>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {selectedCase.questions.map((question, qIndex) => (
              <div key={question.id} className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-medium text-navy mb-4">
                  {qIndex + 1}. {question.text}
                </h4>

                <div className="space-y-3">
                  {question.options.map(option => {
                    const isSelected = getSelectedAnswer(question.id) === option.id;
                    const showResult = showAnalysis && isSelected;

                    return (
                      <button
                        key={option.id}
                        onClick={() => !showAnalysis && handleAnswerSelect(question.id, option.id)}
                        disabled={showAnalysis}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? showResult
                              ? 'border-amber bg-amber/10'
                              : 'border-sage bg-sage/10'
                            : 'border-slate-200 hover:border-sage/50'
                        } ${showAnalysis ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isSelected
                                ? 'border-sage bg-sage'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-700">{option.text}</p>

                            {showResult && (
                              <div className="mt-3 pt-3 border-t border-amber/30 animate-fadeIn">
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb className="w-4 h-4 text-amber" />
                                  <span className="text-sm font-medium text-amber">
                                    Perspektif: {option.concept}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600">{option.analysis}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          {!showAnalysis && (
            <button
              onClick={() => setShowAnalysis(true)}
              disabled={!allQuestionsAnswered}
              className="mt-6 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-navy to-sage text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Lihat Analisis
            </button>
          )}

          {/* Reflection */}
          {showAnalysis && (
            <div className="mt-6 p-5 bg-gradient-to-r from-navy/5 to-sage/5 rounded-xl border border-sage/20">
              <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber" />
                Refleksi
              </h4>
              <p className="text-slate-700 text-sm">
                Setiap perspektif sosiologi memberikan lensa yang berbeda untuk melihat fenomena yang sama. 
                Tidak ada yang "benar" atau "salah" - yang terbaik adalah menggunakan berbagai perspektif 
                untuk mendapatkan pemahaman yang lebih kaya dan komprehensif. Coba pilih opsi lain untuk 
                melihat analisis dari sudut pandang berbeda!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
