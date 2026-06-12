const { createCanvas, loadImage } = require('canvas');
async function getBbox(imagePath) {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let minLeft = canvas.width, minTop = canvas.height, maxRight = 0, maxBottom = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const alpha = data[(y * canvas.width + x) * 4 + 3];
        if (alpha > 10) {
          if (x < minLeft) minLeft = x;
          if (x > maxRight) maxRight = x;
          if (y < minTop) minTop = y;
          if (y > maxBottom) maxBottom = y;
        }
      }
    }
    if (minLeft !== canvas.width) {
      console.log(`'${imagePath}': { width: ${canvas.width}, height: ${canvas.height}, bbox: [${minLeft}, ${minTop}, ${maxRight}, ${maxBottom}] }`);
    }
  } catch (err) {}
}
async function run() {
  await getBbox('public/assets/catfail/lv2fail.gif');
  await getBbox('public/assets/catfail/lv3fail.gif');
  await getBbox('public/assets/catfail/lv5fail.gif');
}
run();
