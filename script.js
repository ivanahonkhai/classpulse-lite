// ============================================================
// CLASSPULSE — script.js
// The brain of the app. Handles all data and user interaction.
// ============================================================


// ============================================================
// 1. DATA
// This is where all our information lives.
// Think of it like three spreadsheets — one per subject.
// Each subject tracks how many students are in each group,
// and stores their names.
// ============================================================

// Which subject is currently selected
let selectedSubject = 'Math'

// The count of students per colour, per subject
let data = {
  Math: { green: 0, yellow: 0, red: 0 },
  English: { green: 0, yellow: 0, red: 0 },
  IPC: { green: 0, yellow: 0, red: 0 }
}

// The list of student names per colour, per subject
let names = {
  Math: { green: [], yellow: [], red: [] },
  English: { green: [], yellow: [], red: [] },
  IPC: { green: [], yellow: [], red: [] }
}
// ============================================================
// 2. SUBJECT SELECTOR
// When a subject button is clicked, highlight it and
// update the display to show that subject's data
// ============================================================

// Find all the subject buttons on the page
const subjectButtons = document.querySelectorAll('.btn-subject')

// Loop through each button and add a click listener
subjectButtons.forEach(function (button) {
  button.addEventListener('click', function () {

    // Remove the "active" highlight from all subject buttons
    subjectButtons.forEach(function (b) {
      b.classList.remove('active')
    })

    // Add the "active" highlight to the one that was clicked
    button.classList.add('active')

    // Update which subject is selected
    // data-subject is the value we put in the HTML: data-subject="Math"
    selectedSubject = button.getAttribute('data-subject')

    // Refresh the display to show this subject's counts and names
    updateDisplay()

  })
})
// ============================================================
// 3. COLOUR BUTTONS
// When a colour button is clicked:
//   - Read the student name from the input box
//   - Warn if the name is empty
//   - Save the entry
//   - Update the display
//   - Clear the input
// ============================================================

// Find all the colour buttons on the page
const colourButtons = document.querySelectorAll('.btn-colour')

// Loop through each colour button and add a click listener
colourButtons.forEach(function (button) {
  button.addEventListener('click', function () {

    // Read what's in the name input box and tidy it up
    const nameInput = document.getElementById('student-name-input')
    const studentName = nameInput.value.trim()

    // If the name box is empty, warn and stop
    if (studentName === '') {
      showWarning("Don't forget to type the student's name first! ✏️")
      nameInput.focus() // put the cursor back in the box
      return
    }

    // Which colour was clicked? (green, yellow, or red)
    const colour = button.getAttribute('data-colour')

    // Add 1 to the count for this subject and colour
    data[selectedSubject][colour] = data[selectedSubject][colour] + 1

    // Add the student's name to the names list
    // (only if they haven't already been added for this subject)
    if (!names[selectedSubject][colour].includes(studentName)) {
      names[selectedSubject][colour].push(studentName)
    }

    // Refresh the counters and name lists on screen
    updateDisplay()

    // Clear the input box and put focus back ready for next name
    nameInput.value = ''
    nameInput.focus()

    // Show a small success confirmation
    showSuccess(studentName + ' recorded as ' + getColourLabel(colour) + ' ✅')

  })
})
// ============================================================
// 4. SHOW / HIDE NAMES BUTTONS
// Clicking "Show Names" under a colour reveals or hides
// the list of names in that group
// ============================================================

const showNamesButtons = document.querySelectorAll('.btn-show-names')

showNamesButtons.forEach(function (button) {
  button.addEventListener('click', function () {

    const colour = button.getAttribute('data-colour')
    const namesList = document.getElementById('names-' + colour)

    // Toggle the "visible" class on the list
    const isVisible = namesList.classList.contains('visible')

    if (isVisible) {
      namesList.classList.remove('visible')
      button.textContent = 'Show Names 👇'
    } else {
      namesList.classList.add('visible')
      button.textContent = 'Hide Names 👆'
    }

  })
})
// ============================================================
// 5. UPDATE DISPLAY
// This function reads the data object and updates everything
// on screen — counters and name lists — for the current subject.
// Call this any time the data changes.
// ============================================================

function updateDisplay() {

  const colours = ['green', 'yellow', 'red']

  colours.forEach(function (colour) {

    // Update the count badge (the big number above each button)
    const countEl = document.getElementById('count-' + colour)
    countEl.textContent = data[selectedSubject][colour]

    // Update the names list
    const namesList = document.getElementById('names-' + colour)
    namesList.innerHTML = '' // clear the current list first

    // Add one <li> item for each name saved under this colour
    names[selectedSubject][colour].forEach(function (name) {
      const li = document.createElement('li')
      li.textContent = name
      namesList.appendChild(li)
    })

  })

}
// ============================================================
// 6. HELPER FUNCTIONS
// Small reusable pieces used throughout the app
// ============================================================

// Returns a friendly text label for each colour
function getColourLabel(colour) {
  if (colour === 'green') return 'No Help Needed 🟢'
  if (colour === 'yellow') return 'A Little Help 🟡'
  if (colour === 'red') return 'Lots of Help 🔴'
}

// Shows a green success message at the top of the screen
function showSuccess(message) {
  showNotification(message, 'success')
}

// Shows a yellow warning message at the top of the screen
function showWarning(message) {
  showNotification(message, 'warning')
}

// Creates and displays a notification banner that fades away
function showNotification(message, type) {

  // Remove any existing notification first
  const existing = document.getElementById('notification')
  if (existing) existing.remove()

  // Create the notification element
  const note = document.createElement('div')
  note.id = 'notification'
  note.className = 'notification notification-' + type
  note.textContent = message

  // Add it to the page just below the header
  const header = document.getElementById('app-header')
  header.insertAdjacentElement('afterend', note)

  // Automatically remove it after 2.5 seconds
  setTimeout(function () {
    note.remove()
  }, 2500)

}
// ============================================================
// 7. SCREEN NAVIGATION
// Controls which screen is visible
// ============================================================

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active')
  })
  document.getElementById(screenId).classList.add('active')
}

// Charts button — we'll build the charts screen in a later step
document.getElementById('btn-view-charts').addEventListener('click', function () {
  showScreen('screen-charts')
})
// ============================================================
// 8. START THE APP
// Run this when the page first loads
// ============================================================
updateDisplay()