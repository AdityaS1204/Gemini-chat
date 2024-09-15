//theme
document.querySelectorAll(".theme-btn")[0].addEventListener('click',()=>{
    let bodyT =  document.querySelector('body');
    bodyT.style.color = "black";
    bodyT.style.backgroundColor = "#D1E9F6";
    
})
document.querySelectorAll(".theme-btn")[1].addEventListener('click',()=>{
    let bodyT =  document.querySelector('body');
    bodyT.style.color = "white";
    bodyT.style.backgroundColor = "#03002e";
    
})

//textarea
document.addEventListener("input",()=>{
    const textarea = document.getElementById('P-bar');
    function resizeTextArea(){
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    textarea.addEventListener('input',resizeTextArea);
    resizeTextArea();
})
                    

//sending prompt
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










//1. display the response in proper format
//2. change font style
// 3. 
