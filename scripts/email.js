
  const kontaktForma = document.getElementById('kontakt-forma');
  const statusPoruke = document.getElementById('status-poruke');
  const submitBtn = document.getElementById('submit-btn');

  kontaktForma.addEventListener('submit', function(e) {
    e.preventDefault();

    // Resetovanje status poruke
    statusPoruke.classList.remove('text-success', 'text-danger');
    statusPoruke.textContent = "";

    // 1. SECURITY CHECK (Honeypot)
    const botCheck = document.getElementById('bot_check').value;
    if (botCheck !== "") {
        console.warn("Spam attempt blocked by honeypot.");
        return; 
    }

    // 2. RECAPTCHA CHECK
    const recaptchaResponse = grecaptcha.getResponse(); 
    if (recaptchaResponse.length === 0) { 
        statusPoruke.classList.add('text-danger');
        statusPoruke.textContent = "Molimo potvrdite da niste robot (reCAPTCHA).";
        return; 
    }

    // 3. UI FEEDBACK
    statusPoruke.textContent = "Šaljem poruku...";
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML; 
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Slanje...';

    // 4. SLANJE NA EMAILJS
    emailjs.sendForm('service_cl4fw3d', 'template_e3mln5p', this)
      .then(function() {
        statusPoruke.classList.add('text-success');
        statusPoruke.textContent = "Poruka je uspešno poslata! Javiću ti se u roku od 24h.";
        kontaktForma.reset();
        grecaptcha.reset(); 
      }, function(error) {
        console.log('EmailJS greška:', error);
        statusPoruke.classList.add('text-danger');
        statusPoruke.textContent = "Došlo je do greške pri slanju. Pokušaj ponovo ili piši direktno na email.";
        grecaptcha.reset(); 
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  });
