"use client";
import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DashBoardTable from "@/components/Front/NewRegionalmanagerDashboard/DashBoardTable";
import TableCheckbox from "@/components/Front/Company/TableCheckbox"

const requestorInfo = () =>{
    return(
        <div className="flex gap-4">
           <TableCheckbox/> 2023-187265
        </div>
    )
  }
  
  const bidRequests = {
  collums:['Bid Number','Bid Title','Bid Type','Property','Bidder','Creation Date','Est.Close Date','Priority','Status'],
  rows:[
  
      [
       
           requestorInfo(),
          'Unit #6203',
          'Leaking Water Plumbing',
          'Parkside Heights',
          'Jen Anderson',
          '09/01/2023',
          '09/15/2023',
          '	Urgent',
          '	Draft'
      ],
      [
      
           requestorInfo(),
          'Unit #6203',
          'Leaking Water Plumbing',
          'Parkside Heights',
          'Jen Anderson',
          '09/01/2023',
          '09/15/2023',
          '	Urgent',
          '	Draft'
      ],
      [
       
           requestorInfo(),
          'Unit #6203',
          'Leaking Water Plumbing',
          'Parkside Heights',
          'Jen Anderson',
          '09/01/2023',
          '09/15/2023',
          '	Urgent',
          '	Draft'
      ],
      [
      
           requestorInfo(),
          'Unit #6203',
          'Leaking Water Plumbing',
          'Parkside Heights',
          'Jen Anderson',
          '09/01/2023',
          '09/15/2023',
          '	Urgent',
          '	Draft'
      ],
      [
      
           requestorInfo(),
          'Unit #6203',
          'Leaking Water Plumbing',
          'Parkside Heights',
          'Jen Anderson',
          '09/01/2023',
          '09/15/2023',
          '	Urgent',
          '	Draft'
      ],
  
  ]
  }
  
  const bidRequeststab2 = {
    collums:['Bid Number','Bid Title','Bid Type'],
    rows:[
    
        [
         
             requestorInfo(),
            'Unit #6203',
            'Leaking Water Plumbing'
           
        ],
        [
        
             requestorInfo(),
            'Unit #6203',
            'Leaking Water Plumbing'
        ],
        [
         
             requestorInfo(),
            'Unit #6203',
            'Leaking Water Plumbing'
        ],
        [
        
             requestorInfo(),
            'Unit #6203',
            'Leaking Water Plumbing'
        ],
        [
        
             requestorInfo(),
            'Unit #6203',
            'Leaking Water Plumbing'
        ],
    
    ]
    }

 const TabComponent = () =>{
    const [key, setKey] = useState('home');
    const data = [
        {
          label: "All Jobs",
          value: "html",
          desc: <DashBoardTable data={bidRequeststab2}/>,
        },
        {
          label: "Closed Jobs",
          value: "react",
          desc: <DashBoardTable data={bidRequeststab2} />,
        },
        {
          label: "Awarded Jobs",
          value: "vue",
          desc: <DashBoardTable data={bidRequests} />,
        },
        {
          label: "Cancelled Jobs",
          value: "red",
          desc: <DashBoardTable data={bidRequests} />,
        },
      ]

    return(
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
        {data.map(({ label, value, desc },i) => (
            <Tab eventKey={value} title={label} key={i}>
                {desc}
            </Tab>
        ))}
    </Tabs>
    )
  }

  export default TabComponent