const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');

// Paths
const source = path.join(__dirname, '../out');
const destination = path.join(__dirname, '../../genesis_production');
const indexPhpPath = path.join(source, 'api', 'index.php');

// Items to delete before copying
const itemsToDelete = [
    'api/db',
    'api/composer.json',
    'api/composer.lock',
    'api/notes.md',
    'api/.env.local',
    'api/.gitignore',
].map((item) => path.join(source, item));

// Styled log helper
const log = {
    info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
    success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
    warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`),
    error: (msg) => console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
};

try {
    // 1. Modify index.php to comment out a line
    log.info('Checking index.php for development require line...');
    if (fs.existsSync(indexPhpPath)) {
        let indexPhpContent = fs.readFileSync(indexPhpPath, 'utf-8');
        const lineToCheck = "require_once __DIR__ . '/src/dev.php';";

        if (indexPhpContent.includes(lineToCheck)) {
            indexPhpContent = indexPhpContent.replace(lineToCheck, `// ${lineToCheck}`);
            fs.writeFileSync(indexPhpPath, indexPhpContent, 'utf-8');
            log.success('Commented out development require line in index.php.');
        } else {
            log.warn('Development require line not found in index.php. No changes made.');
        }
    } else {
        log.warn(`index.php not found at: ${indexPhpPath}`);
    }

    // 2. Delete unwanted files/folders
    log.info('Cleaning up unwanted files and folders in /out...');
    for (const itemPath of itemsToDelete) {
        if (fse.existsSync(itemPath)) {
            fse.removeSync(itemPath);
            log.success(`Deleted: ${itemPath}`);
        } else {
            log.warn(`Not found (skipped): ${itemPath}`);
        }
    }

    // 3. Empty destination folder
    log.info(`Clearing destination directory: ${destination}`);
    fse.emptyDirSync(destination);
    log.success('Destination directory cleared.');

    // 4. Copy the build
    log.info(`Copying cleaned build from ${source} to ${destination}...`);
    fse.copySync(source, destination, { overwrite: true });
    log.success('Build successfully copied to genesis_production.');
} catch (err) {
    log.error('An error occurred during the build process.');
    console.error(err);
}
