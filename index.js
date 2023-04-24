const form = document.querySelector('#form');
const input = document.querySelector('#input');
const ul = document.querySelector('#ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  add();
});

function add (todo) {
  let todoText = input.value;

  if(todo) {
    todoText = todo.text;
  }

  if(todoText) {
    const li = document.createElement('li');
    li.innerHTML = todoText;
    li.classList.add('list-group-item');

    if(todo && todo.completed) {
      li.classList.add('line-through');
    }

    li.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      li.remove();
      saveData();
    })

    li.addEventListener('click', function() {
      li.classList.toggle('line-through');
      saveData();
    })
    ul.appendChild(li);
    input.value = "";

    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll('li');
  let todos = [];

  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains('line-through')
    }
    todos.push(todo);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}