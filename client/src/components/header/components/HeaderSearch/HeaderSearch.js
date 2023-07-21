import { useLocation, useNavigate } from "react-router"
import { NEED_SEARCH, NEED_SEARCH_MAP } from "../../../../constants/header-constants"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const HeaderSearch = ()=>{
    const location = useLocation()
    const activeSearch = NEED_SEARCH.find(item=>"/"+item===location.pathname)
    const [search,setSearch] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(activeSearch){
            const currentSlice = NEED_SEARCH_MAP[activeSearch]
            const id = setTimeout(()=>{
                dispatch(currentSlice.listGeter(navigate,"?search="+search))
            },1000)
            return ()=>{
                clearTimeout(id)
            }
        }
    },[search])


    if(!activeSearch)return null

    const searchHandle = e =>setSearch(e.target.value)


    return(
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input 
                type="search" 
                className="form-control" 
                placeholder="Search..." 
                aria-label="Search"
                value={search}
                onChange={searchHandle}
            />
        </form>
    )
}

export default HeaderSearch