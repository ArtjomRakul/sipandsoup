function loadPartial(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(html => { document.getElementById(id).innerHTML = html; });
}
document.addEventListener("DOMContentLoaded", function() {
  loadPartial("navbar", "navbar.html");
  loadPartial("footer", "footer.html");
});
