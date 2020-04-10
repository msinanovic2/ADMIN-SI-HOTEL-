import { Descriptions, Badge, Table, Button } from 'antd';
import React, { useState, useEffect } from 'react'
import { AuthService } from './AuthService'
import { Link } from 'react-router-dom'

function NotificationsList() {
    useEffect(() => { getNotifications(); }, []);
    const [allNotifications, setNotification] = useState([]);

    async function getNotifications() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch("https://main-server-si.herokuapp.com/api/notifications/admin/unread", requestOptions);

        const notifications = await data.json();
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].open) notifications[i].open = "Open";
            else notifications[i].open = "Close";
        }
        setNotification(notifications);
        setTimeout(function () {
            console.log("Poziv sve neprocitane notifikacije za admina: ", notifications);
        }, 300);

    }

    function addOffice(notificationId) {
        let notifikacija;
        for (let i = 0; i < allNotifications.length; i++) {
            if (notificationId === allNotifications[i].id) {
                notifikacija = allNotifications[i];
                break;
            }
        }

        console.log(notifikacija.office);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", AuthService.currentHeaderValue);
        var raw = JSON.stringify(notifikacija.office);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let url = "https://main-server-si.herokuapp.com/api/business/" + notifikacija.businessId + "/offices";
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert("successfully added office");

                //LINK/api/notifications/admin/read/{notificationId} (POST)

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders
                };
                //LINK/api/business/{businessId} (GET)

                let url = "https://main-server-si.herokuapp.com/api/notifications/admin/read/" + notifikacija.id;
                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        window.location.href = "/notifications";
                    })
            })
    }

    function closeOffice(notificationId) {
        console.log("Brisanje offica");


        let notification;
        for (let i = 0; i < allNotifications.length; i++) {
            if (notificationId === allNotifications[i].id) {
                notification = allNotifications[i];
                break;
            }
        }


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        //LINK/api/business/{businessId} (GET)

        let url = "https://main-server-si.herokuapp.com/api/business/" + notification.businessId;
        let offices;
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                offices = result.offices;

                console.log(offices);

                let officeId = notification.officeId;
                let temp = false;
                for (let i = 0; i < offices.length; i++) {
                    if (officeId === offices[i].id) temp = true;
                }

                if (!temp) {
                    console.log("Error, office not found");
                    alert("Error, office not found");
                }
                else {
                    //LINK/api/business/{businessId}/offices/{officeId} (DELETE)

                    url = "https://main-server-si.herokuapp.com/api/business/" + notification.businessId + "/offices/" + officeId;
                    requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders
                    };
                    fetch(url, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                            alert("Successfully deleted office");

                            //LINK/api/notifications/admin/read/{notificationId} (POST)

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders
                            };
                            //LINK/api/business/{businessId} (GET)

                            let url = "https://main-server-si.herokuapp.com/api/notifications/admin/read/" + notification.id;
                            fetch(url, requestOptions)
                                .then(response => response.json())
                                .then(result => {
                                    window.location.href = "/notifications";
                                })
                        })
                }
            })

    }


    function reject(notificationId) {
        console.log(notificationId);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders
        };
        //LINK/api/business/{businessId} (GET)

        let url = "https://main-server-si.herokuapp.com/api/notifications/admin/read/" + notificationId;
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert("Notification deleted");
                window.location.href = "/notifications";
            })
    }


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Business ID',
            dataIndex: 'businessId',
            key: 'businessId',
        }, {
            title: 'Request info',
            dataIndex: 'open',
            key: 'open',
        },
        /*{
            title: 'Office info',
            key: 'Edit',
            render: (text, record) => (
                <a>Office info</a>
            ),
        },*/
        {
            title: 'Accept request',
            key: 'Accept',
            render: (text, record) => (
                <Button type="primary" onClick={(event) => {
                    if (record.open === "Open") {
                        addOffice(record.id);
                    } else closeOffice(record.id);
                }}>
                    Accept
                </Button>

            ),
        }, {
            title: 'Reject request',
            key: 'Reject',
            render: (text, record) => (
                <Button type="primary" onClick={(event) => { reject(record.id); }}>
                    Reject
                </Button>
            ),
        }
    ];

    return <div>
        <h1>Notifications table
        </h1>
        <Table columns={columns} dataSource={allNotifications} />
    </div>
}

export default NotificationsList;