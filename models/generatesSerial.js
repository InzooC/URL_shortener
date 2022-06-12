// 製作新序號的function
function generateSerial() {
  const number = '0123456789'
  const lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseAlphabet = lowerCaseAlphabet.toUpperCase()
  const element = number.concat(lowerCaseAlphabet).concat(upperCaseAlphabet).split('')
  let serial = ''
  for (let i = 0; i < 5; i++) {
    serial += element[Math.floor(Math.random() * 62)]
  }
  return serial
}

module.exports = generateSerial