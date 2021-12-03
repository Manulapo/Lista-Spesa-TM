//define Ui variable

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all EventListeners

LoadAllEventListeners();


function LoadAllEventListeners() {

  form.addEventListener('submit',addTask);

  //remove task event

  taskList.addEventListener('click',removeTask)

  //clear task event

  clearBtn.addEventListener('click',clearTask);

  //filter tasks events

  filter.addEventListener('keyup',filterTask)

  //DOM LOAD event

  document.addEventListener('DOMContentLoaded', getTasks)
  
}

//ADD TASK

function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a Task');
  }

  //create a li element
  const li = document.createElement('li')

  //add class
  li.className = 'collection-item';

  //create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement('a');

  //add class
  link.className = 'delete-item secondary-content';

  //add icon 
  link.innerHTML = `<i class='fas fa-remove'></i>`

  //append the loink to te list
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);
  
  //store in localstorage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

  //avoiding submit event
  e.preventDefault();

};

//REMOVE TASK

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?'))
    e.target.parentElement.parentElement.remove();

    //REMOVE FROM LS TOO
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

//REMOVE FROM LS

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      task.splice(index, 1);
    }
  });

  localstorage.setItem('task', JSON.stringify(tasks));
}

//CLEARLIST

function clearTask() {

  //slower

  /* taskList.innerHTML=''; */

  //faster

  while(taskList.firstChild) { //finchè è presente un firstchild nella taskList
    taskList.removeChild(taskList.firstChild) //rimuovilo.
  }

  //CLEAR FROM LS

  clearTaskFromLocalStorage();
}

//CLEAR TASK FROM LOCAL STORAGE

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

//FILTER

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){ //ricorda che -1 significa che non esiste match nella ricerca
        task.style.display = 'block'
      }else{
        task.style.display = 'none'
      }
  });
}

//LOCALSTORAGE STORE TASKS

function storeTaskInLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//DISPLAY TASK FROM LOCAL STORAGE (c'è in LS ma non in UI)

function getTasks(){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

    //create a li element
    const li = document.createElement('li')

    //add class
    li.className = 'collection-item';

    //create textnode and append to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    //add icon 
    link.innerHTML = `<i class='fas fa-remove'></i>`

    //append the loink to te list
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}










