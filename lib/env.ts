// Environment validation for error prevention
export function validateEnvironment() {
  const requiredEnvVars: string[] = [
    // Add any required environment variables here
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Validate on import
if (typeof window === 'undefined') {
  validateEnvironment();
}
