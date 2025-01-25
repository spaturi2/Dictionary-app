// Add event listener to search button when clicked, to trigger speakWord function
document.getElementById("searchBtn").addEventListener("click", speakWord);

// Function to fetch definition and speak word
function speakWord() {
    // Get word from input field
    const word = document.getElementById("searchInput").value.trim();
    // Check if word is not empty
    if (word !== '') {
        // Fetch definition for the word
        fetchDefinition(word);
    }
}

// Function to fetch definition from API
function fetchDefinition(word) {
    // Fetch definition from API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    // Parse response as JSON
    .then(response => response.json())
    // Process data
    .then(data => {
        // Check if no definitions found
        if (data.title === "No Definitions Found") {
            // Display message for no definitions found
            document.getElementById("definition").innerHTML = "No definitions found for this word.";
        } else {
            // Extract definition from data
            const definition = data[0].meanings[0].definitions[0].definition;
            // Display word and definition
            document.getElementById("definition").innerHTML = `<strong>${word}</strong>: ${definition}`;
            // Speak the word
            speak(word);
        }
    })
    // Catch and handle errors
    .catch(error => {
        // Log error to console
        console.error("Error fetching definition:", error);
        // Display error message
        document.getElementById("definition").innerHTML = "An error occurred while fetching the definition.";
    });
}

// Function to speak text using SpeechSynthesisUtterance
function speak(text) {
    // Create new utterance with the provided text
    const utterance = new SpeechSynthesisUtterance(text);
    // Set language to US English
    utterance.lang = 'en-US';
    // Speak the utterance
    speechSynthesis.speak(utterance);
}
