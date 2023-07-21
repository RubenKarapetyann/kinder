import { FaBookmark, FaTh } from "react-icons/fa"

export const POSTS = "POSTS"
export const FAVORITES = "FAVORITES"

const POST_TAB = {
    activeName : POSTS,
    id : POSTS,
    icon : <FaTh/>,
    getFromState : "posts"
}

const FAVORITE_TAB = {
    activeName : FAVORITES,
    id : FAVORITES,
    icon : <FaBookmark/>,
    getFromState : "favorites"
}

export const PROFILE_TABS_ARR = [
    POST_TAB, FAVORITE_TAB
]

export const PROFILE_TABS_MAP = {
    [POSTS] : POST_TAB,
    [FAVORITES] : FAVORITE_TAB
}