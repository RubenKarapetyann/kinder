import DropDownItem from "./DropDownItem"

const DropDownItemList = ({ list })=>{
    return (
        <ul className="dropdown-menu text-small">
            {list.map(item=>{
                return <DropDownItem 
                    route={item.routeName} 
                    name={item.displayName}
                    hr={item.hr}
                    key={item.id}
                />
            })}
        </ul>
    )
}

export default DropDownItemList