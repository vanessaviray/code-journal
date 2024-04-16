/* exported data */

const data: any = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

console.log(data);

const previousEntriesJSON = localStorage.getItem('javascript-local-storage');

window.addEventListener('beforeunload', () => {
  const entriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', entriesJSON);
});

if (previousEntriesJSON) {
  data.entries = JSON.parse(previousEntriesJSON);
}
