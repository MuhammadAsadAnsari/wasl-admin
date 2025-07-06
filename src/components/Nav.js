  import { NavLink } from 'react-router-dom'
  import { logout } from '../auth/auth'
  import './Nav.modules.css'
  import { Menu, Dropdown,Button,Divider ,Image,Typography} from 'antd';
  import { SettingOutlined,UserAddOutlined ,GlobalOutlined ,LaptopOutlined,MessageOutlined,UsergroupAddOutlined ,CaretDownOutlined } from '@ant-design/icons';
  import { useNavigate } from 'react-router-dom';

  const Nav = ({children}) => {

    const navigate = useNavigate();
    const { Title } = Typography;

    const liveChat = () =>{
      try{
        navigate('/chat');
      }catch(e){
        
      }
    }

  const links = [
      {
          url: "users",
          i_class: "bx bx bx-user",
          link_title: "Users",
          key: 3
      }
  ]


  const GeneralLinks = [
    {
      url: "category",
      i_class: "bx bx-server",
      link_title: "Categories",
      key: 1
  },
  {
    url: "subcategory",
    i_class: "bx bx-server",
    link_title: "Sub Categories",
    key: 2
  },


  ]

  const VisitorsLinks = [
    {
      url: "client/visitors",
      i_class: "bx bx-server",
      link_title: "Visitors",
      key: 1
  },



  ]

  const EServiceLinks = [

    {
      url: "requests",
      i_class: "bx bx-stats",
      link_title: "Service Requests",
      key: 1
  }
  ]

  const menu = (
      <Menu className='sidebar-items'>
        {links.map((link) => (
          <Menu.Item key={link.key}  >
            <NavLink to={link.url}>
              <i className={`${link.i_class} nav_icon`}></i> <span className='pageName'>{link.link_title}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    );

    const proxiesMenu = (
      <Menu className='sidebar-items'>
        {EServiceLinks.map((EServiceLinks) => (
          <Menu.Item key={EServiceLinks.key} >
            <NavLink to={EServiceLinks.url}>
              <i className={`${EServiceLinks.i_class} nav_icon`}></i> <span className='pageName'>{EServiceLinks.link_title}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    );

      const GeneralMenu = (
      <Menu className='sidebar-items'>
        {GeneralLinks.map((GeneralLinks) => (
          <Menu.Item key={GeneralLinks.key}  >
            <NavLink to={GeneralLinks.url}>
              <i className={`${GeneralLinks.i_class} nav_icon`}></i> <span className='pageName'>{GeneralLinks.link_title}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    );

    const VisitorsMenu = (
      <Menu className='sidebar-items'>
        {VisitorsLinks.map((VisitorsLinks) => (
          <Menu.Item key={VisitorsLinks.key}  >
            <NavLink to={VisitorsLinks.url}>
              <i className={`${VisitorsLinks.i_class} nav_icon`}></i> <span className='pageName'>{VisitorsLinks.link_title}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    );


    return (
    <>
      <header className="header add_body_padding" id="admin-dash-header">
          <div className='c'>
          </div>
          <div className='chat-button' onClick={liveChat} style={{background : 'rgb(22 52 86)',padding : '5px 10px 5px 10px',borderRadius:'5px',marginRight : "8px"}}>
          <span className="logout d-flex align-items-center justify-content-center link-dark text-decoration-none">
                      <MessageOutlined  style={{color : "white"}}/> <span className="nav_name_header">Live Chat</span>
                      </span>
          </div>
          <div className="dropdown sidebar-profile" style={{background : 'rgb(22 52 86)',padding : '5px 10px 5px 10px',borderRadius:'5px'}}>
                      <span className="logout d-flex align-items-center justify-content-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                      <SettingOutlined style={{color : "white"}}/> <span className="nav_name_header">Settings</span>
                      </span>
                      <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3" >

                          <li>
                              <hr className="dropdown-divider" />
                          </li>
                          <li>
                              <button className="dropdown-item" onClick={() => logout()}>
                                  Sign out
                              </button>
                          </li>
                      </ul>
                  </div>
      </header>

      <aside className="sidebar review" id="admin-dash-nav">
        <nav className="admin-dash-nav">
          <div>
          {/* wasl_logo.png */}
            <NavLink to={"/"} className="nav_logo" style={{ justifyContent: "center", background:'#fff' }}>
              <img src="/img/" alt="Company logo" className="logo" /> {" "}
            </NavLink>
            <div style={{textAlign : 'center'}}>
            <Image style={{width : "60%"}}
      width={200}
      
      src="https://avatar.iran.liara.run/public/boy?username=Ash"
    />
    <Title style={{paddingTop : "5px"}} level={4}>Moiz Adamjee</Title>
    </div>
            <Divider />
            {/* <div className="nav_list">
              <Dropdown overlay={menu} trigger={['click']}>
                <NavLink to="#" className="nav_link">
              <UserAddOutlined /> <span className="nav_name">App Users <CaretDownOutlined className='dropdown-icon'/></span>
                </NavLink>
              </Dropdown>
            </div> */}
            <div className="nav_list">
              <Dropdown overlay={proxiesMenu} trigger={['click']} >
                <NavLink to="#" className="nav_link">
                <GlobalOutlined /> <span className="nav_name">E-Service <CaretDownOutlined className='dropdown-icon'/></span>
                </NavLink>
              </Dropdown>
            </div>
            <div className="nav_list">
              <Dropdown overlay={GeneralMenu} trigger={['click']} >
                <NavLink to="#" className="nav_link">
                <LaptopOutlined /> <span className="nav_name">General Settings <CaretDownOutlined className='dropdown-icon'/></span>
                </NavLink>
              </Dropdown>
            </div>
            <div className="nav_list">
              <Dropdown overlay={VisitorsMenu} trigger={['click']} >
                <NavLink to="#" className="nav_link">
                <UsergroupAddOutlined /> <span className="nav_name">Clients <CaretDownOutlined className='dropdown-icon'/></span>
                </NavLink>
              </Dropdown>
            </div>
          </div>
        </nav>
      </aside>

                  <main className="add_body_padding"> {children} </main>

    </>
    )
  }

  export default Nav