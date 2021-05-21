let grayButton = document.getElementById("grayBtn");
let sepiaButton = document.getElementById("sepiaBtn");
let blurButton = document.getElementById("blurBtn");
let opacityButton = document.getElementById("opacityBtn");
let saturateButton = document.getElementById("saturateBtn");
let image = document.getElementById("cnv");
grayButton.addEventListener("click", () => {
    image.classList.toggle("imgGrayscale")
});
sepiaButton.addEventListener("click", () => {
    image.classList.toggle("imgSepia")
});
blurButton.addEventListener("click", () => {
    image.classList.toggle("imgBlur")
});
opacityButton.addEventListener("click", () => {
    image.classList.toggle("imgOpacity")
});
saturateButton.addEventListener("click", () => {
    image.classList.toggle("imgSaturate")
});

