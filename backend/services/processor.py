from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.manifold import TSNE
import numpy as np

def reduce_dimensions(embeddings: np.ndarray, n_components: int = 2) -> np.ndarray:
    # Use PCA for speed, or t-SNE for better visualization if dataset is small enough
    if len(embeddings) > 50:
        pca = PCA(n_components=n_components)
        return pca.fit_transform(embeddings)
    else:
        # Fallback or just use PCA for consistency in this PoC
        pca = PCA(n_components=n_components)
        return pca.fit_transform(embeddings)

def cluster_embeddings(embeddings: np.ndarray, n_clusters: int = 5) -> np.ndarray:
    # Dynamically adjust n_clusters if we have fewer samples
    n_samples = len(embeddings)
    if n_samples < n_clusters:
        n_clusters = max(1, n_samples)
        
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    return kmeans.fit_predict(embeddings)
