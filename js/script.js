window.addEventListener('load', () =>{
    const catForm = document.querySelector('#new-category-form');
    const catInput = document.querySelector('#new-category-input');
    const catList = document.querySelector('.todo-list');
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
                    <input type="text" value="${newCat}" readonly/>
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
            console.log(exList);
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
            const exEl = exList.querySelector('.exercise');
            const exEditEl = exList.querySelector('.edit');
            const exDeleteEl = exList.querySelector('.delete');
            const exInputEl = exList.querySelector('#new-exercise-val');
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
        });
    }); 
}); 