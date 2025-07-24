let hadError = false;
function checkSingleFileType(dir, ext, label) {
    if (!fs.existsSync(dir)) {
        console.log('\t' + chalk.red(`${label}: folder missing`));
        hadError = true;
        return;
    }
    const files = fs.readdirSync(dir).filter(file => file.endsWith(ext));
    if (files.length === 0) {
        console.log('\t' + chalk.red(`${label}: not found`));
        hadError = true;
    } else if (files.length > 1) {
        console.log('\t' + chalk.red(`${label}: multiple found`));
        hadError = true;
    } else {
        console.log('\t' + chalk.cyan(`${label}: found`));
    }
}
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const renameDir = path.join(__dirname, '../migrations/rename');
let webpFiles: string[] = [];

console.log(chalk.green('-----------------------------------'));
console.log(chalk.green('Welcome to SetSail Migration Helper'));
console.log(chalk.green('-----------------------------------'));

// Check for .webp files in rename folder
if (fs.existsSync(renameDir)) {
    webpFiles = fs.readdirSync(renameDir).filter(file => file.endsWith('.webp'));
    if (webpFiles.length === 0) {
        console.log('\t' + chalk.red('Card images: not found'));
        hadError = true;
    } else {
        console.log('\t' + chalk.cyan(`Card images: ${webpFiles.length} found`));
    }
} else {
    console.log('\t' + chalk.red('Card images: folder missing'));
    hadError = true;
}

// Check for .svg set icon in migrations folder
const migrationsDir = path.join(__dirname, '../migrations');
checkSingleFileType(migrationsDir, '.svg', 'Icon');

// Check for .ts db migration file in migrations folder
checkSingleFileType(migrationsDir, '.ts', 'Migration');

if (!hadError) {
    console.log(chalk.green('\nChecks completed.'));
    console.log(chalk.green('-----------------------------------'));
    console.log(chalk.green('SetSail finished. Goodbye!'));
    console.log(chalk.green('-----------------------------------'));
} else {
    console.log(chalk.red('\nChecks failed.'));
    console.log(chalk.red('-----------------------------------'));
    console.log(chalk.red('SetSail finished. Goodbye!'));
    console.log(chalk.red('-----------------------------------'));
}
