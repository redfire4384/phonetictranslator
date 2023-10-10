const SYMBOLS = {
    // Vowels
    "ah": { x: 0, y: 0 },
    "ee": { x: 264, y: 0 },
    "uh": { x: 528, y: 0 },
    "ae": { x: 792, y: 0 },
    "ie": { x: 1056, y: 0 },
    "ih": { x: 1320, y: 0 },
    "aw": { x: 1584, y: 0 },
    "eh": { x: 1848, y: 0 },
    "ue": { x: 2112, y: 0 },

    // Lowercase consonants
    "d": { x: 0, y: 286 },
    "s": { x: 264, y: 286 },
    "l": { x: 528, y: 286 },
    "b": { x: 792, y: 286 },
    "n": { x: 1056, y: 286 },
    "h": { x: 1320, y: 286 },
    "t": { x: 1584, y: 286 },
    "c": { x: 1848, y: 286 },
    "r": { x: 2112, y: 286 },

    // Special consonants (Always Uppercase)
    "j": { x: 0, y: 550 },
    "th": { x: 264, y: 550 },    // As in "the"
    "v": { x: 528, y: 550 },
    "sh": { x: 792, y: 550 },
    "thi": { x: 1056, y: 550 },  // As in "thistle"
    "m": { x: 1320, y: 550 },

    // Uppercase consonants
    "D": { x: 0, y: 1078 },
    "S": { x: 264, y: 1078 },
    "L": { x: 528, y: 1078 },
    "B": { x: 792, y: 1078 },
    "N": { x: 1056, y: 1078 },
    "H": { x: 1320, y: 1078 },
    "T": { x: 1584, y: 1078 },
    "C": { x: 1848, y: 1078 },
    "R": { x: 2112, y: 1078 }
};

function parsePhoneticWord(word) {
    const phonetics = ["ah", "ee", "uh", "ae", "ie", "ih", "aw", "eh", "ue", 
                       "d", "s", "l", "b", "n", "h", "t", "c", "r", 
                       "j", "th", "v", "sh", "thi", "m",
                       "D", "S", "L", "B", "N", "H", "T", "C", "R"];

    let chunks = [];

    // Process initial consonant or vowel
    for (let phonetic of phonetics) {
        if (word.startsWith(phonetic)) {
            // Handle capitalization for initial consonants
            if (phonetic.length === 1 && !"aeiou".includes(phonetic)) {
                chunks.push(phonetic.toUpperCase());
            } else {
                chunks.push(phonetic);
            }
            word = word.substring(phonetic.length);
            break;
        }
    }

    // Iterate through the word and identify phonetic chunks
    while (word.length > 0) {
        let found = false;
        for (let phonetic of phonetics) {
            if (word.startsWith(phonetic)) {
                chunks.push(phonetic);
                word = word.substring(phonetic.length);
                found = true;
                break;
            }
        }

        // If no phonetic chunk matches, skip a character (you can handle this differently if needed)
        if (!found) {
            word = word.substring(1);
        }
    }

    return chunks;
}


function getSymbolCoordinates(chunk) {
    return SYMBOLS[chunk] || { x: 0, y: 0 }; // If not found, return default coordinates
}

function translate() {
    const inputWord = document.getElementById('inputWord').value;
    const chunks = parsePhoneticWord(inputWord);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';  // Clear previous output

    chunks.forEach(chunk => {
        const coords = getSymbolCoordinates(chunk);
        
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol');
        if (chunk === chunk.toUpperCase() && SYMBOLS[chunk]) {  // Uppercase letter check
            symbolDiv.classList.add('uppercase');
        }

        symbolDiv.style.backgroundPosition = `-${coords.x}px -${coords.y}px`;
        outputDiv.appendChild(symbolDiv);
    });
}

// Event listener to ensure the function gets called when the button is clicked
document.getElementById("translateButton").addEventListener("click", translate);
