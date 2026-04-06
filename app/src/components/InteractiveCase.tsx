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
    <div className="bg-navy rounded-[32px] shadow-2xl overflow-hidden border border-navy-light text-white relative">
      {/* Efek Cahaya Latar Belakang Komponen */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber/10 rounded-full blur-3xl pointer-events-none" />

      {!selectedCase ? (
        <div className="p-6 md:p-10 relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sage/20">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-4">
              Uji Kemampuan Analisis
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Pilih fenomena nyata dari Indonesia di bawah ini, lalu posisikan dirimu sebagai sosiolog untuk menganalisanya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {interactiveCases.map(caseItem => (
              <button
                key={caseItem.id}
                onClick={() => handleCaseSelect(caseItem)}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-sage/50 hover:bg-white/10 hover:shadow-lg text-left transition-all duration-300 group flex flex-col h-full"
              >
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-sage px-2 py-1 bg-sage/10 rounded border border-sage/20">
                    Studi Kasus
                  </span>
                </div>
                <h4 className="font-poppins font-bold text-white mb-3 group-hover:text-sage-light transition-colors text-lg leading-tight">
                  {caseItem.title}
                </h4>
                <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
                  {caseItem.description}
                </p>
                <div className="flex items-center text-sage-light text-sm font-bold mt-auto group-hover:gap-2 transition-all">
                  Mulai Analisis
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-10 relative z-10 animate-fadeIn">
          {/* Header Back Button */}
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
            <button
              onClick={resetCase}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium bg-white/5 px-4 py-2 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Kembali
            </button>
            <span className="text-sm font-bold text-amber-light hidden sm:block px-4 py-2 bg-amber/10 rounded-lg border border-amber/20">
              Kasus: {selectedCase.title}
            </span>
          </div>

          {/* Context Card */}
          <div className="bg-black/20 p-6 md:p-8 rounded-2xl mb-8 border border-white/5 shadow-inner">
            <h4 className="font-poppins font-bold text-amber-light mb-3 flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5" />
              Konteks Kasus
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {selectedCase.context}
            </p>
          </div>

          {/* Questions Area */}
          <div className="space-y-8">
            {selectedCase.questions.map((question, qIndex) => (
              <div key={question.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h4 className="font-poppins font-bold text-white mb-6 text-lg leading-snug flex gap-3">
                  <span className="text-sage">{qIndex + 1}.</span> 
                  {question.text}
                </h4>

                <div className="space-y-4">
                  {question.options.map(option => {
                    const isSelected = getSelectedAnswer(question.id) === option.id;
                    const showResult = showAnalysis && isSelected;

                    return (
                      <button
                        key={option.id}
                        onClick={() => !showAnalysis && handleAnswerSelect(question.id, option.id)}
                        disabled={showAnalysis}
                        className={`w-full p-5 rounded-xl border text-left transition-all duration-300 ${
                          isSelected
                            ? showResult
                              ? 'border-sage bg-sage/10 ring-1 ring-sage/30' // Saat sudah disubmit
                              : 'border-amber bg-amber/10 ring-1 ring-amber/30' // Saat dipilih tapi belum submit
                            : 'border-white/10 bg-black/20 hover:border-amber/50 hover:bg-white/5'
                        } ${showAnalysis ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? showResult ? 'border-sage bg-sage' : 'border-amber bg-amber'
                                : 'border-slate-500 bg-transparent'
                            }`}
                          >
                            {isSelected && <CheckCircle className="w-4 h-4 text-navy" />}
                          </div>
                          
                          <div className="flex-1">
                            <p className={`text-sm md:text-base leading-relaxed ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                              {option.text}
                            </p>

                            {/* Kotak Jawaban Analisis yang Muncul */}
                            <div className={`grid transition-all duration-500 ease-in-out ${
                                showResult ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-sage/30" : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                            }`}>
                              <div className="overflow-hidden">
                                <div className="bg-sage/10 border border-sage/20 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-sage bg-sage/20 px-2 py-0.5 rounded">
                                      Lensa Digunakan:
                                    </span>
                                    <span className="text-sm font-bold text-white">
                                      {option.concept}
                                    </span>
                                  </div>
                                  <p className="text-sm text-slate-300 leading-relaxed">
                                    {option.analysis}
                                  </p>
                                </div>
                              </div>
                            </div>

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
              className="mt-8 w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sage to-sage-light text-navy font-bold text-lg disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(138,172,138,0.4)] hover:scale-[1.01] transition-all"
            >
              Kirim Analisis Sosiologi
            </button>
          )}

          {/* Reflection Message */}
          {showAnalysis && (
            <div className="mt-8 p-6 bg-amber/10 rounded-2xl border border-amber/20 animate-fadeIn flex gap-4 items-start">
              <div className="w-10 h-10 bg-amber/20 rounded-full flex items-center justify-center shrink-0">
                 <Lightbulb className="w-5 h-5 text-amber-light" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-amber-light mb-2 text-lg">
                  Refleksi Sosiologis
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Dalam sosiologi, satu fenomena yang sama bisa dibedah menggunakan lensa yang berbeda. 
                  Tidak ada jawaban "benar atau salah" mutlak; yang ada adalah sudut pandang mana yang sedang 
                  kamu gunakan. Ingin melihat analisis dari teori lain? Silakan klik tombol "Kembali" dan pilih 
                  jawaban yang berbeda!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}