const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');

// args
const args = process.argv.slice(2);
const test = args.includes("-t");

// Paths
const source = path.join(__dirname, '../out');
const destination = path.join(__dirname, test ? '../../genesis_production' : '../../htdocs');
const indexPhpPath = path.join(source, 'api', 'index.php');

// Items to delete before copying
const itemsToDelete = [
    'api/db/Migrations',
    'api/db/Seeds',
    'api/db/genesis.sql',
    'api/db/phinx.php',
    'api/composer.json',
    'api/composer.lock',
    'api/notes.md',
    'api/.env.local',
    'api/.gitignore',
    'api/src/dev.php',
    'uploads',
    // 'test'
].map((item) => path.join(source, item));

// Styled log helper
const log = {
    info: (msg) => console.log(`\n\x1b[1m\x1b[44m INFO \x1b[0m \x1b[36m${msg}\x1b[0m`),
    success: (msg) => console.log(`\x1b[1m\x1b[42m SUCCESS \x1b[0m \x1b[32m${msg}\x1b[0m`),
    warn: (msg) => console.warn(`\x1b[1m\x1b[43m WARN \x1b[0m \x1b[33m${msg}\x1b[0m`),
    error: (msg) => console.error(`\x1b[1m\x1b[41m ERROR \x1b[0m \x1b[31m${msg}\x1b[0m`),
    process: (msg) => {
        console.log(
            `\n\x1b[1m\x1b[45m TEST \x1b[0m \x1b[95m${msg}\x1b[0m\n` +
            `\x1b[95m---------------------------------------\x1b[0m`
        );
    }
};

if (test) log.process("Preparing test build");

try {
    // 1. Modify index.php to comment out lines
    log.info('Processing index.php...');
    if (fs.existsSync(indexPhpPath)) {
        let indexPhpContent = fs.readFileSync(indexPhpPath, 'utf-8');
        const lines = indexPhpContent.split('\n');

        const linesToComment = [
            "require_once __DIR__ . '/src/dev.php';",
            !test && "require_once __DIR__ . '/src/agent.php';",
            !test && "require_once __DIR__ . '/src/log.php';",
        ].filter(Boolean);


        const updatedLines = lines.map((line) => {
            const trimmed = line.trim();
            for (const target of linesToComment) {
                if (trimmed === target && !trimmed.startsWith('//')) {
                    return '// ' + line;
                }
            }
            return line;
        });
        fs.writeFileSync(indexPhpPath, updatedLines.join('\n'), 'utf-8');
        log.success('index.php processed successfully (development lines commented out).');
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
