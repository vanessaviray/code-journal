'use strict';
// /* global data */
const $photoUrlElement = document.querySelector('#photo-url-field');
if (!$photoUrlElement) throw new Error('the photo-url-field query failed');
const $image = document.querySelector('img');
function getPhoto(event) {
  const eventTarget = event.target;
  const photoUrl = eventTarget.value;
  if (!$image) throw new Error('the img query failed');
  $image.src = photoUrl;
}
$photoUrlElement.addEventListener('input', getPhoto);
const $entryForm = document.querySelector('#entry-form');
if (!$entryForm) throw new Error('the entry-form query failed');
const $formElements = $entryForm.elements;
const $formData = {
  title: $formElements.title.value,
  photoUrl: $formElements.photoUrl.value,
  notes: $formElements.notes.value,
  entryId: data.nextEntryId,
};
$entryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  data.nextEntryId++;
  data.entries.unshift($formData);
  if (!$image) throw new Error('the img query failed');
  $image.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
});
// generate and return a DOM tree for the li element
function renderEntry(entry) {
  const $liElement = document.createElement('li');
  const $rowDiv = document.createElement('div');
  $rowDiv.setAttribute('class', 'row');
  $liElement.appendChild($rowDiv);
  const $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $rowDiv.appendChild($columnHalfDiv);
  const $columnHalfDiv2 = document.createElement('div');
  $columnHalfDiv2.setAttribute('class', 'column-half');
  $rowDiv.appendChild($columnHalfDiv2);
  const $imgElement = document.createElement('img');
  $imgElement.setAttribute('src', entry.photoUrl);
  $columnHalfDiv.appendChild($imgElement);
  const $h2Element = document.createElement('h2');
  $columnHalfDiv2.appendChild($h2Element);
  const titleValue = entry.title;
  $h2Element.textContent = titleValue;
  const $pElement = document.createElement('p');
  $columnHalfDiv2.appendChild($pElement);
  const notesValue = entry.notes;
  $pElement.textContent = notesValue;
  return $liElement;
}
console.log(renderEntry(data.entries[0]));
