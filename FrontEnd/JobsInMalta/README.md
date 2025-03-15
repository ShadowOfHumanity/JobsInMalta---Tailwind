# JobsInMalta - Frontend

A modern job board application built with React, TypeScript, and TailwindCSS.

## 🚀 Features

- 🌓 Dark/Light mode
- 📱 Fully responsive design
- 🔍 Advanced job search
- 🏷️ Dynamic job filtering
- 💼 Job cards with interactive elements
- 🎨 Modern UI with animations

## 🛠️ Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Vite
- Axios for API calls

## 🏃‍♂️ Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

## 📁 Project Structure

```
src/
├── Components/      # Reusable UI components
├── Pages/          # Page components
├── Hooks/          # Custom React hooks
├── API-RELATED/    # API configuration
├── Users/          # User-related interfaces
└── types.ts        # Global TypeScript types
```

## 🎨 UI Components

- **Navbar**: Navigation with dark mode toggle
- **SearchBar**: Advanced search with filters
- **JobCards**: Interactive job listings
- **DropDownMenu**: Reusable dropdown component

## 🔄 State Management

Currently using React's built-in state management with hooks. For future scaling, consider implementing:
- Redux Toolkit
- Zustand
- React Query

## 📝 Development Notes

- Use TailwindCSS for styling
- Follow TypeScript best practices
- Implement responsive design
- Maintain dark mode compatibility

## 🔜 TODO

- [ ] Implement user authentication
- [ ] Add job application flow
- [ ] Enhance filter system
- [ ] Add job posting feature
- [ ] Implement real-time notifications
