import React,{useEffect,useState} from 'react'
import Qr from 'qrcode.react'
import {AuthService} from './AuthService'
function QRCode({match}){
    useEffect(()=>{
        getQRinfo();
      },[]);
     const [QRCodeInfo,setQR] = useState(
        {cashRegisterId:"",officeId:"",businessName :""} );

    async function  getQRinfo()  {
        let businessName;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch("https://main-server-si.herokuapp.com/api/business/"+match.params.bid, requestOptions)
        const business = await data.json();
        console.log(match.params.oid)
        console.log(typeof match.params.oid)
        setQR({cashRegisterId:parseInt(match.params.cid), officeId:parseInt(match.params.oid),businessName:business.name});
  }
  // NE DIRATI OVAJ DOLE DIO
    return <div className = "QR">
        <h3>QR Code:</h3>
        <Qr value ={
`{
"cashRegisterId": ${QRCodeInfo.cashRegisterId},
"officeId": ${QRCodeInfo.officeId},
"businessName": "${QRCodeInfo.businessName}"
}`} >
        </Qr>
    </div>
}

export default QRCode