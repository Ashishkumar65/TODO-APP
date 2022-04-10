'use strict'

let todos=getSavedTodos()
const filters={
    searchText:'',
    hidecompleted:false
}

renderedtodos(todos,filters)

document.querySelector('#search-text').addEventListener('input',function(e){
    filters.searchText=e.target.value
    renderedtodos(todos,filters)
})
document.querySelector('#new-todo').addEventListener('submit',function(e){
    const text=e.target.elements.text.value.trim()
    e.preventDefault()
    if(text.length>0){
        todos.push({
            id:uuid(),
            text,
            completed:false
        })
       saveTodos(todos)
        renderedtodos(todos,filters)
        e.target.elements.text.value=''

    }
})

document.querySelector('#hidecompleted').addEventListener('change',function(e){
    filters.hidecompleted=e.target.checked
    renderedtodos(todos,filters)

})