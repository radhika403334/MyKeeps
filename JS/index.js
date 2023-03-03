console.log("Welcome to my first project My Keeps.");
showNotes();

// if user adds a note, add it to the local storage
let addBtn = document.getElementById("addbtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addtext");
  let addTitle = document.getElementById("addTitle");
  // notes is an id of a div conatiner in which we will show all of are notes.
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="card my-3 mx-3 note-card" style="width:18rem; background-color:#e3e1e3;">
                <div class="card-body">
                  <h5 class="card-title"> ${element.title}</h5>
                  <p class="card-text"> ${element.text} </p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
              </div>
        `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<br> <b style="font-size:19px; color:#7e7e87;">Nothing to show here right now. Use "Add Note" section above to add your notes.</b>`;
  }
}

// function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


// search text from notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function (){
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("note-card");
  Array.from(noteCards).forEach(function (element){
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// New features
// 1. user se title or text ke sth background color b lo or fr jb new note banao to uska background color user ke acc set krdo.
