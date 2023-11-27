# How to Run:

### 1. Go to this directory and open the terminal

### 2. Go to the BACKEND directory (cd backend)

- do <strong>npm install</strong> to initialize node_modules
- Create .env file.
- Use .env.example as template to setup .env (.env.example to .env)
- Create a .env file or convert .env.example to .env
  - Your .env file should contain the following:
    - PORT=8080
    - MONGODB_URL= url specified in .env.example
    - SESSION_SECRET='any string as a session secret of your choice'
    - AUTH_EMAIL='email specified in .env.example'
    - AUTH_PASS='pass specified in .env.example'
- After finishing everything, Type <strong>npm run dev</strong> to run backend.
- Wait for the backend to connect to the cloud MongoDB database and listen on port 8080 (See console)
- Keep the backend server online so frontend can connect. Open a new terminal window for frontend.

### 3. In a new terminal, Go to the FRONTEND directory (cd frontend)

- do <strong>npm install</strong> to initialize node_modules
- Type <strong>npm run dev</strong> to run frontend.
- Wait for the response in the console
- Click the localhost link provided to proceed to the UI (Usually http://localhost:5173/)
