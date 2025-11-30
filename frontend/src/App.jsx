import { useState } from 'react'
import Upload from './components/Upload'
import ClusterGraph from './components/ClusterGraph'
import './App.css'

function App() {
    const [graphData, setGraphData] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <div className="container">
            <h1>RAG Vector Visualization</h1>
            <p className="subtitle">Upload a document to visualize semantic clusters</p>

            <div className="card">
                <Upload setGraphData={setGraphData} setLoading={setLoading} />
            </div>

            {loading && <p>Processing document... (Embedding & Clustering)</p>}

            {graphData && (
                <div className="graph-container">
                    <ClusterGraph data={graphData} />
                </div>
            )}
        </div>
    )
}

export default App
