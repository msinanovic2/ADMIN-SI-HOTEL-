import React from 'react';
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


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        currentUser: null
    };
  }

  componentDidMount() {
    AuthService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  render(){  
    return (<div>           
              <Router  history= {history}>
                 { this.state.currentUser?<Nav LoggedIn = {true} history={history}/>:<Nav LoggedIn = {false} history = {history}/> }
                <div className="App">
                      <PrivateRoute exact path="/" component={HomePage} />
                      <PrivateRoute exact path= "/Business" component= {Buisness}/>
                      <Route path="/login" component={Login} /> 
                      <PrivateRoute path= "/business/edit/:id" component ={HomePage }/>
                      <PrivateRoute path= "/business/details/:id" component = {BusinessPreview}/>
                      <PrivateRoute path = "/business/:bid/office/details/:oid" component = {OfficePreview}/>
                      <PrivateRoute path = "/business/add/:mid" component = {BusinessAdd}/>
                      <PrivateRoute path ="/business/:bid/office/add" component={OfficeAdd}/>
                      <PrivateRoute path = "/users" component = {User}/> 
                      <PrivateRoute path= "/user/details/:id" component = {UserPreview}/>
                      <PrivateRoute path = "/merchant/add" component = {MerchantAdd}/> 
                </div>
              </Router>
           </div>);
  }
}

export default App;

