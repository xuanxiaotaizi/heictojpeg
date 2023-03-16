import WebWorker from 'web-worker:./worker.js';

export default function heicTojpg({
  file,
  quality = 0.9
}){
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      console.error(`ERR_USER library only accepts File as input`);
      return
    }
    if (typeof quality !== "number") {
      console.error(
        `ERR_USER "quality" parameter should be of type "number"`
      );
      return
    }
    const worker = new WebWorker()
    worker.postMessage(file)
    worker.onmessage = (e) => {
      const data = e.data
      const canvas = document.createElement('canvas')
      canvas.width = data.width
      canvas.height = data.height
      const ctx = canvas.getContext("2d")
      ctx.putImageData(data.imgData, 0, 0)
      const filename = file.name.replace(/\.[^.]+$/, '.jpg');
      canvas.toBlob(
        (blob) => {
          const fileResult = new File([blob], filename, {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          })
          resolve(fileResult)
        },
        'image/jpeg',
        quality
      )
    }
  })
}