import '../static/css/common/index.css'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

import { fetchCheckLogin } from '../store/queries/Users/check-login';

import Header from './common/header';
import SidebarLogin from './common/login-sidebar';

function App() {
  const [isSidebar, setSidebar] = useState(false)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchCheckLogin())
  // }, [])

  return (
    <div className='App'>
      <div className='container'>
        <Header isSidebar={isSidebar} setSidebar={setSidebar} />
      </div>
      <SidebarLogin isSidebar={isSidebar} setSidebar={setSidebar} />
    </div>
  )
}

export default App;
