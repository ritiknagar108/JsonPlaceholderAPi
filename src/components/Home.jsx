import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //fetching data from the API 
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        //catching errors 
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    //sending delete request to the API
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        //the API is not actually deleting data so removing data drom Users to show changes on home page
        setUsers(users.filter(user => user.id !== id));
      });
  };
// spinner if the data is not fetched yet
  if (loading) return <div className="d-flex justify-content-center mt-5">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;

//showing any errors
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User List</h1>
      <Link to="/create-user" className="btn btn-primary mb-3">Create User</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/edit-user/${user.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
