import { Descriptions, Badge, Table, Button, Input,Modal,Form } from 'antd';
import React, { useState, useEffect } from 'react'
import { AuthService } from './AuthService'
import { Link } from 'react-router-dom'
import { PropertySafetyFilled } from '@ant-design/icons';

function NotificationsList(props) {
    useEffect(() => { getNotifications();props.rest.setNotifShow(0) }, []);
    const [allNotifications, setNotification] = useState([]);
    const[notifID,setNotifID] =useState(0)
    let password;
    let username;
    const [showModal,setShowModoal] = useState(false)
    
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
            if (notifications[i].open) notifications[i].open = "Otvaranje office-a";
            else notifications[i].open = "Zatvaranje office-a";
        }
        setNotification(notifications);
        setTimeout(function () {
            console.log("Poziv sve neprocitane notifikacije za admina: ", notifications);
        }, 300);

    }
    function addOfficeWraper(notificationId){
        setNotifID(notificationId)
        setShowModoal(true);
    }
    function onFinish(values){
        username= values.username
        password= values.password
        console.log("Nesto" + username +password)
        addOffice(notifID);
        setShowModoal(false)
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
        var raw = JSON.stringify({...notifikacija.office,serverUsername:username,serverPassword:password});
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
                alert("Uspješno dodan office");

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
                            alert("Uspješno obrisan office");

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

    function reject(notificationId, open, businessId) {
        console.log(notificationId);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders
        };

        if(open === "Otvaranje office-a"){
            ///api/notifications/{businessId}/open/reject/{notificationId} rejectOfficeOpeni
            let link = `https://main-server-si.herokuapp.com/api/notifications/${businessId}/open/reject/${notificationId}`;
            fetch(link, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Openning office rejected successfully");
            });

        } else {
            // Rejecter office closing
            // /api/notifications/{businessId}/close/reject/{notificationId}
            let link = `https://main-server-si.herokuapp.com/api/notifications/${businessId}/close/reject/${notificationId}`;
            fetch(link, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Closing office rejected successfully");
            });
        }

        let url = "https://main-server-si.herokuapp.com/api/notifications/admin/read/" + notificationId;
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert("Notification deleted");
                window.location.href = "/notifications";
            });
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
            title: 'Accept request',
            key: 'Accept',
            render: (text, record) => (
                <Button type="primary" onClick={(event) => {
                    if (record.open === "Otvaranje office-a") {

                        addOfficeWraper(JSON.parse(JSON.stringify(record.id)));
                    } else closeOffice(record.id);
                }}>
                    Accept
                </Button>

            ),
        }, {
            title: 'Reject request',
            key: 'Reject',
            render: (text, record) => (
                <Button type="primary" onClick={(event) => { reject(record.id, record.open, record.businessId); }}>
                    Reject
                </Button>
            ),
        }
    ];

    return <div>
        <h1>Notifications table
        </h1>
        <Table columns={columns} dataSource={allNotifications} />
        <Modal title = "Add Office" visible = {showModal} okButtonProps = {{hidden:true}} onCancel = {(e)=>{setShowModoal(false)}}>
            <Form  name="customized_form_controls"  onFinish={onFinish} validateMessages ={ {required : 'This field is required!'}}>
                <Form.Item name="username" label="Server Username" rules={[{ required:true }]}>
                  <Input min ={0}></Input>
                </Form.Item>
                <Form.Item name="password" label="Server password" rules={[{ required:true ,min:6}]}>
                  <Input.Password  min ={0}></Input.Password>
                </Form.Item>
                <Form.Item>
                  <Button  type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
        </Modal>
    </div>
}

export default NotificationsList;
