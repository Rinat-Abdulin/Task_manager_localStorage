window.onload = () => {

    const button = document.querySelector('.button');
    const input = document.querySelector('.input');
    const taskList = document.querySelector('.task-list');
    const myStorage = window.localStorage

    let taskStorage = myStorage.getItem('tasks')
    const tasks = [...JSON.parse(taskStorage)]


    const editTask = (element, input) => {
        element.edit = !element.edit
        if (!element.edit) {
            element.task = input.value
        }
        myStorage.setItem('tasks', JSON.stringify(tasks))
        render(tasks)
    }

    const deleteTask = (arr, index) => {
        if (confirm('Вы точно хотите удалить?')) {

            // let indexForSplice = arr.findIndex((item) => item.id === element.id)   //                             Вариант 2 
            // arr.splice(indexForSplice, 1)
            arr.splice(index, 1)
        }
        myStorage.setItem('tasks', JSON.stringify(tasks))
        render(tasks)
    }

    button.addEventListener('click', () => {
            tasks.push({
                task: input.value,
                edit: false
            })
        input.value='';
        myStorage.setItem('tasks', JSON.stringify(tasks))
        render(tasks)
    })


    const render = (arr) => {
        taskList.innerHTML = ''
        arr.forEach((element, index) => {
            const li = document.createElement('li')
            const div = document.createElement('div')
            const p = document.createElement('p')
            const buttonEdit = document.createElement('button')
            const buttonDel = document.createElement('button')
            const input = document.createElement('input')

            if (element.edit) {
                input.value = element.task
                buttonEdit.innerHTML = 'Save'
                li.append(input)
            } else {
                p.innerHTML = element.task
                buttonEdit.innerHTML = 'Edit'
                li.append(p)
            }
            p.innerHTML = element.task
            buttonDel.innerHTML = 'Delete'
            li.classList.add('list-item')

            div.append(buttonEdit)
            div.append(buttonDel)

            li.append(div)

            buttonDel.addEventListener('click', () => deleteTask(arr, index))

            buttonEdit.addEventListener('click', () => editTask(element, input))
            taskList.append(li)
        })
    }

    render(tasks)
}