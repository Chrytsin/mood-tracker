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

});
