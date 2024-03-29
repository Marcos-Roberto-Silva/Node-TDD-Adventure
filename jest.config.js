module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
  '<rootDir>/src/**/*.ts',
  '!<rootDir>/src/main/**',
  '!<rootDir>/src/**/*-protocols.ts',
  '!**/protocols/**',
  '!**/test/**',
  '!**/domain/**'
],
  coverageProvider: "v8",
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};
