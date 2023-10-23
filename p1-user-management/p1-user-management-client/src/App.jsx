import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users,setUsers] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(data=>setUsers(data))
  },[])

  const handleAdd = (e) =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name,email}
    console.log(user);
    fetch('http://localhost:4000/users',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data =>{
      console.log(data);
      const newUsers = [...users,data]
      setUsers(newUsers);
      form.reset();
    })
  }

  return (
    <>
      <h1>Users Management</h1>
      <h3>User Number: {users.length}</h3>
      <form onSubmit={handleAdd}>
        <input type="text" name='name' />
        <br />
        <input type="email" name='email' />
        <br />
        <input type="submit" value="Add" />
      </form>
      <div>
        {
          users.map((user)=> <p key={user.id}>{user.id}:-{user.name}-{user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
