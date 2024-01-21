document.getElementById('folderInput').addEventListener('change', function (event) {
    const selectedPath = event.target.files[0].path;
    const path = selectedPath.substring(0, selectedPath.lastIndexOf('\\'));
    document.querySelector('.folderPath').textContent = path;
    loadAndDisplayPictures(path);
});

function loadAndDisplayPictures(path) {
    const picturesContainer = document.querySelector('.pictures-container');
    const pictureFiles = getPictureFiles(path);
    picturesContainer.innerHTML = "";
    pictureFiles.forEach((file, index) => {
        const img = document.createElement('img');
        img.src = `file://${directoryPath}/${file}`;
        img.alt = `${file}`;

        const columnNumber = index % 3 + 2;
        img.classList.add(`column${columnNumber}`);

        picturesContainer.appendChild(img);
    });
}

function getPictureFiles(path) {
    const fs = require('fs');
    const files = fs.readdirSync(path);
    console.log(files);
    return files.filter(file => file.endsWith('.JPG') || file.endsWith('.png'));
}