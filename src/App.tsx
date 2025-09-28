import React, { useState } from 'react';
import { BookOpen, FileText, Brain, Zap, Upload, Loader2 } from 'lucide-react';

interface ProcessedContent {
  summary?: string;
  keyPoints?: string[];
  flashcards?: { question: string; answer: string }[];
}

function App() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'summary' | 'keypoints' | 'flashcards'>('summary');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedContent, setProcessedContent] = useState<ProcessedContent>({});
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const modes = [
    { id: 'summary', label: 'Summary', icon: FileText, color: 'text-purple-600' },
    { id: 'keypoints', label: 'Key Points', icon: Brain, color: 'text-blue-600' },
    { id: 'flashcards', label: 'Flashcards', icon: Zap, color: 'text-emerald-600' }
  ] as const;

  const simulateAI = async (text: string, processingMode: string): Promise<ProcessedContent> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const words = text.split(' ');
    const sentences = text.split('.').filter(s => s.trim().length > 0);
    
    switch (processingMode) {
      case 'summary':
        return {
          summary: `This content discusses ${words.slice(0, 3).join(' ')} and covers key concepts including ${words.slice(Math.floor(words.length/2), Math.floor(words.length/2) + 3).join(' ')}. The main takeaway focuses on ${words.slice(-5).join(' ')}.`
        };
      
      case 'keypoints':
        return {
          keyPoints: [
            `Primary concept: ${words.slice(0, 8).join(' ')}`,
            `Key methodology: ${words.slice(Math.floor(words.length * 0.25), Math.floor(words.length * 0.25) + 6).join(' ')}`,
            `Important detail: ${words.slice(Math.floor(words.length * 0.5), Math.floor(words.length * 0.5) + 7).join(' ')}`,
            `Critical insight: ${words.slice(Math.floor(words.length * 0.75), Math.floor(words.length * 0.75) + 5).join(' ')}`,
            `Final consideration: ${words.slice(-6).join(' ')}`
          ]
        };
      
      case 'flashcards':
        return {
          flashcards: [
            { question: `What is the main topic discussed in "${words.slice(0, 4).join(' ')}..."?`, answer: sentences[0] || 'Main concept explanation' },
            { question: `Explain the significance of ${words[Math.floor(words.length/3)]}`, answer: sentences[1] || 'Detailed explanation of the concept' },
            { question: `How does ${words[Math.floor(words.length/2)]} relate to the overall topic?`, answer: sentences[2] || 'Connection and relationship explanation' },
            { question: `What are the key implications of ${words.slice(-3).join(' ')}?`, answer: sentences[sentences.length - 1] || 'Impact and implications' }
          ]
        };
      
      default:
        return {};
    }
  };

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setProcessedContent({});
    
    try {
      const result = await simulateAI(inputText, mode);
      setProcessedContent(result);
      setCurrentFlashcard(0);
      setShowAnswer(false);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  };

  const nextFlashcard = () => {
    if (processedContent.flashcards) {
      setCurrentFlashcard((prev) => (prev + 1) % processedContent.flashcards!.length);
      setShowAnswer(false);
    }
  };

  const prevFlashcard = () => {
    if (processedContent.flashcards) {
      setCurrentFlashcard((prev) => 
        prev === 0 ? processedContent.flashcards!.length - 1 : prev - 1
      );
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                StudyAI Companion
              </h1>
              <p className="text-sm text-gray-600">AI-powered learning assistant</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Mode Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Processing Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modes.map((modeOption) => (
              <button
                key={modeOption.id}
                onClick={() => setMode(modeOption.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  mode === modeOption.id
                    ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <modeOption.icon className={`h-8 w-8 ${modeOption.color}`} />
                  <span className="font-medium text-gray-900">{modeOption.label}</span>
                  <span className="text-sm text-gray-600 text-center">
                    {modeOption.id === 'summary' && 'Get concise summaries'}
                    {modeOption.id === 'keypoints' && 'Extract key points'}
                    {modeOption.id === 'flashcards' && 'Generate study cards'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Input Your Content</h3>
              
              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Text File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Click to upload .txt file</span>
                  </label>
                </div>
              </div>

              {/* Text Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or Paste Your Text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your notes, textbook content, or study material here..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <div className="text-sm text-gray-500 mt-2">
                  {inputText.length} characters
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={!inputText.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Process with AI</span>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Content</h3>
              
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-12 w-12 text-purple-600 animate-spin mb-4" />
                  <p className="text-gray-600">AI is processing your content...</p>
                </div>
              ) : (
                <>
                  {/* Summary Mode */}
                  {mode === 'summary' && processedContent.summary && (
                    <div className="prose max-w-none">
                      <h4 className="text-md font-medium text-purple-600 mb-3">Summary</h4>
                      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                        <p className="text-gray-800 leading-relaxed">{processedContent.summary}</p>
                      </div>
                    </div>
                  )}

                  {/* Key Points Mode */}
                  {mode === 'keypoints' && processedContent.keyPoints && (
                    <div>
                      <h4 className="text-md font-medium text-blue-600 mb-3">Key Points</h4>
                      <ul className="space-y-3">
                        {processedContent.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                            </div>
                            <span className="text-gray-800">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Flashcards Mode */}
                  {mode === 'flashcards' && processedContent.flashcards && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium text-emerald-600">Flashcards</h4>
                        <span className="text-sm text-gray-500">
                          {currentFlashcard + 1} of {processedContent.flashcards.length}
                        </span>
                      </div>
                      
                      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 min-h-[200px] relative">
                        <div className="text-center">
                          <div className="mb-4">
                            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                              {showAnswer ? 'Answer' : 'Question'}
                            </span>
                          </div>
                          
                          <p className="text-gray-800 text-lg mb-6">
                            {showAnswer 
                              ? processedContent.flashcards[currentFlashcard].answer
                              : processedContent.flashcards[currentFlashcard].question
                            }
                          </p>
                          
                          <button
                            onClick={() => setShowAnswer(!showAnswer)}
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors mb-6"
                          >
                            {showAnswer ? 'Show Question' : 'Show Answer'}
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <button
                            onClick={prevFlashcard}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors text-sm"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={nextFlashcard}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors text-sm"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {!isProcessing && !processedContent.summary && !processedContent.keyPoints && !processedContent.flashcards && (
                    <div className="text-center py-16 text-gray-500">
                      <Brain className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Enter your content and click "Process with AI" to get started</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;