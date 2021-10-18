const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const path = require('path');
const Todo = require('./Todo');
const { saveFile, readFile } = require('./utils');
const { ADD, UPDATE, DONE, NEXT, LIST, FIND } = require('./commands');

const fileName = require('../data.json');
const filePath = path.resolve(__dirname, fileName);

(function init(){
    const data = readFile(filePath) || [];
    const todo = new Todo(data);
    const {_: baseCommand} = argv;
    switch(baseCommand[0]) {
        case ADD: {
            todo.addItem(argv.text)
            saveFile(todo.todoList, filePath);
            break;
        }
        case UPDATE: {
            todo.updateItem(argv.id, argv.text)
            saveFile(todo.todoList, filePath);
            break;
        }
        case NEXT: {
            const item = todo.next();
            console.log(item);
            break;
        }
        case DONE: {
            todo.done();
            saveFile(todo.todoList, filePath);
            break;
        }
        case LIST: {
            if (todo.todoList.length === 0 ) console.log('items not found');
            for (let i = 0; i< todo.todoList.length; i++) {
                console.log(todo.todoList[i]);
            }
            break;
        }
        case FIND: {
            const items = todo.find(argv.terms)
            if (items.length === 0 ) console.log('items not found');
            for (let i = 0; i< items.length; i++) {
                console.log(items[i]);
            }
            break;
        }
        default : 
        throw new Error('Command not found');
    }
})();