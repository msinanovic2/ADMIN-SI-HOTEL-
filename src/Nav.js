import React from 'react'
import { PageHeader, Button } from 'antd';
import { Link } from 'react-router-dom';
import { AuthService} from './AuthService'
class Nav extends React.Component{
  
    render(){
    if(this.props.LoggedIn)
        return (
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Admin Web App"
                    subTitle="This is a subtitle"
                    extra={[
                        <Link to="/merch"> Merch</Link>,
                        <Link to="/warehous"> Shop</Link>,
                        <Link to="/"> Stores</Link>,
                        <Button key="1" type="primary"  onClick = {(event)=>{
                            AuthService.logout();
                        }}>
                        Log Out
                        </Button>,
                    ]}
                >
                </PageHeader>
            </div>
        )
    return (
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Admin Web App"
                    subTitle="This is a subtitle"
                    extra={[
                        ]}
                >
                </PageHeader>
            </div>
        )
    }

}
export default Nav
  