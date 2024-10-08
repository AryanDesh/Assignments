

/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)
  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123
    - For any other route not defined in the server return 404
  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const todos = [
    {
        id: "1",
        title: "Complete Project Report",
        description: "Finalize and submit the project report for the final year project."
    },
    {
        id: "2",
        title: "Prepare for SDE Interview",
        description: "Review coding problems, system design concepts, and company-specific information for the Visteon interview."
    },
    {
        id: "3",
        title: "Buy Groceries",
        description: "Get the weekly groceries including fruits, vegetables, and essential supplies."
    },
    {
        id: "4",
        title: "Exercise Routine",
        description: "Follow the exercise routine for at least 30 minutes, including cardio and strength training."
    },
    {
        id: "5",
        title: "Read a Book",
        description: "Read the next chapter of the book you’re currently working on, or start a new one."
    },
    {
        id: "6",
        title: "Clean the Room",
        description: "Organize the room, including sorting out clothes, tidying up the desk, and vacuuming the floor."
    },
    {
        id: "7",
        title: "Update Resume",
        description: "Revise the resume to include recent experiences and skills relevant to upcoming job applications."
    },
    {
        id: "8",
        title: "Plan Weekend Outing",
        description: "Plan an outing or activity for the weekend, such as visiting a place of interest or arranging a meetup with friends."
    },
    {
        id: "9",
        title: "Check Emails",
        description: "Go through and respond to important emails, and organize your inbox."
    }
];

let Count = 9;

import express from "express";
const app = express();
app.use(express.json());

app.get('/todos', async (req, res)=> {
    res.status(200).json(todos);
})

app.get('/todos/:id', (req,res) => {
  try{
    const todoId = req.params.id;
    const todo = todos.find(t => t.id === todoId);
  }
  catch(e) {
    return res.status(500);
  }
})

app.post('/todos/create', (req,res) => {
  try{
    const {title, description} = req.body;
    Count++;
    todos.push({
      id : Count + "",
      title : title,
      description: description,
    })
    const todo = todos.find(t => t.id = Count + ""); 
    res.status(200).json({todo})
  }
  catch(e) {
    res.status(404).json({});
  }
})

app.listen(300 , () => {
  console.log("server running on port 3000")
})

