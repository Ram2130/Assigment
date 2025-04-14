// 'use client';
// import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';

// export default function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const fetchTodos = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:5000/api/todos?page=1");
//     const data = await res.json();
//     setTodos(data.todos);
//     setLoading(false);
//   };

//   const createTodo = async () => {
//     const res = await fetch("http://localhost:5000/api/todos", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: "New Additions", description: "To stay representative of framework & new example apps." })
//     });
//     fetchTodos();
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">TODO</h2>
//         <button className=" bg-black text-white px-3 py-1 rounded" onClick={createTodo}>+ Todo</button>
//       </div>
//       <div className=" max-h-[85vh]">
//         {loading ? <p>Loading...</p> : todos?.map(todo => (
//           <div  onClick={() => router.push(`/todo/${todo._id}`)} key={todo._id} className="  hover:border hover:border-black bg-white p-2 my-3 rounded hover:bg-gray-100 cursor-pointer">
//             <h3 className="font-semibold">{todo.title}</h3>
//             <p className="text-sm text-gray-600">{todo.description}</p>
//             <p className="text-xs text-gray-400">{new Date(todo.createdAt).toDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// app/page.jsx or components/TodoList.jsx
'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
 import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef(null)
  
  const router = useRouter();
  // Fetch todos from API
  const fetchTodos = async (page) => {
    const res = await fetch(`http://localhost:5000/api/todos?page=${page}&limit=10`)
    const data = await res.json()
    if (data.length === 0) setHasMore(false)
    setTodos((prev) => [...prev, ...data.todos])
  }
  const createTodo = async () => {
    setLoading(true);
         const res = await fetch("http://localhost:5000/api/todos", {
         method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "New Additions", description: "To stay representative of framework & new example apps." })
        });
        setLoading(false);
        createfetch();
       };
       const [loading, setLoading] = useState(false);
       const createfetch  = async () => {
    
            const res = await fetch("http://localhost:5000/api/todos?page=1");
            const data = await res.json();
            setTodos(data.todos);
            console.log(data.todos); 
          };
          const uniqueTodos = todos.filter(
            (todo, index, self) =>
              index === self.findIndex(t => t._id === todo._id)
          );   
   useEffect(()=>{
    createfetch();
   },[setLoading]) 
  useEffect(() => {
    if (hasMore) fetchTodos(page)
       
  }, [page])

  // Intersection observer
  const observer = useRef()
  const lastTodoRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore])

  return (


    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center">
      <button className=" bg-black text-white px-3 py-1 rounded cursor-pointer" onClick={createTodo}>+ Todo</button>
       <div style={{width:"35px", backgroundColor:"white",height:"40px"}}>
      <button className="p-2" >  
      <FontAwesomeIcon  icon={faSearch} className=" bg-white text-gray-500 cursor-pointer" />
      </button>
      </div>
       </div>
        {uniqueTodos.map((todo, index) => (
          
            <div   key={todo._id}
            ref={index === todos.length - 1 ? lastTodoRef : null}
                onClick={() => router.push(`/todo/${todo._id}`)}   className=" mb-4 p-4 bg-gray-100 rounded shadow hover:border hover:border-black bg-white p-2 my-3 rounded hover:bg-gray-100 cursor-pointer">
           <h3 className="font-semibold">{todo.title}</h3>
           <p className="text-sm text-gray-600">{todo.description}</p>
             <p className="text-xs text-gray-400">{new Date(todo.date).toDateString()}</p>
          </div>
          
        ))}
      
      {!hasMore && <p className="text-center mt-4">No more todos 📝</p>}
    </div>
  )
}

