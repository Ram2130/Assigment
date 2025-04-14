import TodoDetail  from '../../components/TodoDetail';

export default async function TodoDetailPage({ params }) {
  
  const res = await fetch(`http://localhost:5000/api/todos/${params.id}`, {
    cache: 'no-store'
  });
  const todo = await res.json();
  

  return <TodoDetail todo={todo} />;
}