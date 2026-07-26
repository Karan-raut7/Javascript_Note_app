const submit = document.querySelector("#btn");
const input = document.querySelector("#name");
const title = document.querySelector("#title");
const search = document.querySelector("#search");
const notesContainer= document.querySelector("#notesContainer");
let editingText = null;

function createNote(text) {
    
    let mydiv = document.createElement("div");
    let noteText =document.createElement("p");
    
    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    const editbutton = document.createElement("button");
    
    editbutton.textContent = "Edit";
   

    deletebutton.addEventListener("click",function(){
        mydiv.remove();
        let notes = JSON.parse(localStorage.getItem("notes"))  || [];
        notes = notes.filter(note => note !== text);
        localStorage.setItem("notes",JSON.stringify(notes));
        displayNotes();
        

    });
    mydiv.append(noteText);
    noteText.append(text);
    
    mydiv.append(editbutton);
    mydiv.append(deletebutton);
    notesContainer.appendChild(mydiv);
    editbutton.addEventListener("click",function(){
        
        editingText = text;
        input.value = text;
       

    })
    

    
    }
    submit.addEventListener("click",function(){
        let notes =JSON.parse(localStorage.getItem("notes")) || [];
        if (editingText === null) {
            const text = input.value.trim();
            if (text === "") {
                return;
            }
            notes.push(text);
            localStorage.setItem("notes", JSON.stringify(notes));
            
            displayNotes();
            input.value = "";
        } else {
            let index = notes.findIndex(note => note === editingText);
            if (index !== -1){
                notes[index] = input.value.trim();
                localStorage.setItem("notes",JSON.stringify(notes));
                input.value = "";
                displayNotes();

            }
            
            
            
            editingText =null;
        }
    

    });
    search.addEventListener("input",function(){
        let searchText = search.value.toLowerCase();
        let notes =JSON.parse(localStorage.getItem("notes")) || [];
        const filterednotes = notes.filter(note => note.toLowerCase().includes(searchText));
        notesContainer.innerHTML = "";
        filterednotes.forEach(note => {
            createNote(note);
            
        });

        

    })
    

function displayNotes(){
        let notes =JSON.parse(localStorage.getItem("notes")) || [];
        notesContainer.innerHTML = "";
        notes.forEach(note => {
            createNote(note);
            
        })
    };
    displayNotes();