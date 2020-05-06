import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login';
import {AuthService} from "./AuthService"
import HomePage from './HomePage'
import {PrivateRoute} from './PrivateRouter'
import {history} from './History'
import  Nav  from './Nav';
import Buisness from './Buisness'
import BusinessPreview from './BusinessPreview'
import OfficePreview from './OfficePreview'
import User from './User'
import UserPreview from './UserPreview'
import BusinessAdd from './BusinessAdd'
import OfficeAdd from './OfficeAdd'
import MerchantAdd from './MerchantAdd'
import BusinessEdit from './BusinessEdit'
import UserPassword from './UserPassword'
import NotificationsList from './NotificationList'
import ChangePassword from './ChangePassword'
import UserRoles from './UserRoles'
import CashRegisterAdd from './CashRegisterAdd'
import OfficeReport from './OfficeReport'
import QRCode from './QRCode';
import Turnover from './Turnover'
import PDV from './Pdv';
import SyncTime from './SyncTime';
import OfficeLimit from './OfficeLimit';
import Reservations from './Reservations';
import WorkHour from './WorkHour';
import CashRegisterLimit from './CashRegisterLimit';


import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;



const SERVER_URL = 'log-server-si.herokuapp.com/ws';
let stompClient;

function App() {

  const [response, setResponse] = useState([]);
  const [message, setMessage] = useState('');
  const [currentUser,setCurrentUser] = useState(null);
  useEffect(()=>{
    Notification.requestPermission();
    var notif;
    AuthService.currentUser.subscribe(x =>setCurrentUser(x));
    //notifications
    const socket = new SockJS("https://log-server-si.herokuapp.com/ws");
    stompClient = Stomp.over(socket);
    // connect the stomp client
    // first arg is headers,
    // second arg is onConnected callback,
    // third arg is onError callback
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/admin`, msg => {
        const data = JSON.parse(msg.body);
        notif =  new Notification(data.payload.description,{})
        setResponse(res => [data, ...res]);
      });
    }, err => console.error(err + "Greska"));

  },[])
  

  
    return (<div>           

              <Router  history= {history}>
                <Layout>
                  <Header className="headerLayout"> 
                    { currentUser?<Nav LoggedIn = {true} history={history}/>:<Nav LoggedIn = {false} history = {history}/> }
                  </Header>
                  <Content>
                    <div className="App">
                      <PrivateRoute exact path="/" component={HomePage} />
                      <PrivateRoute exact path= "/Business" component= {Buisness}/>
                      <Route path="/login" component={Login} /> 
                      <PrivateRoute path= "/business/edit/:id" component ={BusinessEdit}/>
                      <PrivateRoute path= "/business/details/:id" component = {BusinessPreview}/>
                      <PrivateRoute path = "/business/:bid/office/details/:oid" component = {OfficePreview}/>
                      <PrivateRoute path = "/business/add/:id" component = {BusinessAdd}/>
                      <PrivateRoute path ="/business/:bid/office/add" component={OfficeAdd}/>
                      <PrivateRoute path = "/users" component = {User}/> 
                      <PrivateRoute path= "/user/details/:id" component = {UserPreview}/>
                      <PrivateRoute path= "/user/password/:id" component = {UserPassword}/>  
                      <PrivateRoute path = "/merchant/add" component = {MerchantAdd } history ={history}/>
                      <PrivateRoute path ="/notifications" component = {NotificationsList}/>
                      <PrivateRoute path = "/changepassword"  component = {ChangePassword}/>
                      <PrivateRoute path = "/user/roles/:id" component = {UserRoles}/>
                      <PrivateRoute path = "/business/:bid/office/:oid/cashregister/add" component= {CashRegisterAdd}/>
                      <PrivateRoute path = "/business/:bid/office/report/:oid" component = {OfficeReport}/>
                      <PrivateRoute path = "/business/:bid/office/:oid/cashRegister/qr/:cid" component = {QRCode}/>
                      <PrivateRoute path ="/business/turnover" component = {Turnover}/>
                      <PrivateRoute path = '/pdv' component = {PDV}/>
                      <PrivateRoute path = "/business/:bid/synctime" component= {SyncTime}/>
                      <PrivateRoute path = "/business/:bid/officelimit" component = {OfficeLimit}/>
                      <PrivateRoute path = "/business/:bid/reservations" component ={Reservations}/>
                      <PrivateRoute path = "/business/:bid/office/:oid/workinghour" component = {WorkHour}/>
                      <PrivateRoute path ="/business/:bid/office/:oid/cashregisterlimit" component ={CashRegisterLimit}/>
                    </div>
                 </Content>
                 <Footer className="footerLayout">Footer</Footer>
                </Layout>
                </Router>
           </div>);

}

export default App;

