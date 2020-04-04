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
        const data = await fetch("https://main-server-si.herokuapp.com/api/notifications/admin", requestOptions).then(response => {
            //response.json()
            console.log(response);
        });
        /*
        const data3 = await fetch("https://main-server-si.herokuapp.com/api/notifications/admin/unread", requestOptions);
        const notifications = await data.json();
        const notificationsUnread = await data3.json();
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].open) notifications[i].open = "Otvaranje office-a";
            else notifications[i].open = "Zatvaranje office-a";
        }
        setNotification(notifications);
        setTimeout(function () {
            console.log("Poziv sve neprocitane notifikacije za admina: ", notificationsUnread);
        }, 300);
        */
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
                console.log(result)
                if (result.id !== undefined) {
                    window.location.href = "/";
                }
                else {
                    console.log("Error")
                }
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

                let officeId = null;
                for (let i = 0; i < offices.length; i++) {
                    if (offices[i].address === notification.office.address && offices[i].city === notification.office.city && offices[i].country === notification.office.country) {
                        officeId = offices[i].id;
                        break;
                    }
                }

                if (officeId === null) console.log("Error, office not found");
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
                        })
                }
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
        {
            title: 'Office info',
            key: 'Edit',
            render: (text, record) => (
                <a>Office info</a>
            ),
        },
        {
            title: 'Accept request',
            key: 'Accept',
            render: (text, record) => (
                <Button type="primary" onClick={(event) => {
                    if (record.open === "Otvaranje office-a") {
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
                <Button type="primary" onClick={(event) => { console.log("KO moze") }}>
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