const path = require('path');
const fse = require('fs-extra'); // fs-extra for easy recursive copying
const fs = require('fs'); // Native fs module for reading and modifying files

// Paths
const source = path.join(__dirname, 'out');
const destination = path.join(__dirname, '../genesis_production');

// Path to the index.php file inside the destination
const indexPhpPath = path.join(destination, 'api', 'index.php');

try {
    console.log(`Clearing destination: ${destination}...`);
    fse.emptyDirSync(destination); // Deletes everything inside but keeps the folder

    console.log(`Copying from ${source} to ${destination}...`);
    fse.copySync(source, destination, { overwrite: true });

    console.log('Build successfully copied to ../genesis_production.');

    // Modify index.php to comment out the require_once line if it exists
    if (fs.existsSync(indexPhpPath)) {
        let indexPhpContent = fs.readFileSync(indexPhpPath, 'utf-8');

        const lineToCheck = "require_once __DIR__ . '/src/dev.php';";

        // Check if the line exists, and comment it out if present
        if (indexPhpContent.includes(lineToCheck)) {
            indexPhpContent = indexPhpContent.replace(
                lineToCheck,
                `// ${lineToCheck}`
            );

            // Write the modified content back to index.php
            fs.writeFileSync(indexPhpPath, indexPhpContent, 'utf-8');
            console.log('index.php updated with commented-out require_once line.');
        } else {
            console.log('Line not found in index.php, no changes made.');
        }
    } else {
        console.log(`index.php not found in ${indexPhpPath}`);
    }
} catch (err) {
    console.error('Error copying build folder or modifying index.php:', err);
}
