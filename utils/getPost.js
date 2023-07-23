export const getPost = (user,currentUser,post)=>({            
        postDescription : post.postDescription, 
        id : post.id,
        img : post.img,
        likes : post.likes,
        liked : post.likers[user.id],
        publicDate : post.publicDate,
        auther : {
            id : currentUser.id,
            userName : currentUser.userName,
            avatarImg : currentUser.avatarImg
        },
        favorite : !!user.favorites.find(val=>val===post.id)
})