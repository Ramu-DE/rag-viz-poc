import React, { useState } from 'react';
import axios from 'axios';
import { Upload as UploadIcon } from 'lucide-react';

const Upload = ({ setGraphData, setLoading }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Assuming backend is on localhost:8000
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setGraphData(response.data.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to process file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".txt,.pdf"
                    style={{ fontSize: '100px', position: 'absolute', left: 0, top: 0, opacity: 0 }}
                />
                <button className="btn" style={{ pointerEvents: 'none' }}>
                    {file ? file.name : 'Choose PDF/Text File'}
                </button>
            </div>

            <button onClick={handleUpload} disabled={!file} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UploadIcon size={16} />
                Visualize Vectors
            </button>
        </div>
    );
};

export default Upload;
