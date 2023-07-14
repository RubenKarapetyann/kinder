export const getHeaders = (token)=>{
    return {
        'Content-Type': 'application/json',
        "authorization" : "Bearer "+token
    }
}

export const SERVER_URL = "http://localhost:5000"