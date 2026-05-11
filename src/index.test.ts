import { describe, it, expect, beforeEach } from 'vitest';
import { Config, createConfig, get, set, getDefault } from '../src/index';

describe('Config', () => {
  let config: Config;
  beforeEach(() => { config = createConfig(); });
  it('creates config', () => { expect(config).toBeDefined(); });
  it('has get/set', () => {
    config.set('key', 'value');
    expect(config.get('key')).toBe('value');
  });
});

describe('getDefault', () => {
  it('returns default value', () => {
    expect(getDefault('missing', 'default')).toBe('default');
  });
});
