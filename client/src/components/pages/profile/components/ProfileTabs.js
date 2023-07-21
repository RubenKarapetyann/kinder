import { PROFILE_TABS_ARR } from "../../../../constants/profile-constants"
import { tabChange } from "../../../../redux/reducers/profileSlice/profileActions"
import ProfileTab from "./ProfileTab"
import { useDispatch, useSelector } from "react-redux"

const ProfileTabs = ()=>{
    const active = useSelector(store=>store.profile.activeTab)
    const dispatch = useDispatch()
    const activeHandle = (tab)=> dispatch(tabChange(tab))

    
    return (
        <div className="profile-tabs-container">
            {PROFILE_TABS_ARR.map(tabs=>{
                return <ProfileTab 
                    icon={tabs.icon}
                    activeName={tabs.activeName} 
                    active={active === tabs.activeName}
                    activeHandle={activeHandle}
                    key={tabs.id}
                />
            })}
        </div>
    )
}


export default ProfileTabs