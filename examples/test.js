const MorBin = require('../')

var text = `hello world!`

var encoded = MorBin.encode(text)

console.log(`the phrase '${text}' in Morbin is:`)
console.log(encoded)

var decoded = MorBin.decode(encoded)

console.log(`and the code decoded above is:`)
console.log(decoded)