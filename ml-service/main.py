from fastapi import FastAPI, File, UploadFile
from transformers import pipeline
from PIL import Image
import io

# 1. Initialize the FastAPI app
app = FastAPI(title="Image Analysis AI Chef")

# 2. Load the ML models once when the server starts
# This is efficient! The "chef" prepares tools before service begins.
print("Loading Image Classification Model...")
image_classifier = pipeline("image-classification", model="google/vit-base-patch16-224")
print("Classification Model Loaded.")

print("Loading Image Captioning Model...")
image_captioner = pipeline(
    "image-to-text", model="Salesforce/blip-image-captioning-base"
)
print("Captioning Model Loaded.")


# 3. Define the API endpoint
@app.post("/process-image", tags=["Image Analysis"])
async def process_image(file: UploadFile = File(...)):
    """
    Receives an image, analyzes it for labels and a caption.
    This is our main "cooking" station.
    """
    # Read the image file from the upload
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    # 4. Perform the ML analysis (the "cooking")
    print(f"Processing image: {file.filename}")
    labels = image_classifier(image)
    caption_result = image_captioner(image)

    # 5. Return the combined results as JSON
    # The final dish served to the "Main Kitchen"
    return {
        "filename": file.filename,
        "labels": labels,
        "caption": caption_result[0]["generated_text"],
    }


@app.get("/", tags=["Root"])
def read_root():
    """A simple endpoint to confirm the server is running."""
    return {"message": "Welcome to the Specialist Chef's Kitchen!"}
