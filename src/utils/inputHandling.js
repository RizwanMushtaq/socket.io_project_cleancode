export const isInputEmpty = () => {
    const username = document.querySelector("#LoginFormUserInput").value
    const password = document.querySelector("#LoginFormPasswordInput").value

    if(username.trim() === ""){
      const userInput =  document.querySelector("#LoginFormUserInput").parentElement
      userInput.style.border = '2px solid red'
      const passwordInput = document.querySelector("#LoginFormPasswordInput").parentElement
      passwordInput.style.border = '1px solid black'
      const error = new Error('Input field is empty')
      throw error
    }else if(password.trim() === ""){
      const userInput =  document.querySelector("#LoginFormUserInput").parentElement
      userInput.style.border = '1px solid black'
      const passwordInput = document.querySelector("#LoginFormPasswordInput").parentElement
      passwordInput.style.border = '2px solid red'
      const error = new Error('Input field is empty')
      throw error
    } else {
      document.querySelector("#LoginFormUserInput").parentElement.style.border = '1px solid black'
      document.querySelector("#LoginFormPasswordInput").parentElement.style.border = '1px solid black'
    }

    return true
}