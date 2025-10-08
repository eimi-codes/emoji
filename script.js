// Configuration
const EMOJIS_FOLDER = 'emojis/';
const SUPPORTED_EXTENSIONS = ['png', 'gif', 'jpg', 'jpeg', 'webp', 'svg'];

// State
let allEmojis = [];

// Initialize the gallery
async function init() {
    try {
        await loadEmojis();
        setupSearch();
        displayEmojis(allEmojis);
    } catch (error) {
        console.error('Error initializing gallery:', error);
    }
}

// Load emojis from the emojis folder
async function loadEmojis() {
    try {
        // Try to fetch a listing of files from the GitHub API
        const repoPath = window.location.pathname.replace(/\/$/, '');
        const repoName = repoPath.split('/').filter(p => p).pop() || 'emoji';
        const apiUrl = `https://api.github.com/repos/eimi-codes/${repoName}/contents/emojis`;
        
        const response = await fetch(apiUrl);
        
        if (response.ok) {
            const files = await response.json();
            
            allEmojis = files
                .filter(file => {
                    const ext = file.name.split('.').pop().toLowerCase();
                    return SUPPORTED_EXTENSIONS.includes(ext);
                })
                .map(file => ({
                    name: file.name,
                    path: file.download_url,
                    displayName: file.name.replace(/\.(png|gif|jpg|jpeg|webp|svg)$/i, '')
                }));
        } else {
            // Fallback: if API doesn't work, show empty state
            allEmojis = [];
        }
    } catch (error) {
        console.error('Error loading emojis:', error);
        allEmojis = [];
    }
}

// Display emojis in the gallery
function displayEmojis(emojis) {
    const gallery = document.getElementById('emojiGallery');
    const countElement = document.getElementById('emojiCount');
    
    if (emojis.length === 0) {
        gallery.innerHTML = `
            <div class="no-emojis">
                <p>No emojis found yet. Add some emoji images to the <code>emojis/</code> folder!</p>
                <p>Supported formats: PNG, GIF, JPG, JPEG, WEBP, SVG</p>
            </div>
        `;
        countElement.textContent = '';
        return;
    }
    
    countElement.textContent = `${emojis.length} emoji${emojis.length !== 1 ? 's' : ''} found`;
    
    gallery.innerHTML = emojis.map(emoji => `
        <div class="emoji-card" onclick="copyToClipboard('${emoji.name}')">
            <img src="${emoji.path}" alt="${emoji.displayName}" loading="lazy">
            <div class="emoji-name">${emoji.displayName}</div>
        </div>
    `).join('');
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        const filteredEmojis = allEmojis.filter(emoji => 
            emoji.displayName.toLowerCase().includes(searchTerm)
        );
        
        displayEmojis(filteredEmojis);
    });
}

// Copy emoji filename to clipboard
function copyToClipboard(filename) {
    const nameWithoutExt = filename.replace(/\.(png|gif|jpg|jpeg|webp|svg)$/i, '');
    
    // Try to copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(nameWithoutExt).then(() => {
            showNotification(`Copied: ${nameWithoutExt}`);
        }).catch(() => {
            showNotification(`Name: ${nameWithoutExt}`, true);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = nameWithoutExt;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification(`Copied: ${nameWithoutExt}`);
        } catch (err) {
            showNotification(`Name: ${nameWithoutExt}`, true);
        }
        
        document.body.removeChild(textArea);
    }
}

// Show notification
function showNotification(message, isManual = false) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = isManual ? message + ' (copy manually)' : message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
