function loadPartial(id, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => { document.getElementById(id).innerHTML = html; })
    .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", function() {
  const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
  const basePath = isLocal ? '/' : '/sipandsoup.github.io/';
  const path = window.location.pathname;
  const partialsPrefix = path.includes('/recipes/') ? basePath + 'partials/' :
                         path.endsWith('/index.html') || path === '/' ? basePath + 'partials/' :
                         basePath + 'partials/';
  
  loadPartial("navbar", partialsPrefix + "navbar.html");
  loadPartial("footer", partialsPrefix + "footer.html");
});
