const randomWord = require('random-word');


export default {
    generateWord: function (minChar = 0, wordCount = 1) {
        const words = [];

        // Fill up words upto @wordCount
        while (words.length < wordCount) {
            let newWord = '';

            // Generate a word until it character count is at least @minChar
            do {
                newWord = randomWord();
            } while (newWord.length < minChar)

            words.push(newWord)
        }

        return words;
    }
}