#!/usr/bin/env node

const process = require("process");
const args = process.argv.slice(2);

async function getWordInfo(word) {
  if(word === "" || word === undefined) {
    console.log("😏 Please enter a word to search for !! ");
    return;
  }
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data[0] === undefined) {
    console.log(`\n😭 ${word} not found in the dictionary.`);
  } else {
    const meanings = data[0]["meanings"];
    
    for (const meaning of meanings) {
      const partOfSpeech = meaning["partOfSpeech"];
      const definitions = meaning["definitions"];

      console.log(`\n${partOfSpeech}:`);
      for (const definition of definitions) {
        const meaningDefinition = definition["definition"];
        // Only show example if it exists
        const meaningExample = definition["example"] || "";

        // Print the meaning and example with random emojis in bullet points
        console.log(` •${meaningDefinition} ${meaningExample}`);

        if (meaningExample !== "") {
          console.log(`  📚 Example: ${meaningExample}\n`);
        }
      }
    }
  }
}

getWordInfo(args[0]);
