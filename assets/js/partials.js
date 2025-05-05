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
  const isRecipe = window.location.pathname.includes('/recipes/');
  const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
  const partialsPrefix = isRecipe ? '../partials/' : isRoot ? 'partials/' : './partials/';
  
  loadPartial("navbar", partialsPrefix + "navbar.html");
  loadPartial("footer", partialsPrefix + "footer.html");
});
