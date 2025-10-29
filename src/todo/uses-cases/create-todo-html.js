/**
 * 
 * @param {Todo} todo
 * @returns 
 */
export const createTodoHtml = ( {completed, description, id} ) => {

    const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${completed ? 'checked' : ''}>
                    <label>${description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
                `

    const liElement = document.createElement("li")
    liElement.innerHTML = html
    liElement.setAttribute('data-id', id)

    if (completed) liElement.classList.add('completed')
    return liElement
}

