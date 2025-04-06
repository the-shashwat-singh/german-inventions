# Contributing to German Innovations

Thank you for your interest in contributing to the German Innovations project! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork to your local machine
3. Install dependencies with `npm install`
4. Run the development server with `npm run dev`

## Development Workflow

1. Create a new branch for your feature/fix: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests and linting: `npm run lint`
4. Commit your changes with meaningful commit messages
5. Push to your fork and submit a pull request

## Project Structure

- `/src/app`: Next.js app router pages and routes
- `/src/components`: Reusable React components
- `/src/data`: Data files containing information about inventions
- `/public`: Static assets (images, models, etc.)

## Adding New Content

### Adding a New Invention

1. Add the invention image to `/public/inventions/`
2. Update the relevant data file in `/src/data/`

### Adding a New Inventor

1. Add the inventor image to `/public/inventors/`
2. Update the relevant data file in `/src/data/`

## Code Style

- Follow existing code style and patterns
- Use TypeScript types wherever possible
- Use Tailwind CSS for styling
- Use meaningful component and variable names

## Pull Request Process

1. Update the README.md with details of changes if appropriate
2. Your PR should pass all CI checks
3. Your PR will be merged once approved by a maintainer

## Questions?

If you have any questions, please open an issue on GitHub. 