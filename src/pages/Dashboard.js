import React from 'react'
import {DollarCircleOutlined,ShoppingCartOutlined,ShoppingOutlined,DashboardOutlined,DatabaseOutlined,ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Row, Space, Statistic, Table, Typography,Col } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../Services/api";


import { SettingOutlined,HomeOutlined,GlobalOutlined ,LaptopOutlined } from '@ant-design/icons';


function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [accountsCount, setAccountsCount] = useState(1);
  const [serversCount, setServersCount] = useState(7);
  const [workingCount, setWorkingCount] = useState(14);
  const [activeCount, setActiveCount] = useState();

  const getMoreInfo = async () => {
    try {
        
    } catch (err) {

    }
}
  useEffect(() => {
    //getMoreInfo();
  }, []);

  return (
<>
      <Typography.Title level={1}></Typography.Title>
      {/* <Row gutter={16}>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{
            color: '#3f8600',
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>   */}
      <Space size={10} style={{marginTop : "20px"}} direction="horizontal">
        
      <DashboardCard

          icon={
            <HomeOutlined
              style={{
                color: "#ffa600",
                borderRadius: 5,
                fontSize: 60,
                padding: 8,
              }}
            />
          }
          title={"Users"}
          value={accountsCount}
        />
        <DashboardCard
          icon={
            <GlobalOutlined
              style={{
                color: "#ffa600",
                borderRadius: 5,
                fontSize: 60,
                padding: 8,
              }}
            />
          }
          title={"Services Requests"}
          value={serversCount}
        />
        <DashboardCard
          icon={
            <LaptopOutlined
              style={{
                color: "#ffa600",
                borderRadius: 5,
                fontSize: 60,
                padding: 8,
              }}
            />
          }
          title={"Visitors"}
          value={workingCount}
        />

      </Space>
      </>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div>


    <Card
      style={{

      padding: "5px 45px",
    }}>
      <Space size={20} direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  
    

    </div>
  );
}

function DetailDashboardCard({ title, value }) {
  return (
    <div>


    <Card
      style={{

      padding: "5px 45px",
    }}>
      <Space size={20} direction="horizontal">
    
        <Statistic title={title} value={value} />
      </Space>
    </Card>
    
    

    </div>
  );
}

export default Dashboard;
