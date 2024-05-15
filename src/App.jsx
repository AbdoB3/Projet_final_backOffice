import React,{useEffect,useContext} from "react";
import SideBar from "./Components/SideBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, theme } from "antd";
import Header from "./Components/Header";
import ListPation from "./Components/Pages/Patient/ListPation";
import ListDoctor from "./Components/Pages/Doctor/ListDoctor";
import SignIn from "./Components/Pages/Auth/SignIn"
import Dashboard from "./Components/Pages/Home";
import Calendar from './Components/Pages/Calendar';
import Appoint from './Components/Pages/Appoint';
import Profile from './Components/Pages/Profile';
import { LoginContext } from "./Components/store/LoginContext";
    


const MainLayout = ({ children }) => {
  const { isLoggedIn,decodedToken } = useContext(LoginContext);
 
  const navigate = useNavigate();
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []); 

  
  return (
    <Layout>
      <Header />
      <Layout>
        <div className="flex min-h-screen">
          <SideBar />
        </div>
        <Content
          className="m-6 p-6"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

function App() {
  const { decodedToken } = useContext(LoginContext);
  const navigate = useNavigate();
  const isDoc = ()=>{
    return decodedToken.role==="doctor"
  }

  return (

    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
      <Route
        path="/list-patient"
        element={
          <MainLayout>
            <ListPation />
          </MainLayout>
        }
      />
      <Route
        path="/appointments"
        element={
          <MainLayout>
            <Appoint />
          </MainLayout>
        }
      />
      {isDoc() && (
        <Route
          path="/calendar"
          element={
            <MainLayout>
              <Calendar />
            </MainLayout>
          }
        />
      )}
      
      <Route
        path="/list-doctor"
        element={
          <MainLayout>
            <ListDoctor />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;