import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React,{useEffect} from 'react'
import {AuthService} from './AuthService'



const NormalLoginForm = () => {
  useEffect(()=>{
        if(AuthService.currentUserValue)
            window.location.href="/"
  },[]);



  const onFinish = (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"username":values.username,"password":values.password,"role":"ROLE_ADMIN"});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://main-server-si.herokuapp.com/api/auth/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.token!==undefined){
        AuthService.storeToken(result);
        window.location.href = "/";
        }
        else{
          localStorage.clear();
          message.error("Wrong username or password!");
        }
      })
      .catch(error =>
         {console.log('error', error);
        AuthService.logout();
        });
    
  };

  return (<div className = "LoginRound">
    <h3 className="loginheader">Login</h3>
    <Form 
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
    </div>
  );
};

// const mountNode = document.getElementById("app");

// ReactDOM.render(<NormalLoginForm />, mountNode);

export default NormalLoginForm;