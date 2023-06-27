import AnyText from "../../usable-components/more/AnyText"
import ProfileTitle from "../../usable-components/profile/ProfileTitle/ProfileTitle"
import PostImage from "./components/PostImage/PostImage"
import PostTools from "./components/PostTools/PostTools"
import "./css/Home.css"

function Home(){
    return(
        <div class="post">
            <div class="post-top-part">
                <ProfileTitle userName={"Ruben"} />
                {/* <div class="post-manu">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div> */}
            </div>
            <PostImage/>
            <PostTools/>
            <AnyText 
                divClass={"post-likes-comments"} 
                pClass={"post-likes"}
                text={"1,238 likes"}
            />
            <AnyText 
                divClass={"post-description"} 
                pClass={"post-description-text"}
                text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quia impedit dolore sunt facilis temporibus tempore numquam laudantium. Unde, tempore."}
            />
        </div>
    )
}


export default Home