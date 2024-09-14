
document.getElementById('sendButton').addEventListener('click', async () => {
    const prompt = document.getElementById('P-bar').value;

    try {
        const response = await fetch('/get-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        if (data.answer) {
            document.querySelector('.output').innerHTML = `<p>${data.answer}</p>`;
        } else {
            document.querySelector('.output').innerHTML = '<p>No response available.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.output').innerHTML = '<p>Error fetching response.</p>';
    }
});
