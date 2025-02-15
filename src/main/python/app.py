import gradio as gr
from fastapi import FastAPI
import uvicorn

app = FastAPI()

# Define a simple function for text generation
def generate_text(prompt):
    return f"Generated text for: {prompt} 🚀"

# Gradio Interface
gradio_interface = gr.Interface(fn=generate_text, inputs="text", outputs="text")

# Mount Gradio inside FastAPI
@app.get("/")
def home():
    return {"message": "Hello, FastAPI + Gradio!"}

app = gr.mount_gradio_app(app, gradio_interface, path="/gradio")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
