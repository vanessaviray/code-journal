// /* global data */

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
