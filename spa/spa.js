// Fetch JSON data and display it on the page
async function fetchAndDisplayDirectories() {
    try {
        const response = await fetch('dir.json');
        const data = await response.json();
        displayDirectories(data, document.getElementById('directory-list'));
    } catch (error) {
        console.error('Error fetching the JSON data:', error);
    }
}

function displayDirectories(data, container) {
    function createFolder(name, obj) { 
        const folderDiv = document.createElement('div');
        folderDiv.classList.add('folder');
        folderDiv.textContent = name;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('hidden');

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object') {
                contentDiv.appendChild(createFolder(key, value));
            } else {
                const fileLink = document.createElement('a');
                fileLink.href = value;
                fileLink.textContent = key;
                fileLink.classList.add('file');
                contentDiv.appendChild(fileLink);
                contentDiv.appendChild(document.createElement('br'));
            }
        }

        folderDiv.addEventListener('click', () => {
            contentDiv.classList.toggle('hidden');
        });

        const wrapperDiv = document.createElement('div');
        wrapperDiv.appendChild(folderDiv);
        wrapperDiv.appendChild(contentDiv);

        return wrapperDiv;
    };

    for (const [key, value] of Object.entries(data)) {
        container.appendChild(createFolder(key, value));
    }
}

// Call the function to fetch and display directories
fetchAndDisplayDirectories();
