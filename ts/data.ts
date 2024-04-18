/* exported data */

interface Data {
  view: string;
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

const previousEntriesJSON = localStorage.getItem('javascript-local-storage');

window.addEventListener('beforeunload', () => {
  const entriesJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', entriesJSON);
});

if (previousEntriesJSON) {
  data = JSON.parse(previousEntriesJSON);
}
