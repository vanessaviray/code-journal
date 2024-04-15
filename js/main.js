'use strict';
// /* global data */
const $input = document.querySelector('#photo-url-field');
if (!$input) throw new Error('the photo-url-field query failed');
function getPhotoUrl(event) {
  const eventTarget = event.target;
  const photoUrl = eventTarget.value;
  const $image = document.querySelector('img');
  if (!$image) throw new Error('the img query failed');
  $image.src = photoUrl;
}
$input.addEventListener('input', getPhotoUrl);
