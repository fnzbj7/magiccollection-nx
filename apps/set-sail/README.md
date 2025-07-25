# SetSail Migration Helper

A comprehensive migration automation tool for the Magic: The Gathering collection application.

## Overview

SetSail automates the entire process of adding new Magic card sets to your application, including:
- Extracting migration information from TypeScript files
- Updating frontend service files
- Updating backend migration lists
- Copying migration files to the API
- Moving card images to the proper assets structure
- Moving set icons to the frontend

## Project Structure

```
apps/set-sail/src/
└── main.ts                    # Complete migration automation tool
```

The tool is designed as a single, well-organized file with clear sections to avoid module import issues while maintaining excellent readability and maintainability.

## File Organization

The `main.ts` file is organized into clear sections:

### 🔧 **LOGGER UTILITIES**
- Colored console output functions
- Header, success, and error logging

### 📋 **MIGRATION INFO EXTRACTION**
- Extracts short name, long name, class name, and max card number
- Uses regex patterns to parse migration files

### 📁 **FILE OPERATIONS**
- File existence checking
- Set icon copying
- Migration file copying
- Card image moving and directory creation

### 🔄 **SERVICE UPDATES**
- Frontend service file updates (`magic-cards-list.service.ts`)
- Backend migration list updates (`migration-list.ts`)

### ⚙️ **MAIN PROCESSING LOGIC**
- Orchestrates the entire migration workflow
- Error handling and status reporting

### 🚀 **MAIN EXECUTION**
- Entry point and final status reporting

## Usage

1. **Prepare your files** in the `apps/set-sail/migrations/` folder:
   - `.ts` migration file
   - `.svg` set icon
   - `rename/` folder with `.webp` card images

2. **Run the tool**:
   ```bash
   npm run start:set-sail
   ```

3. **The tool will automatically**:
   - Extract migration information
   - Update frontend service (`magic-cards-list.service.ts`)
   - Update backend migration list (`migration-list.ts`)
   - Copy migration file to API folder
   - Move card images to `assets/img/static-img/{SET_NAME}/webp/`
   - Move set icon to `assets/img/set-icons/`
   - Clean up temporary files

## Expected Output

```
-----------------------------------
Welcome to SetSail Migration Helper
-----------------------------------
	Card images: 64 found
	Icon: found
	Migration: found

📋 Migration Information:
	Short Name: FCA
	Long Name: Final Fantasy: Through the Ages
	Class Name: addFca1753452626452
	Max Card Number: 64

📝 Updating service file...
	✓ Added new MagicSet to service file: FCA

📝 Updating migration list...
	✓ Added migration to migration list: addFca1753452626452

📝 Copying migration file to API...
	✓ Copied 1753452626452-add-fca-cards.migration.ts to API migration folder

📝 Moving card images...
	Created static-img directory
	Created set directory: FCA
	Created webp directory
	✓ Moved 64 card images to FCA/webp/
	✓ Removed rename folder

Starting set icon migration...
	✓ Moved fca.svg to set-icons folder

Checks completed.
-----------------------------------
SetSail finished. Goodbye!
-----------------------------------
```

## Benefits of This Approach

- **No Module Issues**: Single file avoids ES6/CommonJS import conflicts
- **Easy Maintenance**: Clear sections make it easy to find and modify specific functionality
- **Reliable Execution**: No dependency on complex module resolution
- **Clear Structure**: Well-organized with descriptive section headers
- **Error Handling**: Comprehensive error handling throughout the process

## Error Handling

The tool uses a shared error state object (`hadError`) that's passed between functions to ensure consistent error handling and prevent partial operations from completing when errors occur.

## Technical Notes

- Uses CommonJS `require()` for Node.js compatibility
- Implements colored console output using ANSI escape codes
- Uses regex patterns for reliable file parsing
- Creates directories automatically as needed
- Provides detailed progress feedback throughout the process 