import { Todo } from "../todo/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'


}
const state = {
    todos: [
        // new Todo('Hacer mi cama'),
        // new Todo('Estudiar Programacion'),
        // new Todo('Estudiar Ingles'),
        // new Todo('Hacer Ejercicio')
    ],

    filter: Filters.All
}


const initStore = () => {
    loadStore()
    console.log('Inicializando Store.🦇')
}

const loadStore = () => {
    const saved = localStorage.getItem('state');
    console.log(saved)
    if (!saved) return;

    const { todos = [], filter = Filters.All } = JSON.parse(saved);

    state.todos = todos
    state.filter = filter;
}

const savedLocalStore = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * 
 * @param {String} filter 
 * @returns 
 */
const getTodo = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos]
        case Filters.Completed:
            return state.todos.filter(todo => todo.completed)
        case Filters.Pending:
            return state.todos.filter(todo => !todo.completed)
        default:
            throw new Error ('Filter incorrect')
    }
}

/**
 * 
 * @param {String} description 
 */
const addToDo = (description) => {
    if(!description.trim()) throw new Error ('Description Invalid')
    
    console.log('Tarea Creada')
    state.todos.push(new Todo(description.trim()))

    savedLocalStore()
}

/**
 * 
 * @param {String} id 
 */
const deleteToDo = (id) => {
    
    if (typeof id !== 'string' || !id.trim()) throw new Error('ID invalid')

    const existe = state.todos.find(todo => todo.id === id)
    if (!existe) throw new Error('ToDo doesnt exist')

    state.todos = state.todos.filter(todo => todo.id !== id)

    savedLocalStore()

    console.log(`ToDo con ID ${id} eliminado correctamente`)
}


const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.completed)
    savedLocalStore()
}


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    if(Object.keys(Filters).includes(newFilter)) throw new Error ('Filter Invalid')
    state.filter = newFilter
}

const getCurrentfilter = () => {
    return state.filter
}

const toggleToDo = (id) => {
    const indx = state.todos.findIndex(todo => todo.id === id )

    if ( indx < 0 ) throw new Error ('ToDo dont Found')

    // state.todos[indx].completed = (state.todos[indx].completed = !state.todos[indx].completed === false) ? true : false
    state.todos[indx].completed = !state.todos[indx].completed;

}



export default {
    initStore,
    loadStore,
    getTodo,
    addToDo,
    deleteToDo,
    deleteCompleted,
    setFilter,
    toggleToDo,
    getCurrentfilter
}