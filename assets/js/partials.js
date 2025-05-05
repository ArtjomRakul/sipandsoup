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
  const path = window.location.pathname;
  const partialsPrefix = path.includes('/recipes/') ? '../partials/' :
                         path.endsWith('/index.html') || path === '/' ? 'partials/' :
                         './partials/';
  
  loadPartial("navbar", partialsPrefix + "navbar.html");
  loadPartial("footer", partialsPrefix + "footer.html");
});
