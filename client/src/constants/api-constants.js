export const getHeaders = (token)=>{
    return {
        'Content-Type': 'application/json',
        "authorization" : "Bearer "+token
    }
}