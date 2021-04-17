const title = document.querySelector('.title');
const content = document.querySelector('.description');
const submitBtn = document.querySelector('.submitBtn');
const container = document.querySelector('.cards');

//   добавление зачад в locаlstorage если он пустой
window.addEventListener('load' , ()=>{
    if(!localStorage.getItem('todos')){
        localStorage.setItem('todos' , JSON.stringify([]));
    }else{
        const todos = JSON.parse(localStorage.getItem('todos'));
        
        const newTodos = todos.map((item , index) => {
            return {...item, id: index}
        })
        localStorage.setItem('todos' , JSON.stringify(newTodos));

        const template = newTodos.reverse().reduce((prev,{title,content,id,completed,date})=> {
            if(completed){
                return prev + `<div class='col-lg-6 mb-4 completed'>${
                    cardTemplate(title,content,date,id)   
                }</div>` 
            }else{
                return prev + `<div class='col-lg-6 mb-4'>
                ${cardTemplate(title,content,date,id)}</div>`
            }
        } , '')
        container.innerHTML = template;
    }
})

// adding new task
submitBtn.addEventListener('click' , e => {
    e.preventDefault();

    if(title.value === '' && content.value === '') alert('поля не должны быть пустыми')

    if(title.value !== '' && content.value !== ''){
        const todos = JSON.parse(localStorage.getItem('todos'));

        localStorage.setItem('todos', JSON.stringify([
            ...todos,
            {
                title:title.value,
                content:content.value,
                date:currentTime(),
                completed: false
            }
        ]));
        window.location.reload();
    }
})




// cardTemplate with length checker
function cardTemplate(title , content , time, id){
    if(content.length >= 300){
        return `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title mb-0">${title}</h3>
            </div>
            <div class="card-body content shorted">
                <p>${content}</p>
                <span class="time">${time}</span>
            </div>
            <div class="card-header p-3 d-flex align-items-center justify-content-around">
            <button onclick='deleteTask(${id})' data-id='${id}' class="btn btn-danger">Delete</button>
            <button data-id='${id}' class="btn btn-primary">Complete</button>
            <button data-id=${id} class="btn btn-info">Edit</button>
        </div>
        `
    }else{
        return `
    <div class="card">
        <div class="card-header">
            <h3 class="card-title mb-0">${title}</h3>
        </div>
        <div class="card-body content">
            <p>${content}
            </p>
            <span class="time"> ${time}</span>
        </div>
        <div class="card-header p-3 d-flex align-items-center justify-content-around">
                <button onclick='deleteTask(${id})' class="btn btn-danger" data-id='${id}'>Delete</button>
                <button onclick='completeTask(${id})' class="btn btn-primary" data-id='${id}'>Complete</button>
                <button onclick='editTask(${id})' class="btn btn-info" data-id='${id}'>Edit</button>
            </div>
        
        </div>
    </div>
        `
    }
}

// get current time

function currentTime(){
    return `${moment().format('L')} ${moment().format('LTS')}`
}

// change theme with local storage

const body = document.body;
const selector = document.querySelector('.theme-selector');

selector.addEventListener('change' , e => {
    const value = e.target.value;

    if(value === 'dark'){
        body.style.background = '#212529';
        localStorage.setItem('themecolor' , '#212529');
        localStorage.setItem('theme' , 'dark')

    }else if(value === 'light'){
        body.style.background = '#efefef';
        localStorage.setItem('themecolor' , '#efefef');
        localStorage.setItem('theme' , 'light');

    }else if (value === 'custom'){ 
        const askColor = prompt('Your custom color? , (hex)' );
        body.style.background = askColor;
        localStorage.setItem('themecolor' , askColor);
        localStorage.setItem('theme' , 'custom');
    }
})

window.addEventListener('load' , ()=> {
        if(localStorage.getItem('theme')){
            body.style.background = localStorage.getItem('themecolor');
            selector.value = localStorage.getItem('theme')
        }
})


// deleteTask();


function deleteTask(id){
    const askdDelete= confirm('are u sure?');
    if(!askdDelete) return;

    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.filter(item => item.id !== id);

    localStorage.setItem('todos' , JSON.stringify(newTodos));
    window.location.reload();


}



// completeTask

function completeTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));

    const newTodos = todos.map(item => {
        if(item.id === id){
            return{
                ...item,
                completed: !item.completed
            }
        }else{
            return item
        }
    })
    localStorage.setItem('todos' , JSON.stringify(newTodos));
    window.location.reload();
}



// editTask

function editTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item => {
        if(item.id === id){
            return{
                ...item,
                title: prompt('New title' , item.title),
                content: prompt('New content' , item.content)
            }
        }else{
            return item
        }
    })
    localStorage.setItem('todos' , JSON.stringify(newTodos));
    window.location.reload();

}


// check auth
window.addEventListener('load' , () => {
    const isAuth = localStorage.getItem('isAuth');
    
    isAuth === 'true' ? null : window.open('index.html' , '_self') 
})



// sign out
const singOutBtn = document.querySelector('.signOutBtn');

singOutBtn.addEventListener('click' , e => {
    e.preventDefault();

    localStorage.setItem('isAuth' , 'false');
    window.location.reload();
})