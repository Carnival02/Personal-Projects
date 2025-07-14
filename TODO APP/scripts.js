
// alert("HElllooo");

document.addEventListener('DOMContentLoaded',()=>{
    const taskInput=document.getElementById('task-input');
    const addTaskBtn=document.getElementById('add-task-btn');
    const taskList=document.getElementById('task-list');
    const emptyImage=document.querySelector('.empty-image');
    const todosContainer=document.querySelector('.todos-container');
    const progressBar=document.getElementById('progress');
    const progressNumber=document.getElementById('numbers');


    const toggleEmptySatate=()=>{
        emptyImage.style.display=taskList.children.length ===0 ? 'block':'none';

        todosContainer.style.width=taskList.children.length>0 ? '100%':'50%';

    }

    const updateProgress=(checkCompletion =true)=>{
        const totalTask=taskList.children.length;
        const completedTask=taskList.querySelectorAll('.checkbox:checked').length

        progressBar.style.width=totalTask ?` ${(completedTask /totalTask)*100}%`:'0%';

        progressNumber.textContent=`${completedTask}/${totalTask}`;
    }


    const saveTaskToLocalStroage=()=>{
        const task = Array.from(taskList.querySelectorAll('li')).map(li=>({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('task',JSON.stringify(task));
    }

    const addTask=(text,completed=false)=>{
        // event.preventDefault();

        const taskText= text ||taskInput.value.trim();
        if(!taskText){
            return;
        }

        const li=document.createElement('li');
        
        li.innerHTML=`
        <input type = "checkbox" class="checkbox" ${completed ?'checked':''} />

        <span>${taskText}</span>
        <div class="task-buttons" >
            <button class= "edit-btn"><i class ="fa-solid fa-pen"></i></button>
            <button class= "delete-btn"><i class ="fa-solid fa-trash"></i></button>
        </div>    
        `;

        const checkbox=li.querySelector('.checkbox');

        const editBtn=li.querySelector('.edit-btn');

        if(completed){
            li.classList.add('Completed');
            editBtn.disabled=true;
            editBtn.style.opacity='0.5';
            editBtn.style.pointerEvent='none'

        }

        checkbox.addEventListener('change',()=>{
            const isChecked=checkbox.checked;
            li.classList.toggle('Completed',isChecked);
            editBtn.disabled=isChecked;
            editBtn.style.opacity=isChecked ? '0.5':'1';
            editBtn.style.pointerEvent=isChecked?'none':'auto';
            updateProgress();
            saveTaskToLocalStroage();

        })

        editBtn.addEventListener('click',()=>{
            if(!checkbox.checked){
                taskInput.value=li.querySelector('span').textContent;
                li.remove();
                toggleEmptySatate();
                updateProgress(false);
                saveTaskToLocalStroage();
            }
        })
        

        li.querySelector('.delete-btn').addEventListener('click',()=>{
            li.remove();
            toggleEmptySatate();
            updateProgress();
            saveTaskToLocalStroage();

        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptySatate();
        updateProgress(checkCompletion);
        saveTaskToLocalStroage();

    };

    addTaskBtn.addEventListener('click',()=> addTask());
    taskInput.addEventListener('keypress',(e)=>{
        if(e.key === 'Enter'){
        e.preventDefault();
            addTask();
        }
    })

});

