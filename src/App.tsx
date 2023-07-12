import './App.css'
import SignUp from './components/pages/Sign/SignUp'
import SignIn from './components/pages/Sign/SignIn'
import { UserProvider } from './components/auth/UserContext'
import Home from './components/pages/Home'
function App() {

  return (
    <>
    <UserProvider>
      {/* <SignIn /> */}
      <SignUp  />
      <Home />
    </UserProvider>
    </>
  )
}

export default App
