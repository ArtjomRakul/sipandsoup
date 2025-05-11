function loadPartial(id, url) {
  const adjustedUrl = (isLocalhost() && url === '/') ? '/index.html' : url + '.html';
  fetch(adjustedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => { 
      document.getElementById(id).innerHTML = html; 
      fixLinks();
    })
    .catch(error => console.error(error));
}

function isLocalhost() {
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

function fixLinks() {
  if (isLocalhost()) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        if (href === '/' || href === '/index') {
          link.setAttribute('href', '/index.html');
        } else if (!href.includes('.')) {
          link.setAttribute('href', `${href}.html`);
        } else if (!href.endsWith('.html') && !href.includes('.')) {
          link.setAttribute('href', `${href}.html`);
        }
      }
    });
  } else {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '../index.html' || href === '/index.html') {
        link.setAttribute('href', href.replace('index.html', ''));
      }
    });
  }
}

function fixHomeLinks() {
  if (!isLocalhost()) {
    document.querySelectorAll('a[href="../index.html"], a[href="/index.html"]').forEach(link => {
      const href = link.getAttribute('href');
      link.setAttribute('href', href.replace('index.html', ''));
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const basePath = '/';
  const path = window.location.pathname;
  const partialsPrefix = path.includes('/recipes/') ? basePath + 'partials/' :
                         path.endsWith('/index') || path === '/' ? basePath + 'partials/' :
                         basePath + 'partials/';
  
  loadPartial("navbar", partialsPrefix + "navbar");
  loadPartial("footer", partialsPrefix + "footer");

  setTimeout(fixLinks, 100);
  setTimeout(fixHomeLinks, 200);
});
