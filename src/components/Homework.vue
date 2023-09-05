<template>
    <div class="todo-container">
        <div class="head">
            <input type="text" class="todo-input" placeholder="Enter a new todo">
            <button class="btn add-btn">Add</button>
        </div>
        <div class="todo-list">
            <div class="content">
                <input type="checkbox">
                <p></p>
            </div>
            <div class="btn">
                <button class="btn btn-update">Update</button>
                <button class="btn btn-delete">delete</button>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'Homework',
    props: {},
    data() {

    },
    methods: {

    }
}
</script>
<style scoped>
    
</style>