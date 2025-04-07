const saveBtn = document.getElementById('saveBtn');
const moodSelect = document.getElementById('mood');
const noteInput = document.getElementById('note');
const entriesList = document.getElementById('entries');

// Φόρτωσε τις υπάρχουσες καταχωρήσεις από το localStorage όταν ανοίξει η σελίδα
window.addEventListener('DOMContentLoaded', loadEntries);

// Κάνε αποθήκευση νέας καταχώρησης όταν γίνει click στο κουμπί "Save"
saveBtn.addEventListener('click', () => {
  const mood = moodSelect.value;
  const note = noteInput.value.trim();

  // Έλεγχος αν έχει γραφτεί σημείωση
  if (!note) {
    alert('Γράψε μια σημείωση!');
    return;
  }
  
  // Δημιουργία αντικειμένου για την καταχώρηση
  const newEntry = {
    mood,
    note,
    date: new Date().toLocaleString() // ημερομηνία και ώρα καταγραφής
  };

  // Δημιουργία του li στο DOM
  const li = createListItem(newEntry);
  entriesList.appendChild(li);

  // Καθάρισε το input πεδίο
  noteInput.value = '';

  // Φέρε τις υπάρχουσες καταχωρήσεις από το localStorage ή ένα άδειο array
  const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];

  // Πρόσθεσε τη νέα καταχώρηση και αποθήκευσέ την
  existingEntries.push(newEntry);
  localStorage.setItem('entries', JSON.stringify(existingEntries));
});

// Συνάρτηση για τη δημιουργία ενός li στοιχείου
function createListItem(entry) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${entry.mood} ${entry.note} <small>${entry.date}</small></span>
    <button class="deleteBtn">❌</button>
  `;

  // Όταν πατηθεί το ❌, αφαίρεσε το στοιχείο και από το DOM και από το localStorage
  li.querySelector('.deleteBtn').addEventListener('click', () => {
    li.remove();
    deleteEntry(entry);
  });

  return li;
}

// Συνάρτηση για την εμφάνιση των καταχωρήσεων κατά τη φόρτωση της σελίδας
function loadEntries() {
  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

  savedEntries.forEach(entry => {
    const li = createListItem(entry);
    entriesList.appendChild(li);
  });
}

// Συνάρτηση για διαγραφή καταχώρησης από το localStorage
function deleteEntry(entryToDelete) {
  let entries = JSON.parse(localStorage.getItem('entries')) || [];

  // Φίλτραρε τις εγγραφές ώστε να κρατήσεις μόνο τις διαφορετικές από αυτή που θέλεις να διαγράψεις
  entries = entries.filter(entry => {
    return !(entry.mood === entryToDelete.mood &&
             entry.note === entryToDelete.note &&
             entry.date === entryToDelete.date);
  });

  localStorage.setItem('entries', JSON.stringify(entries));
}
