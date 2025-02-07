# Weather App Frontend

![image](https://github.com/user-attachments/assets/37fc706a-f59a-4f63-8fe9-aed25e6b7f36)



Welcome to the Weather App frontend application! This modern web application is built using React and Vite, providing an intuitive interface for accessing weather information. You can access the live application at [https://mkhairulhamid.github.io/weatherapp/](https://mkhairulhamid.github.io/weatherapp/).

## Technology Stack

The application leverages modern web technologies for optimal performance and developer experience:

- React 18 for building user interfaces
- Vite as the build tool and development server
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint and TypeScript ESLint for code quality
- GitHub Pages for hosting

## Local Development Setup

First, ensure you have the following prerequisites installed on your system:

- Node.js (version 16.0 or higher)
- npm (normally comes with Node.js) or yarn
- Git for version control

Follow these steps to set up the project locally:

1. Clone the repository:
```bash
git clone https://github.com/MKhairulHamid/weatherapp.git
cd weatherapp
```

2. Install dependencies:
```bash
npm install
# or if you're using yarn
yarn
```

3. Set up environment variables by creating a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://weatherappapi20250207082422.azurewebsites.net
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` by default.

## Available Scripts

Our package.json includes several useful scripts:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

The project follows a standard React application structure with some Vite-specific configurations:

```
weatherapp/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable React components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── services/     # API service functions
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Root component
│   └── main.tsx      # Application entry point
├── .env              # Environment variables
├── index.html        # HTML entry point
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Configuration Files

### vite.config.ts
The Vite configuration file includes settings for GitHub Pages deployment and other build optimizations:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/weatherapp/',  // Required for GitHub Pages deployment
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### tailwind.config.js
Tailwind CSS is configured for optimal development experience:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
}
```

## Deployment

The application is configured for automatic deployment to GitHub Pages. Here's how to deploy:

1. Ensure your repository is configured for GitHub Pages:
   - Go to repository Settings > Pages
   - Set source to GitHub Actions

2. Update the `base` property in `vite.config.ts` to match your repository name:
```typescript
base: '/weatherapp/'  // Should match your repository name
```

3. Deploy using the npm script:
```bash
npm run deploy
# or
yarn deploy
```

This will:
- Build the application
- Push the built files to the gh-pages branch
- Deploy to GitHub Pages

## Development Guidelines

When contributing to the project, please follow these practices:

1. Type Safety: Use TypeScript types for all components and functions:
```typescript
interface WeatherProps {
  city: string;
  temperature: number;
}

const Weather: React.FC<WeatherProps> = ({ city, temperature }) => {
  // Component implementation
}
```

2. API Calls: Use the services directory for API calls:
```typescript
// src/services/weatherService.ts
export const getWeather = async (city: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/WeatherForecast/${city}`);
  return response.json();
}
```

3. Styling: Use Tailwind CSS classes for styling:
```tsx
<div className="flex items-center justify-center p-4 bg-blue-100">
  {/* Component content */}
</div>
```

## Troubleshooting

Common issues and their solutions:

1. CORS Issues:
   - Ensure the API URL in `.env` is correct
   - Check if the API has CORS enabled for your development domain

2. Build Failures:
   - Clear the `dist` directory
   - Remove `node_modules` and package-lock.json, then run `npm install`

3. TypeScript Errors:
   - Run `npm run lint` to identify issues
   - Ensure all required types are properly defined

## Support

For support and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed information about your problem
3. Include relevant error messages and screenshots
