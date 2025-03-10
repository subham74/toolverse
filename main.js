// Security Headers
const securityHeaders = {
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https:;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

// Apply security headers
Object.entries(securityHeaders).forEach(([key, value]) => {
    if (document.head) {
        const meta = document.createElement('meta');
        meta.httpEquiv = key;
        meta.content = value;
        document.head.appendChild(meta);
    }
});

// GitHub Pages specific configuration
const isGitHubPages = window.location.hostname.includes('github.io');
if (isGitHubPages) {
    // Update base URL for GitHub Pages
    const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/');
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.href = baseUrl + link.getAttribute('href');
    });
}

// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Initialize tool search functionality
    initializeToolSearch();
    
    // Load popular tools
    loadPopularTools();
});

// Tool search functionality
function initializeToolSearch() {
    const searchInput = document.getElementById('tool-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const toolCards = document.querySelectorAll('.tool-card');
            
            toolCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Load popular tools
function loadPopularTools() {
    const popularToolsGrid = document.getElementById('popular-tools-grid');
    if (popularToolsGrid) {
        const popularTools = [
            {
                title: 'Image to PNG Converter',
                description: 'Convert your images to PNG format with high quality.',
                icon: 'fas fa-image',
                link: '/tools/image-to-png'
            },
            {
                title: 'Word Counter',
                description: 'Count words, characters, and paragraphs in your text.',
                icon: 'fas fa-text-width',
                link: '/tools/word-counter'
            },
            {
                title: 'JSON Formatter',
                description: 'Format and validate your JSON data.',
                icon: 'fas fa-code',
                link: '/tools/json-formatter'
            },
            {
                title: 'Calculator',
                description: 'Basic and scientific calculator for your calculations.',
                icon: 'fas fa-calculator',
                link: '/tools/calculator'
            },
            {
                title: 'URL Shortener',
                description: 'Create short URLs for your long links.',
                icon: 'fas fa-link',
                link: '/tools/url-shortener'
            },
            {
                title: 'PDF to Word',
                description: 'Convert PDF files to Word documents.',
                icon: 'fas fa-file-word',
                link: '/tools/pdf-to-word'
            }
        ];

        popularTools.forEach(tool => {
            const toolCard = createToolCard(tool);
            popularToolsGrid.appendChild(toolCard);
        });
    }
}

// Create tool card element
function createToolCard(tool) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3 mb-4 fade-in';
    
    col.innerHTML = `
        <div class="tool-card">
            <i class="${tool.icon} mb-3 text-gradient"></i>
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" class="btn btn-primary btn-sm">Use Tool</a>
        </div>
    `;
    
    return col;
}

// Newsletter subscription
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('newsletter-form')) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced error handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
}; 