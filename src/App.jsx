
import React, { useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeText = async () => {
    if (!text.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/analyze-fraud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      
      if (response.ok) {
        const result = await response.json()
        setAnalysis(result)
      } else {
        console.error('Analysis failed')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-slate-800 text-4xl mb-2.5 font-bold">
          Healthcare FWA Detection
        </h1>
        <p className="text-slate-500 text-xl mb-5">
          AI-powered analysis for Fraud, Waste, and Abuse detection in healthcare text
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-10 border border-gray-200">
        <h3 className="text-slate-800 mb-5 text-xl font-semibold">Analyze Healthcare Text</h3>
        
        <textarea
          className="w-full p-4 border-2 border-gray-200 rounded-lg text-sm resize-y mb-4 box-border focus:outline-none focus:border-blue-500"
          rows="6"
          placeholder="Enter healthcare-related text for FWA analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <button
          onClick={analyzeText}
          disabled={loading || !text.trim()}
          className="bg-blue-600 text-white border-none py-3 px-8 rounded-md text-base cursor-pointer font-semibold transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </button>

        {analysis && (
          <div className="mt-8 p-5 bg-white rounded-lg border border-gray-200">
            <h4 className="text-slate-800 mb-4 text-lg font-semibold">Analysis Result:</h4>
            <div className="bg-gray-50 p-4 rounded-md border-l-4 border-green-500">
              <pre className="m-0 whitespace-pre-wrap text-slate-600 leading-relaxed">
                {analysis.analysis}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="text-slate-800 font-semibold mb-2.5 text-lg">🔍 Fraud Detection</div>
          <div className="text-gray-600 text-sm leading-relaxed">
            Identify fraudulent billing practices, duplicate claims, and suspicious provider behavior patterns.
          </div>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="text-slate-800 font-semibold mb-2.5 text-lg">💰 Waste Analysis</div>
          <div className="text-gray-600 text-sm leading-relaxed">
            Detect unnecessary procedures, over-utilization of services, and inefficient resource allocation.
          </div>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="text-slate-800 font-semibold mb-2.5 text-lg">⚠️ Abuse Prevention</div>
          <div className="text-gray-600 text-sm leading-relaxed">
            Monitor for abusive healthcare practices, inappropriate billing codes, and policy violations.
          </div>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="text-slate-800 font-semibold mb-2.5 text-lg">🤖 AI-Powered</div>
          <div className="text-gray-600 text-sm leading-relaxed">
            Leverage advanced AI algorithms to analyze healthcare text and identify potential FWA indicators.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
