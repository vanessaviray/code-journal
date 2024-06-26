// /* global data */

const $photoUrlElement = document.querySelector('#photo-url-field');
if (!$photoUrlElement) throw new Error('the photo-url-field query failed');
const $image = document.querySelector('img');

function getPhoto(event: Event): void {
  const eventTarget = event.target as HTMLFormElement;
  const photoUrl = eventTarget.value;
  if (!$image) throw new Error('the img query failed');
  $image.src = photoUrl;
}

$photoUrlElement.addEventListener('input', getPhoto);

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
  newProperty?: any;
}

interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

const $form = document.querySelector('#form') as HTMLFormElement;
const $liElements = document.getElementsByTagName('li');
const $titleElement = document.querySelector('#title-field');
const $notesElement = document.querySelector(
  '#notes-field'
) as HTMLTextAreaElement;
const $entryTitle = document.querySelector('#entryTitle');

if (!$form) throw new Error('the form query failed');
if (!$liElements) throw new Error(`the 'li' query failed`);
if (!$titleElement) throw new Error(`the '#title-field' query failed`);
if (!$notesElement) throw new Error(`the '#notes-field' query failed`);
if (!$entryTitle) throw new Error(`the '#entriesTitle' query failed`);

$form.addEventListener('submit', (event: Event): void => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const $formData: Entry = {
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
});

// generate and return a DOM tree for the li element

function renderEntry(entry: Entry): HTMLElement {
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

// add event listener which listens for DOMContentLoaded event

const $ulElement = document.querySelector('ul') as HTMLElement;
if (!$ulElement) throw new Error(`the 'ul' query failed`);

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const newLi = renderEntry(data.entries[i]);
    $ulElement.appendChild(newLi);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

// toggleNoEntries function to toggle the no entries text to show or hide when the function is called.

const $noEntriesElement = document.getElementById('no-entries');

function toggleNoEntries(): void {
  if (!$noEntriesElement) throw new Error(`the 'no-entries' query failed`);
  if (data.entries.length > 0) {
    $noEntriesElement.className = 'hidden';
  } else {
    $noEntriesElement.className = 'show';
  }
}

// created viewSwap function to show the view whose name was provided as an argument

const $entriesDiv = document.querySelector('#entries');
const $entryForm = document.querySelector('#entry-form');

function viewSwap(view: string): void {
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

// Added an event handler function for the 'entries' anchor in the navbar

const $aElement = document.querySelector('a');
if (!$aElement) throw new Error(`the 'a' query failed`);

$aElement.addEventListener('click', () => {
  viewSwap('entries');
});

const $newButtonElement = document.querySelector('#new-button');
if (!$newButtonElement) throw new Error(`the '#new-button' query failed`);

$newButtonElement.addEventListener('click', () => {
  viewSwap('entry-form');
});

// added an event listener to the ul (pencil icon)

$ulElement.addEventListener('click', (event) => {
  viewSwap('entry-form');

  const target = event.target as HTMLElement;
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
      }
    }
  }
});
