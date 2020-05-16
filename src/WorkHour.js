import React,{useState, useEffect} from 'react'
import { TimePicker } from 'antd';
import { Descriptions, Badge, Table, Button, Input ,Form,Menu, Dropdown } from 'antd';
import {AuthService} from './AuthService'

const { RangePicker } = TimePicker;
function WorkHour(props){

  const layout = {labelCol: {span: 8,}, wrapperCol: {span: 16,},};
    const tailLayout = {
      wrapperCol: {
        offset: 4 ,
        span: 16,
      },
    };
async function onFinishWorkHour (values){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var raw = JSON.stringify({
        "end":values.office.time[1].format("kk:mm"),
        "start":values.office.time[0].format("kk:mm")
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/offices/${props.match.params.oid}/workHours`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result.statusCode)
            if(result.statusCode==200){
                props.setCurrentOffice({...props.currentOffice,workDayStart:values.office.time[0].format("kk:mm"),workDayEnd:values.office.time[1].format("kk:mm")})
            }
          })
}
    return (
    <div>
       <Form {...layout} style = {{display: "inline-block"}} layout = "inline" name="customized_form_controls" onFinish={onFinishWorkHour} validateMessages ={ {required : 'This field is required!'}}>
       <Form.Item style = {{float: "left"}} name={['office', 'time']}  label="Working hours: " rules={[{required: true,}]}>
          <RangePicker format={"HH:mm"}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    )
}
export default WorkHour;