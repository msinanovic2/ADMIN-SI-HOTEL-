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
                        <Link to="/business" key= "Business"> Business</Link>,
                        <Link to="/users" key = "Users"> User</Link>,
                        <Link to="/" key="home"> Home</Link>,
                        <Button key="1" type="primary"  onClick = {(event)=>{
                            AuthService.logout();
                            this.props.history.push("/login");
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
                <PageHeader key="PH"
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
  