import React from 'react'
import {Form,Input,Button} from 'antd'
import {AuthService} from './AuthService'


function PlaceName(props){

    async function onFinish(values){		
		var myHeaders = new Headers();
		  myHeaders.append("Content-Type", "application/json");
		  myHeaders.append("Authorization",AuthService.currentHeaderValue);
		  var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify({placeName:values.name})
		};
		const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.id}/placeName`, requestOptions)
		console.log(data);
		if (data.status == 200) {
			props.setCurrentBusiness({...props.currentBusiness,placeName:values.name});
		}
		// const duration = await data.json();
	}

    return <Form name="customized_form_controls" layout="inline" onFinish={onFinish} validateMessages ={ {required : 'This field is required!'}}>
                <Form.Item name="name" label="Place name:" rules={[{ required:true }]}>
                        <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Change Place Name
                    </Button>
                </Form.Item>
            </Form>
}
export default PlaceName