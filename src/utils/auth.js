export const baseUrl = 'https://auth.nomoreparties.co';

export const register = (password, email) =>{
    return fetch(`${baseUrl}/signup`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({password, email})
    })
}

export const authorization = (password, email) =>{
    return fetch(`${baseUrl}/signin`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({password,email})
    }) 
}

export const checkToken = (token) =>{
    return fetch(`${baseUrl}/users/me`,{
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }})
        .then(res => res.json())
        .then(data => data)
}