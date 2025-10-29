import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { showTodos } from './uses-cases';
import { renderPending } from './uses-cases/render-pending';

const ElementsId = {
    TodoList: '.todo-list',
    inputNewToDo: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    Filter: '.filtro',
    Counter: '#pending-count'
} 

/**
 * 
 * @param {String} elementId 
 */


todoStore.initStore()
export const App  = ( elementId ) => {

    const renderTodo = () => {
        const todo = todoStore.getTodo(todoStore.getCurrentfilter()) // Recupera todos los todo
        const element = document.querySelector(ElementsId.TodoList) // Recupera el elemento del html

        element.innerHTML = '' // Lo limpia
        showTodos(ElementsId.TodoList, todo) // y renderiza Todo de nuevo
        updateCounter()
    }

    const updateCounter =() => {
        renderPending(ElementsId.Counter)
    }
    
    //Funcion IIFE Funcion Anonima Autoinvocada
    (() => {
        //Crea un div
        const app = document.createElement('div')
        // Le incerta un texto
        app.innerHTML = html
        //Le agrega el di al div del html 
        document.querySelector(elementId).append(app)
        renderTodo()
    })()


    // Referencias Html
    const newTodo = document.querySelector(ElementsId.inputNewToDo)
    const clearCompleted = document.querySelector(ElementsId.ClearCompleted)
    const toDoListHtml = document.querySelector(ElementsId.TodoList)
    const btnAll = document.querySelectorAll(ElementsId.Filter)[0]
    const btnPending = document.querySelectorAll(ElementsId.Filter)[1]
    const btnCompleted = document.querySelectorAll(ElementsId.Filter)[2]
    const btnChangeFilter = document.querySelectorAll(ElementsId.Filter)

    
    newTodo.addEventListener('keyup', (e) => {
        if (e.keyCode !== 13) return;
        if (e.target.value.trim().length === 0) return
        
        todoStore.addToDo(e.target.value)
        e.target.value = ''
        renderTodo()
        
    })

    
    toDoListHtml.addEventListener('click', (e) => {
        const element = e.target.closest('[data-id]');
        if (!element) return; // si no hay data-id, salimos

        const id = element.getAttribute('data-id');

        console.log(e.target)
        // Si el click fue en el botón de eliminar
        if (e.target.classList.contains('destroy')) {
            todoStore.deleteToDo(id);
            renderTodo();
            return;
        }

        // Si el click fue en el checkbox
        if (e.target.classList.contains('toggle')) {
            todoStore.toggleToDo(id);
            renderTodo();
            return;
        }

    });

    clearCompleted.addEventListener('click', (e) => {
        console.log(e.target)

        todoStore.deleteCompleted()

        renderTodo()

    })

    btnCompleted.addEventListener('click', (e) => {
        todoStore.setFilter(Filters.Completed)
        renderTodo()
    })
    
    btnPending.addEventListener('click', (e) => {
        todoStore.setFilter(Filters.Pending)
        renderTodo()
    })

    btnAll.addEventListener('click', (e) => {
        todoStore.setFilter(Filters.All)
        renderTodo()
    })

    btnChangeFilter.forEach(btn =>{
        btn.addEventListener('click', (e) =>{
            btnChangeFilter.forEach(btn => btn.classList.remove('selected'))
            e.target.classList.add('selected')
        })
    })



}