const submit = document.querySelector("#btn");
const input = document.querySelector("#name");
const title = document.querySelector("#title");
const search = document.querySelector("#search");
const notesContainer= document.querySelector("#notesContainer");
let editingText = null;



function createNote(text) {
    
    const myDiv = document.createElement("div");
    const noteText = document.createElement("p");
    const deletebutton = document.createElement("button");
    

    const editbutton = document.createElement("button");
    
    
    
    deletebutton.addEventListener("click",function(){
    myDiv.remove();
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes = notes.filter(note => note !== text);
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
});

editbutton.addEventListener("click",function(){
    
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    input.value = text;
    editingText = text;

    
    

     
});
myDiv.append(noteText);
    
    myDiv.append(deletebutton);
    deletebutton.innerText = "Delete"
    myDiv.append(editbutton);
    noteText.append(text);
    notesContainer.appendChild(myDiv);
    editbutton.innerText = "Edit"

}


submit.addEventListener("click",function(){
    
    const text = input.value.trim();

if (text === "") {
    return;
}
    
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (editingText===null) {
        notes.push(text);
        localStorage.setItem("notes", JSON.stringify(notes));
    } else {
        let index = notes.findIndex(note => note === editingText);
    if (index !== -1){
        notes[index] = text;
        localStorage.setItem("notes", JSON.stringify(notes));

        }
        editingText = null;

    }
    

    input.value = "";
    displayNotes();
    

    
    
    
    
    

        
    }); 
    search.addEventListener("input",function(){
        let searchText = search.value.toLowerCase();
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        const filteredNotes = notes.filter(note=> note.toLowerCase().includes(searchText));

        notesContainer.innerHTML = "";

        filteredNotes.forEach(note =>{
            createNote(note);
        });


    })
        
    
    
    
function displayNotes() {
    notesContainer.innerHTML = "";

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(note => {
        createNote(note);
    });
    
}

