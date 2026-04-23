// Funkcija za dinamičko podešavanje paddinga
  function adjustNavbarOffset() {
    const topBar = document.getElementById('topBar');
    const mainNavbar = document.getElementById('mainNavbar');
    let topBarHeight = 0;
    let navbarHeight = 0;

    if (topBar) {
        topBarHeight = topBar.getBoundingClientRect().height;
    }

    if (mainNavbar) {
      // Postavi navbar odmah ispod Top Bara
      mainNavbar.style.top = topBarHeight + 'px';
      mainNavbar.style.position = 'fixed'; 
      mainNavbar.style.width = '100%';     
      mainNavbar.style.left = '0';          
      
      navbarHeight = mainNavbar.getBoundingClientRect().height;
    }

    // Postavljamo padding na body SAMO za visinu Top Bara.
    // Ovo dozvoljava da Hero sekcija "sklizne" ispod Navbara.
    document.body.style.paddingTop = topBarHeight + 'px';
    
    // Zadržavamo scroll padding da anchor linkovi rade ispravno (da ne odu pod meni)
    document.documentElement.style.scrollPaddingTop = (topBarHeight + navbarHeight) + 'px';
  }

  // 1. SCROLL ANIMATIONS (Intersection Observer)
  const observerOptions = {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // 2. COURSE DETAILS TOGGLE
  const animationDuration = 500; 
  let currentScrollTimeout = null; 
  const detailsContainer = document.querySelector('.course-details-container'); 
  const hideTimeouts = {}; 

  function toggleCourse(detailId, clickedCard, doScroll = true, defaultCoverImageUrl, courseNo) {
    const details = document.querySelectorAll('.course-details-section');
    const allCards = document.querySelectorAll('.course-card');
    const targetDetail = document.getElementById(detailId);
	
	const imgElement = document.getElementById(courseNo + '-preview-image');
	imgElement.src = defaultCoverImageUrl;

    // Zatvori sve ostale detalje
    allCards.forEach(card => card.classList.remove('active')); 
    
    details.forEach(detail => {
        if (detail.id !== detailId && detail.classList.contains('is-visible')) {
            detail.classList.remove('is-visible'); 
            if (hideTimeouts[detail.id]) {
                clearTimeout(hideTimeouts[detail.id]);
            }
            hideTimeouts[detail.id] = setTimeout(() => {
                detail.style.display = 'none';
                delete hideTimeouts[detail.id];
                const anyActiveDetail = document.querySelector('.course-details-section.is-visible');
                if (!anyActiveDetail && targetDetail.style.display === 'none') { 
                    detailsContainer.classList.remove('has-active-detail');
                }
            }, animationDuration);
        } else if (detail.id !== detailId && detail.style.display !== 'none') {
            if (hideTimeouts[detail.id]) {
                clearTimeout(hideTimeouts[detail.id]);
                delete hideTimeouts[detail.id];
            }
            detail.style.display = 'none';
        }
    });

    // Otvaranje ciljanog detalja
    if (hideTimeouts[detailId]) { 
        clearTimeout(hideTimeouts[detailId]);
        delete hideTimeouts[detailId];
    }
    
    targetDetail.style.display = 'block'; 
    targetDetail.offsetHeight; // Trigeruje reflow
    
    clickedCard.classList.add('active'); 
    targetDetail.classList.add('is-visible'); 
    detailsContainer.classList.add('has-active-detail'); 

    if (currentScrollTimeout) {
        clearTimeout(currentScrollTimeout);
    }
	
	if(detailId == 'detail-a1')
		updateA1Display('general-course-list', 1, 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', undefined, 'Zaboravite na suvoparna pravila. Naš vizuelni pristup gramatici koristi boje, mape uma i logiku koju ćete lako zapamtiti i primeniti.', 'docs/courses/general/opsti_a1.jpg?q=80&w=1600&auto=format&fit=crop', 'text-primary', false);
    else if(detailId == 'detail-b1')
		updateA1Display('elementary-course-list', 2, 'docs/courses/elementary/previews/elementary_5.jpg?q=80&w=800&auto=format&fit=contain', undefined, 'Zaboravite na suvoparna pravila. Naš vizuelni pristup gramatici koristi boje, mape uma i logiku koju ćete lako zapamtiti i primeniti.', 'docs/courses/elementary/elementary_5.jpg?q=80&w=1600&auto=format&fit=crop', 'text-success', false)
    else if(detailId == 'detail-c1')
		updateA1Display('business-course-list', 3, 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop', undefined, 'Koristimo isečke iz vaših omiljenih filmova i serija da uvežbamo slušanje i usvojimo prirodne izraze koje izvorni govornici zaista koriste.', 'docs/courses/business/business_b1.jpg?q=80&w=1600&auto=format&fit=crop', 'text-warning', false)
	else if(detailId == 'detail-d1')
		updateA1Display('cambridge-course-list', 4, 'docs/courses/cambridge/cambridge.jpg?q=80&w=800&auto=format&fit=crop', undefined, 'Zaboravite na suvoparna pravila. Naš vizuelni pristup gramatici koristi boje, mape uma i logiku koju ćete lako zapamtiti i primeniti.', 'docs/courses/cambridge/cambridge.jpg?q=80&w=1600&auto=format&fit=crop', 'text-danger', false);
	// Skroluj do detalja
    if (doScroll) {
      currentScrollTimeout = setTimeout(() => {
          let headerOffset = 0;
          const topBarElement = document.getElementById('topBar');
          const mainNavbarElement = document.getElementById('mainNavbar');
          
          if (topBarElement) headerOffset += topBarElement.getBoundingClientRect().height;

          if (mainNavbarElement) {
              if (window.innerWidth < 768) {
                  // Na mobilnom, koristi fiksnu visinu collapsed navbara za skrolovanje
                  headerOffset += parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height-mobile-collapsed'));
			  } else {
                  // Na desktopu, koristi stvarnu visinu collapsed navbara
                  headerOffset += mainNavbarElement.getBoundingClientRect().height;
			  }
          }

          const elementTop = targetDetail.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - headerOffset; 

          window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
          });
          currentScrollTimeout = null; 
      }, animationDuration + 50); 
    }
  }

  // 3. NAVBAR SCROLL EFFECT (za senku)
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    const topBarHeight = document.getElementById('topBar') ? document.getElementById('topBar').getBoundingClientRect().height : 0;
    if (window.scrollY > topBarHeight) { 
      nav.classList.add('shadow');
    } else {
      nav.classList.remove('shadow');
    }
  });

  // 4. INICIJALIZACIJA
  document.addEventListener('DOMContentLoaded', () => {
    adjustNavbarOffset(); 
    window.addEventListener('resize', adjustNavbarOffset);

    // UKLONJENI event listeneri za shown.bs.collapse i hidden.bs.collapse
    // jer ne želimo da se padding-top menja kada se meni otvori/zatvori

    const firstCard = document.getElementById('card-a1'); 
    const firstDetail = document.getElementById('detail-a1');
    const detailsContainer = document.querySelector('.course-details-container');

    if (firstCard && firstDetail && detailsContainer) {
      firstDetail.style.transition = 'none';
      firstCard.classList.add('active');
      firstDetail.style.display = 'block';
      firstDetail.classList.add('is-visible');
      detailsContainer.classList.add('has-active-detail');
      firstDetail.offsetHeight; 
      requestAnimationFrame(() => {
        firstDetail.style.transition = ''; 
      });
    }

    // Zatvaranje menija na klik izvan
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        const clickableNavItems = navMenu.querySelectorAll('.navbar-nav a'); 

        document.body.addEventListener('click', function(event) {
            if (navMenu.classList.contains('show') && 
                !navMenu.contains(event.target) && 
                !navbarToggler.contains(event.target)) {
                navbarToggler.click(); 
            }
        });

        clickableNavItems.forEach(item => {
            item.addEventListener('click', function() {
                if (navMenu.classList.contains('show')) {
                    navbarToggler.click(); 
                }
            });
        });
    }

    // NOVO: Event listener za otvaranje modal prozora sa slikom
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function (event) {
            // Dugme koje je trigerovalo modal
            const button = event.relatedTarget; 
            // Izvlačimo URL slike iz 'data-current-img-src' atributa dugmeta
            // Sada se `data-current-img-src` koristi za modal
            const imageUrl = button.getAttribute('data-current-img-src'); 
            // Ažuriramo 'src' atribut slike unutar modala
            const modalImage = imageModal.querySelector('#modalImage');
            modalImage.src = imageUrl;
        });
    }
  });

  // --- IZMENJENA FUNKCIJA ZA A1 KURS CHECK LISTU (SADA SA DVA URL PARAMETRA) ---
  // Dodati su previewImgUrl i modalImgUrl
  function updateA1Display(listId, courseNo, previewImgUrl, clickedElement, descriptionText, modalImgUrl, color, shouldScroll = true) {
    // 1. Resetuj sve elemente u listi
    const listContainer = document.getElementById(listId);
    const items = listContainer.querySelectorAll('.interactive-item');
    
    items.forEach(item => {
        // Resetuj stil pozadine i bordera
        item.classList.remove('bg-primary-subtle', 'border-primary');
        item.classList.add('border-light', 'bg-white'); // Vrati na belo
        
        // Resetuj ikonicu na prazan krug
        const icon = item.querySelector('i');
        icon.className = 'bi bi-circle text-muted fs-4 me-3 flex-shrink-0';
    });

    // 2. Aktiviraj kliknuti element
	var clieckedDivElement = clickedElement;
	if(clickedElement == undefined)
	{
		clieckedDivElement = document.querySelector('#' + listId + ' > div');
	}
		
    clieckedDivElement.classList.remove('border-light', 'bg-white');
    clieckedDivElement.classList.add('bg-primary-subtle', 'border-primary');
    
    // Promeni ikonicu na check
    const activeIcon = clieckedDivElement.querySelector('i');
    activeIcon.className = 'bi bi-check-circle-fill fs-4 me-3 flex-shrink-0 ' + color ;

    // 3. Promeni sliku, TEKST i ažuriraj atribute za modal sa fade efektom
    const imgElement = document.getElementById(courseNo + '-preview-image'); // Ovo je glavna preview slika
    const textElement = document.getElementById(courseNo + '-preview-text');
    const viewExampleButton = document.getElementById(courseNo + '-view-example-button'); // Dugme za otvaranje modala
    const rightContentArea = document.getElementById(courseNo + '-right-content-area'); 
    
    // Zapocni fade-out animaciju za trenutni sadržaj
    imgElement.style.opacity = 0;
	if(textElement){
		textElement.style.opacity = 0;
		}
    
    // Sačekaj da se fade-out završi (300ms, koliko je definisano u CSS tranziciji)
    setTimeout(() => {
        imgElement.src = previewImgUrl; // Koristi previewImgUrl za sliku unutar sekcije
		if(textElement){
			textElement.textContent = descriptionText;
		}
        if (viewExampleButton) { // Provera da li element postoji
            // Ažuriraj data atribut dugmeta sa URL-om slike za MODAL
            viewExampleButton.setAttribute('data-current-img-src', modalImgUrl); 
        }

        imgElement.style.opacity = 1;
		if(textElement){
			textElement.style.opacity = 1;
		}

        if (shouldScroll && window.innerWidth < 768 && rightContentArea) {
            setTimeout(() => {
                let headerOffset = 0;
                const topBarElement = document.getElementById('topBar');
                const mainNavbarElement = document.getElementById('mainNavbar');
                
                if (topBarElement) headerOffset += topBarElement.getBoundingClientRect().height;

                if (mainNavbarElement) {
                    // Na mobilnom, koristi fiksnu visinu collapsed navbara za skrolovanje
                    headerOffset += parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height-mobile-collapsed'));
                } else {
                    // Na desktopu, koristi stvarnu visinu collapsed navbara
                    headerOffset += mainNavbarElement.getBoundingClientRect().height;
                }
                
                const elementTop = rightContentArea.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementTop - headerOffset - 20; 
				
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }, 350); 
        }
    }, 300); 
  }