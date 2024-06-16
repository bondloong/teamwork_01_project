const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __API_SERVER_PORT__: process.env.API_SERVER_PORT || 'test-api-server-port',
    __API_SERVER_HOST__: process.env.API_SERVER_HOST || 'test-api-server-host',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/src/shared/tests/stubs/styleMock.ts',
    '\\.(png|webp|jpg|jpeg|gif|mp3)$': '<rootDir>/src/shared/tests/stubs/imageStub.ts',
  },
};
