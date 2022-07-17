const fs = require("fs");
const chalk = require("chalk");
function getNotes(){
    return "Your notes ...";
}


//-----------Adding Notes----------------//

function addNotes(title,body){
    const notes = loadNotes();
    const bufferData = {
        title: title,
        body: body
    };

    const duplicateNotes = notes.filter(function (notes){
        return notes.title === title;
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
        console.log(jsonData);
        return JSON.parse(jsonData);
    }
    catch(e){
        return []
    }

}



//---------------Removing Notes------------------//

function removeNotes(title){
    const notes = loadNotes();
    let index = -1;
    const removeNotes = notes.filter(function (notes,ind){
        if(notes.title == title){
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


module.exports = 
{
    getNotes : getNotes,
    addNotes : addNotes,
    removeNotes: removeNotes,
}