import HeaderAccount from "./components/HeaderAccount"
import HeaderItems from "./components/HeaderItems"
import HeaderLogo from "./components/HeaderLogo"


function Header(){
    return(
        <header classNameName="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <HeaderLogo/>
                    <HeaderItems/>
                    <HeaderAccount/>
                </div>
            </div>
        </header>
    )
}


    // <div className="dropdown text-end">
    //     <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    //     <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="mdo" width="32" height="32" className="rounded-circle">
    //     </a>
    //     <ul className="dropdown-menu text-small">
    //     <li><a className="dropdown-item" href="#">New post...</a></li>
    //     <li><a className="dropdown-item" href="#">Settings</a></li>
    //     <li><a className="dropdown-item" href="#">Profile</a></li>
    //     <li><hr className="dropdown-divider"></li>
    //     <li><a className="dropdown-item" href="#">Sign out</a></li>
    //     </ul>
    // </div>


export default Header