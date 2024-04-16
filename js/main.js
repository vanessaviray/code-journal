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
$entryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $entryForm.elements;
  const $formData = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift($formData);
  if (!$image) throw new Error('the img query failed');
  $image.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
});
