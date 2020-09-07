class Todoitem {
	constructor(preference) {
		this.todoDoneClass = preference.classes.todoDone
		this.todoitemParent = preference.parent || document.querySelector('.todolist')

		this.todoitem = document.createElement('div')
		this.todoitem.classList.add(...preference.classes.todoitem)

		this.todoitemName = preference.name 
		this.todoitemNameElement = document.createElement('p')
		this.todoitemNameElement.classList.add(...preference.classes.todoName)
		this.todoitemNameElement.innerText = this.todoitemName

		this.todoitemStatusElement = document.createElement('input')
		this.todoitemStatus = preference.status || false
		this.todoitemStatusElement.checked = this.todoitemStatus
		this.todoitemStatusElement.classList.add(...preference.classes.todoStatus)
		this.todoitemStatusElement.type = 'checkbox'

		this.todoitemCloseButton = document.createElement('button') 
		this.todoitemCloseButton.innerHTML = '&times'

		this.todoitem.append(this.todoitemCloseButton)

		if (preference.index || preference.index === 0) {
			this.todoitemIndex = preference.index
			this.todoitemIndex = preference.index
			this.todoitemIndexElement = document.createElement('span')
			this.todoitemIndexElement.classList.add(...preference.classes.todoIndex)
			this.todoitemIndexElement.innerText = this.todoitemIndex + ' '

			this.todoitemNameElement.insertBefore(this.todoitemIndexElement, this.todoitemNameElement.firstChild)
		}



		this.todoitem.append(this.todoitemNameElement)
		this.todoitem.append(this.todoitemStatusElement)
		this.todoitemParent.append(this.todoitem)

		console.log(this.todoitemIndex)

		this.todoitemStatusElement.addEventListener('change', () => 
			this.todoitemStatusInfo = !this.todoitemStatus)

		this.todoitemCloseButton.addEventListener('click', () => this.close())

		window.setInterval(() => {
			console.log(this.todoitemStatus)
		}, 1000)
	}

	set todoitemStatusInfo(value) {

		if (typeof value !== 'boolean') {
			throw new Error('Todo status type must be boolean')
		}

		console.log(this.todoitem)
		this.todoitemStatus = value
		this.todoitemStatusElement.checked = value	

		if (value === false && this.todoDoneClass) {
			this.todoitem.classList.remove(this.todoDoneClass)
		} else if (this.todoDoneClass) {
			this.todoitem.classList.add(this.todoDoneClass)
		}
	}

	save() {
		localStorage.setItem()
	}

	close() {
		this.todoitemParent.removeChild(this.todoitem)
	}
}
	
export default Todoitem