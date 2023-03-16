import wasmbase64 from "./wasm_heif.wasm";
import wasm_heif from "./wasm_heif";

function base64ToBuffer(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function fileToArrayBuffer(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = function (result) {
      resolve(result.target.result);
    };
    reader.readAsArrayBuffer(file);
  });
}

async function heic2JpgWasm(file) {
  try {
    const buffer = await fileToArrayBuffer(file);
    const array = new Uint8Array(buffer);

    const decoder = await wasm_heif({
      wasmBinary: base64ToBuffer(wasmbase64),
    });
    const decoded = decoder.decode(array, array.length, true);
    const dim = decoder.dimensions();
    decoder.free();
    const imgData = new ImageData(
      Uint8ClampedArray.from(decoded),
      dim.width,
      dim.height
    );
    postMessage({
      width: dim.width,
      height: dim.height,
      imgData: imgData,
    });
  } catch (error) {
    console.error("Parsing failed");
    throw error;
  }
}

onmessage = async (e) => {
  await heic2JpgWasm(e.data);
};
