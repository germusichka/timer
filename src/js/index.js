"use strict"

import 'Assets/stylus/main.styl'
import Timer from 'Components/timer.js'
import Todolist from 'Components/todolist.js'
// import todolist from ''

const timer = document.querySelector('.timer')
const todolist = document.querySelector('.todolist__items')
console.log(todolist)

const myTimer = new Timer(timer, {readOldTime: true, saveTime: true,})
const myTodolist = new Todolist({
	parent: todolist,
	todoInputSelector: '.todolist__input-name',
	createTodoButtonSelector: '.todolist__create-todo',
	todoStatus: false,
	saveValue: true,
	writeValue: true,
	classes: {
		todoitem: ['todolist__item',],
		todoStatus: ['todolist__item-status'],
		todoName: ['todolist__item-name'],
		todoIndex: ['todolist__item-index'],
		todoDone: ['todolist__item--done'],
	},
	todoInput: '.todolist__input',
})

console.log(myTodolist)
console.log('kek')
