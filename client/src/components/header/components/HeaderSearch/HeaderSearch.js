import { useLocation, useNavigate } from "react-router"
import { NEED_SEARCH } from "../../../../constants/header-constants"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getList } from "../../../../utils/api-helper"
import { LIST_SET, LOADING_START, LOADING_FINISH } from "../../../../constants/add-friend-slice-constants"
import { ADD_FRIEND } from "../../../../constants/routes-constants"

const HeaderSearch = ()=>{
    const location = useLocation()
    const activeSearch = NEED_SEARCH.find(item=>"/"+item===location.pathname)
    const [search,setSearch] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(location.pathname.slice(1,) === ADD_FRIEND){
            const id = setTimeout(()=>{
                dispatch(getList(navigate,location.pathname.slice(1,),"?search="+search,LIST_SET,LOADING_START,LOADING_FINISH))
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