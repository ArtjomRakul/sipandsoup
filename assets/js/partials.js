function loadPartial(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(html => { document.getElementById(id).innerHTML = html; });
}
document.addEventListener("DOMContentLoaded", function() {
 /* const isGitHubPages = window.location.hostname === "artjomrakul.github.io";
  const base = document.createElement("base");
  base.href = isGitHubPages ? "/sipandsoup.github.io/" : "/";
  document.head.prepend(base); */

  const isRecipe = window.location.pathname.includes('/recipes/');
  const partialsPrefix = isRecipe ? '../partials/' : 'partials/';
  loadPartial("navbar", partialsPrefix + "navbar.html");
  loadPartial("footer", partialsPrefix + "footer.html");
});
