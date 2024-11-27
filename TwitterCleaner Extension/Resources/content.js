let currentHideMethod = 'remove';

function handleAvatars() {
    const avatarContainers = document.querySelectorAll('[data-testid^="UserAvatar-Container-"]');
    
    avatarContainers.forEach(container => {
        if (currentHideMethod === 'remove') {
            container.remove();
        } else {
            container.style.width = '0px';
            container.style.height = '0px';
        }
    });
}

// Get initial preference
chrome.storage.local.get('hideMethod', ({ hideMethod = 'remove' }) => {
    currentHideMethod = hideMethod;
    
    // Initial run with a delay
    setTimeout(() => {
        handleAvatars();
    }, 2000);
    
    // Set up observer
    const observer = new MutationObserver(() => {
        handleAvatars();
    });
    
    // Start observing
    setTimeout(() => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 2000);
});

// Listen for method changes from popup
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'methodChanged') {
        currentHideMethod = message.hideMethod;
        handleAvatars();
    }
});
