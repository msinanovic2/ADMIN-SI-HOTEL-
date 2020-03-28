import React from 'react'
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

function Merch (){
    

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name', 
          render: text => <a>{text}</a>,
        },
        {
          title: 'Number of Stores',
          dataIndex: 'numOfStores',
          key: 'numOfStores',
        },
        {
            title :'Reservations',
            dataIndex:'reservation',
            key:'reservation',
            render: reserv=>{
                 return reserv? "Yes":"No"
            }
        },
        {
          title: 'Edit',
          key: 'Edit',
          render: (text, record) => (
            <Link to={"/merch/edit/"+record.merchantId}>
             Edit {record.name}
            </Link>
          ),
        },
        {
            title: 'Details',
            key: 'Details',
            render: (text, record) => (
              <Link to={"/merch/details/"+record.merchantId}>
               See {record.name}
              </Link>
            ),
          },
      ];
      
      const data = [
        {
            merchantId: '1',
          name:"Konzum",
          numOfStores:'5',
          reservation:true
        },
        {
            merchantId: '2',
            name:"Konzum2",
            numOfStores:'51',
            reservation:false
          },
          {
            merchantId: '3',
            name:"Konzum3",
            numOfStores:'53',
            reservation:false,
          },
      ];
      return <Table columns={columns} dataSource={data} />
}
export default Merch;