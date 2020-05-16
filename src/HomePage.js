import React from 'react'
import { Button } from 'antd'
class HomePage extends React.Component{

    render(){
                return (
                     <div className = "MenuHome" style = {{position: "absolute", top: "50%", left: "50%", marginTop: "-7%",
                     marginLeft: "-10%"}}>

                        <Button className="HomePageButton" type="primary" block onClick={(event)=>this.props.history.push("/merchant/add")}>
                          Add Merchant and Business
                        </Button>
                        <br/>
                        <br/>                                            
                        <Button className= "HomePageButton" type="primary" block onClick={(event)=>this.props.history.push("/changepassword")}>
                          Change my password
                        </Button>
                        <br/>
                        <br/>                                            
                        <Button className= "HomePageButton" type="primary" block onClick={(event)=>this.props.history.push("/pdv")}>
                          PDV
                        </Button>
                        
                      </div>
                )
    }





}
export default HomePage;