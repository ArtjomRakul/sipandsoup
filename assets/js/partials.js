function loadPartial(id, url) {
  fetch(url + '.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => { 
      document.getElementById(id).innerHTML = html; 
      if (isLocalhost()) {
        appendHtmlToLinks();
      }
    })
    .catch(error => console.error(error));
}

function isLocalhost() {
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

function appendHtmlToLinks() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.includes('.') && !href.startsWith('#') && !href.startsWith('http')) {
      link.setAttribute('href', `${href}.html`);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const basePath = '/';
  const path = window.location.pathname;
  const partialsPrefix = path.includes('/recipes/') ? basePath + 'partials/' :
                         path.endsWith('/index') || path === '/' ? basePath + 'partials/' :
                         basePath + 'partials/';
  
  loadPartial("navbar", partialsPrefix + "navbar");
  loadPartial("footer", partialsPrefix + "footer");
});
