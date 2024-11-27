// popup.js
document.addEventListener('DOMContentLoaded', async () => {
    // Get saved preference
    const { hideMethod = 'remove' } = await chrome.storage.local.get('hideMethod');
    
    // Set initial radio button state
    document.querySelector(`input[value="${hideMethod}"]`).checked = true;
    
    // Add change listener
    document.querySelectorAll('input[name="hideMethod"]').forEach(radio => {
        radio.addEventListener('change', async (e) => {
            const method = e.target.value;
            await chrome.storage.local.set({ hideMethod: method });
            
            // Notify content script
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.tabs.sendMessage(tab.id, {
                type: 'methodChanged',
                hideMethod: method
            });
        });
    });
});
