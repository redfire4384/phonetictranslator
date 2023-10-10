// translateToMatrix function
function translateToMatrix(phoneticWord) {
    const alwaysUppercase = ['j', 'th', 'm', 'sh', 'v'];
    const vowels = ['ah', 'ae', 'aw', 'ee', 'ie', 'eh', 'uh', 'ih', 'ue'];
    const consonants = ['d', 'b', 't', 's', 'n', 'c', 'l', 'h', 'r', 'j'];

    let matrix = [];
    let i = 0;

    while (i < phoneticWord.length) {
        let currentPhonetic = phoneticWord[i];
        let nextPhonetic = phoneticWord[i + 1] || null;

        // Check for two-letter phonetics
        if (i < phoneticWord.length - 1 && (vowels.includes(currentPhonetic + nextPhonetic) || alwaysUppercase.includes(currentPhonetic + nextPhonetic))) {
            currentPhonetic += nextPhonetic;
            i++;
        }

        // Decide if current phonetic is uppercase
        let isUppercase = alwaysUppercase.includes(currentPhonetic);
        if (i === 0 && consonants.includes(currentPhonetic)) {
            isUppercase = true;
        }

        // Add to the matrix
        if (matrix.length === 0 || matrix[matrix.length - 1].length === 2 || isUppercase) {
            matrix.push([isUppercase ? currentPhonetic.toUpperCase() : currentPhonetic]);
        } else {
            matrix[matrix.length - 1].push(isUppercase ? currentPhonetic.toUpperCase() : currentPhonetic);
        }

        i++;
    }

    return matrix;
}

// Function to render the phonetic matrix as images
function renderPhoneticImages(phoneticWord) {
    const output = document.getElementById("output");
    const matrix = translateToMatrix(phoneticWord);

    let xOffset = 0;
    for (const column of matrix) {
        let yOffset = column.length === 1 && column[0] === column[0].toUpperCase() ? 6 : 0;  // Centering uppercase letters

        for (const phonetic of column) {
            const img = document.createElement("img");
            img.src = `${phonetic}.png`;
            img.classList.add("phonetic-img");
            img.style.left = `${xOffset}px`;
            img.style.top = `${yOffset}px`;
            output.appendChild(img);

            yOffset += phonetic === phonetic.toUpperCase() ? 12 : 12;  // Adjusting for the gap
        }

        xOffset += 12;  // Width of one image (including potential gap)
    }
}

// Event listener to execute when the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const phoneticWord = "yourPhoneticWord";  // Replace with the word you want to translate
    renderPhoneticImages(phoneticWord);
});
