## Project Repository
- **Repository URL**: https://github.com/DramisInfo/react-sk-agents

## Copilot Instructions

### General
- Follow best practices for code readability, maintainability, and modularity.
- Use clear, descriptive names for variables, functions, and components.
- Add comments where necessary to explain complex logic.

### Frontend
- Use **React** with **TypeScript** for all frontend code.
- Use **functional components** and React Hooks (e.g., useState, useEffect).
- Style components using **Tailwind CSS** utility classes.
- Organize components in a `/src/components` directory.
- Use `/src/pages` for page-level components (if using React Router or similar).
- Prefer composition over inheritance.
- Validate props with TypeScript interfaces or types.
- Use async/await for asynchronous operations.
- Handle loading and error states in UI components.
- Write unit tests for components using a framework like Jest and React Testing Library.
- Make sure it's always running on client-side (no server-side rendering) by adding `use client` at the top of the file.

### Backend
- Write backend APIs in **Python** (preferably using FastAPI or Flask).
- Organize backend code in a `/backend` directory.
- Use type hints for all Python functions and methods.
- Validate API request/response schemas (e.g., with Pydantic for FastAPI).
- Handle errors gracefully and return appropriate HTTP status codes.
- Write unit tests for API endpoints using pytest.

### Integration
- Ensure frontend communicates with backend APIs using fetch or axios.
- Store API URLs and configuration in environment variables.
- Handle CORS as needed for local development.

### Documentation
- Add docstrings to Python functions and classes.
- Add JSDoc comments to TypeScript functions and components where helpful.
- Update README.md with setup and usage instructions when new features are added.

### Commit Messages
- Use clear, concise commit messages describing the change.

### Example Directory Structure
```
/src
  /components
  /pages
  /utils
/backend
  /api
  /models
  /tests
```

### Do Not
- Do not use class-based React components.
- Do not use JavaScript for new frontend code (TypeScript only).
- Do not use inline styles; use Tailwind CSS classes instead.
- Do not commit secrets or sensitive information.

---