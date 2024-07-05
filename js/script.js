document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('word-input');
    const searchWordButton = document.getElementById('search-word-btn');
    const resultsContainer = document.getElementById('results-container');

    const fetchWordDefinition = () => {
        const word = wordInput.value.trim();
        if (word === '') return;
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => displayWordDefinition(data))
            .catch(error => {
                console.error('Error:', error);
                resultsContainer.innerHTML = '<p class="text-center">No results found or an error occurred.</p>';
            });
    };

    const displayWordDefinition = (data) => {
        resultsContainer.innerHTML = '';
        if (!data || data.title === "No Definitions Found") {
            resultsContainer.innerHTML = '<p class="text-center">No results found.</p>';
            return;
        }
        data.forEach(entry => {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.innerHTML = `
                <h4>${entry.word}</h4>
                <p><strong>Phonetic:</strong> ${entry.phonetic || 'N/A'}</p>
                <p><strong>Origin:</strong> ${entry.origin || 'N/A'}</p>
                <h5>Meanings:</h5>
                ${entry.meanings.map(meaning => `
                    <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
                    <ul>
                        ${meaning.definitions.map(def => `<li>${def.definition}</li>`).join('')}
                    </ul>
                `).join('')}
            `;
            resultsContainer.appendChild(wordCard);
        });
    };

    searchWordButton.addEventListener('click', fetchWordDefinition);
});
