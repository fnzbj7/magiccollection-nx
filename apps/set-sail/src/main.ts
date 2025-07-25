const fs = require('fs');
const path = require('path');

// ============================================================================
// LOGGER UTILITIES
// ============================================================================

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

function log(color: string, message: string): void {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(): void {
    log('green', '-----------------------------------');
    log('green', 'Welcome to SetSail Migration Helper');
    log('green', '-----------------------------------');
}

function logSuccess(): void {
    log('green', '\nChecks completed.');
    log('green', '-----------------------------------');
    log('green', 'SetSail finished. Goodbye!');
    log('green', '-----------------------------------');
}

function logError(): void {
    log('red', '\nChecks failed.');
    log('red', '-----------------------------------');
    log('red', 'SetSail finished. Goodbye!');
    log('red', '-----------------------------------');
}

// ============================================================================
// MIGRATION INFO EXTRACTION
// ============================================================================

function extractMigrationInfo(fileContent: string): {
    shortName: string;
    longName: string;
    className: string;
    maxNum: number;
} | null {
    // Extract short name
    const shortNameMatch = fileContent.match(/shortName\s*=\s*["']([^"']+)["']/);
    
    // Extract long name from MigrationHelper.cardSetUp call
    const longNameMatch = fileContent.match(/MigrationHelper\.cardSetUp\s*\(\s*[^,]+,\s*["']([^"']+)["']/);
    
    // Extract class name
    const classNameMatch = fileContent.match(/export\s+class\s+(\w+)/);
    
    // Extract card count by finding the highest cardNumber in cardValues array
    const cardValuesMatch = fileContent.match(/const cardValues = \[([\s\S]*?)\];/);
    let maxNum = 0;
    
    if (cardValuesMatch) {
        const cardValuesContent = cardValuesMatch[1];
        // Find all cardNumber values in the array
        const cardNumberMatches = cardValuesContent.match(/cardNumber:\s*(\d+)/g);
        if (cardNumberMatches) {
            maxNum = Math.max(...cardNumberMatches.map(match => {
                const numMatch = match.match(/cardNumber:\s*(\d+)/);
                return numMatch ? parseInt(numMatch[1], 10) : 0;
            }));
        }
    }
    
    if (shortNameMatch && longNameMatch && classNameMatch && maxNum > 0) {
        return {
            shortName: shortNameMatch[1],
            longName: longNameMatch[1],
            className: classNameMatch[1],
            maxNum: maxNum
        };
    }
    
    return null;
}

// ============================================================================
// FILE OPERATIONS
// ============================================================================

function checkSingleFileType(dir: string, ext: string, label: string, hadError: { value: boolean }): string | null {
    if (!fs.existsSync(dir)) {
        log('red', `\t${label}: folder missing`);
        hadError.value = true;
        return null;
    }
    const files = fs.readdirSync(dir).filter(file => file.endsWith(ext));
    if (files.length === 0) {
        log('red', `\t${label}: not found`);
        hadError.value = true;
        return null;
    } else if (files.length > 1) {
        log('red', `\t${label}: multiple found`);
        hadError.value = true;
        return null;
    } else {
        log('cyan', `\t${label}: found`);
        return files[0];
    }
}

function copySetIcon(svgFileName: string, hadError: { value: boolean }): void {
    const migrationsDir = path.join(__dirname, '../migrations');
    const sourcePath = path.join(migrationsDir, svgFileName);
    
    const targetDir = path.join(__dirname, '../../magiccollection/src/assets/img/set-icons');
    const targetPath = path.join(targetDir, svgFileName);
    
    // Check if target directory exists
    if (!fs.existsSync(targetDir)) {
        log('red', `\tTarget directory missing: ${targetDir}`);
        hadError.value = true;
        return;
    }
    
    // Check if file already exists in target
    if (fs.existsSync(targetPath)) {
        log('yellow', `\tWarning: ${svgFileName} already exists in set-icons, overwriting...`);
    }
    
    try {
        // Move the file (atomic operation)
        fs.renameSync(sourcePath, targetPath);
        log('green', `\t✓ Moved ${svgFileName} to set-icons folder`);
        
    } catch (error) {
        log('red', `\tError moving ${svgFileName}: ${error.message}`);
        hadError.value = true;
    }
}

function copyMigrationFile(migrationFileName: string, hadError: { value: boolean }): void {
    const sourceDir = path.join(__dirname, '../migrations');
    const sourcePath = path.join(sourceDir, migrationFileName);
    
    const targetDir = path.join(__dirname, '../../api/src/app/migration');
    const targetPath = path.join(targetDir, migrationFileName);
    
    // Check if target directory exists
    if (!fs.existsSync(targetDir)) {
        log('red', `\tTarget migration directory missing: ${targetDir}`);
        hadError.value = true;
        return;
    }
    
    // Check if file already exists in target
    if (fs.existsSync(targetPath)) {
        log('yellow', `\tWarning: ${migrationFileName} already exists in API migration folder, overwriting...`);
    }
    
    try {
        // Copy the file (keeping original in SetSail folder for development)
        fs.copyFileSync(sourcePath, targetPath);
        log('green', `\t✓ Copied ${migrationFileName} to API migration folder`);
        
    } catch (error) {
        log('red', `\tError copying ${migrationFileName}: ${error.message}`);
        hadError.value = true;
    }
}

function moveCardImages(shortName: string, hadError: { value: boolean }): void {
    const renameDir = path.join(__dirname, '../migrations/rename');
    const staticImgDir = path.join(__dirname, '../../magiccollection/src/assets/img/static-img');
    const setDir = path.join(staticImgDir, shortName.toUpperCase());
    const webpDir = path.join(setDir, 'webp');
    
    // Check if rename folder exists
    if (!fs.existsSync(renameDir)) {
        log('red', `\tRename folder missing: ${renameDir}`);
        hadError.value = true;
        return;
    }
    
    // Check if static-img directory exists, create if not
    if (!fs.existsSync(staticImgDir)) {
        try {
            fs.mkdirSync(staticImgDir, { recursive: true });
            log('cyan', `\tCreated static-img directory`);
        } catch (error) {
            log('red', `\tError creating static-img directory: ${error.message}`);
            hadError.value = true;
            return;
        }
    }
    
    // Check if set directory exists, create if not
    if (!fs.existsSync(setDir)) {
        try {
            fs.mkdirSync(setDir, { recursive: true });
            log('cyan', `\tCreated set directory: ${shortName.toUpperCase()}`);
        } catch (error) {
            log('red', `\tError creating set directory: ${error.message}`);
            hadError.value = true;
            return;
        }
    }
    
    // Check if webp directory exists, create if not
    if (!fs.existsSync(webpDir)) {
        try {
            fs.mkdirSync(webpDir, { recursive: true });
            log('cyan', `\tCreated webp directory`);
        } catch (error) {
            log('red', `\tError creating webp directory: ${error.message}`);
            hadError.value = true;
            return;
        }
    }
    
    try {
        // Get all .webp files from rename folder
        const webpFiles = fs.readdirSync(renameDir).filter(file => file.endsWith('.webp'));
        
        if (webpFiles.length === 0) {
            log('yellow', `\tNo .webp files found in rename folder`);
            return;
        }
        
        // Move each .webp file to the webp directory
        let movedCount = 0;
        for (const file of webpFiles) {
            const sourcePath = path.join(renameDir, file);
            const targetPath = path.join(webpDir, file);
            
            // Check if file already exists in target
            if (fs.existsSync(targetPath)) {
                log('yellow', `\tWarning: ${file} already exists in webp folder, overwriting...`);
            }
            
            fs.copyFileSync(sourcePath, targetPath);
            movedCount++;
        }
        
        log('green', `\t✓ Moved ${movedCount} card images to ${shortName.toUpperCase()}/webp/`);
        
        // Remove the rename folder after successful move
        fs.rmSync(renameDir, { recursive: true, force: true });
        log('green', `\t✓ Removed rename folder`);
        
    } catch (error) {
        log('red', `\tError moving card images: ${error.message}`);
        hadError.value = true;
    }
}

// ============================================================================
// SERVICE UPDATES
// ============================================================================

function appendToMagicSetArray(migrationInfo: { shortName: string; longName: string; maxNum: number }, hadError: { value: boolean }): void {
    const serviceFilePath = path.join(__dirname, '../../magiccollection/src/app/magic/magic-card-list/magic-cards-list.service.ts');
    
    if (!fs.existsSync(serviceFilePath)) {
        log('red', `\tService file not found: ${serviceFilePath}`);
        hadError.value = true;
        return;
    }
    
    try {
        const fileContent = fs.readFileSync(serviceFilePath, 'utf8');
        const currentYear = new Date().getFullYear();
        
        // Create the new MagicSet line
        const newMagicSetLine = `    new MagicSet('${migrationInfo.shortName}', '${migrationInfo.longName}', ${migrationInfo.maxNum}, ${currentYear}),\n    `;
        
        // Find the magicSetArray declaration and insert the new line after the opening bracket
        const magicSetArrayMatch = fileContent.match(/(export const magicSetArray: MagicSet\[\] = \[)(\s*)/);
        
        if (magicSetArrayMatch) {
            const newContent = fileContent.replace(
                magicSetArrayMatch[0],
                `${magicSetArrayMatch[1]}\n${newMagicSetLine}`
            );
            
            fs.writeFileSync(serviceFilePath, newContent, 'utf8');
            log('green', `\t✓ Added new MagicSet to service file: ${migrationInfo.shortName}`);
        } else {
            log('red', '\tCould not find magicSetArray declaration in service file');
            hadError.value = true;
        }
        
    } catch (error) {
        log('red', `\tError updating service file: ${error.message}`);
        hadError.value = true;
    }
}

function updateMigrationList(migrationInfo: { className: string }, migrationFileName: string, hadError: { value: boolean }): void {
    const migrationListFilePath = path.join(__dirname, '../../api/src/config/migration-list.ts');
    
    if (!fs.existsSync(migrationListFilePath)) {
        log('red', `\tMigration list file not found: ${migrationListFilePath}`);
        hadError.value = true;
        return;
    }
    
    try {
        const fileContent = fs.readFileSync(migrationListFilePath, 'utf8');
        
        // Add import statement at the top (after existing imports)
        const importStatement = `import { ${migrationInfo.className} } from '../app/migration/${migrationFileName.replace('.ts', '')}';`;
        
        // Find the last import statement and add our new import after it
        const importLines = fileContent.split('\n').filter(line => line.trim().startsWith('import'));
        const lastImportIndex = fileContent.lastIndexOf(importLines[importLines.length - 1]);
        const insertIndex = fileContent.indexOf('\n', lastImportIndex) + 1;
        
        const contentWithImport = fileContent.slice(0, insertIndex) + importStatement + '\n' + fileContent.slice(insertIndex);
        
        // Add the migration class to the migrationsList array
        const migrationsListMatch = contentWithImport.match(/(const migrationsList = \[)([\s\S]*?)(\];)/);
        
        if (migrationsListMatch) {
            const existingMigrations = migrationsListMatch[2];
            const newMigrationEntry = `    ${migrationInfo.className},`;
            
            // Add the new migration as the last item in the array
            const updatedMigrationsList = existingMigrations + newMigrationEntry;
            
            const finalContent = contentWithImport.replace(
                migrationsListMatch[0],
                `${migrationsListMatch[1]}${updatedMigrationsList}\n${migrationsListMatch[3]}`
            );
            
            fs.writeFileSync(migrationListFilePath, finalContent, 'utf8');
            log('green', `\t✓ Added migration to migration list: ${migrationInfo.className}`);
        } else {
            log('red', '\tCould not find migrationsList array in migration list file');
            hadError.value = true;
        }
        
    } catch (error) {
        log('red', `\tError updating migration list file: ${error.message}`);
        hadError.value = true;
    }
}

// ============================================================================
// MAIN PROCESSING LOGIC
// ============================================================================

function processMigration(hadError: { value: boolean }): void {
    const renameDir = path.join(__dirname, '../migrations/rename');
    let webpFiles: string[] = [];

    // Check for .webp files in rename folder
    if (fs.existsSync(renameDir)) {
        webpFiles = fs.readdirSync(renameDir).filter(file => file.endsWith('.webp'));
        if (webpFiles.length === 0) {
            log('red', '\tCard images: not found');
            hadError.value = true;
        } else {
            log('cyan', `\tCard images: ${webpFiles.length} found`);
        }
    } else {
        log('red', '\tCard images: folder missing');
        hadError.value = true;
    }

    // Check for .svg set icon in migrations folder
    const migrationsDir = path.join(__dirname, '../migrations');
    const svgFileName = checkSingleFileType(migrationsDir, '.svg', 'Icon', hadError);

    // Check for .ts db migration file in migrations folder
    const migrationFileName = checkSingleFileType(migrationsDir, '.ts', 'Migration', hadError);

    // Extract and log migration information
    if (migrationFileName) {
        const migrationFilePath = path.join(migrationsDir, migrationFileName);
        try {
            const fileContent = fs.readFileSync(migrationFilePath, 'utf8');
            const migrationInfo = extractMigrationInfo(fileContent);
            
            if (migrationInfo) {
                logMigrationInfo(migrationInfo);
                processMigrationSteps(migrationInfo, migrationFileName, svgFileName, hadError);
            } else {
                log('red', '\tFailed to extract migration information');
                hadError.value = true;
            }
        } catch (error) {
            log('red', `\tError reading migration file: ${error.message}`);
            hadError.value = true;
        }
    }
}

function logMigrationInfo(migrationInfo: { shortName: string; longName: string; className: string; maxNum: number }): void {
    log('blue', '\n📋 Migration Information:');
    log('cyan', `\tShort Name: ${migrationInfo.shortName}`);
    log('cyan', `\tLong Name: ${migrationInfo.longName}`);
    log('cyan', `\tClass Name: ${migrationInfo.className}`);
    log('cyan', `\tMax Card Number: ${migrationInfo.maxNum}`);
}

function processMigrationSteps(
    migrationInfo: { shortName: string; longName: string; className: string; maxNum: number }, 
    migrationFileName: string, 
    svgFileName: string | null, 
    hadError: { value: boolean }
): void {
    // Append to magic-cards-list.service.ts
    log('blue', '\n📝 Updating service file...');
    appendToMagicSetArray(migrationInfo, hadError);

    // Update migration-list.ts
    log('blue', '\n📝 Updating migration list...');
    updateMigrationList({ className: migrationInfo.className }, migrationFileName, hadError);

    // Copy migration file to API
    log('blue', '\n📝 Copying migration file to API...');
    copyMigrationFile(migrationFileName, hadError);

    // Move card images
    log('blue', '\n📝 Moving card images...');
    moveCardImages(migrationInfo.shortName, hadError);

    // If all checks passed, copy the set icon
    if (!hadError.value && svgFileName) {
        log('green', '\nStarting set icon migration...');
        copySetIcon(svgFileName, hadError);
    }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main(): void {
    logHeader();
    
    const hadError = { value: false };
    
    // Process the migration
    processMigration(hadError);
    
    // Final status
    if (!hadError.value) {
        logSuccess();
    } else {
        logError();
    }
}

// Run the application
main();
