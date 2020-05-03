import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'
import { InputNumber } from 'antd';



function OfficeLimit(props){
    const layout = {labelCol: {span: 18,},wrapperCol: {span: 26,},};
    function onFinish(values){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var raw = JSON.stringify({
        max:values.maxNumber
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/maxOffices`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
            if(result.statusCode==200){
                props.history.push("/business/details/"+props.match.params.bid);
            }
          })
    }
    return <Form {...layout} layout="inline" name="nest-messages" onFinish={onFinish} validateMessages ={ {required : 'This field is required!'}}>
    <Form.Item name="maxNumber" label="Office Limit: " min={1} >
    <InputNumber min={1}/>
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
}
export default OfficeLimit