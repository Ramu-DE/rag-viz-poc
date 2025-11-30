from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from services.ingestion import extract_text_from_file, chunk_text
from services.vectorizer import generate_embeddings
from services.processor import reduce_dimensions, cluster_embeddings
import numpy as np

app = FastAPI(title="RAG Visualization PoC")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "RAG Visualization API is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # 1. Extract Text
    text = await extract_text_from_file(file)
    
    # 2. Chunk Text
    chunks = chunk_text(text)
    
    if not chunks:
        return {"error": "No text found in document"}
        
    # 3. Generate Embeddings
    embeddings = generate_embeddings(chunks)
    
    # 4. Reduce Dimensions (to 2D for visualization)
    coords = reduce_dimensions(embeddings, n_components=2)
    
    # 5. Cluster
    clusters = cluster_embeddings(embeddings)
    
    # 6. Prepare Response
    data = []
    for i, chunk in enumerate(chunks):
        data.append({
            "id": i,
            "text": chunk,
            "x": float(coords[i][0]),
            "y": float(coords[i][1]),
            "cluster": int(clusters[i])
        })
        
    return {"filename": file.filename, "data": data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
