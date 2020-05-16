import React from 'react'
import { Form, Input, Button ,Switch, message} from 'antd';
import {AuthService} from './AuthService'
import { InputNumber } from 'antd';



function OfficeLimit(props){

    const layout = {labelCol: {span: 12,},wrapperCol: {span: 26,},};
    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 16,
      },
    };
    function onFinish(values){
    if(values.maxNumber<props.currentBusiness.offices.length){
      message.error("Office Limit is lower than current number of offices!");
      return;
    }
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
      fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.id}/maxOffices`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
            if(result.statusCode==200){
              props.setCurrentBusiness({...props.currentBusiness,maxNumberOffices:values.maxNumber});
            }
          })
    }
    return (
    <div>
      <Form layout="inline" name="nest-messages" onFinish={onFinish} validateMessages ={ {required : 'This field is required!'}}>
        <Form.Item name="maxNumber" label="Office Limit: " min={1} rules={[{required: true,}]}>
          <InputNumber min={1}/>
        </Form.Item>
        <Form.Item >
          <Button style = {{marginRight: "-20%"}} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  </div>


  )
}
export default OfficeLimit