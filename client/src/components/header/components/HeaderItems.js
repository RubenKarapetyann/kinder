import HeaderItem from "./HeaderItem"
import { HEADER_ITEMS } from "../../../constants/header-constants"

const HeaderItems = ()=>{
    return (
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {HEADER_ITEMS.map(item=>{
                return <HeaderItem
                    icon={item.displayIcon}
                    key={item.id}
                    route={item.routeName}
                    name={item.displayName}
                />
            })}
        </ul>
    )
}

export default HeaderItems