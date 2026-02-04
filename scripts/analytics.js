document.addEventListener('DOMContentLoaded', function() {

    // Helper function to send GA4 events safely
    function sendEvent(eventName, params) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        } else {
            console.log('GA4 not loaded, event would be:', eventName, params);
        }
    }
});
