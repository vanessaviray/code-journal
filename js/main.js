'use strict';
// /* global data */
// Set the src of the img element to the value in the photo url input
const $photoUrlElement = document.querySelector('#photo-url-field');
if (!$photoUrlElement) throw new Error('the photo-url-field query failed');
function getPhoto(event) {
  const eventTarget = event.target;
  const photoUrl = eventTarget.value;
  const $image = document.querySelector('img');
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
  console.log($formData);
  console.log(data.nextEntryId);
});
