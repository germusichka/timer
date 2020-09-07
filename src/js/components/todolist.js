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
			throw new Error('Todolist parent must be either a selector or an object')
		}

		this.todos = []
		this.todoStatus = preference.todoStatus
		this.todoInput = document.querySelector(preference.todoInputSelector) 
		this.createTodoButton = document.querySelector(preference.createTodoButtonSelector)
		this.todoClasses = preference.classes

		if (preference.saveValue) {
			window.addEventListener('unload', () => this.save())
		} if (preference.writeValue) {
			this.write()
		}

		if (this.todoInput && this.createTodoButton) {
			this.createTodoButton.addEventListener('click', () => this.createTodo(this.todoInput.value))
		}
	}
	

	createTodo(name, index, status) {
		this.todos.push(new Todoitem({
			parent: this.todolistParent,
			name: name,
			index: index ?? this.todos.length + 1,
			classes: this.todoClasses,
			status: status ?? this.todoStatus,
		}))	
		console.log('!!!!!!!!!!', this.todos.length)

		this.lastTodoitemIndex = this.todos.length - 1	
		this.todos[this.lastTodoitemIndex].todoitemCloseButton.addEventListener('click', () => this.deleteTodoitem(this.lastTodoitemIndex))
	}

	save() {
		let todolistInfo = this.todos.map(item => item.save())
		localStorage.setItem('todolistInfo', JSON.stringify(todolistInfo))
		console.log(localStorage.getItem('todolistInfo'))
	}

	write() {
		let todolistInfo = JSON.parse(localStorage.getItem('todolistInfo'))
		console.log(todolistInfo)
		for (let todoitem of todolistInfo) {
			this.createTodo(todoitem.name, todoitem.index, todoitem.status)
		}
	}

	deleteTodoitem(todoitemIndex) {
		this.todos.pop(todoitemIndex)
		console.log(this.todos, '!!!!!!!!!!!!!')
	} 
}

export default Todolist 