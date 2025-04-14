import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

export default   function Home({ params }:any) {
  
  return (
    <>
    <Navbar/> 
    <main className="flex flex-col md:flex-row h-screen">
       
     
        <TodoList />
       
      {/* <div className="w-full md:w-2/3 p-4">
        <TodoDetail  todo={todo} />
      </div> */}
    </main>
    </>
  );
}