import React,{useEffect,useState} from 'react'
import Qr from 'qrcode.react'
import {AuthService} from './AuthService'
function QRCode({match}){
    useEffect(()=>{
        getQRinfo();
      },[]);
     const [QRCodeInfo,setQR] = useState(
        {cashRegisterId:"",officeId:"",businessName :"",uuid:""} );

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
        var requestOptions2 = {
            method: 'GET',
            headers: myHeaders,
          };
        const cashRegisterData = await fetch(`https://main-server-si.herokuapp.com/api/business/${match.params.bid}/offices/${match.params.oid}/cashRegisters/${match.params.cid}`, requestOptions2)
        const cashRegister = await cashRegisterData.json()
        setQR({cashRegisterId:parseInt(match.params.cid), officeId:parseInt(match.params.oid),businessName:business.name,uuid:cashRegister.uuid});
  }
  // NE DIRATI OVAJ DOLE DIO
    return <div className = "QR">
        <h3>QR Code:</h3>
        <Qr value ={
`{
"cashRegisterId": ${QRCodeInfo.cashRegisterId},
"officeId": ${QRCodeInfo.officeId},
"businessName": "${QRCodeInfo.businessName}"
"uuid":"${QRCodeInfo.uuid}"
}`} >
        </Qr>
    </div>
}

export default QRCode