const morsee = require('morsee');


class MorBin {
	static decode(morbin) {
		this.morbin = morbin
		this.morse = ''
		this.MorseCodeBin = []

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
					//console.log(arrHis[arrHis.length-1])
				}

				/* else if (arrHis[arrHis.length-1] == im-1) {
					console.log(arrHis)
				}*/
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
}

module.exports = MorBin;