import React from 'react'
import logo from './logo.svg'
import { Button } from 'antd'
import {AuthService} from './AuthService'
class HomePage extends React.Component{

    render(){
                return (
                    <Button className = "Logout" onClick = {(event)=>{
                        AuthService.logout();
                    }} name="LogOut">LogOut {AuthService.getToken}</Button>
                )
    }





}
export default HomePage;