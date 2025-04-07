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

  // Delete entry when clicking ❌
  li.querySelector('.deleteBtn').addEventListener('click', () => {
    li.remove();
  });
});
