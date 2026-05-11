/**
 * @creadev.org/config
 *
 * Config registry + environment.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ConfigOptions {
  /** Override defaults */
  defaults?: Record<string, unknown>;
  /** Prefix for env vars (default: 'CREADEV') */
  prefix?: string;
}

export interface ConfigSource {
  /** Get value */
  get<T>(key: string, defaultValue?: T): T | undefined;
  /** Set value */
  set<T>(key: string, value: T): void;
  /** Check exists */
  has(key: string): boolean;
  /** Delete */
  delete(key: string): boolean;
  /** All keys */
  keys(): string[];
}

// ============================================================================
// CONFIG
// ============================================================================

export class Config implements ConfigSource {
  private defaults: Record<string, unknown>;
  private values: Map<string, unknown>;
  private prefix: string;

  constructor(options: ConfigOptions = {}) {
    this.defaults = options.defaults ?? {};
    this.values = new Map();
    this.prefix = options.prefix ?? 'CREADEV';
  }

  /** Get value */
  get<T>(key: string, defaultValue?: T): T | undefined {
    // Check runtime values first
    if (this.values.has(key)) {
      return this.values.get(key) as T;
    }

    // Check defaults
    if (key in this.defaults) {
      return this.defaults[key] as T;
    }

    // Check environment variable (browser-safe)
    const envKey = `${this.prefix}_${key.toUpperCase()}`;
    const hasProcessEnv = typeof globalThis !== 'undefined' && 'process' in globalThis;
    if (hasProcessEnv) {
      const proc = (globalThis as any).process;
      if (proc?.env?.[envKey]) {
        return proc.env[envKey] as T;
      }
    }

    return defaultValue;
  }

  /** Set value */
  set<T>(key: string, value: T): void {
    this.values.set(key, value);
  }

  /** Check exists */
  has(key: string): boolean {
    return this.values.has(key) || key in this.defaults;
  }

  /** Delete */
  delete(key: string): boolean {
    return this.values.delete(key);
  }

  /** All keys */
  keys(): string[] {
    return [...new Set([...Object.keys(this.defaults), ...this.values.keys()])];
  }

  /** Reset to defaults */
  reset(): void {
    this.values.clear();
  }

  /** Get all values */
  all(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key of this.keys()) {
      result[key] = this.get(key);
    }
    return result;
  }
}

// ============================================================================
// FACTORY
// ============================================================================

export function createConfig(options?: ConfigOptions): Config {
  return new Config(options);
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

const defaultConfig = new Config({
  defaults: {
    /** API Keys */
    github: { token: '' },
    openai: { apiKey: '' },
    anthropic: { apiKey: '' },
    /** Storage */
    storage: { type: 'memory' },
    /** Log level */
    log: { level: 'info' },
  },
});

/** Get default config */
export function getDefault(): Config {
  return defaultConfig;
}

/** Get config value */
export function get<T>(key: string, defaultValue?: T): T | undefined {
  return defaultConfig.get<T>(key, defaultValue);
}

/** Set config value */
export function set<T>(key: string, value: T): void {
  defaultConfig.set(key, value);
}

/** Check config */
export function has(key: string): boolean {
  return defaultConfig.has(key);
}