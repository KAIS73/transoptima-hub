// Inizializzazione dell'applicazione
document.addEventListener('DOMContentLoaded', function() {
  // Controllo funzionalità del browser
  if (!('IntersectionObserver' in window)) {
    // Load polyfill o fallback
    import('intersection-observer').then(() => {
      initObservers();
    });
  } else {
    initObservers();
  }
  
  // Gestione dello stato offline
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  function updateOnlineStatus() {
    const statusElement = document.createElement('div');
    statusElement.className = `network-status ${navigator.onLine ? 'online' : 'offline'}`;
    statusElement.textContent = navigator.onLine 
      ? 'Connessione ripristinata' 
      : 'Connessione assente - modalità offline';
    
    document.body.prepend(statusElement);
    
    setTimeout(() => {
      statusElement.classList.add('fade-out');
      setTimeout(() => statusElement.remove(), 500);
    }, 3000);
  }
  
  // Inizializzazione observer per lazy loading
  function initObservers() {
    const observerOptions = {
      rootMargin: '100px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.dataset.src) {
            element.src = element.dataset.src;
            observer.unobserve(element);
          }
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('[data-src]').forEach(img => {
      observer.observe(img);
    });
  }
  
  // Analytics (sostituire con il tuo tracking ID)
  if (process.env.NODE_ENV === 'production') {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-XXXXX-Y');
  }
});