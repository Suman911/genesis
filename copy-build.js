const path = require('path');
const fse = require('fs-extra'); // fs-extra for easy recursive copying

// Paths
const source = path.join(__dirname, 'out');
const destination = path.join(__dirname, '../genesis_production');

try {
    console.log(`Copying from ${source} to ${destination}...`);
    fse.copySync(source, destination, { overwrite: true });
    console.log('Build successfully copied to ../genesis_production.');
} catch (err) {
    console.error('Error copying build folder:', err);
}