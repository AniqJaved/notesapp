const notes = require("./notes.js");
const color = require('chalk');
const yargs = require("yargs");
const { string } = require("yargs");

yargs.command({
    command: 'add',
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv){
        notes.addNotes(argv.title,argv.body);
    }
});


yargs.command({
    command: 'remove',
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv){
        notes.removeNotes(argv.title);
    }
});


yargs.parse();