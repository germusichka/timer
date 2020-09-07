import Todoitem from 'Components/todoitem'

class Todolist {
	constructor(preference) {
		if (typeof preference !== 'object') {
			throw new Error('Todolist preference must be an object')
		}

		if (typeof preference.parent === 'string') {
			this.todolistParent = document.querySelector(preference.parent)
			if (!this.todolistParent) {
				throw new Error(`incorrect query selector: ${preference.parent}`)
			}
		} else if (typeof preference.parent === 'object') {
			this.todolistParent = preference.parent

		} else {
			throw new Error('Todolist parent must be either a query selector or an object')
		}

		this.todos = []
		this.todoStatus = preference.todoStatus
		this.todoInput = document.querySelector(preference.todoInputSelector) 
		this.createTodoButton = document.querySelector(preference.createTodoButtonSelector)
		this.todoClasses = preference.classes

		if (this.todoInput && this.createTodoButton) {
			this.createTodoButton.addEventListener('click', () => this.createTodo(this.todoInput.value))
		}

		console.log(this.todoStatus)

	}
	

	createTodo(name) {
		console.log('!!!!!!!!!!', this.todos.length)
		this.todos.push(new Todoitem({
			parent: this.todolistParent,
			name: name,
			index: this.todos.length + 1,
			classes: this.todoClasses,
			status: this.todoStatus,
		}))	
		this.lastTodoitemIndex = this.todos.length - 1	
		this.todos[this.lastTodoitemIndex].todoitemCloseButton.addEventListener('click', () => this.deleteTodoitem(this.lastTodoitemIndex))
	}

	deleteTodoitem(todoitemIndex) {
		this.todos[todoitemIndex].close()
		delete this.todos[todoitemIndex]
		console.log(this.todos, '!!!!!!!!!!!!!')
	} 
}

export default Todolist 