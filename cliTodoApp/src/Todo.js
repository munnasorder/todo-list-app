/*
* @param {Array} arr
* @property todoList
* @method addItem
* @method update
* @method done
* @method next
* @method find
* @method list
*/

// generate id
function generateId(arr) {
    if (arr.length === 0) return 1;
    return arr[arr.length - 1].id + 1
}

// todo class
class Todo {
    constructor(todoList = []) {
        this.todoList = todoList;
    }

    // add new todo
    addItem(text) {
        const item = {
            text,
            id: generateId(this.todoList),
            createAt: new Date()
        }
        this.todoList.push(item);
    }

    // update todoList
    updateItem(id, text) {
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].id === id) {
                this.todoList[i].text = text;
                break;
            }
        }
    }
    
    // done todo
    done() {
        return this.todoList.shift();
    }

    // next todo
    next() {
        return this.todoList[0];
    }

    // todoList check
    list() {
        return this.todoList;
    }

    // find todo list
    find(terms) {
        let result = [];
        for (let i = 0; i< this.todoList.length; i++) {
            const item = this.todoList[i];
            if (item.text.toLowerCase().includes(terms.toLowerCase())) result.push(item)
        }
        return result;
    }
}

module.exports = Todo;