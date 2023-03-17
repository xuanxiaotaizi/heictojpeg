# heictojpeg
Converting HEIC/HEIF image formats to JPEG in the browser.

Decode using [@saschazar/wasm-heif](https://github.com/saschazar21/webassembly/tree/main/packages/heif), decoding speed increased by nearly 30%.


## Installation
```bash
yarn add heictojpeg
```
## Usage
```javascript
import heictojpeg from "heictojpeg" 

const jpgFile = heictojpeg(file,quality)
```
