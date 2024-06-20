const fs = require('fs');
const path = require('path');

const directoryPath = 'C:\\Users\\celes\\Documents\\.Arquitectura Software\\242493-276712-281651\\Sensors\\files';
const testFilePath = path.join(directoryPath, 'test.txt');

try {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    fs.writeFileSync(testFilePath, 'This is a test.', 'utf-8');
    console.log(`Write test successful. Test file created at: ${testFilePath}`);
} catch (error) {
    console.error('Error writing to directory:', error);
}
