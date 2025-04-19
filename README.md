# react-sk-agents

A modern, modular web application using React (TypeScript) for the frontend and Python (FastAPI or Flask) for the backend. This project is structured for scalability, maintainability, and ease of development.

## Features
- **Frontend**: React with TypeScript, functional components, React Hooks, Tailwind CSS for styling
- **Backend**: Python (FastAPI or Flask), type hints, Pydantic validation, organized API structure
- **Testing**: Jest & React Testing Library (frontend), pytest (backend)
- **API Integration**: Async communication between frontend and backend, environment-based configuration
- **Best Practices**: Modular code, clear naming, error handling, prop and schema validation

## Directory Structure
```
/src
  /components      # Reusable React components
  /pages           # Page-level React components (if using React Router)
  /utils           # Utility functions
/backend
  /api             # API route definitions
  /models          # Pydantic models and database schemas
  /tests           # Backend unit tests
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.9+

### Frontend Setup
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend Setup
```bash
# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies (example for FastAPI)
pip install fastapi uvicorn pydantic

# Run the backend server
uvicorn backend.api.main:app --reload
```

### Environment Variables
- Store API URLs and configuration in `.env` files for both frontend and backend.
- Example (frontend): `REACT_APP_API_URL=http://localhost:8000`
- Example (backend): `CORS_ORIGINS=http://localhost:3000`

## Testing
- **Frontend**: `npm test`
- **Backend**: `pytest backend/tests`

## Development Guidelines
- Use clear, descriptive names for variables, functions, and components.
- Add comments and documentation for complex logic.
- Validate props (frontend) and schemas (backend).
- Handle loading and error states in UI and API responses.
- Do not commit secrets or sensitive information.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes with clear messages
4. Push to your fork and open a Pull Request

## License
[MIT](LICENSE)
