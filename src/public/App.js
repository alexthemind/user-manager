import { BrowserRouter,Route, Routes } from "react-router-dom"
import { NextUIProvider } from '@nextui-org/react';

import { TopMenu, MainMenu } from "./pages/Navigation"
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Footer from './pages/Footer'

const App = () => {

    return (
        <BrowserRouter basename="/">
            <NextUIProvider>
                <TopMenu />
                <MainMenu />

                <Routes>
                    <Route path="/" element={<Home key={'home'} />} />
                    <Route path="/services" element={<Services key={'services'} />} />
                    <Route path="/contact" element={<Contact key={'contact'} />} />
                </Routes>

                <Footer/>
            </NextUIProvider>
        </BrowserRouter>
    )
}

export default App