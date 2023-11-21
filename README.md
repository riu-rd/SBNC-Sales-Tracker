# How to Run:

### 1. Go to this directory and open the terminal

### 2. Go to the BACKEND directory (cd backend)

- do <strong>npm install</strong> to initialize node_modules
- check if the .env file is initialized.
- Use .env.example as template to setup .env (.env.example to .env) (use 8080 as port for convenience)
- Create a .env file or convert .env.example to .env
- Type <strong>npm run dev</strong> to run backend.
- Wait for the backend to connect to the cloud MongoDB database and listen on port 8080 (See console)
- Keep the backend server online so frontend can connect. Open a new terminal window for frontend.

### 3. Go to the FRONTEND directory (cd frontend)

- do <strong>npm install</strong> to initialize node_modules
- Type <strong>npm run dev</strong> to run frontend.
- Wait for the response in the console
- Click the localhost link provided to proceed to the UI (Usually http://localhost:5173/)
