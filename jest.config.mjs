const config = {
  testEnvironment: 'node',
  transform: {},
  transformIgnorePatterns: ['/node_modules/'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  verbose: true,
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js']
};

export default config;
