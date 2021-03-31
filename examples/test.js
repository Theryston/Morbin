//require the MorBin
const MorBin = require('../')

// a text for encode
var text = `hello world!`

//encoding the text
var encoded = MorBin.encode(text)

//logs
console.log(`the phrase '${text}' in Morbin is:`)
console.log(encoded)

//decoding the morbin generated
var decoded = MorBin.decode(encoded)

//logs
console.log(`and the code decoded above is:`)
console.log(decoded)