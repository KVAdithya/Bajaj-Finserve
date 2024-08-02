document.getElementById('submitButton').addEventListener('click', async () => {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const resultElement = document.getElementById('result');
    const filterSelect = document.getElementById('filterSelect');
    const selectedFilters = Array.from(filterSelect.selectedOptions).map(option => option.value);

    try {
        // Validate JSON input
        const parsedJson = JSON.parse(jsonInput);
        errorElement.textContent = '';

        // Make API call
        const response = await fetch('http://127.0.0.1:8000/bfhl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: parsedJson.data })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();

        // Display result based on selected filters
        let resultHtml = '';
        if (selectedFilters.includes('numbers')) {
            resultHtml += `<strong class="text-teal-600">Numbers:</strong> ${data.numbers.join(', ')}<br>`;
        }
        if (selectedFilters.includes('alphabets')) {
            resultHtml += `<strong class="text-teal-600">Alphabets:</strong> ${data.alphabets.join(', ')}<br>`;
        }
        if (selectedFilters.includes('highest_alphabet')) {
            resultHtml += `<strong class="text-teal-600">Highest Alphabet:</strong> ${data.highest_alphabet.join(', ')}<br>`;
        }

        resultElement.innerHTML = resultHtml || '<em class="text-gray-600">No filters selected or empty result.</em>';
    } catch (error) {
        errorElement.textContent = 'Invalid JSON format or error occurred.';
        resultElement.innerHTML = '';
    }
});
