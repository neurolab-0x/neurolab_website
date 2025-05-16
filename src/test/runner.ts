import { run } from 'jest';
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};

async function runTests() {
  try {
    const results = await run(['--config', JSON.stringify(config)]);
    if (results.numFailedTests > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error running tests:', error);
    process.exit(1);
  }
}

runTests(); 