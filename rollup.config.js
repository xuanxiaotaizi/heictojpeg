import resolve from 'rollup-plugin-node-resolve'
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import liveServer from 'rollup-plugin-live-server';
import { babel } from '@rollup/plugin-babel'
import {base64} from 'rollup-plugin-base64'


let config = {}

if(process.env.ENV === 'dev'){
  config = {
    input: './src/index.js', 
    output: [
      {
        format: 'esm', 
        file: 'dist/index.js',
        name: 'heciTojpg'
      },
    ],
    plugins: [
      webWorkerLoader(),
      resolve(),
      babel({ exclude: "node_modules/**" }),
      liveServer({
        port: 8090,
        host: '0.0.0.0',
        root: 'example',
        file: 'index.html',
        mount: [['/dist', './dist']],
        open: false,
        wait: 500,
    }),
    ]
  }
}else{
  config = {
    input: './src/index.js', 
    output: [
      {
        format: 'esm', 
        file: 'dist/index.js',
        name: 'heciTojpg'
      }
      
    ],
    plugins: [
      webWorkerLoader(),
      resolve(),
      base64({ include: "**/*.wasm" }),
      babel({ exclude: "node_modules/**" }),
    ]
  }
}

export default  config