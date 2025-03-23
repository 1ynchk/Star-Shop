import '../static/css/common/index.css'
import '../static/css/common/loading.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { fetchCheckLogin } from '../store/requests/Users/check-login';

import Header from './common/header';
import SidebarLogin from './common/login-sidebar/login-sidebar';
import LoadingScreen from './common/loading-screen';

function App() {

  const screenLoading = useSelector(state => state.users.screenLoading)

  const [isSidebar, setSidebar] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCheckLogin())
  }, [])

  return (
    <div className='App'>
      <div className='container'>
        <Header isSidebar={isSidebar} setSidebar={setSidebar} />
      </div>
      <SidebarLogin isSidebar={isSidebar} setSidebar={setSidebar} />
      {/* {screenLoading && <LoadingScreen />} */}
    </div>
  )
}

export default App;
