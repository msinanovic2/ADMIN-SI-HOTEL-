import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login';
import {AuthService} from "./AuthService"
import HomePage from './HomePage'
import {PrivateRoute} from './PrivateRouter'
import {history} from './History'
import  Nav  from './Nav';
import Merch from './Merch'


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
                 { this.state.currentUser?<Nav LoggedIn = {true}/>:<Nav LoggedIn = {false}/> }
                <div className="App">
                      <PrivateRoute exact path="/" component={HomePage} />
                      <PrivateRoute exact path= "/merch" component= {Merch}/>
                      <Route path="/login" component={Login} /> 
                      <PrivateRoute path= "/merch/edit/:id" component ={HomePage}/>
                      <PrivateRoute path= "/merch/details/:id" component = {HomePage}/>  
                </div>
              </Router>
           </div>);
  }
}

export default App;

