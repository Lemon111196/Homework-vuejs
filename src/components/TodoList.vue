<template>
    <!-- <link rel="stylesheet" href=""> -->
    <div class='todo-list-container'>
        <h1>Todo List</h1>
        <div class="head">
            <input @keydown.enter="addTodo" v-model="todo" class="text-content" type="text" placeholder="Text something">
            <button @click="addTodo" class="add">Add</button>
        </div>
        <small style="color: crimson; font-style: italic;">{{ errorMessage }}</small>
        <div class="todo-list">
            <div v-for="(item, index) in todoList" :key="index" class="content">
                <div class="checkbox">
                    <input v-model="todo.completed" :disabled="isDisabled" type="checkbox" @change="toggleTodo(todo)">
                    <p class="completed {'completed': todo.completed }" v-if="!item.isUpdate">{{ item.title }}</p>
                    <input class="update-form" v-if="item.isUpdate" v-model="addConfirm" >
                </div>
                <div class="btn">
                    <button class="update" :disabled="isDisabled" v-if="!item.isUpdate" @click="handleUpdate(item.id)">Update</button>
                    <button class="delete" :disabled="isDisabled" v-if="!item.isUpdate" @click="deleteTodo(item.id)">Delete</button>
                    <button class="confirm" v-if="item.isUpdate" @click="updateTodo(item.id)">Confirm</button>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
export default {
    name: 'TodoListVue',
    props: {},
    data() {
        return {
            todo: "",
            todoList: [
                // {
                //     id: 0,
                //     title: 'fhfhhhf'
                // },
                // {
                //     id: 1,
                //     title: 'jtuut'
                // }
            ],
            errorMessage: "",
            addConfirm:"",
            isDisabled: false,
            completed: false,
            // updateTodo:"",
        }
    },
    methods: {
        addTodo() {
            this.errorMessage = "";
            if (this.todo.length == 0) {
                this.errorMessage = "Enter something";
            } else if (this.todo.length <= 3) {
                this.errorMessage = "Must be at least 3";
            }
            else {
                // console.log('sfdsdf');
                const form = {
                    id: this.todoList.length,
                    title: this.todo,
                    isUpdate: false,
                    completed: false,
                }
                // console.log(form);
                this.todoList.push(form);
                this.todo = '';
            }
        },
        handleUpdate(id) {
            this.todoList[id].isUpdate = true;
            // console.log(this.todoList);
            this.addConfirm = this.todoList[id].title;
            this.isDisabled = true;
        },
        updateTodo(id){
            this.todoList[id].title = this.addConfirm;
            this.todoList[id].isUpdate = false;
            this.isDisabled= false;
        },
        deleteTodo(id){
            this.todoList = this.todoList.filter((item)=> item.id !== id );
            // this,this.isDisabled = true;
        },
        toggleTodo(todo){
            todo.isChecked = !todo.isChecked;
        }
    },
}
</script>
  
<style scoped>
.todo-list-container .text-content {
    width: 600px;
    height: 25px;
    margin-right: 10px;
    padding: 10px;
}

.todo-list-container h1 {
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.todo-list-container .add {
    width: 80px;
    height: 40px;
    background-color: rgb(56, 210, 97);
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.head {
    display: flex;
    justify-content: center;
}

.checkbox {
    display: flex;
    /* justify-content: flex-start; */
}

.todo-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content {
    display: flex;
    justify-content: space-between;
    width: 500px;
}

.update {
    margin: 5px;
    width: 80px;
    height: 40px;
    background-color: chocolate;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.update[disabled]{
    background-color: darkgrey;
}

.delete {
    margin: 5px;
    width: 80px;
    height: 40px;
    background-color: crimson;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.delete[disabled]{
    background-color: darkgrey;
}

.confirm {
    margin: 5px;
    width: 80px;
    height: 40px;
    background-color: rgb(220, 163, 20);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.completed{
    text-decoration: line-through;
}



.btn {
    display: flex;
}
</style> 