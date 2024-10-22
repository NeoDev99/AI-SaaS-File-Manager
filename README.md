# SaaS AI-based File Manager

![GitHub repo size](https://img.shields.io/github/repo-size/UmbrellaSkiies/AI-SaaS-File-Manager)
![GitHub stars](https://img.shields.io/github/stars/UmbrellaSkiies/AI-SaaS-File-Manager?style=social)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/UmbrellaSkiies/OnlineJobPortal)
![GitHub forks](https://img.shields.io/github/forks/UmbrellaSkiies/AI-SaaS-File-Manager?style=social)
![GitHub followers](https://img.shields.io/github/followers/UmbrellaSkiies?label=Followers&logoColor=blue&style=flat)

Welcome to the SaaS AI-based File Manager project! This project combines a Python Flask backend for handling server-side logic with a React frontend for a dynamic user interface.

## Demo Image
![Demo Website Image](Demo_Image/demo.png)

## Contents
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
  * [Installation](#installation)
* [Folder Structure](#folder-structure)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Contributing](#contributing)
* [Contact](#contact)
* [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Python](https://www.python.org/) (with pip)
- [Node.js](https://nodejs.org/) (with npm)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/UmbrellaSkiies/AI-SaaS-File-Manager.git
   ```

### Installation

1. **Backend:**

   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

The Flask backend will be running at http://127.0.0.1:5000/.


2. **Frontend:**

    ```bash
    cd frontend/
    npm install
    npm start
    ```

    The React frontend will be accessible at http://localhost:5173/.


### Folder Structure

```
AI-SaaS-File-Manager/
│
├── backend/
│   ├── static/
│   ├── templates/
│   ├── uploads/
│   ├── app.py
│   ├── requirements.txt
│   └── ... (other backend files)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ... (React components)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ... (other frontend files)
│   ├── package.json
│   └── ... (other frontend configuration files)
│
├── Demo_Image/
│   └── demo.png
│
├── README.md
└── ... (other project files)
```


### Dependencies

#### Backend:
* Flask: Web framework for Python.
* flask_cors: To handle CORS.
* Werkzeug: WSGI utility library.
* requests: To make HTTP requests (if needed).
* Jinja2: Templating engine for Flask.
* MarkupSafe: Provides security for Jinja2.
* python-dotenv: To load environment variables from a .env file.
* shutil: High-level file operations.

#### Frontend:
* React: JavaScript library for building user interfaces.
* Axios: HTTP client for making requests.


### Usage

- Open your browser and visit http://localhost:5173/
- Drag and drop files onto the screen to organize them using the AI-based File Manager.


### Contributing

- Fork the repository.
- Create a new branch: `git checkout -b feature/new-feature`.
- Commit your changes: `git commit -m 'Add new feature'`.
- Push to the branch: `git push origin feature/new-feature`.
- Submit a pull request.


### Acknowledgments

Thanks to the open-source community for their contributions.


### Contact

If you want to contact me you can reach me at [LinkedIn](https://linkedin.com/in/neo-titebe-120536254) or [Instagram](https://instagram.com/9teen_99).


### License

This project is **free to use** and does not contain any license.
