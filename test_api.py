import requests
import io

def test_upload():
    url = "http://localhost:8000/upload"
    
    # Create a dummy text file
    content = "This is a test document about artificial intelligence. AI is changing the world. Machine learning is a subset of AI."
    file = io.BytesIO(content.encode('utf-8'))
    files = {"file": ("test.txt", file, "text/plain")}
    
    try:
        response = requests.post(url, files=files)
        if response.status_code == 200:
            data = response.json()
            print("Success!")
            print(f"Filename: {data['filename']}")
            print(f"Number of chunks: {len(data['data'])}")
            print(f"First chunk cluster: {data['data'][0]['cluster']}")
            print(f"First chunk coords: ({data['data'][0]['x']}, {data['data'][0]['y']})")
        else:
            print(f"Failed: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Error: {e}")
        print("Make sure the backend is running on localhost:8000")

if __name__ == "__main__":
    test_upload()
