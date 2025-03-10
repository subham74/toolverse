const fs = require('fs');
const path = require('path');

// Function to update paths in a file
function updateFilePaths(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update header and footer fetch paths
    content = content.replace(
        /fetch\('(?:\.\.\/)*components\/(header|footer)\.html'\)/g,
        (match, component) => `fetch('/toolverse/components/${component}.html')`
    );
    
    // Update navigation links
    content = content.replace(
        /href="(?:\.\.\/)*(?:tools\/[^"]+)"/g,
        (match, path) => match.replace(/href="(?:\.\.\/)*/, 'href="/toolverse/')
    );
    
    // Update home link
    content = content.replace(
        /href="(?:\.\.\/)*index\.html"/g,
        'href="/toolverse"'
    );
    
    fs.writeFileSync(filePath, content);
}

// Function to process all HTML files in a directory
function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.html')) {
            console.log(`Updating paths in: ${filePath}`);
            updateFilePaths(filePath);
        }
    });
}

// Process all HTML files in the project
processDirectory('.'); 