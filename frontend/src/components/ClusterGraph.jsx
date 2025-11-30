import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{
                backgroundColor: '#333',
                padding: '10px',
                border: '1px solid #555',
                borderRadius: '5px',
                maxWidth: '300px',
                color: '#fff',
                zIndex: 1000
            }}>
                <p style={{ margin: 0, fontSize: '0.8rem' }}><strong>Cluster:</strong> {data.cluster}</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>{data.text.substring(0, 150)}...</p>
            </div>
        );
    }
    return null;
};

const ClusterGraph = ({ data }) => {
    const [selectedPoints, setSelectedPoints] = useState([]);

    const handlePointClick = (point) => {
        // Toggle selection
        if (selectedPoints.find(p => p.id === point.id)) {
            setSelectedPoints(selectedPoints.filter(p => p.id !== point.id));
        } else {
            if (selectedPoints.length < 2) {
                setSelectedPoints([...selectedPoints, point]);
            } else {
                // Replace the oldest selection
                setSelectedPoints([selectedPoints[1], point]);
            }
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
            <div style={{ flex: 2, height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis type="number" dataKey="x" name="X" hide />
                        <YAxis type="number" dataKey="y" name="Y" hide />
                        <ZAxis type="number" range={[60, 400]} />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Vectors" data={data} onClick={(e) => handlePointClick(e.payload)}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={selectedPoints.find(p => p.id === entry.id) ? '#ff0000' : COLORS[entry.cluster % COLORS.length]}
                                    stroke={selectedPoints.find(p => p.id === entry.id) ? '#fff' : 'none'}
                                    strokeWidth={2}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
                <p style={{ textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>
                    Click on dots to compare (Max 2)
                </p>
            </div>

            {selectedPoints.length > 0 && (
                <div style={{ flex: 1, borderLeft: '1px solid #444', paddingLeft: '1rem', overflowY: 'auto' }}>
                    <h3>Comparison</h3>
                    {selectedPoints.map((point, idx) => (
                        <div key={point.id} style={{ marginBottom: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '8px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS[point.cluster % COLORS.length] }}>
                                Selection {idx + 1} (Cluster {point.cluster})
                            </h4>
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{point.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClusterGraph;
