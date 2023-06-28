import ProfileTitle from "../../usable-components/profile/ProfileTitle/ProfileTitle"


function Friends(){
    return (
        <>
            <ProfileTitle 
                userName={"Ruben"}
                func={<div class="friend-last-message-age">
                <div class="dropdown text-end">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false"> 
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                        ...
                    </a>
                    <ul class="dropdown-menu text-small">
                      <li><a class="dropdown-item" href="#">Message</a></li>
                      <li><a class="dropdown-item" href="#">Profile</a></li>
                      <li><hr class="dropdown-divider"/></li>
                      <li><a class="dropdown-item" href="#">Remove</a></li>
                    </ul>
                  </div>
            </div>}
            />
        </>
    )
}

                

export default Friends