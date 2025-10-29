import todoStore, { Filters } from "../../store/todo.store";

export const renderPending = (elementId) => {
    if (!elementId) 
        throw new Error('No se proporcionó un elementId');

    const element = document.querySelector(elementId);

    if (!element) 
        throw new Error(`El elemento ${elementId} no existe`);

    element.innerText = todoStore.getTodo(Filters.Pending).length
};
