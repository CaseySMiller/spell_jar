// This function will take in the wrong word and the correct word and return the score of the fail.
const scoreTheFail = (wrongWord, correctWord) => {
  let score = 0
  for (let i = 0; i < wrongWord.length; i++) {
    if (wrongWord[i] !== correctWord[i]) {
      score++
    }
  }
  return score
}

module.exports = scoreTheFail;