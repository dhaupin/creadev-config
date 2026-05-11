# @creadev.org/config

> Config - environment configuration

[![npm](https://img.shields.io/npm/v/@creadev.org/config)](https://www.npmjs.com/package/@creadev.org/config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install @creadev.org/config
```

## Usage

```typescript
import { Config, createConfig, get, set } from '@creadev.org/config';

const config = createConfig();
await config.set('DEBUG', true);
const value = await config.get('DEBUG');
```

## API

| Function | Description |
|----------|-------------|
| `createConfig(options?)` | Create config instance |
| `get(key)` | Get config value |
| `set(key, value)` | Set config value |

## License

MIT
trigger
