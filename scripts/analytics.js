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
	
	const aboutBtn = document.getElementById('aboutBtn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            sendEvent('about_us_click', {
                'event_category': 'Click',
                'event_label': 'Navbar - O nama'
            });
        });
    }
	
	const coursesHeaderBtn = document.getElementById('coursesHeaderBtn');
    if (coursesHeaderBtn) {
        coursesHeaderBtn.addEventListener('click', function() {
            sendEvent('courses_click', {
                'event_category': 'Click',
                'event_label': 'Header - Kursevi'
            });
        });
    }
	
	const aboutHeaderBtn = document.getElementById('aboutHeaderBtn');
    if (aboutHeaderBtn) {
        aboutHeaderBtn.addEventListener('click', function() {
            sendEvent('about_us_click', {
                'event_category': 'Click',
                'event_label': 'Header - O nama'
            });
        });
    }
	
	const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            sendEvent('send_email_click', {
                'event_category': 'Click',
                'event_label': 'Email'
            });
        });
    }
	
	const generalCourseBtn = document.getElementById('card-a1');
    if (generalCourseBtn) {
        generalCourseBtn.addEventListener('click', function() {
			console.log('Usao u click funkciju');
            sendEvent('general_course_click', {
                'event_category': 'Click',
                'event_label': 'Kursevi'
            });
        });
    }

});

