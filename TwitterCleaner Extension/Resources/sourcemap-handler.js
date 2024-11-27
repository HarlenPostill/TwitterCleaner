const originalError = console.error;
console.error = function(...args) {
    if (args[0] && typeof args[0] === 'string' &&
        (args[0].includes('Source Map error:') ||
         args[0].includes('Failed to load resource: ') && args[0].includes('.map'))) {
        return;
    }
    originalError.apply(console, args);
};
