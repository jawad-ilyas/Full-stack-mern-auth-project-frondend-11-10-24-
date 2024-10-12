import { BrowserRouter, Routes, Route, } from "react-router-dom"
// * this file present into page / index.js 
import { About, ErrorPage, Home, Profile, SignIn, SignUp } from "./pages"
// * this file import from the component header.jsx
import { Header } from "./components"

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
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App