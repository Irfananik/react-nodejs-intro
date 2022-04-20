import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUser = event => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const user = { name, email }

    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data]
        setUsers(newUser)
        console.log(data);
      })

  }

  return (
    <div className="App">
      <h2>Total users: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required /> <br />
        <input type="mail" name="email" placeholder="Email" required /> <br />
        <input type="submit" value="add user" /> <br />
      </form>
      <div>
        {
          users.map(user => <h3 key={user.id}>id: {user.id} Name:{user.name} email: {user.email}</h3>)
        }
      </div>
    </div>
  );
}

export default App;
