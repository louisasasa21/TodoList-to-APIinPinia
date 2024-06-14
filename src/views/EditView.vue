<script setup>
import { useTodoStore } from '../stores/todo.js'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const todoStore = useTodoStore()
const todoId = ref(-1)
const isLoaded = ref(false)
const route = useRoute()

onMounted(async() => {
    await todoStore.loadTodos(route.params.id)
    isLoaded.value = true
    todoId.value = parseInt(route.params.id)
})

const editTodo = async (selectedTodo) => {
    try {
        const bodyData = {
        name:selectedTodo.name,
        status: selectedTodo.status
        }
        await todoStore.editTodo(bodyData, todoId.value)
        alert('edit complete !>')
    } catch (error) {
        console.log('error', error)
    }
    
}

</script>

<template>
    <div>
        Edit

        <RouterLink :to="{ name: 'todo-list' }">Back</RouterLink>
        <div v-if="isLoaded">
            id {{ todoId }}
            <div>
                Name
                <input type="text" v-model="todoStore.selectedTodo.name">  
            </div>
            <div>
                Status
                <select v-model="todoStore.selectedTodo.name" >
                    <option>Select Status</option>
                    <option v-for="status in todoStore.statuses" :value="status">
                        {{ status }}
                    </option>
                </select> 

                <div @click="editTodo(todoStore.selectedTodo)">
                    <button>Edit</button>
                </div>
            </div>
        </div>
        <div v-else>
            Loading ....
        </div>
    </div>
</template>