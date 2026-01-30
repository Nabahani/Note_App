const notesEl = document.getElementById("notes");
const btnEl = document.getElementById("btn");
const currentNotes = getNotes();

currentNotes.forEach(note => {
    const element = createElement(note.id, note.content);
    notesEl.insertBefore(element, btnEl);
})


function getNotes() {
    return JSON.parse(localStorage.getItem("Notes") || "[]");
}

function saveNote(notes) {
    localStorage.setItem("Notes", JSON.stringify(notes));

}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note) => note.id === id)[0];
    target.content = content;
    saveNote(notes);
}

function deleteNote(id, element) {
    const notes = getNotes();
    const targets = notes.filter((note) => note.id !== id);
    saveNote(targets);
    notesEl.removeChild(element);
}

function createElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.rows = 10;
    element.cols = 30;
    element.placeholder = "Enter a note...";
    element.value = content

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want ot delete this note?");

        if (warning) {
            deleteNote(id, element);
        }
    })

    element.addEventListener("input", () => {
        updateNote(id, element.value);
    })

    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }

    const element = createElement(noteObj.id, noteObj.content);
    notesEl.insertBefore(element, btnEl);

    notes.push(noteObj);
    saveNote(notes)
}

btnEl.addEventListener("click", () => {
    addNote();
})