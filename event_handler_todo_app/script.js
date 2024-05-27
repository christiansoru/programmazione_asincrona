document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoEndTime = document.getElementById('todo-endtime');

    const addTodo = (task, date) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const taskTextDate = document.createElement('span');
        taskTextDate.textContent =`Due date: ${new Date(date).toLocaleDateString()}`;

        const taskCreationDate = document.createElement('span');
        taskCreationDate.textContent = `Start date: ${new Date().toLocaleDateString()}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function(){
            const editTextInput = document.createElement('input');
            editTextInput.type = 'text';
            editTextInput.value = taskText;

            const editDateInput = document.createElement('input');
            editDateInput.type = 'date';
            editDateInput.value = new Date(taskTextDate).toLocaleDateString();

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', () => {
                if(editTextInput.value.trim()){
                    editTextInput.textContent = `Task: ${taskText.value.trim()}`;
                    editDateInput.textContent = editDateInput.value ? `Due: ${new Date(taskTextDate.value).toDateString()}` :'' ;
                }
                li.replaceChild(taskText, editTextInput);
                li.replaceChild(taskTextDate, editDateInput);
                li.replaceChild(editButton, saveButton);
            })
            li.replaceChild(taskText, editTextInput);
            li.replaceChild(taskTextDate, editDateInput);
            li.replaceChild(editButton, saveButton);
        })

        li.appendChild(taskText);
        li.appendChild(taskCreationDate);
        li.appendChild(taskTextDate);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };

    /*Mettere di fianco alla data della scadenza la specifica (data della scadenza) e mettere una seconda data(data di creazione) con 
    l'equivalente specifica*/
    
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newTask = todoInput.value.trim();
        const newEndDate = todoEndTime.value;
        if (newTask && (new Date(newEndDate) >= new Date())) {
            addTodo(newTask, newEndDate);
            todoInput.value = '';
        } else{
            alert("Non puoi inserire una data inferiore a quella odierna!");
        }
    });
});