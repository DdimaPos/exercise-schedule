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
        
        </details>`

        );
        catInput.value = null;
    });
});