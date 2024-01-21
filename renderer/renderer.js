document.getElementById('folderInput').addEventListener('change', async function (event) {
    const selectedPath = event.target.files[0].path;
    const path = selectedPath.substring(0, selectedPath.lastIndexOf('\\'));
    document.querySelector('.folderPath').textContent = path;

    // Use the exposed function to request picture files
    const pictureFiles = await window.electronAPI.requestPictureFiles(path);

    // Continue with displaying pictures in the renderer process
    loadAndDisplayPictures(pictureFiles);
});

function loadAndDisplayPictures(pictureFiles) {
    /*const picturesContainer = document.querySelector('.pictures-container');
    picturesContainer.innerHTML = "";*/

    /*pictureFiles.forEach((file, index) => {
        const img = document.createElement('img');
        const path = document.querySelector('.folderPath').textContent;
        img.src = `file://${path}/${file}`;
        img.alt = `${file}`;

        const columnNumber = index % 3 + 2;
        img.classList.add(`column${columnNumber}`);

        picturesContainer.appendChild(img);
    });*/
}
