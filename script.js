// showScreen — hides all sections and shows only the one we want
// screenId should match the id of the <section> tag, e.g. "screen-dashboard"
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active')
  })
  document.getElementById(screenId).classList.add('active')
}

// When the page loads, show the dashboard by default
showScreen('screen-dashboard')