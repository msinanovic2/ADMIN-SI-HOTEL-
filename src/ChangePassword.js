import React from  'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'


function ChangePassword(props){

    const layout = {labelCol: {span: 13,},wrapperCol: {span: 26,},};
    const validateMessages = {required: 'This field is required!'};
    const onFinish= (values)=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        console.log(props.match.params.id);
        if(values.password==values.confirm){
        var raw = JSON.stringify({
        "password":values.password,
    });}
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://main-server-si.herokuapp.com/api/auth/changePassword" /*+ props.match.params.id*/, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
        if(values.password==values.confirm){
            console.log("Top")
            props.history.push("/");
        }else{
         console.log("Error")
        }
      }) 
  };


    return <Form onFinish={onFinish} validateMessages={validateMessages}>
    <div>
        <h1>ChangePassword
        </h1>
        <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            min:6,message:"Password must be at least 6 characters",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
        </div>
        </Form>
}

export default ChangePassword;