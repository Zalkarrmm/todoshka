const username = document.querySelector('.username');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');

btn.addEventListener('click' , e=> {
    e.preventDefault();

    if(username.value === '' && password.value === ''){
        alert('Пустые поля!');
    }else{
        if(username.value === 'admin' && password.value === 'admin'){
            alert('welcome');
            window.open('todo.html' , '_self');
            username.value = '';
            password.value = '';
            localStorage.setItem('isAuth' , 'true')

        }else{
            alert('wrong username or password!');
            username.value ='';
            password.value = '';
            localStorage.setItem('isAuth' , 'false')
        }
    }
})

// check auth
window.addEventListener('load' , () => {
    const isAuth = localStorage.getItem('isAuth');

    isAuth === 'true' ? window.open('todo.html' , '_self') : null;
})

