const morsee = require('morsee');
const Algorithmia = require("algorithmia");
require('dotenv').config()
var algorithmiaKey = require('./credentials/algorithmia.json').key
const algorithm = Algorithmia.client(algorithmiaKey)
const translator = algorithm.algo('translation/GoogleTranslate/0.1.1')

class MorBin {
  constructor(type, lang) {
    this.type = type
    this.lang = lang
  }

  async encode(text) {
    var response = await translator.pipe({
        action: "translate",
        text: text,
        target_language: 'en'
      })
      var content = response.get()
    
    if (this.type == 'array') {
      return this.encodeArray(content.translation)
    } else if (this.type == 'number') {
      return this.encodeNumber(content.translation)
    } else {
      return 'the type is invalid'
    }
  }

  async decode(morbin) {
    if (this.type == 'array') {
      var response = await translator.pipe({
        action: "translate",
        text: this.decodeArray(morbin),
        target_language: this.lang
      })
      var content = response.get()
      return content.translation
    } else if (this.type == 'number') {
      var response = await translator.pipe({
        action: "translate",
        text: this.decodeNumber(morbin),
        target_language: this.lang
      })
      var content = response.get()
      return content.translation
    } else {
      console.error('the type is invalid')
    }
  }

  decodeNumber(morbin) {
    return 'All right!'
  }

  encodeNumber(text) {
    return 1000010
  }

  decodeArray(morbin) {
    this.morbin = morbin
    this.morse = ''
    this.MorseCodeBin = []
    this.text = ''

    for (let i = 0; i < this.morbin.length; i++) {
      var arrHis = []

      for (let im = 0; im <= this.morbin[i].length; im++) {
        if (this.morbin[i][im] == 1) {
          arrHis.push(im)
        } else if (im == 14) {
          var MorseCodeBinCreating = this.morbin[i]
          MorseCodeBinCreating.splice(0, 1)
          MorseCodeBinCreating.splice(arrHis[arrHis.length-1]-1, MorseCodeBinCreating.length)
          this.MorseCodeBin.push(MorseCodeBinCreating)
        }
      }
    }
    for (let i = 0; i < this.MorseCodeBin.length; i++) {
      if (this.MorseCodeBin[i].length != 0) {
        for (let j = 0; j < this.MorseCodeBin[i].length; j++) {
          if (this.MorseCodeBin[i][j] == 0) {
            this.morse += '.'
          } else {
            this.morse += '-'
          }
        }
      } else {
        this.morse += ' / '
      }
      this.morse += ' '
    }

    this.text = morsee.decode(this.morse)
    return this.text
  }

  encodeArray(text) {
    this.text = text
    this.morse = morsee.encode(this.text)
    this.arrMorse = this.morse.split(' ')
    this.morbin = []

    for (let i = 0; i < this.arrMorse.length; i++) {
      var morbin = [1]
      if (this.arrMorse[i] == '/') {
        morbin = [0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0]
      } else {
        for (let o = 0; o < this.arrMorse[i].length; o++) {
          if (this.arrMorse[i][o] == '.') {
            morbin.push(0)
          } else {
            morbin.push(1)
          }
        }
        morbin.push(1)

        var completeLegth = 15-morbin.length

        for (let o = 0; o < completeLegth; o++) {
          morbin.push(0)
        }
      }

      this.morbin.push(morbin)
    }

    return this.morbin
  }

}

module.exports = MorBin;