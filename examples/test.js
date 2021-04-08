//require the MorBin
const MorBin = require('../')
const encoder = new MorBin('array', 'pt-BR')

// a text for encode
var text = `você é muito legal!`

//encoding the text
encoder.encode(text).then(encoded => {
  
  //logs
  console.log(`the phrase '${text}' in Morbin is:`)
  console.log(encoded)

  //decoding the morbin generated
  encoder.decode(encoded).then(decoded => {

    //logs
    console.log(`and the code decoded above is:`)
    console.log(decoded)
  })
})