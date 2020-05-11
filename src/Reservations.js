import React from 'react'
import {Button, Form, InputNumber} from 'antd'
import {AuthService} from './AuthService';

function Reservations(props){
	
	async function onFinish(values){		
		var myHeaders = new Headers();
		  myHeaders.append("Content-Type", "application/json");
		  myHeaders.append("Authorization",AuthService.currentHeaderValue);
		  var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify({duration: values.duration})
		};
		const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.id}/reservations/duration`, requestOptions)
		console.log(data);
		if (data.status == 200) {
			props.setCurrentBusiness({...props.currentBusiness,duration:values.duration});
		}
		// const duration = await data.json();
	}

    return (
		<div>
			<h3>Reservations</h3>
			<br/>
			<Form name="customized_form_controls" layout="inline" onFinish={onFinish} validateMessages ={ {required : 'This field is required!'}}>
				<Form.Item name="duration" label="Duration" rules={[{ required:true }]}>
				  <InputNumber min ={0}></InputNumber>
				</Form.Item>
				<Form.Item>
				  <Button type="primary" htmlType="submit">
					Change Duration
				  </Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Reservations