import React, { useState } from 'react';

import './AdminPanel.module.css';
import CustomTable from './../../components/CustomTable/CustomTable';
import CustomInput from './../../components/CustomInput/CustomInut';
import CustomButton from './../../components/CustomButton/CustomButton';
import UserService from './../../service/UserService';
import AuthService from './../../service/AuthService';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  name: '',
  email: '',
  password: '',
};
const addUser = async (name, email, password) => {
  const response = await AuthService.registration(name, email, password);
  console.log(response);
};

function AdminPanel() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const { allUser } = useSelector((state) => state.user);

  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });
  React.useEffect(() => {
    fetchAllUsers();
  }, []);
  console.log(users);
  const fetchAllUsers = async () => {
    const { data } = await UserService.getAllUsers();
    await setUsers(data);
    return data;
  };
  const updateUser = async (userData) => {
    await UserService.updateUser(userData);
  };

  const handleMakeAdminClick = async ({ user, index }) => {
    if (users[index].name !== 'admin') {
      const arr = users.filter((user, userIndex) => userIndex === index);
      const result = arr.map((obj) => ({ ...obj, roleId: 2 }));
      // console.log(...users.)
      //   setUsers(...users, result);
      console.log(result);
      updateUser(result);
      //   setUsers(arr[0].roleId =2);
    }
  };
  const handleRemoveClick = async ({ index }) => {
    if (users[index].name !== 'admin') {
      setUsers(users.filter((user, userIndex) => userIndex !== index));
      console.log(
        users.filter((user, userIndex) => userIndex !== index),
        'remoover',
      );
      await UserService.deleteUserById(users[index].id);
    }
  };
  const isFilledFields = userData.name && userData.email && userData.password;
  //
  //
  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData);
        console.log(editedData.splice(editableUserData.userIndex, 1, userData), 'EDIT');
        updateUser(editedData.splice(editableUserData.userIndex, 1, userData));
        setUsers(editedData);

        setEditableUserData({
          isEdit: false,
          userIndex: null,
        });
      } else {
        addUser(userData.name, userData.email, userData.password);
        setUsers((prevState) => [...prevState, userData]);
      }

      setUserData(initialValues);
    }
  };

  const handleCleanClick = () => {
    setUserData(initialValues);
    setEditableUserData({
      isEdit: false,
      userIndex: null,
    });
  };

  const handleEditClick = ({ user, index }) => {
    setUserData(user);
    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };

  const handleInputChange = (e, userName) =>
    setUserData((prevState) => ({
      ...prevState,
      [userName]: e.target.value,
    }));

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div className="table-data">
          <CustomTable
            users={users}
            handleEditClick={handleEditClick}
            handleRemoveClick={handleRemoveClick}
            handleMakeAdminClick={handleMakeAdminClick}
          />
        </div>

        <div>
          <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <CustomInput
              placeholder="Write your name"
              handleChange={handleInputChange}
              value={userData.name}
              fieldName="name"
              type="text"
            />

            <CustomInput
              placeholder="Write your email"
              handleChange={handleInputChange}
              value={userData.email}
              fieldName="email"
              type="email"
            />
            <CustomInput
              placeholder="Write password"
              handleChange={handleInputChange}
              value={userData.password}
              fieldName="password"
              type="text"
            />

            <div className="buttons-wrapper">
              <CustomButton
                label="Clean"
                classNames=""
                handleClick={() => {}}
                data={null}
                type="reset"
              />

              <CustomButton
                label={editableUserData.isEdit ? 'Edit' : 'Add'}
                classNames=""
                handleClick={() => {}}
                data={null}
                type="submit"
                disabled={!isFilledFields}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminPanel;
