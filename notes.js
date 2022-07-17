const fs = require("fs");
const chalk = require("chalk");
function getNotes(){
    return "Your notes ...";
}

//-----------------------------------------------//
//-----------Adding Notes------------------------//
//-----------------------------------------------//

function addNotes(title,body){
    const notes = loadNotes();
    const bufferData = {
        title: title,
        body: body
    };

    const duplicateNotes = notes.filter(function (note){
        return note.title === title;
    });

    if(duplicateNotes.length == 0){
        notes.push(bufferData);
        saveNotes(notes);
        console.log(chalk.green.inverse("Notes Saved"));
    }

    else{
        console.log(chalk.red.inverse("Title already taken"));
    }
   
}

function saveNotes(notes){
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync('add_notes.json',jsonData);
}

function loadNotes(){
    try{
        const bufferData = fs.readFileSync('add_notes.json');
        const jsonData = bufferData.toString();
        return JSON.parse(jsonData);
    }
    catch(e){
        return []
    }

}


//-----------------------------------------------//
//---------------Removing Notes------------------//
//-----------------------------------------------//
function removeNotes(title){
    const notes = loadNotes();
    let index = -1;
    const removeNotes = notes.filter(function (note,ind){
        if(note.title == title){
            index = ind;
        }
    });
    if (index > -1) { // only splice array when item is found
        notes.splice(index,1); // 2nd parameter means remove one item 
        console.log(chalk.green.inverse(`Title:${title} removed!`));
    }
    else{
        console.log(chalk.red.inverse('Title not found'))
    }
    saveNotes(notes);
    
}

//-----------------------------------------------//
//-----------------Listing Notes-----------------//
//-----------------------------------------------//

const listNotes = () =>{
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(
            chalk.green.inverse(note.title)
        );
    });
}


//-----------------------------------------------//
//-----------------Reading Notes-----------------//
//-----------------------------------------------//

const readNotes = (title) =>{
    const notes = loadNotes();
    const readNote = notes.find(note => note.title === title); //We are using find instead of filter cuz find return the first element it matches without checking others.
                                                               // note => note.title === title is same as (note) => {return note,title === title}
    
    
    if(readNote){
        console.log(
            chalk.green.inverse("Title:") + " " + readNote.title
        );  
        console.log(
            chalk.green.inverse("Body:") + " " + readNote.body
        );      
    }
    else{
        console.log(chalk.red.inverse("Note not found"));
    }
                                 
}


module.exports = 
{
    getNotes : getNotes,
    addNotes : addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}