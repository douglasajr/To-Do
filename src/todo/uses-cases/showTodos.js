import { createTodoHtml } from "./create-todo-html";

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const showTodos = (elementId, todos ) => {
    const element = document.querySelector(elementId)
    // console.log(element)


    todos.forEach(todo => {
        element.append( createTodoHtml(todo) )
    });
}