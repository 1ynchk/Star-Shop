import '../static/css/common/index.css'
import '../static/css/common/loading.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { fetchCheckLogin } from '../store/requests/Users/check-login';

import Header from './common/header';
import SidebarLogin from './common/login-sidebar/login-sidebar';
import SidebarCatalog from './common/catalog-sidebar';
import LoadingScreen from './common/loading-screen';
import Page404 from './common/404-page';
import MainPage from './main-page/Main-page';
import ProductPage from './product-page/product-page';
import Warnings from './common/warnings';

import ProfileRoot from './profile/profile-root';
import ProfilePersonalData from './profile/profile-personal-data';

function App() {

  const screenLoading = useSelector(state => state.users.screenLoading)

  const [isSidebarLogin, setSidebarLogin] = useState(false)
  const [isSidebarCatalog, setSidebarCatalog] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCheckLogin())
  }, [])

  return (
    <div className='App'>
      <div className='container'>
        <Header
          isSidebarCatalog={isSidebarCatalog}
          setSidebarCatalog={setSidebarCatalog}
          isSidebarLogin={isSidebarLogin}
          setSidebarLogin={setSidebarLogin} />
        <div className='mainarea'>
          <Routes>
            <Route exact path='/' element={<MainPage />} />

            <Route exact path='/profile' element={<ProfileRoot />}>
              <Route path='personal-data' element={<ProfilePersonalData />} />
            </Route>

            <Route exact path='/products' >
              <Route path=':id' element={<ProductPage setSidebarLogin={setSidebarLogin} />} />
            </Route>

            <Route path='*' element={<Page404 />} />

          </Routes>
        </div>
      </div>
      <SidebarLogin
        isSidebarLogin={isSidebarLogin}
        setSidebarLogin={setSidebarLogin} />
      <SidebarCatalog
        isSidebarCatalog={isSidebarCatalog}
        setSidebarCatalog={setSidebarCatalog} />
      {screenLoading && <LoadingScreen />}
      <div className='container'>
        <Warnings />
      </div>
    </div>
  )
}

export default App;
