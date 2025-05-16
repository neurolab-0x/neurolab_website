import { run } from 'jest';
import type { AggregatedResult } from '@jest/test-result';

async function runTests() {
  try {
    // Run Jest with the config file
    const results = await run(['--config', 'jest.config.cjs']) as unknown as AggregatedResult;

    if (results.numFailedTests > 0) {
      console.error('Tests failed!');
      process.exit(1);
    }

    console.log('All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('Error running tests:', error);
    process.exit(1);
  }
}

runTests(); 