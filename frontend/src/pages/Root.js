import { Outlet, useNavigate } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

export default function RootLayout() {
    // const navigation = useNavigate();



    
  return (
    <>
        <MainNavigation/>
        <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            <Outlet/>
        </main>
    </>
  )
}
