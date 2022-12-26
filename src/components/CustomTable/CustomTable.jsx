import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import './CustomTable.module.css';

const CustomTable = ({ users, handleEditClick, handleRemoveClick, handleMakeAdminClick }) => {
  return (
    <table>
      <th>User Name</th>
      <th>User email</th>
      <th>role ID</th>

      <th>Actions</th>

      <tbody>
        {users.map((user, index) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.roleId}</td>

            <td>
              <div>
                <CustomButton
                  label="edit"
                  classNames="edit-ection"
                  handleClick={handleEditClick}
                  data={{ index, user }}
                  type="button"
                />

                <CustomButton
                  label="remove"
                  classNames="remove-action"
                  handleClick={handleRemoveClick}
                  data={{ index }}
                  type="button"
                />

                <CustomButton
                  label="make admin"
                  classNames="admin-action"
                  handleClick={handleMakeAdminClick}
                  data={{ index, user }}
                  type="button"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
