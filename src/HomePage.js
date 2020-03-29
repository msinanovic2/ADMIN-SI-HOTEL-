import React from 'react'
import { Button } from 'antd'
class HomePage extends React.Component{

    render(){
                return (
                     <div>
                        <Button type="primary" block onClick={(event)=>this.props.history.push("/merchant/add")}>
                          Add Merchant
                        </Button>
                        <Button block>Default</Button>
                        <Button type="dashed" block>
                          Dashed
                        </Button>
                        <Button type="link" block>
                          Link
                        </Button>
                      </div>
                )
    }





}
export default HomePage;