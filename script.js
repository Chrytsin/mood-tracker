const saveBtn = document.getElementById('saveBtn');
const moodSelect = document.getElementById('mood');
const noteInput = document.getElementById('note');
const entriesList = document.getElementById('entries');

saveBtn.addEventListener('click', () => {
  const mood = moodSelect.value;
  const note = noteInput.value.trim();

  if (!note) {
    alert('Γράψε μια σημείωση!');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${mood} ${note}</span>
    <button class="deleteBtn">Διαγραφή ❌</button>
  `;

  entriesList.appendChild(li);
  noteInput.value = '';

  // EVENT: Delete entry when clicking deleteBtn
  li.querySelector('.deleteBtn').addEventListener('click', () => {
    li.remove();
  });

  //Αποθήκευση καταχωρήσεων στο localStorage
  const newEntry = { mood, note, date: new Date().toLocaleString() };
  const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];
  existingEntries.push(newEntry);
  localStorage.setItem('entries', JSON.stringify(existingEntries));

  //Εμφάνιση αποθηκευμένων καταχωρήσεων όταν φορτώνει η σελίδα
  window.addEventListener('DOMContentLoaded', () => {
    function loadEntries() {
  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

  savedEntries.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${entry.mood} ${entry.note} <small>${entry.date}</small></span>
      <button class="deleteBtn">❌</button>
    `;
    entriesList.appendChild(li);

    li.querySelector('.deleteBtn').addEventListener('click', () => {
      li.remove();
      deleteEntry(entry); // Θα την ορίσουμε αμέσως μετά
    });
  });
}

    //Διαγραφή από localStorage
    function deleteEntry(entryToDelete) {
  let entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries = entries.filter(entry => {
    return !(entry.mood === entryToDelete.mood && entry.note === entryToDelete.note && entry.date === entryToDelete.date);
  });
  localStorage.setItem('entries', JSON.stringify(entries));
}

  });
  
  //Κάλεσε το loadEntries() όταν φορτώνει η σελίδα
  window.addEventListener('DOMContentLoaded', loadEntries);

});
