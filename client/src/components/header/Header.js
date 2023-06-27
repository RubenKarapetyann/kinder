import HeaderAccount from "./components/HeaderAccount/HeaderAccount"
import HeaderItems from "./components/HeaderItems/HeaderItems"
import HeaderLogo from "./components/HeaderLogo/HeaderLogo"
import HeaderSearch from "./components/HeaderSearch/HeaderSearch"
import "./css/Header.css"

function Header(){
    return(
        <header classNameName="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <HeaderLogo/>
                    <HeaderItems/>
                    <HeaderSearch/>
                    <HeaderAccount/>
                </div>
            </div>
        </header>
    )
}



export default Header