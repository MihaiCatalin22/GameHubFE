import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import userService from '../api/UserService';
import ReactPaginate from 'react-paginate';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { hasRole } = useAuth();  
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    userService.getAllUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Failed to fetch users:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDeleteUser = (userId) => {
    userService.deleteUser(userId)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => console.error("Failed to delete user:", error));
  };
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayUsers = filteredUsers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(user => (
      <li key={user.id} className="user-list-item">
        <Link to={`/users/${user.id}`}>{user.username}</Link>
        {hasRole('ADMINISTRATOR') && (
          <button onClick={() => handleDeleteUser(user.id)} className='button'>
            Delete User
          </button>
        )}
      </li>
    ));

  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="user-list-page">
      <h2>Users</h2>
      <input
        type="text"
        className="user-search-input"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="user-list">
        {displayUsers}
      </ul>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pagination__page"}
        pageLinkClassName={"pagination__link"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default UserList;
