// List of ASCII characters sorted by brightness
// See https://stackoverflow.com/a/67780964
const ASCII_CHARS = ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O","0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",")","1","{","}","[","]","?","-","_","+","~","<",">","i","!","l","I",";",":",",","\"","^","`","'",".","&nbsp;"]

function getBrightness(r, g, b) {
    // Calculate perceived brightness using the formula
    var brightness = Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b) / 255;

    // Return the brightness value in the range of 0-1
    return brightness;
}  

async function getImagePixels(src){
    // Create image element
    const img = new Image();
    img.src = src;
    // Create canvas
    const canvas = document.createElement('canvas');
    // Wait for image to load
    return await new Promise((resolve, reject) => {
        img.onload = () => {
            // Set canvas dimensions
            canvas.width = img.width;
            canvas.height = img.height;
            // Draw image on canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Append canvas to body
            // TODO: Remove
            document.body.appendChild(canvas);
            // Get img pixels
            const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height, {colorSpace:'display-p3'}).data;
            console.log(pixels);
            // Store pixel brightness in matrix
            let pixelMatrix = '';
            for (let i = 0; i < canvas.height; i ++){
                for (let j = 0; j < canvas.width; j ++){
                    // Get pixel index
                    const index = (i * canvas.width + j) * 4;
                    // Calculate brightness
                    const red = pixels[index], 
                        green = pixels[index+1], 
                        blue = pixels[index+2],
                        alpha = pixels[index+3];
                    // Get relative brightness
                    const relativeBrightness = getBrightness(red, green, blue);
                    // Get character
                    let pixelChar = ASCII_CHARS[(Math.floor(1-relativeBrightness)*(ASCII_CHARS.length-1))]
                    pixelMatrix += pixelChar
                }
                pixelMatrix += '<br />';
            }
            // console.log(pixelMatrix);
            // Create div in body
            const div = document.createElement('div');
            div.innerHTML = pixelMatrix;
            document.body.appendChild(div);
        }
        img.onerror = reject;
    });
}