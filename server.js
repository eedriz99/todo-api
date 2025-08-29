const express = require("express")
const app = express()

const PORT = 3000

app.set("view engine", "ejs");
app.use(express.json());

let todos = []

app.get("/", (req, res)=>{
    // res.render("index")
    res.status(201).json(todos)
})

app.post('/add', (req, res) => {
    try{
        let request = req.body
        todos.push(request)
        res.status(200).json({message: "Task added successfully!!!"})
    }catch(err){
        res.json({Error: err.message})
    }
    // console.log(req.body)
})

app.get('/task/:id', (req, res) => {
    let id = parseInt(req.params.id) -1
    res.status(200).json(todos[id])
})

app.put('/task/:id', (req, res) => {
    let id = parseInt(req.params.id) - 1
    let task = todos[id]
    let changes = req.body
    for (let key in changes) {
        task[key] = changes[key]
    }

    let taskJson = JSON.stringify(task)
    todos[id+1] = taskJson

    res.status(200).json({message: `task ${id} updates successfully!!!`})
})

app.delete('/task/:id', (req, res) => {
    let id = parseInt(req.params.id) - 1
    todos.splice(id, 1)

    res.status(200).json({message: `task ${id} removed successfully. Please ensure not to make tyhe request again, as the id shifts to a new task!!!`})
})


app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})