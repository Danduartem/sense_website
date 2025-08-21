/**
 * ESLint Configuration - Mentoria Seja Livre
 * JavaScript code quality and consistency rules
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  
  extends: [
    'eslint:recommended'
  ],
  
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  
  rules: {
    // Code quality rules
    'no-console': 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'prefer-const': 'error',
    
    // Style consistency
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // Best practices
    'eqeqeq': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-alert': 'warn',
    
    // Accessibility recommendations
    'no-document-write': 'error'
  },
  
  globals: {
    // Global variables for the project
    'window': 'readonly',
    'document': 'readonly',
    'console': 'readonly',
    'dataLayer': 'readonly',
    'gtag': 'readonly',
    'msluTrackingUtils': 'readonly',
    'msluLandingTracking': 'readonly',
    'msluIdentityManager': 'readonly',
    'msluEmailTracking': 'readonly',
    'openLeadModal': 'readonly'
  },
  
  overrides: [
    {
      files: ['**/*.njk', '**/*.html'],
      rules: {
        // Disable JavaScript rules for template files
        'no-undef': 'off',
        'no-unused-vars': 'off'
      }
    }
  ]
};