const saveBtn = document.getElementById('saveBtn');
const moodSelect = document.getElementById('mood');
const noteInput = document.getElementById('note');
const entriesList = document.getElementById('entries');

// 1. EVENT: Φόρτωσε τις υπάρχουσες καταχωρήσεις από το localStorage όταν ανοίξει η σελίδα
window.addEventListener('DOMContentLoaded', loadEntries);

// 2. EVENT: Αποθήκευση νέας καταχώρησης όταν γίνει click στο κουμπί "Save"
saveBtn.addEventListener('click', () => {
  const mood = moodSelect.value;
  const note = noteInput.value.trim();

  // 2.1 Έλεγχος αν έχει γραφτεί σημείωση
  if (!note) {
    alert('Γράψε μια σημείωση!');
    return;
  }
  
  // 2.2 Δημιουργία αντικειμένου για την καταχώρηση
  const newEntry = {
    mood,
    note,
    date: new Date().toLocaleString() // ημερομηνία και ώρα καταγραφής
  };

  // 2.3 Δημιουργία του li στο DOM
  const li = createListItem(newEntry);
  entriesList.appendChild(li);

  // 2.4 Καθάρισε το input πεδίο
  noteInput.value = '';

  // 2.5 Φέρε τις υπάρχουσες καταχωρήσεις από το localStorage ή ένα άδειο array
  const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];

  // 2.6 Πρόσθεσε τη νέα καταχώρηση και αποθήκευσέ την
  existingEntries.push(newEntry);
  localStorage.setItem('entries', JSON.stringify(existingEntries));
});

// 3. FUNCTION: Δημιουργία ενός li στοιχείου
function createListItem(entry) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${entry.mood} ${entry.note} <small>${entry.date}</small></span>
    <button class="deleteBtn">Διαγραφή ❌</button>
  `;

  // 3.1 EVENT: Όταν πατηθεί το deleteBtn αφαίρεσε το στοιχείο και από το DOM και από το localStorage
  li.querySelector('.deleteBtn').addEventListener('click', () => {
    li.remove();
    deleteEntry(entry);
  });

  return li;
}

// 4. FUNCTION: Εμφάνιση των καταχωρήσεων κατά τη φόρτωση της σελίδας
function loadEntries() {
  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

  savedEntries.forEach(entry => {
    const li = createListItem(entry);
    entriesList.appendChild(li);
  });
}

// 5. FUNCTION: Διαγραφή καταχώρησης από το localStorage
function deleteEntry(entryToDelete) {
  // 5.1 Αν υπάρχει λίστα με καταχωρήσεις στο localStorage μετέτρεψε την σε array, αλλιώς ξεκίνα με κενό array
  let entries = JSON.parse(localStorage.getItem('entries')) || [];

  // 5.2 Φίλτραρε τις εγγραφές ώστε να κρατήσεις μόνο τις διαφορετικές από αυτή που θέλεις να διαγράψεις
  entries = entries.filter(entry => {
    return !(entry.mood === entryToDelete.mood &&
             entry.note === entryToDelete.note &&
             entry.date === entryToDelete.date);
  });

  // 5.3 Μετατροπή arrays σε strings
  localStorage.setItem('entries', JSON.stringify(entries));
}
