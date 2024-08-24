import {useState} from 'react';
// Using useState Hook
interface ITodo { 
  title : string;
  description :  string;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")

  const addTodo = () => {
    if(title.trim()  && description.trim()){
      const newTodo : ITodo = {title, description};
      setTodos([...todos, newTodo]);
      setTitle('');
      setDescription('');
    }
  }
  return (
    <div id= "container">
      <input type="text" value= {title} onChange= {(e) => setTitle(e.target.value)} /> <br />
      <input type="text" value= {description} onChange= {(e) => setDescription(e.target.value)} /> <br />
      <button onClick= {addTodo}>Submit</button>
      <div id = "list"> 
        {
          todos.map((todo, index) => (
            <div key= {index}>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  )

}


// WITHOUT using state varibales
// interface ITodo {
//   title: string;
//   description: string;
// }

// const todos: ITodo[] = [];

// function App() {
//   const addTodo = () => {
//     const titleInput = document.getElementById("title") as HTMLInputElement;
//     const descInput = document.getElementById("desc") as HTMLInputElement;
    
//     if (titleInput && descInput) {
//       const title = titleInput.value;
//       const desc = descInput.value;

//       if (title.trim() && desc.trim()) {
//         todos.push({ title, description: desc });
        
//         titleInput.value = '';
//         descInput.value = '';

//         const listElement = document.getElementById("list");
//         if (listElement) {
//           listElement.innerHTML = ''; 

//           todos.forEach((todo) => {
//             const titleElem = document.createElement("p");
//             titleElem.textContent = todo.title;
            
//             const descElem = document.createElement("p");
//             descElem.textContent = todo.description;

//             listElement.appendChild(titleElem);
//             listElement.appendChild(descElem);
//           });
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <input type="text" placeholder="Title" id="title" />
//       <br />
//       <input type="text" placeholder="Description" id="desc" />
//       <button onClick={addTodo}>Submit</button>
//       <div id="list"></div>
//     </>
//   );
// }

export default App;
