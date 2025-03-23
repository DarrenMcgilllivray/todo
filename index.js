const textarea = document.querySelector('textarea');
const addBtn = document.getElementById ('addBtn');
const todoContainer = document.querySelector('.todoContainer');

let todoList=[];

function initialLoad(){
    if(!localStorage.getItem('todos')){
        return;
    }
    todoList = JSON.parse(localStorage.getItem('todos')).todoList;
    updateUI(); 
}

initialLoad();

function addTodo(){
    const todo = textarea.value;
    if(!todo){
        return;
    }

    console.log('Add todo: ', todo);
    todoList.push(todo);

    textarea.value = ''; //resets to empty
    updateUI();
}


function editTodo (index){
    textarea.value = todoList[index];

    todoList = todoList.filter((element, elementIndex) => {
        if(index === elementIndex){return false;}
            return true;
    });
    updateUI();
}

function deleteTodo (index){

    todoList = todoList.filter((element, elementIndex) => {
        if(index === elementIndex){return false;}
            return true;
    });
    updateUI();
}


function updateUI(){
    let newInnerHTML = '';

    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
            <div class="todo">
            <p>${todoElement}</p>
            <div class="btnContainer">
                <button class="iconBTN" onclick="editTodo(${todoIndex})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="iconBTN" onclick="deleteTodo(${todoIndex})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;
    });
    todoContainer.innerHTML = newInnerHTML;

    //save to local storage
    localStorage.setItem('todos', JSON.stringify({todoList}));

}
//buttont to clock
addBtn.addEventListener('click', addTodo);