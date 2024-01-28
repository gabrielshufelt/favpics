document.getElementById('folderInput').addEventListener('change', async function (event) {
    const selectedPath = event.target.files[0].path;
    const path = selectedPath.substring(0, selectedPath.lastIndexOf('\\'));
    document.querySelector('.folderPath').textContent = path;

    // Use the exposed function to request picture files
    const pictureFiles = await window.electronAPI.requestPictureFiles(path);
    
    // clear previous pictures
    document.getElementById('column2').innerHTML = '';
    document.getElementById('column3').innerHTML = '';
    document.getElementById('column4').innerHTML = '';

    for (let i=0; i<pictureFiles.length; i++) {
        let img = document.createElement('img');
        img.src = path+'\\'+pictureFiles[i];
        img.className = "imgs";
        switch (i % 3) {
            case 0: document.getElementById('column2').appendChild(img); break;
            case 1: document.getElementById('column3').appendChild(img); break;
            case 2: document.getElementById('column4').appendChild(img); break;
        }
    }

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
