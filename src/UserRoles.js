import { Table, Button } from 'antd';
import React,{useState,useEffect} from 'react';
import {AuthService} from './AuthService';

function UserRoles(props){

    const [currentUser, setCurrentUser] = useState({
        userId:"",
        username:"",
        email:"",
        name:"",
        surname:"",
        address:"",
        phoneNumber:"",
        city:"",
        country:"",
        roles:[{}] // added empty array for roles
    });

    useEffect(()=>{getUser();},[]);
    



async function  getUser()  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", AuthService.currentHeaderValue);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    const data = await fetch("https://main-server-si.herokuapp.com/api/users", requestOptions);
    const users = await data.json();
    users.map((x)=>{
        if(x.userId == props.match.params.id)
             setCurrentUser(x);
    })
}


let username = currentUser.username;

let deletedRoles = [];
let addedRoles = [];
let filterRoles = currentUser.roles;


const [roles, setRoles] = useState(currentUser.roles);


function deleteTableRow(e, row) {


    if(e!= null && row!=null) {

    e.preventDefault();
    console.log("Delete the role " + JSON.stringify(row));

    filterRoles = currentUser.roles.filter((value, index, array) => value != row);
    
    console.log("filter = " + JSON.stringify(filterRoles));

    setRoles(filterRoles);
    currentUser.roles = filterRoles;

    }

    else {
        console.log("Error deleting table row!")
    }

}



const columns = [
    {
      title: 'Role Name',
      dataIndex: 'rolename',
      key: 'rolename'
    },  
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (row) => (<Button type="primary" danger onClick={(e) => deleteTableRow(e, row)}>Delete</Button>)
    }
];


return (  

    <div>

    <h2>{username} Roles</h2>

    <Table columns={columns} dataSource={currentUser.roles}/>

    </div>
   
);
   
    
}

export default UserRoles;