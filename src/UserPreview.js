import { Descriptions, Badge, Table } from 'antd';
import React, { useState, useEffect } from 'react'
import { AuthService } from './AuthService'
import { Link } from 'react-router-dom'


function UserPreview({ match }) {
    useEffect(() => { getUser(); }, []);

    const [currentUser, setCurrentUser] = useState({
        userId: "",
        username: "",
        email: "",
        name: "",
        surname: "",
        address: "",
        phoneNumber: "",
        city: "",
        country: "",
    });
    async function getUser() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch("https://main-server-si.herokuapp.com/api/users", requestOptions);
        const users = await data.json();
        users.map((x) => {
            if (x.userId == match.params.id)
                setCurrentUser(x);
        })
    }

    return (
        <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Id">{currentUser.userId}</Descriptions.Item>
            <Descriptions.Item label="Name">{currentUser.name}</Descriptions.Item>
            <Descriptions.Item label="Surame">{currentUser.surname}</Descriptions.Item>
            <Descriptions.Item label="Username">{currentUser.username}</Descriptions.Item>
            <Descriptions.Item label="Address">{currentUser.address}</Descriptions.Item>
            <Descriptions.Item label="City">{currentUser.city}</Descriptions.Item>
            <Descriptions.Item label="Country">{currentUser.country}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{currentUser.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
        </Descriptions>
    )
}
export default UserPreview;