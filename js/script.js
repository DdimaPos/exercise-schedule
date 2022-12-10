/*window.addEventListener('load', () =>{
    const catForm = document.querySelector('#new-category-form');
    const catInput = document.querySelector('#new-category-input');
    catForm.addEventListener('submit', (ev) =>{
        ev.preventDefault();
        const newCat = catInput.value;
        if (!newCat) {
            alert('You have typed nothing!');
            return;
        }
        catList.insertAdjacentHTML('afterbegin',
        `<details class="spoiler">
        <summary>
            <div class="list" id="todo-list">
                <div class="todo-content">
                    <input id="new-category-val" type="text" value="${newCat}" readonly/>
                </div>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </div>
        </summary>
        <form id="new-exercise-form">
            <input id="new-exercise-input" placeholder="e.g push ups" type="text" />
            <input id="new-exercise-submit" type="submit" value="Add exercise">
        </form>
        <div class="ex__list" id="ex-todo-list"></div>
        </details>`
        );
        catInput.value = null;
            //delete and edit categories
        const catEl = catList.querySelector('.spoiler');
        const catEditEl = catList.querySelector('summary').querySelector('.edit');
        const catDeleteEl = catList.querySelector('summary').querySelector('.delete');
        const catInputEl = catList.querySelector('#new-category-val');
        catEditEl.addEventListener('click', ()=>{
            if (catEditEl.innerText.toLowerCase() == "edit") {
                catInputEl.removeAttribute("readonly");
                catInputEl.focus();
                catEditEl.innerText = "Save";
            } else {
                catInputEl.setAttribute("readonly", "readonly");
                catEditEl.innerText = "Edit";
            }
        });
        catDeleteEl.addEventListener('click', () =>{
            catList.removeChild(catEl);
        });
            //
        console.log(catEditEl);
        console.log(catList);
        const exForm = document.querySelector('#new-exercise-form');
        const exInput = document.querySelector('#new-exercise-input');
        const exList = document.querySelector('.ex__list');
        exForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            const newEx = exInput.value;
            if (!newEx) {
                alert('You have typed nothing!');
                return;
            } 
            exList.insertAdjacentHTML('afterbegin',
            `<div class="exercise">    
                <label >
                    <input type="checkbox"/>
                    <span class="check"></span>
                </label>
                <div class="todo-content ">
                    <input id="new-exercise-val" value="${newEx}" type="text"  readonly/>
                </div>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </div>`
            );
            exInput.value = null;
                //edit and delete exercises
            const exEl = exList.querySelector('.exercise');
            const exEditEl = exList.querySelector('.edit');
            const exDeleteEl = exList.querySelector('.delete');
            const exInputEl = exList.querySelector('#new-exercise-val');
            const exCheck = exEl.querySelector('label').querySelector('input');
            exEditEl.addEventListener('click', ()=>{
                if (exEditEl.innerText.toLowerCase() == "edit") {
                    exInputEl.removeAttribute("readonly");
                    exInputEl.focus();
                    exEditEl.innerText = "Save";
                } else {
                    exInputEl.setAttribute("readonly", "readonly");
                    exEditEl.innerText = "Edit";
                }
            });
            exDeleteEl.addEventListener('click', () =>{
                exList.removeChild(exEl);
            });
                //      
        });
    }); 
}); */
window.addEventListener("load", () =>{
    todos=JSON.parse(localStorage.getItem('todos')) || [];
    const catForm = document.querySelector('#new-category-form');
    const catInput = document.querySelector('#new-category-input');
    catForm.addEventListener('submit', (ev) =>{
        ev.preventDefault();
        const catVal ={
            content: ev.target.elements.content.value,
            //done: false,
            createdAt: new Date().getTime(),
        }

        todos.push(catVal);

        localStorage.setItem('todos', JSON.stringify(todos));

        ev.target.reset();

        DisplayCat();
    });
    DisplayCat();
});

function DisplayCat(){
    const catList = document.querySelector('.todo-list');

    catList.innerHTML= '';

    todos.forEach(catVal => {
        const catItem = document.createElement('details');
        catItem.classList.add('spoiler');
        const summary = document.createElement('summary');
        const catEl = document.createElement('div');catEl.classList.add('list');
        const catContent = document.createElement('div');catContent.classList.add('todo-content');
        const actions = document.createElement('div');actions.classList.add('actions');
        const edit = document.createElement('button');edit.classList.add('edit');
        const deleteButton = document.createElement('button');deleteButton.classList.add('delete');
        const exForm = document.createElement('form');exForm.id = 'new-exercise-form';
        exForm.innerHTML=`<input id="new-exercise-input" placeholder="e.g push ups" type="text" />
        <input id="new-exercise-submit" type="submit" value="Add exercise">`;
        catContent.innerHTML = `<input id="new-category-val" type="text" 
        value="${catVal.content}" readonly/>`;
        edit.innerHTML = 'EDIT';
        deleteButton.innerHTML = 'DELETE';
        
        catList.appendChild(catItem);
        catItem.appendChild(summary);
        catItem.appendChild(exForm);
        summary.appendChild(catEl);
        catEl.appendChild(catContent);
        catEl.appendChild(actions);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        
    });
}