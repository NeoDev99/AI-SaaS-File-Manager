from flask import Flask, request, jsonify, send_from_directory, render_template, redirect
from flask_cors import CORS
import os
import shutil  # Import shutil for removing directories

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ----------------------------------------------------------------------------------

# Redirect the home route to the front-end application
@app.route('/')
def home():
    return redirect('http://localhost:5173')  # Assuming your front-end runs on port 5173

@app.route('/favicon.ico')  # Fix the favicon icons
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

# ---------------------------------------------------------------------------------

# Set the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def get_file_size(file_path):
    size_in_bytes = os.path.getsize(file_path)
    if size_in_bytes < 1024:
        return f"{size_in_bytes} B"
    elif size_in_bytes < 1024 * 1024:
        return f"{size_in_bytes / 1024:.2f} KB"
    else:
        return f"{size_in_bytes / (1024 * 1024):.2f} MB"

# ---------------------------------------------------------------------------------
# Uploading a file Function
# ---------------------------------------------------------------------------------

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({'message': 'No file part'})

    uploaded_files = request.files.getlist('files')

    for file in uploaded_files:
        if file:
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    return jsonify({'message': 'Files uploaded successfully'})

# ---------------------------------------------------------------------------------
# Listing files and folders Function
# ---------------------------------------------------------------------------------

@app.route('/list_files', methods=['GET'])
def list_files():
    items = os.listdir(app.config['UPLOAD_FOLDER'])
    item_list = []
    for item_name in items:
        item_path = os.path.join(app.config['UPLOAD_FOLDER'], item_name)
        if os.path.isdir(item_path):
            item_type = 'folder'
            item_size = None
        else:
            item_type = 'file'
            item_size = get_file_size(item_path)
        item_list.append({'name': item_name, 'size': item_size, 'type': item_type})
    return jsonify({'files': item_list})

@app.route('/file_stats', methods=['GET'])
def file_stats():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    total_size = sum(os.path.getsize(os.path.join(app.config['UPLOAD_FOLDER'], f)) for f in files)
    total_files = len(files)
    return jsonify({'totalFiles': total_files, 'totalSize': total_size})

# ---------------------------------------------------------------------------------
# Renaming a file Function 
# --------------------------------------------------------------------------------- 

@app.route('/rename_file', methods=['POST'])
def rename_file():
    data = request.get_json()
    old_name = data.get('oldName')
    new_name = data.get('newName')

    if not old_name or not new_name:
        return jsonify({'message': 'Invalid input'}), 400

    old_path = os.path.join(app.config['UPLOAD_FOLDER'], old_name)
    new_path = os.path.join(app.config['UPLOAD_FOLDER'], new_name)

    # Extract the extension from old_name
    old_extension = os.path.splitext(old_name)[1]
    new_extension = os.path.splitext(new_name)[1]

    if old_extension != new_extension:
        return jsonify({'message': 'Changing file extension is not allowed'}), 400

    if not os.path.exists(old_path):
        return jsonify({'message': 'File not found'}), 404

    if os.path.exists(new_path):
        return jsonify({'message': 'New name already exists'}), 400

    os.rename(old_path, new_path)
    return jsonify({'message': 'File renamed successfully'})

# ---------------------------------------------------------------------------------
# Deleting a file Function
# ---------------------------------------------------------------------------------

@app.route('/delete_file', methods=['POST'])
def delete_file():
    data = request.get_json()
    file_name = data.get('file')

    if not file_name:
        return jsonify({'message': 'File name not provided'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)

    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'message': f'File {file_name} deleted successfully'}), 200
    else:
        return jsonify({'message': f'File {file_name} not found'}), 404

# ---------------------------------------------------------------------------------
# Creating a folder Function
# ---------------------------------------------------------------------------------

@app.route('/create_folder', methods=['POST'])
def create_folder():
    data = request.get_json()
    folder_name = data.get('folder')

    if not folder_name:
        return jsonify({'message': 'Folder name not provided'}), 400

    folder_path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)

    if os.path.exists(folder_path):
        return jsonify({'message': f'Folder {folder_name} already exists'}), 400

    try:
        os.makedirs(folder_path)
        return jsonify({'message': f'Folder {folder_name} created successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error creating folder: {e}'}), 500

# ---------------------------------------------------------------------------------
# Deleting a folder Function
# ---------------------------------------------------------------------------------

@app.route('/delete_folder', methods=['POST'])
def delete_folder():
    data = request.get_json()
    folder_name = data.get('folder')

    if not folder_name:
        return jsonify({'message': 'Folder name not provided'}), 400

    folder_path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)

    if os.path.exists(folder_path):
        try:
            shutil.rmtree(folder_path)
            return jsonify({'message': f'Folder {folder_name} deleted successfully'}), 200
        except Exception as e:
            return jsonify({'message': f'Error deleting folder: {e}'}), 500
    else:
        return jsonify({'message': f'Folder {folder_name} not found'}), 404


# ---------------------------------------------------------------------------------
# Error Handlers
# ---------------------------------------------------------------------------------

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.errorhandler(403)
def forbidden(e):
    return render_template('403.html'), 403

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return render_template('405.html'), 405


if __name__ == '__main__':
    app.run(debug=True)
