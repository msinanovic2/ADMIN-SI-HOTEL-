import { Descriptions, Badge, Table, Button } from 'antd';
import React,{useState,useEffect} from 'react';
import {AuthService} from './AuthService';

function UserRoles(props){


    useEffect(()=>{getUser();},[]);
    
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


async function  getUser()  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", AuthService.currentHeaderValue);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    //const data = await fetch("https://localhost:8080/api/users", requestOptions);
    const data = await fetch("https://main-server-si.herokuapp.com/api/users", requestOptions);
    const users = await data.json();
    users.map((x)=>{
        if(x.userId == props.match.params.id)
             setCurrentUser(x);
    })
}

let roles = currentUser.roles;
let username = currentUser.username;

let deletedRoles = [];
let addedRoles = [];





function deleteTableRow(e, row) {

    e.preventDefault();
    console.log("Delete the role which has the Id = " + row.id);

    // somethings wrong...

    deletedRoles.concat(row);

    var array = [...roles];
    var index = array.indexOf(row)
    if (index !== -1) {
        array.splice(index, 1);
        //this.setState({roles: array});
      }


}








const columns = [
    {
      title: 'Role Id',
      dataIndex: 'id', // dataIndex = attribute name in json data source
      key: 'roleid', 
      render: text => <a>{text}</a>
    },
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

    <Table columns={columns} dataSource={roles}/>

    </div>
   
);
   
    /*return (
        
        
         <Descriptions title={username.concat(" Roles")} bordered>
          <Descriptions.Item label="Id">{currentUser.userId}</Descriptions.Item>
          <Descriptions.Item label="Name">{currentUser.name}</Descriptions.Item>
          <Descriptions.Item label="Surame">{currentUser.surname}</Descriptions.Item>
          <Descriptions.Item label="Username">{currentUser.username}</Descriptions.Item>
          <Descriptions.Item label="Address">{currentUser.address}</Descriptions.Item>
          <Descriptions.Item label="City">{currentUser.city}</Descriptions.Item>
          <Descriptions.Item label="Country">{currentUser.country}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{currentUser.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
          <Descriptions.Item label="Role No1">{roles[0].rolename}</Descriptions.Item>
          {console.log("Roles = " + JSON.stringify(roles))};
          
 
        </Descriptions> 
    )
    */

    /*return <div>
        <h1>
            {props.match.params.id}
        </h1>
        </div>*/
        
}

export default UserRoles;