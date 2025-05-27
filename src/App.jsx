
import React, { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeText = async () => {
    if (!text.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('http://0.0.0.0:8000/analyze-fraud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
      })
      
      if (response.ok) {
        const result = await response.json()
        setAnalysis(result)
      } else {
        console.error('Failed to analyze text')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Healthcare FWA Detection</h1>
        <p className="subtitle">Fraud, Waste & Abuse Detection System</p>
      </div>

      <div className="analysis-section">
        <h3>🔍 Analyze Healthcare Text for FWA</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter healthcare-related text to analyze for Fraud, Waste, or Abuse..."
          className="text-input"
          rows={6}
        />
        <button 
          onClick={analyzeText}
          disabled={loading || !text.trim()}
          className="analyze-button"
        >
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </button>

        {analysis && (
          <div className="analysis-result">
            <h4>Analysis Result:</h4>
            <div className="result-content">
              <pre>{analysis.analysis}</pre>
            </div>
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-title">🔍 Fraud Detection</div>
          <div className="feature-desc">
            Identify fraudulent billing practices, duplicate claims, and suspicious provider behavior patterns.
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-title">💰 Waste Analysis</div>
          <div className="feature-desc">
            Detect unnecessary procedures, over-utilization of services, and inefficient resource allocation.
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-title">⚠️ Abuse Prevention</div>
          <div className="feature-desc">
            Monitor for abusive healthcare practices, inappropriate billing codes, and policy violations.
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-title">🤖 AI-Powered</div>
          <div className="feature-desc">
            Leverage advanced AI algorithms to analyze healthcare text and identify potential FWA indicators.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
