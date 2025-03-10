const fs = require('fs');
const path = require('path');

// Function to update paths in a file
function updateFilePaths(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update header and footer fetch paths
    content = content.replace(
        /fetch\('\/components\/(header|footer)\.html'\)/g,
        (match, component) => `fetch('../../components/${component}.html')`
    );
    
    // Update navigation links
    content = content.replace(
        /href="\/(tools\/[^"]+)"/g,
        (match, path) => `href="../../${path}"`
    );
    
    // Update home link
    content = content.replace(
        /href="\/"/g,
        'href="../../index.html"'
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
            updateFilePaths(filePath);
        }
    });
}

// Process all HTML files in the tools directory
processDirectory(path.join(__dirname, 'tools')); 