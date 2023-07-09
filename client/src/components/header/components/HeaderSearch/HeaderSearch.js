import { useLocation } from "react-router"
import { NEED_SEARCH } from "../../../../constants/header-constants"


const HeaderSearch = ()=>{
    const location = useLocation()
    const activeSearch = NEED_SEARCH.find(item=>"/"+item===location.pathname)

    if(!activeSearch)return null

    return(
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input 
                type="search" 
                className="form-control" 
                placeholder="Search..." 
                aria-label="Search"
            />
        </form>
    )
}

export default HeaderSearch