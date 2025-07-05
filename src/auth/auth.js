import history from 'history/browser'




export const login = () => {
    localStorage.setItem('wasl_token')
    history.push('/dashboard')
}

export const checkToken = (setToken) => {
    const token = localStorage.getItem("wasl_token")
    if(!token){
     //  return alert('You are not logged in')
    } 
    return token

    
    
}


export const logout = () => {
    localStorage.removeItem('wasl_token')
    window.location.href = window.location.origin + '/login'
}