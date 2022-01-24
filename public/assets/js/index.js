let noteTitle = document.getElementById("note-title");
let noteText = document.getElementById("note-textarea");
let saveNoteBtn = document.getElementById("save-note");
let newNoteBtn = document.getElementById("new-note-btn");
let deleteBtn = document.querySelectorAll(".fa-trash-alt");
let noteList = document.getElementById("note-list");

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};
let allNotes = [];

const getNotes = () => {
  hide(saveNoteBtn);
  fetch("http://localhost:3011/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((notes) => {
      allNotes = notes;
      renderNoteList(notes);
    });
};

const saveNote = async (note) => {
  console.log(note);
  const response = fetch("http://localhost:3011/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  }).then(getNotes());
  const content = await response.json();
};

const deleteNote = (id) =>
  fetch(`http://localhost:3011/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

const renderActiveNote = (id) => {
  hide(saveNoteBtn);
  allNotes.map((note) => {
    if (note.id === id) {
      activeNote = note;
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    }
  });
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  console.log(noteTitle.value);
  saveNote(newNote);
};

// Delete the clicked note
const handleNoteDelete = (id) => {
  if (activeNote.id === id) {
    activeNote = {};
  }

  deleteNote(id).then(() => {
    getNotes();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  activeNote = {};
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = () => {
  activeNote = {};
  noteTitle.value = "";
  noteText.value = "";
  getNotes();
};

// Hide or Shows the save button depending on the text in input fields
const handleRenderSaveBtn = () => {
  if (noteText.value === "" || noteTitle.value === "") {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = (notes) => {
  let jsonNotes = notes;
  let noteListItems = [];
  let listItem = "";
  let listItems = "";
  if (jsonNotes.length === 0) {
    noteListItems.push(createLi("No saved Notes", false));
  }

  jsonNotes.map((note) => {
    listItem = `
      <li id=${note.id}
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold"></div>
                ${note.title}
              </div>
              <span><i class="far fa-trash-alt"></i></span>
            </li>
    `;
    listItems += listItem;
    listItem = "";
  });
  noteList.innerHTML = listItems;
};

// Gets notes from the db and renders them to the sidebar

saveNoteBtn.addEventListener("click", handleNoteSave);
noteList.addEventListener("click", function (e) {
  let id = "";
  if (e.target.nodeName == "I") {
    id = e.target.parentNode.parentNode.id;
    handleNoteDelete(id);
  } else if (e.target.nodeName === "LI") {
    console.log(e.target);
    id = e.target.id;
    renderActiveNote(id);
  } else if (e.target.nodeName === "DIV") {
    id = e.target.parentNode.id;
    renderActiveNote(id);
  }
});
newNoteBtn.addEventListener("click", handleNewNoteView);
document.addEventListener("keypress", handleRenderSaveBtn);
window.onload = getNotes();
