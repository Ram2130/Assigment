'use client';
import { useState } from "react";
import TodoList from "./TodoList";
import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
 
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
export default function TodoDetail({todo}) {
    const [title, setTitle] = useState(todo.title);
    const [desc, setDesc] = useState(todo.description);
    const router = useRouter();
 
  const updateTodo = async () => {
    const res = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: desc })
    });

    console.log(res);
  };

  const onDelete = async () => {
    const res = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "DELETE"
      
     
    });
    router.push(`/`)
    console.log(res);
  };
  
  return (
    <>
    <Navbar/>
      <main className="flex flex-col md:flex-row h-screen">
          <div className="  todo w-full md:w-1/3   p-4">
            <TodoList />
          </div>
          <div className=" w-full md:w-2/3 p-4 ">
          <div className="height bg-white h-4/5 w-full md:w-4/5 p-4 ">
          <div className=" flex">
          <button
      onClick={() => router.push("/")}
      className="flex arrow items-center hidden gap-2 text-black-600 hover:text-black-800 mx-2"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      
    </button>
      <input value={title} onChange={e => setTitle(e.target.value)} onBlur={updateTodo}
        className="w-full text-2xl font-bold outline-none break-all" />
        <p className="float-right"> 
           <button onClick={onDelete} className="text-black-600 hover:text-black-800">
                 <FontAwesomeIcon icon={faTrash} /> 
               </button>
        </p>
        </div>
<div className="w-full h-px bg-gray-400 my-4" />
      <textarea value={desc} onChange={e => setDesc(e.target.value)} onBlur={updateTodo}
        className="w-full  h-full   p-2 outline-none   border-gray-400 rounded-md   resize-none"  />
         </div>
         </div>
        </main>
        </>
    
  );
}
