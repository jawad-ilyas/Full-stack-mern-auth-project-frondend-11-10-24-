import { BrowserRouter, Routes, Route, } from "react-router-dom"
// * this file present into page / index.js 
import { About, ErrorPage, Home, Profile, SignIn, SignUp } from "./pages"
// * this file import from the component header.jsx
import { Header } from "./components"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {



  return (
    <div>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aboutus" element={<About />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<PrivateRoute />} >
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App