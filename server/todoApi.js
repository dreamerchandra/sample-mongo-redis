import { Router } from 'express'

export const todoRoutes = () => {
  const routes = new Router()
  const todos = [{ id: 1, text: 'server-fetched todo' }]

  routes.get('/api/todos', (_req, res) => {
    setTimeout(() => {
      res.json(todos)
    }, 300)
  })

  routes.post('/api/todos', (req, res) => {
    const newTodo = req.body
    newTodo.id = Date.now()

    todos.push(newTodo)

    setTimeout(() => {
      res.json(newTodo)
    }, 100)
  })

  return routes
}
