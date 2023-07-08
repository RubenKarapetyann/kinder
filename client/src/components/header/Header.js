import { memo } from "react"
import HeaderAccount from "./components/HeaderAccount/HeaderAccount"
import HeaderItems from "./components/HeaderItems/HeaderItems"
import HeaderLogo from "./components/HeaderLogo/HeaderLogo"
import HeaderSearch from "./components/HeaderSearch/HeaderSearch"
import "./css/Header.css"
import { useLocation } from "react-router"
import { NEED_SEARCH } from "../../constants/header-constants"


function Header(){
    const location = useLocation()
    const activeSearch = NEED_SEARCH.find(item=>"/"+item===location.pathname)
    return(
        <header className="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <HeaderLogo/>
                    <HeaderItems/>
                    {activeSearch && <HeaderSearch/>}
                    <HeaderAccount/>
                </div>
            </div>
        </header>
    )
}



export default memo(Header)