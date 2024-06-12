const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/src/shared/tests/stubs/styleMock.ts',
    '\\.(png|webp|jpg|jpeg|gif|mp3)$': '<rootDir>/src/shared/tests/stubs/imageStub.ts',
  },
};
