import React from 'react'
import { Button } from 'antd'
class HomePage extends React.Component{

    render(){
                return (
                     <div>
                        <Button type="primary" block onClick={(event)=>this.props.history.push("/merchant/add")}>
                          Add Merchant and Business
                        </Button>
                     
                      </div>
                )
    }





}
export default HomePage;