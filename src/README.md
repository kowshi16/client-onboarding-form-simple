# Client Onboarding Form

A modern client onboarding form built with Next.js, React Hook Form, and Zod validation.

## Features

- Modern UI with Tailwind CSS
- Form validation with Zod + React Hook Form
- TypeScript support
- Comprehensive test suite
- Responsive design

## Tech Stack

- **Next.js 14** - React framework
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Jest** - Testing

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local`:
   ```env
   NEXT_PUBLIC_ONBOARD_URL=https://your-api-endpoint.com/onboard
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm test         # Run tests
npm run test:watch # Run tests in watch mode
```

## Form Fields

- **Personal Info**: Full name, email, company name
- **Services**: Multi-select service options
- **Budget**: Optional budget range ($100 - $1,000,000)
- **Start Date**: Project start date (no past dates)
- **Terms**: Required terms acceptance

## Testing

Run the test suite:

```bash
npm test
```

Includes 40+ test cases covering:
- Schema validation
- Field-specific rules
- Error handling
- Edge cases

## Project Structure

```
├── app/                     # Next.js pages
├── components/              # React components
├── lib/validations/         # Zod schemas
├── __tests__/              # Test files
└── types/                  # TypeScript types
```

## License

MIT