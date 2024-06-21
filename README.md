# Atomicals-Dev-Kit
Node.js module to aid developers working with Bitcoin atomicals. This module provides utility functions and tools to simplify the development process. Running on Node.js runtime only. 

## Can I trust this code?
Don't trust it. Verify it yourself.

## Source
https://github.com/disco-quotidie/atomicals-dev-kit

## Install
```
npm install atomicals
```

## Module Functions
- getByTicker: fetch metadata regarding an ARC-20 token ticker
- checkFTTickerExistence: check if an ARC-20 token ticker already exists

## Usage
```
const { getByTicker, checkFTTickerExistence } = require('atomicals')

const result = await getByTicker("atom")
const { success, result: exists } = await checkFTTickerExistence('infinity')
```

## LICENSE [MIT](LICENSE)

## Contribution
Any issue/PR will be welcomed.