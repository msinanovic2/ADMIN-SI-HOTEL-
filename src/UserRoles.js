import { Table, Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { AuthService } from './AuthService';
import './UserRoles.css';

function UserRoles(props){

    const allRoles = [{id: 3, rolename: "ROLE_MERCHANT"},
                      {id: 2, rolename: "ROLE_MANAGER"},
                      {id: 8, rolename: "ROLE_OFFICEMAN"},
                      {id: 6, rolename: "ROLE_CASHIER"},
                      {id: 7, rolename: "ROLE_BARTENDER"},
                      {id: 5, rolename: "ROLE_PRW"},
                      {id: 4, rolename: "ROLE_WAREMAN"}
                     ]; // there are 8 roles, but role number 1 is admin which can't be selected

    const allRolesName = ["ROLE_MERCHANT", "ROLE_MANAGER", "ROLE_OFFICEMAN", "ROLE_CASHIER", "ROLE_BARTENDER", "ROLE_PRW", "ROLE_WAREMAN"];
    const { Option } = Select; // for select role dropdown menu


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
let filterRoles = currentUser.roles;
let userRolesName = [];

for(var i = 0; i<currentUser.roles.length; i++) {
    userRolesName.push((currentUser.roles[i]).rolename);
}

let selectRoles = allRolesName.filter(x => !userRolesName.includes(x));

for(var i = 0; i<selectRoles.length; i++) {
    selectRoles[i] =  <Option value={selectRoles[i]}>{selectRoles[i]}</Option>
}


console.log("user roles name = " + JSON.stringify(userRolesName));


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

const [newRole, setNewRole] = useState(null);




function addTableRow(e, newRole) {

    if(e != null && newRole != null) {

        e.preventDefault();
        let exists = 0;

        console.log("user roles before adding new role = " + JSON.stringify(currentUser.roles));

        for(var i = 0; i< currentUser.roles.length; i++) {
            if(currentUser.roles[i] == newRole) {
                exists = 1;
                break;
            }
        }

        console.log("new role to add = " + JSON.stringify(newRole));

        if(exists == 0) {

            currentUser.roles.push(newRole);
            filterRoles = currentUser.roles.filter((value, index, array) => true)
            
            setRoles(filterRoles);

            currentUser.roles = filterRoles;
            console.log("new roles after add = " + JSON.stringify(currentUser.roles));
            
        }


    }

    else {
        console.log("No role was selected!");
    }


}

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


async function sendPutRequest(e) {

    
    // PUT request using fetch with async/await

    e.preventDefault();

    let roleNames = [];
    for(var i = 0; i<currentUser.roles.length; i++)
        roleNames.push({rolename: currentUser.roles[i].rolename});

    roleNames = {newRoles: roleNames};

    console.log("body of put request = " + JSON.stringify(roleNames));


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", AuthService.currentHeaderValue);


    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(roleNames)
    };

    const data = await fetch("https://main-server-si.herokuapp.com/api/users/roles" + "/" + currentUser.userId.toString(), requestOptions);
    const jsonData = await data.json();
    if(jsonData!=null){
        console.log("response = " + JSON.stringify(jsonData));
    }
    else {
        console.log("Error in put request!");
    }
    
    


}



const columns = [

    /*{
        title: "Id",
        dataIndex: 'id',
        key: 'id'
    },*/
    {
      title: 'Role Name',
      dataIndex: 'rolename',
      key: 'rolename'
    },  
    {
      title: '',
      dataIndex: '',
      key: 'x',
      //render: (row) => (<Button type="primary" danger onClick={(e) => deleteTableRow(e, row)}>Delete</Button>)
      render: (row) => (<a onClick={(e) => deleteTableRow(e, row)}>Delete</a>)
    }
];




  function onSelectRoleChange(value) {


        let id = null;

        console.log(`selected ${value}`);

        for(var i = 0; i<allRoles.length; i++) {
            if(allRoles[i].rolename == value) {
                id = allRoles[i].id;
                break;
            }
        }

        if(id == null)
            console.log("Error selecting role!");

        setNewRole({id: id, rolename: value});

  }
  
  function onSelectRoleBlur() {
    console.log('blur');
  }
  
  function onSelectRoleFocus() {
    console.log('focus');
  }
  
  function onSelectRoleSearch(val) {
    console.log('search:', val);
  }

  function checkRoles(){
      return currentUser.roles.length == 0;
  }

  console.log("final current user = " + JSON.stringify(currentUser));

return (  

    <div>


    <h2>{username} Roles</h2>

    <div>

    <Table pagination={{ pageSize: 4 }} columns={columns} dataSource={currentUser.roles}/>

    </div>

    <div class="select">

    <div id="dropdownRoles">
    <Select
    showSearch
    style={{ width: 160 }}
    placeholder="Select New Role"
    optionFilterProp="children"
    onChange={onSelectRoleChange}
    onFocus={onSelectRoleFocus}
    onBlur={onSelectRoleBlur}
    onSearch={onSelectRoleSearch}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    >
    {selectRoles}
    </Select>
    </div>

    <div id="addBtn">
    <Button type="primary" onClick={(e) => addTableRow(e, newRole)} block="true">Add</Button>
    </div>

    </div>

    <br></br>

    <div id="submit">
    <Button disabled = {checkRoles()} type="primary" onClick={(e) => sendPutRequest(e)} block="true">Submit</Button>
    </div>



    </div>
   
);
   
    
}

export default UserRoles;
