// Environment variables configuration
export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || '',
  NEXT_PUBLIC_USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
} as const;

// Validation function to ensure required environment variables are set
export function validateEnv() {
  if (!env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is required');
  }

  if (!env.NEXT_PUBLIC_API_KEY) {
    console.warn('NEXT_PUBLIC_API_KEY is not set. API requests may fail.');
  }
}

// Type definitions for environment variables
export interface ProcessEnv {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_API_KEY: string;
  NEXT_PUBLIC_USE_MOCK: string;
  NEXT_PUBLIC_GA_ID: string;
}
