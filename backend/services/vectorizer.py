from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# Use TF-IDF as a lightweight alternative to BERT for Replit Free Tier
# (PyTorch is too large for the disk quota)
vectorizer = TfidfVectorizer(stop_words='english', max_features=384)

def generate_embeddings(texts: list[str]):
    if not texts:
        return np.array([])
    
    # Fit-transform on the current batch (in a real app, fit on a corpus once)
    # For this PoC, we re-fit on every upload to visualize *that* document's structure
    embeddings = vectorizer.fit_transform(texts).toarray()
    return embeddings
