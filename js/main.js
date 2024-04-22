'use strict';
// /* global data */
const $photoUrlElement = document.querySelector('#photo-url-field');
const $image = document.querySelector('img');
if (!$photoUrlElement) throw new Error('the photo-url-field query failed');
// CHANGE IMAGE BEING DISPLAYED (EDIT ENTRY VIEW)
function getPhoto(event) {
  const eventTarget = event.target;
  const photoUrl = eventTarget.value;
  if (!$image) throw new Error('the img query failed');
  if (photoUrl === '') {
    $image.src = 'images/placeholder-image-square.jpg';
    $image.alt = 'placeholder image';
  } else {
    $image.src = photoUrl;
    $image.alt = 'image provided';
  }
}
$photoUrlElement.addEventListener('input', getPhoto);
const $form = document.querySelector('#form');
const $liElements = document.getElementsByTagName('li');
const $titleElement = document.querySelector('#title-field');
const $notesElement = document.querySelector('#notes-field');
const $entryTitle = document.querySelector('#entryTitle');
const $deleteEntryButton = document.querySelector('#delete-entry-button');
if (!$form) throw new Error('the form query failed');
if (!$liElements) throw new Error(`the 'li' query failed`);
if (!$titleElement) throw new Error(`the '#title-field' query failed`);
if (!$notesElement) throw new Error(`the '#notes-field' query failed`);
if (!$entryTitle) throw new Error(`the '#entriesTitle' query failed`);
if (!$deleteEntryButton)
  throw new Error(`the '#delete-entry-button' query failed`);
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const $formData = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift($formData);
    $ulElement.prepend(renderEntry($formData));
  } else {
    $formData.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $formData.entryId) {
        data.entries[i] = $formData;
        for (let i = 0; i < $liElements.length; i++) {
          const dataEntryId = $liElements[i].getAttribute('data-entry-id');
          if (dataEntryId === $formData.entryId.toString()) {
            const $newLi = renderEntry($formData);
            $liElements[i].replaceWith($newLi);
          }
        }
      }
    }
    if (!$entryTitle) throw new Error(`the '#entriesTitle' query failed`);
    $entryTitle.textContent = 'New Entry';
    data.editing = null;
    $titleElement.setAttribute('value', '');
    $photoUrlElement.setAttribute('value', '');
    $notesElement.textContent = '';
  }
  if (!$image) throw new Error('the img query failed');
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
  viewSwap('entries');
  toggleNoEntries();
  deleteEntryButtonView();
});
// GENERATE AND RETURN A DOM TREE FOR THE LI ELEMENT
function renderEntry(entry) {
  const $liElement = document.createElement('li');
  $liElement.setAttribute('data-entry-id', entry.entryId.toString());
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
  $imgElement.setAttribute('alt', 'journal entry subject');
  $columnHalfDiv.appendChild($imgElement);
  const $h2Element = document.createElement('h2');
  $columnHalfDiv2.appendChild($h2Element);
  const titleValue = entry.title;
  $h2Element.textContent = titleValue;
  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');
  $h2Element.appendChild($pencilIcon);
  const $pElement = document.createElement('p');
  $columnHalfDiv2.appendChild($pElement);
  const notesValue = entry.notes;
  $pElement.textContent = notesValue;
  return $liElement;
}
// ADD EVENT LISTENER TO UNORDERED LIST ELEMENT
const $ulElement = document.querySelector('ul');
if (!$ulElement) throw new Error(`the 'ul' query failed`);
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const newLi = renderEntry(data.entries[i]);
    $ulElement.appendChild(newLi);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
// CREATE FUNCTION TO TOGGLE THE NO ENTRIES TEXT TO SHOW OR HIDE
const $noEntriesElement = document.getElementById('no-entries');
function toggleNoEntries() {
  if (!$noEntriesElement) throw new Error(`the 'no-entries' query failed`);
  if (data.entries.length > 0) {
    $noEntriesElement.className = 'hidden';
  } else {
    $noEntriesElement.className = 'show';
  }
}
// CREATE FUNCTION TO SHOW VIEW WHOSE NAME WAS PROVIDED IN THE ARGUMENT
const $entriesDiv = document.querySelector('#entries');
const $entryForm = document.querySelector('#entry-form');
function viewSwap(view) {
  const valueOfView = view;
  data.view = valueOfView;
  if (!$entriesDiv) throw new Error(`the '#entries' query failed`);
  if (!$entryForm) throw new Error(`the '#entry-form' query failed`);
  if (view === 'entries') {
    $entriesDiv.className = 'show';
    $entryForm.className = 'hidden';
  } else if (view === 'entry-form') {
    $entriesDiv.className = 'hidden';
    $entryForm.className = 'show';
  }
}
// ADD EVENT LISTENER FOR THE THE 'ENTRIES' ANCHOR IN THE NAVBAR
const $aElement = document.querySelector('a');
if (!$aElement) throw new Error(`the 'a' query failed`);
$aElement.addEventListener('click', () => {
  data.editing = null;
  deleteEntryButtonView();
  viewSwap('entries');
  $entryTitle.textContent = 'New Entry';
  $titleElement.setAttribute('value', '');
  $photoUrlElement.setAttribute('value', '');
  $notesElement.value = '';
  if (!$image) throw new Error('the img query failed');
  $image.src = 'images/placeholder-image-square.jpg';
});
const $newButtonElement = document.querySelector('#new-button');
if (!$newButtonElement) throw new Error(`the '#new-button' query failed`);
$newButtonElement.addEventListener('click', () => {
  viewSwap('entry-form');
});
// ADD EVENT LISTENER TO THE UNORDERED LIST WHEN THE PENCIL ICON IS CLICKED
$ulElement.addEventListener('click', (event) => {
  viewSwap('entry-form');
  const target = event.target;
  if (target.tagName === 'I') {
    const $listItem = target.closest('li');
    if (!$listItem) throw new Error(`the 'li' query failed`);
    const dataEntryValue = $listItem.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      const entryId = data.entries[i].entryId;
      const entryIdString = entryId.toString();
      if (entryIdString === dataEntryValue) {
        data.editing = data.entries[i];
        $titleElement.setAttribute('value', data.entries[i].title);
        $photoUrlElement.setAttribute('value', data.entries[i].photoUrl);
        $notesElement.value = data.entries[i].notes;
        if (!$image) throw new Error('the img query failed');
        $image.src = data.entries[i].photoUrl;
        $entryTitle.textContent = 'Edit Entry';
        deleteEntryButtonView();
      }
    }
  }
});
// ADD MODAL TO THE DELETE ENTRY BUTTON
const $confirmModal = document.querySelector('.confirm-modal');
const $cancelModal = document.querySelector('.cancel-modal');
const $dialog = document.querySelector('dialog');
if (!$confirmModal) throw new Error('The .confirm-modal query failed');
if (!$cancelModal) throw new Error('The .dismiss-modal query failed');
if (!$dialog) throw new Error('The dialog query failed');
$deleteEntryButton.addEventListener('click', (event) => {
  $dialog.showModal();
  event.preventDefault();
});
$cancelModal.addEventListener('click', () => {
  $dialog.close();
});
$confirmModal.addEventListener('click', () => {
  $dialog.close();
  viewSwap('entries');
  toggleNoEntries();
  if (data.editing !== null) {
    const dataEditingId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (dataEditingId === data.entries[i].entryId) {
        data.entries.splice(i, 1);
      }
    }
    for (let i = 0; i < $liElements.length; i++) {
      const liDataEntryId = $liElements[i].getAttribute('data-entry-id');
      if (liDataEntryId === dataEditingId.toString()) {
        $liElements[i].remove();
      }
    }
  }
});
// CREATE FUNCTION TO SHOW WHEN THE DELETE ENTRY BUTTON SHOULD BE DISPLAYED
function deleteEntryButtonView() {
  if (data.editing !== null) {
    $deleteEntryButton.removeAttribute('class');
  } else {
    $deleteEntryButton.className = 'hide';
  }
}
