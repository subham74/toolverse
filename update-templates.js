const fs = require('fs');
const path = require('path');

const header = `    <!-- Header -->
    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="/toolverse">
                    <i class="fas fa-tools text-primary me-2"></i>
                    Toolverse
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                PDF Tools
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/toolverse/tools/pdf-tools/pdf-to-word.html">PDF to Word</a></li>
                                <li><a class="dropdown-item" href="/toolverse/tools/pdf-tools/pdf-password-remover.html">Password Remover</a></li>
                                <li><a class="dropdown-item" href="/toolverse/tools/pdf-tools/pdf-page-reorder.html">Page Reorder</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Image Tools
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/toolverse/tools/image-tools/image-to-text.html">Image to Text</a></li>
                                <li><a class="dropdown-item" href="/toolverse/tools/image-tools/image-background-remover.html">Background Remover</a></li>
                                <li><a class="dropdown-item" href="/toolverse/tools/image-tools/image-color-adjuster.html">Color Adjuster</a></li>
                                <li><a class="dropdown-item" href="/toolverse/tools/image-tools/image-cropper.html">Image Cropper</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <a href="https://github.com/subham74/toolverse" class="btn btn-outline-primary" target="_blank">
                            <i class="fab fa-github me-2"></i>GitHub
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>`;

const footer = `    <!-- Footer -->
    <footer class="bg-dark text-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <h5>About Toolverse</h5>
                    <p class="text-muted">Your one-stop destination for free online tools. Convert, edit, and transform files with ease.</p>
                </div>
                <div class="col-md-4 mb-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="/toolverse" class="text-muted text-decoration-none">Home</a></li>
                        <li><a href="/toolverse/tools/pdf-tools/pdf-to-word.html" class="text-muted text-decoration-none">PDF Tools</a></li>
                        <li><a href="/toolverse/tools/image-tools/image-to-text.html" class="text-muted text-decoration-none">Image Tools</a></li>
                        <li><a href="https://github.com/subham74/toolverse" class="text-muted text-decoration-none">GitHub</a></li>
                    </ul>
                </div>
                <div class="col-md-4 mb-4">
                    <h5>Features</h5>
                    <ul class="list-unstyled text-muted">
                        <li><i class="fas fa-check-circle me-2"></i>100% Free Tools</li>
                        <li><i class="fas fa-check-circle me-2"></i>No Registration Required</li>
                        <li><i class="fas fa-check-circle me-2"></i>Fast Processing</li>
                        <li><i class="fas fa-check-circle me-2"></i>Secure & Private</li>
                    </ul>
                </div>
            </div>
            <hr class="border-secondary">
            <div class="text-center text-muted">
                <small>&copy; 2024 Toolverse. All rights reserved.</small>
            </div>
        </div>
    </footer>`;

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove dynamic header and footer loading
    content = content.replace(/<div id="header-placeholder"><\/div>/, header);
    content = content.replace(/<div id="footer-placeholder"><\/div>/, footer);
    content = content.replace(/fetch\('.*?components\/.*?\.html'\).*?}\);/gs, '');

    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.html') && file !== 'index.html') {
            updateFile(filePath);
        }
    });
}

// Process all HTML files in the tools directory
processDirectory('tools'); 