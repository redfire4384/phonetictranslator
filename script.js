document.addEventListener("DOMContentLoaded", function() {
    const output = document.getElementById("output");
    const phoneticWord = "yourPhoneticWord";  // Replace with the word you want to translate

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
});

