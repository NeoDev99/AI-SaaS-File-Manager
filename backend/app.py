from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({'message': 'No file part'})

    uploaded_files = request.files.getlist('files')

    for file in uploaded_files:
        if file:
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    return jsonify({'message': 'Files uploaded successfully'})

@app.route('/list_files', methods=['GET'])
def list_files():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify({'files': files})

if __name__ == '__main__':
    app.run(debug=True)
