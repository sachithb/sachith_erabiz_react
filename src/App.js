import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu  } from 'antd';
import Home from './Home';
import Appointment from './Appointment';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;

const App = () => {
 
  return (
    <BrowserRouter>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
      <Menu.Item key="home"  icon={<UserOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="user" icon={<CalendarOutlined  />}>
      <Link to="/appointment">Appointment</Link>
      </Menu.Item>
      
    </Menu>
      <div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
         
        </Routes>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
