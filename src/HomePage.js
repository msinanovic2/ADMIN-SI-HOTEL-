import React from 'react'
import { Button } from 'antd'
class HomePage extends React.Component{

    render(){
                return (
                     <div className = "Menu">
                        <Button className="HomePageButton" type="primary" block onClick={(event)=>this.props.history.push("/merchant/add")}>
                          Add Merchant and Business
                        </Button>
                      
                        <Button className= "HomePageButton" type="primary" block onClick={(event)=>this.props.history.push("/changepassword")}>
                          Change my password
                        </Button>
                     
                      </div>
                )
    }





}
export default HomePage;