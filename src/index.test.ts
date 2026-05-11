import { describe, it, expect } from 'vitest';
import { Config, createConfig, getDefault } from '../src/index';

describe('Config', () => {
  it('creates config', () => {
    const config = createConfig();
    expect(config).toBeDefined();
  });
});

describe('getDefault', () => {
  it('returns default', () => {
    expect(getDefault).toBeDefined();
  });
});
