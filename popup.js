// popup.js

document.getElementById('analyzeButton').addEventListener('click', () => {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send a message to the content script to analyze links
        chrome.tabs.sendMessage(tabs[0].id, { action: 'analyzeLinks' }, (response) => {
            const linksList = document.getElementById('linksList');
            linksList.innerHTML = ''; // Clear previous results

            if (response && response.links) {
                response.links.forEach(link => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${link.href}" target="_blank">${link.text}</a>`;
                    linksList.appendChild(listItem);
                });
            } else {
                linksList.innerHTML = '<li>No links found.</li>';
            }
        });
    });
});
