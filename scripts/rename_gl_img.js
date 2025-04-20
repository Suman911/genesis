const fs = require('fs');
const path = require('path');

const folderPath = './public/assets/images/gallery'; // Replace with your actual folder path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  let index = 1;

  files.forEach(file => {
    const ext = path.extname(file);
    const newName = `gallery_img_${index}${ext}`;
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, newName);

    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.error(`Failed to rename ${file}:`, err);
      } else {
        console.log(`Renamed ${file} -> ${newName}`);
      }
    });

    index++;
  });
});
