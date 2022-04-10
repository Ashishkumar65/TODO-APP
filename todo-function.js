'use strict'

const getSavedTodos=function(){
const todojson=localStorage.getItem('todos')
if(todojson!==null){
    return JSON.parse(todojson)
}else{
    return []
}
}

const saveTodos=function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))

}



const renderedtodos =function(todos,filters){
    let filterdtodos =todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        debugger
    })
        filterdtodos=filterdtodos.filter(function(todo){
            if(filters.hidecompleted){
                return !todo.completed

            }
            else {
                return true
            }
        })
const incompleted = filterdtodos.filter(function(todo){
    return !todo.completed


})
document.querySelector('#todos').innerHTML=''

document.querySelector('#todos').appendChild(generateSummaryDom(incompleted ))

if(filterdtodos.length>0){
    filterdtodos.forEach(function(todo){
   
        document.querySelector('#todos').appendChild(generateTodoDom(todo))
    })

}
else{
    const messageEl=document.createElement('p')
    messageEl.classList.add('empty-message')
    messageEl.textContent='No to-dos to show'
    document.querySelector('#todos').appendChild(messageEl)

}
 }
//function to generate dom element
 const generateTodoDom=function(todo){
     const todoEl=document.createElement('label')
     const containerEl=document.createElement('div')
     const checkbox=document.createElement('input')
     const todoText=document.createElement('span')
     const removeButton=document.createElement('button')
   //setup checkbox 
   checkbox.setAttribute('type','checkbox')
   checkbox.checked=todo.completed
   containerEl.appendChild(checkbox)
   checkbox.addEventListener('change',function(){
       toggletodo(todo.id)
       saveTodos(todos)
       renderedtodos(todos,filters)
   })
   //setup todo text
   todoText.textContent=todo.text
   containerEl.appendChild(todoText)
   
    //set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

   //setup the remove button 
   removeButton.textContent='remove'
   removeButton.classList.add('button','button--text')
   todoEl.appendChild(removeButton)
   removeButton.addEventListener('click',function(){
       removetodos(todo.id)
       saveTodos(todos)
       renderedtodos(todos,filters)
   })
  
   return todoEl
 }
    const generateSummaryDom=function(incompleted){
        const summary = document.createElement('h2')
        const plural=incompleted.length===1?'':'s'
        
        summary.classList.add('list-little')
        summary.textContent=`you have ${incompleted.length} todo${plural} left`
        return summary

    }
 //remove todos
 const removetodos=function(id){
     const todoindex= todos.findIndex(function(todo){
         return todo.id===id
     })
     if(todoindex>-1){
         todos.splice(todoindex,1)
     }
 }
 //toggle tiidodo
 const toggletodo=function(id){
     const todo=todos.find(function(todo){
         return todo.id===id
     })
     if(todo!=undefined){
         todo.completed=!todo.completed
     }
 }