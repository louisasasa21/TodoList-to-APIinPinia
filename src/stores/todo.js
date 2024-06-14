import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://666b005d7013419182d1df38.mockapi.io'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos () {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list  = response.data  
        console.log('load todo list complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadTodo (id) {
      try {
        const response= await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
        console.log('load todo by id complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async addTodo (todoText) {
      const bodyTodo = {
        name: todoText,
        status: 'Pending'
      }
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyTodo)
        this.list.push(response.data)
        console.log('add todo complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async editTodo (todoData,id) {
      /*
      name: 'tset,
      status: 'Doing'
      */ 
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log('edit todo complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async removeTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('delete todo complete')
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
