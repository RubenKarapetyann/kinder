import HeaderItem from "./components/HeaderItem"
import { HEADER_ITEMS } from "../../../../constants/header-constants"
import { useSelector } from "react-redux"

const HeaderItems = ()=>{
    const notViewed = useSelector(store=>store.user.notViewed)
    return (
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {HEADER_ITEMS.map(item=>{
                return <HeaderItem
                    icon={item.displayIcon}
                    key={item.id}
                    route={item.routeName}
                    displayName={item.displayName}
                    notViewed={notViewed[item.getNotViewed]}
                />
            })}
        </ul>
    )
}

export default HeaderItems