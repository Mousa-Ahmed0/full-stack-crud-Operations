import React, { useState, useEffect } from 'react'
import List from './components/List';
import axios from 'axios'
import { baseURL } from './utils/contant'
const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
  }, [updateUI]);
  //
  const updateMode=(id,text)=>{
    console.log(text);
    setInput(text)
    setUpdateId(id)
  } 
  //
  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input })
      .then((res) => {
        console.log(res.data);
        setInput("");
        setUpdateUI((prevState) => !prevState);
      })    
  }
  //
  const updateTask =()=>{
    axios.put(`${baseURL}/update/${updateId}`, { task: input })
    .then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateId(null);
      setUpdateUI((prevState) => !prevState);
    })  
  }
  return (
    <main>
      <h1 className='title'>CRUD Oparation</h1>
      <div className='input_holder'>
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <button type='submit' onClick={updateId ? updateTask: addTask}>
          {updateId ? "Upadate Task" : "Add Task"};
        </button>

      </div>
      <ul>
        {
          tasks.map((task) => (
            <List key={task._id} id={task._id} task={task.task} setUpdateUI={setUpdateUI} updateMode={updateMode}/>
          ))
        }
      </ul>
    </main>
  )
}

export default App