import React from "react";
import mockUsers from "../../mockData/mockUsers";

const UserList = ({ onUserSelect }) => {
    return (
        <div>
            <h2> User List </h2>
            <u1>
                {mockUsers.map((user) => (
                    <li key={user.id} onClick={() => onUserSelect(user)}>

                    </li>
                ))}
            </u1>
        </div>
    );
};

export default UserList;