document.addEventListener('DOMContentLoaded', function() {

    // Helper function to send GA4 events safely
    function sendEvent(eventName, params) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        } else {
            console.log('GA4 not loaded, event would be:', eventName, params);
        }
    }
    
    // Navbar "Zakaži Čas" Button
    const reserveBtn = document.getElementById('reserveBtn');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', function() {
            sendEvent('reserve_class_click', {
                'event_category': 'Click',
                'event_label': 'Navbar - Zakaži Čas'
            });
        });
    }
	
	const coursesBtn = document.getElementById('coursesBtn');
    if (coursesBtn) {
        coursesBtn.addEventListener('click', function() {
            sendEvent('courses_click', {
                'event_category': 'Click',
                'event_label': 'Navbar - Kursevi'
            });
        });
    }

});

