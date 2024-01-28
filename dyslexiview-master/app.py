import json
from flask import Flask, request, jsonify
import os

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/', methods=['POST', 'GET'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'})

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected image'})

    if file:
        # Save the uploaded file to the server
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        # MODEL FUNCTIONS HERE
        from PIL import Image
        import numpy as np
        from pytesseract import pytesseract 

        path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
        image_path = filename

        img = Image.open(image_path) 
        pytesseract.tesseract_cmd   = path_to_tesseract 

        original_text = pytesseract.image_to_string(img) 

        # PERFORM SUMMARIZATION HERE
        # summarized_text= 'summarized text'

        from transformers import AutoTokenizer, AutoModelForCausalLM
        import torch

        tokenizer = AutoTokenizer.from_pretrained("philippelaban/keep_it_simple")
        kis_model = AutoModelForCausalLM.from_pretrained("philippelaban/keep_it_simple")

        text= original_text
        all_output = []

        # Process the text in chunks of three lines
        chunk_size = 5
        lines = text.split('\n')
        for i in range(0, len(lines), chunk_size):
            # Get the next three lines
            chunk = "\n".join(lines[i:i+chunk_size])

            # Tokenize and generate output for the chunk
            start_id = tokenizer.bos_token_id
            tokenized_chunk = [(tokenizer.encode(text=chunk) + [start_id])]
            input_ids = torch.LongTensor(tokenized_chunk)

            output_ids = kis_model.generate(input_ids, max_length=1000, num_beams=8, do_sample=True, num_return_sequences=1)
            output_ids = output_ids[:, input_ids.shape[1]:]
            chunk_output = tokenizer.batch_decode(output_ids)
            chunk_output = chunk_output[0].replace(tokenizer.eos_token, "")

            # Append the generated output for the current three lines to the list
            all_output.append(chunk_output)

        # Concatenate all the chunk_output together
        summarized_text = "\n".join(all_output)

        # TEXT TO SPEECH
        from gtts import gTTS
        from IPython.display import Audio

        tts = gTTS(summarized_text, lang='en')  # Adjust language if necessary
        # audio_filename = os.path.join(app.config['UPLOAD_FOLDER'], '1.wav')
        audio_filename1 = os.path.join('E:\Project Docs\web-dev-projects-main\web-dev-projects-main\personal-portfolio\src', '1.wav')
        tts.save(audio_filename1)

        tts = gTTS(original_text, lang='en')  # Adjust language if necessary
        # audio_filename = os.path.join(app.config['UPLOAD_FOLDER'], '1.wav')
        audio_filename2 = os.path.join('E:\Project Docs\web-dev-projects-main\web-dev-projects-main\personal-portfolio\src', '2.wav')
        tts.save(audio_filename2)

        # Return the result of the processing
        return jsonify({'success': True, 'original_text': original_text, 'summarized_text': summarized_text, 'summary_sound': 'uploads/1.wav', 'original_sound': 'uploads/2.wav'})
    else:
        return jsonify({'success': False, 'error': 'Invalid file format'})


if __name__ == "__main__":
    app.run("localhost", 5000)


