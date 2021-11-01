export const isUserValid = () => {
    const username = document.querySelector("#LoginFormUserInput").value
    const password = document.querySelector("#LoginFormPasswordInput").value
    
    if(username !== 'admin'){
      const error = new Error('Incorrect username')
      throw error
    } else if(password !== 'admin'){
      const error = new Error('Incorrect password')
      throw error
    }

    return true
}