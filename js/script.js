window.addEventListener("load", () =>{
    todos=JSON.parse(localStorage.getItem('todos')) || [];
    const catForm = document.querySelector('#new-category-form');
    const catInput = document.querySelector('#new-category-input');
    catForm.addEventListener('submit', (ev) =>{
        ev.preventDefault();
        catVal ={
            content: ev.target.elements.content.value,
            //done: false,
            createdAt: new Date().getTime(),
            exercises:[],
        }

        todos.push(catVal);

        localStorage.setItem('todos', JSON.stringify(todos));
        ev.target.reset();

        DisplayCat();
    });
    
    DisplayCat();
});

function DisplayCat(i){
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
        exForm.addEventListener('submit', (ev) =>{
            ev.preventDefault();
            exVal={
                ex_name: ev.target.elements.content.value,
                done: false,
            }
    
            catVal.exercises.push(exVal);
    
            localStorage.setItem('todos', JSON.stringify(todos));
            
            ev.target.reset();
            DisplayEx(catVal);
        });
        DisplayEx(catVal);
        
    });
}

function DisplayEx(catVal) {
    const exList = document.querySelector('.ex__list');
    exList.innerHTML = ' ';
    console.log(exList);
    for(let i=0;i<catVal.exercises.length; i++){
        console.log('exercise created');
//      console.log(todos.indexOf(exVal));
        const exItem = document.createElement('div');exItem.classList.add('exercise');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');span.classList.add()
        input.type = 'checkbox'; input.checked = catVal.done;
        const content = document.createElement('div');content.classList.add('todo-content')
        const actions = document.createElement('div');actions.classList.add('actions');
        const edit = document.createElement('button');edit.classList.add('edit');
        const deleteButton = document.createElement('button');deleteButton.classList.add('delete');

       
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
    };
    
}