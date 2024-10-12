import { BrowserRouter, Routes, Route, } from "react-router-dom"
// * this file present into page / index.js 
import { About, ErrorPage, Home, Profile, SignIn, SignUp } from "./pages"
// * this file import from the component header.jsx
import { Header } from "./components"
import { Provider } from "react-redux"
import { Store } from "./store/Store.js"
const App = () => {



  return (
    <div>
      <Provider store={Store}>
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
      </Provider>
    </div>
  )
}

export default App