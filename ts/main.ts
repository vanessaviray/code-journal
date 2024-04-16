// /* global data */

// Set the src of the img element to the value in the photo url input

const $photoUrlElement = document.querySelector('#photo-url-field');
if (!$photoUrlElement) throw new Error('the photo-url-field query failed');

function getPhoto(event: any): void {
  const eventTarget = event.target;
  const photoUrl = eventTarget.value;
  const $image = document.querySelector('img');
  if (!$image) throw new Error('the img query failed');
  $image.src = photoUrl;
}

$photoUrlElement.addEventListener('input', getPhoto);

// Add a 'submit' event listener to the form element

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
  newProperty?: any;
}

const $entryForm = document.querySelector('#entry-form') as HTMLFormElement;
if (!$entryForm) throw new Error('the entry-form query failed');

$entryForm.addEventListener('submit', (event: Event): void => {
  event.preventDefault();
  const $formElements = $entryForm.elements as FormElements;
  const $formData = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.push($formData);
  const $image = document.querySelector('img');
  if (!$image) throw new Error('the img query failed');
  $image.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
  console.log($formData);
  console.log(data.nextEntryId);
  console.log(data.entries);
});
