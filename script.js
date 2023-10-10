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
    "d": { x: 0, y: 264 },
    "s": { x: 264, y: 264 },
    "l": { x: 528, y: 264 },
    "b": { x: 792, y: 264 },
    "n": { x: 1056, y: 264 },
    "h": { x: 1320, y: 264 },
    "t": { x: 1584, y: 264 },
    "c": { x: 1848, y: 264 },
    "r": { x: 2112, y: 264 },

    // Special consonants (Always Uppercase)
    "j": { x: 0, y: 528 },
    "th": { x: 484, y: 528 },    // As in "the"
    "v": { x: 968, y: 528 },
    "sh": { x: 1452, y: 528 },
    "thi": { x: 1936, y: 528 },  // As in "thistle"
    "m": { x: 2420, y: 528 },

    // Uppercase consonants
    "D": { x: 0, y: 1056 },
    "S": { x: 484, y: 1056 },
    "L": { x: 968, y: 1056 },
    "B": { x: 1452, y: 1056 },
    "N": { x: 1936, y: 1056 },
    "H": { x: 2420, y: 1056 },
    "T": { x: 2904, y: 1056 },
    "C": { x: 3388, y: 1056 },
    "R": { x: 3872, y: 1056 }
};

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
