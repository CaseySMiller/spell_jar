const router = require('express').Router();
const { Word } = require('../../models');
const generate = require('../../lib/helpers/generate');
const scoreTheFail = require('../../lib/helpers/score');

// GET all words -- /api/words
router.get('/', (req, res) => {
  Word.findAll()
    .then(dbWordData => res.json(dbWordData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Total score of all fails -- /api/words/failScore
router.get('/score', async (req, res) => {
  try {
    const words = await Word.findAll()
    failScore = words.reduce((acc, word) => acc + word.fail_score, 0)
    res.json(failScore);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// GET a single word -- /api/words/:id
router.get('/:id', (req, res) => {
  Word.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbWordData => {
      if (!dbWordData) {
        res.status(404).json({ message: 'No word found with this id' });
        return;
      }
      res.json(dbWordData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Add a word -- /api/words
router.post('/', async (req, res) => {
  try {
    const wrongWord = req.body.word;
    const correctWord = await generate(wrongWord);
    const failScore = scoreTheFail(wrongWord, correctWord);
    console.log(correctWord);
  
    const word = await Word.create({
      wrong_word: wrongWord,
      correct_word: correctWord,
      fail_score: failScore
    });
  
    res.json(word);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// DELETE a word -- /api/words/:id
router.delete('/:id', (req, res) => {
  Word.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbWordData => {
      if (!dbWordData) {
        res.status(404).json({ message: 'No word found with this id' });
        return;
      }
      res.json(dbWordData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;