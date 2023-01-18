const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');

const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
let interval, hours = 0, minutes = 0, seconds = 0;

startButton.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(Stopwatch, 1000);
});

pauseButton.addEventListener('click', () => {
    clearInterval(interval);
});
resetButton.addEventListener('click', ()=>{
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    secondsElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    hoursElement.innerHTML = "00";
});

function Stopwatch() {
    seconds++;
    if (seconds <= 9) secondsElement.innerHTML = "0" + seconds;
    if (seconds > 9) secondsElement.innerHTML = seconds;
    if (seconds > 59) {
        seconds = 0;
        secondsElement.innerHTML = seconds;
        minutes++;
    }

    if (minutes <= 9) minutesElement.innerHTML = "0" + minutes;
    if (minutes > 9) minutesElement.innerHTML = minutes;
    if (minutes > 59) {
        minutes = 0;
        minutesElement.innerHTML = minutes;
        hours++;
    }

    if (hours <= 9) hoursElement.innerHTML = "0" + hours;
    if (hours > 9) hoursElement.innerHTML = hours;
}

window.addEventListener("load", () =>{
    todos=JSON.parse(localStorage.getItem('todos')) || [];
    const catForm = document.querySelector('#new-category-form');
    const catInput = document.querySelector('#new-category-input');
    catForm.addEventListener('submit', (ev) =>{
        ev.preventDefault();
        catVal ={
            content: ev.target.elements.content.value,
            createdAt: new Date().getTime(),
            exercises:[],
        }

        todos.push(catVal);

        localStorage.setItem('todos', JSON.stringify(todos));
        ev.target.reset();
        DisplayCat();
    });
    DisplayDate();
    DisplayCat();
});


function DisplayDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    document.querySelector('.day').innerText = day;
    if(month<10) document.querySelector('.month').innerText = "0" + (month+1);
    else document.querySelector('.month').innerText = month+1;
    document.querySelector('.year').innerText = year;
}

function DisplayCat(){
    const catList = document.querySelector('.todo-list');

    catList.innerHTML= '';

    todos.forEach(catVal => {
        if (!catVal.content) {
            return;
        } 
        const catItem = document.createElement('details');
        const summary = document.createElement('summary');
        const exList = document.createElement('div');
        const catEl = document.createElement('div');
        const catContent = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        const exForm = document.createElement('form');
        const exInput = document.querySelector('#new-exercise-input');
        
        catItem.classList.add('spoiler');
        catEl.classList.add('list');
        catContent.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        exForm.id = 'new-exercise-form';        
        exList.classList.add('ex__list');

        catList.appendChild(catItem);
        catItem.appendChild(summary);
        catItem.appendChild(exForm);
        catItem.appendChild(exList);
        summary.appendChild(catEl);
        catEl.appendChild(catContent);
        catEl.appendChild(actions);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        
        exForm.innerHTML=`<input name="content" id="new-exercise-input" placeholder="e.g push ups" type="text" />
        <input id="new-exercise-submit" type="submit" value="Add exercise">`;
        catContent.innerHTML = `<input id="new-category-val" type="text" 
        value="${catVal.content}" readonly/>`;
        edit.innerHTML = 'EDIT';
        deleteButton.innerHTML = 'DELETE';

        edit.addEventListener('click', e=>{
            const input = summary.querySelector('input');
            if(edit.innerText.toLowerCase()=="edit"){
                input.removeAttribute('readonly');
                input.focus();
                edit.innerText="Save"; 
            }
            else{
                input.setAttribute("readonly", "readonly");
                edit.innerText="edit"; 
                catVal.content = input.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayCat();
            }
        });

        deleteButton.addEventListener('click', e =>{
            todos.splice(todos.indexOf(catVal),1);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayCat();
        });

        exForm.addEventListener('submit', (ev) =>{
            ev.preventDefault();
            exVal={
                ex_name: ev.target.elements.content.value,
                done: false,
            }
    
            catVal.exercises.push(exVal);
    
            localStorage.setItem('todos', JSON.stringify(todos));
            
            ev.target.reset();
            DisplayEx(catVal, exList);
        });
        DisplayEx(catVal, exList);
    });
}

function DisplayEx(catVal, exList) {
    //const exList = document.querySelector('.ex__list');
    exList.innerHTML = ' ';
    for(let i=0;i<catVal.exercises.length; i++){
        const exItem = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        input.type = 'checkbox'; input.checked = catVal.exercises[i].done;
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        
        exItem.classList.add('exercise');
        span.classList.add('check');
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        
        exItem.appendChild(label);
        exItem.appendChild(content);
        exItem.appendChild(actions);
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        exList.appendChild(exItem);


        content.innerHTML = `<input id="new-exercise-val"  type="text" 
        value="${catVal.exercises[i].ex_name}" readonly/>`;
        edit.innerHTML = 'EDIT';
        deleteButton.innerHTML = 'DELETE';


        if(catVal.exercises[i].done){
            exItem.classList.add('done');
        }

        input.addEventListener('click', e =>{
            catVal.exercises[i].done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            if(catVal.exercises[i].done) exItem.classList.add('done');
            else exItem.classList.remove('done');
        });
        //вставить в функцию
        edit.addEventListener('click', e=>{
            const input = content.querySelector('input');
            if(edit.innerText.toLowerCase()=="edit"){
                input.removeAttribute('readonly');
                input.focus();
                edit.innerText="Save"; 
            }
            else{
                input.setAttribute("readonly", "readonly");
                edit.innerText="edit"; 
                catVal.exercises[i].ex_name = input.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayEx(catVal, exList);
            }
        });
        //
            
        deleteButton.addEventListener('click', e =>{
            catVal.exercises.splice(i,1);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayEx(catVal, exList);
        });

    };
    
}