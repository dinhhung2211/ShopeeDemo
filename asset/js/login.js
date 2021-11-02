const REGEX_PHONE =
  /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im

const usernameNode = document.getElementById('username')
const passwordNode = document.getElementById('password')
const btnNode = document.getElementById('btn-authen')
const confirmedPasswordNode = document.getElementById('confirmedPassword')

const isRequired = (value) =>
  value.trim() !== '' ? '' : 'Vui lòng điền vào mục này.'
const isPhone = (value) =>
  REGEX_PHONE.test(value) ? '' : 'Số điện thoại không đúng định dạng'
// Currying (HOF)
const min = (num) => (value) =>
  value.length >= num ? '' : `Độ dài tối thiểu là ${num}`
const max = (num) => (value) =>
  value.length <= num ? '' : `Độ dài tối đa là ${num}`
const isSame = (name1, name2) => (value1, value2) =>
  value1 === value2 ? '' : `${name1} không giống ${name2}`

const createMessage = (parentNode, controlNodes, message) => {
  const loginMessage = document.querySelectorAll('.login-input-message')
  if (controlNodes[0].id === 'username') {
    loginMessage[0].textContent = message
  } else if (controlNodes[0].id === 'password') {
    loginMessage[1].textContent = message
  } else {
    loginMessage[2].textContent = message
  }

  parentNode.classList.add('border-warning')

  controlNodes.forEach((item) => {
    item.classList.add('is-invalid')
  })
}

const isValid = (param) => {
  const { value, funcs, parentNode, controlNodes } = param
  for (const func of funcs) {
    const message = func(value)
    if (message) {
      createMessage(parentNode, controlNodes, message)
      return message
    }
  }
  return ''
}

const compare = (param) => {
  // destructuring
  const { value1, value2, funcs, parentNode, controlNodes } = param
  if (value1 == null || value2 == null) {
    return
  }
  for (const func of funcs) {
    const message = func(value1, value2)
    if (message) {
      createMessage(parentNode, controlNodes, message)
      return message
    }
  }
  return ''
}

const clearMessage = () => {
  document.querySelectorAll('.is-invalid').forEach((item) => {
    item.classList.remove('is-invalid')
  })
  document.querySelectorAll('.border-warning').forEach((item) => {
    item.classList.remove('border-warning')
  })
  document.querySelectorAll('.login-input-message').forEach((item) => {
    item.textContent = ''
  })
}

document.querySelector('form').addEventListener('input', (event) => {
  event.preventDefault()
  clearMessage()

  let confirmedPasswordValue, confirmedPasswordParentNode
  if (confirmedPasswordNode != null) {
    confirmedPasswordValue = confirmedPasswordNode.value
    confirmedPasswordParentNode = confirmedPasswordNode.parentNode
  } else {
    confirmedPasswordValue = null
    confirmedPasswordParentNode = null
  }

  const errorForm = [
    isValid({
      value: usernameNode.value,
      funcs: [isRequired, isPhone],
      parentNode: usernameNode.parentNode,
      controlNodes: [usernameNode],
    }),
    isValid({
      value: passwordNode.value,
      funcs: [isRequired, min(8), max(20)],
      parentNode: passwordNode.parentNode,
      controlNodes: [passwordNode],
    }),
    compare({
      value1: confirmedPasswordValue,
      value2: passwordNode.value,
      funcs: [isSame('Nhập lại mật khẩu', 'mật khẩu')],
      parentNode: confirmedPasswordParentNode,
      controlNodes: [confirmedPasswordNode],
    }),
  ]

  const isFormOk = (currentValue) =>
    currentValue == '' || currentValue == undefined
  if (errorForm.every(isFormOk)) {
    btnNode.disabled = false
  } else {
    btnNode.disabled = true
  }
})

document.querySelectorAll('.login-eyes-icon').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()

    let eyeIcon = document.querySelector('.login-eyes-icon')
    eyeIcon.removeChild(eyeIcon.lastElementChild)

    if (passwordNode.type === 'password') {
      let eyeOpenIcon = document.createElement('i')
      eyeOpenIcon.className = 'far fa-eye'
      eyeIcon.appendChild(eyeOpenIcon)

      passwordNode.type = 'text'
    } else if (passwordNode.type === 'text') {
      let eyeOpenIcon = document.createElement('i')
      eyeOpenIcon.className = 'far fa-eye-slash'
      eyeIcon.appendChild(eyeOpenIcon)

      passwordNode.type = 'password'
    }
  })
})
