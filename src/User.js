import React, { useState,useEffect } from 'react'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import {AuthService} from './AuthService'

function User (){
  
  useEffect(()=>{
    getAllUser();
  },[]);

  const [allUser,setUser] = useState([]);
    
  async function getAllUser(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const data = await fetch("https://main-server-si.herokuapp.com/api/users", requestOptions);
    setUser( await data.json());
    console.log(allUser);
  }
    const columns = [
        {
          title: 'Id',
          dataIndex: 'userId',
          key: 'userId', 
          render: text => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },  {
          title: 'Surname',
          dataIndex: 'surname',
          key: 'surname',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'surname',
        },
        {
            title :'E-mail',
            dataIndex:'email',
            key:'e-mail',
        },
        {
            title: 'Details',
            key: 'Details',
            render: (text, record) => (
              <Link to={"/user/details/"+record.userId}>
               See {record.name}
              </Link>
            ),
          }, {
            title: 'Reset Password',
            key: 'reset',
            render: (text, record) => (
              <Link to={"/user/password/"+record.userId}>
                Reset password for {record.username}
              </Link>
            ),
          }, {
            title: 'Change Role',
            key: 'changeRple',
            render: (text, record) => (
              <Link to={"/user/roles/"+record.userId}>
               Change Role for {record.name}
              </Link>
            ),
          },
      ];
      
      return (  <div>
              <h2>User Table</h2>
              <Table columns={columns} dataSource={allUser} />
              </div>
      )
}
export default User;