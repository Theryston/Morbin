//require the MorBin
const MorBin = require('../')

//creating the encoder of morbin
const encoder = new MorBin('pt-BR') //the code of the language in which your texts will be

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