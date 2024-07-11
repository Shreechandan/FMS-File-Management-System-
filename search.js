import { loadFolderContents, handleDelete, setCurrentFolderID, setCurrentFolderName } from './folder.js';
import { convertToDateFormat } from "./utils.js";

const updateDebounceText = debounce(async (text) =>
{
	await searchFoldersAndFiles(text);
});

export function searchText(e)
{
	updateDebounceText(e.target.value);
}

function debounce(cb, delay = 1000)
{
	let timeout;

	return (...args) =>
	{
		clearTimeout(timeout);
		timeout = setTimeout(() =>
		{
			cb(...args);
		}, delay);
	};
}

export async function searchFoldersAndFiles(query)
{
	try
	{
		const response = await fetch(`http://127.0.0.1:8000/folders/search/?query=${ query }`);
		const searchResults = await response.json();
		const folderTableBody = document.querySelector("#folder-table tbody");
		folderTableBody.innerHTML = '';

		if (query == "")
		{
			await loadFolderContents(0, "Root");
			return;
		}

		searchResults.data[0].folders.forEach((item) =>
		{
			const row = document.createElement("tr");
			const nameCell = document.createElement("td");
			nameCell.textContent = `${ item.Name } (${ item.Path })`;
			row.appendChild(nameCell);

			const actionsCell = document.createElement("td");
			actionsCell.className = "action-container";
			const openLink = document.createElement("button");
			openLink.textContent = "Open";
			openLink.className = "btn-small";
			openLink.onclick = () =>
			{
				loadFolderContents(item.FolderID, item.Name);
				setCurrentFolderID(item.FolderID);
				setCurrentFolderName(item.Name);
				return false;
			};
			actionsCell.appendChild(openLink);

			if (localStorage.getItem('authToken'))
			{
				const deleteButton = document.createElement("button");
				deleteButton.textContent = "Delete";
				deleteButton.className = "btn-small delete-btn";
				deleteButton.setAttribute('data-id', item.FolderID);
				deleteButton.setAttribute('data-type', 'folder');
				deleteButton.onclick = async () =>
				{
					await handleDelete(item.FolderID, 'folder');
				};
				actionsCell.appendChild(deleteButton);
			}
			row.appendChild(actionsCell);

			const dateCell = document.createElement("td");
			dateCell.textContent = convertToDateFormat(item.CreatedAt);
			row.appendChild(dateCell);
			
			folderTableBody.appendChild(row);
		});

		searchResults.data[0].files.forEach((item) =>
		{
			const row = document.createElement("tr");
			const nameCell = document.createElement("td");
			nameCell.textContent = `${ item.Name } (${ item.Path })`; // Display the full file path
			console.log("🚀 ~ searchResults.data[0].files.forEach ~ item:", item)
			row.appendChild(nameCell);

			const actionsCell = document.createElement("td");
			actionsCell.className = "action-container";
			const openLink = document.createElement("button");
			openLink.textContent = "Open";
			openLink.className = "btn-small";
			openLink.onclick = () =>
			{
				window.open(`http://127.0.0.1:8000${ item.URL }`, '_blank');
				return false;
			};
			actionsCell.appendChild(openLink);

			if (localStorage.getItem('authToken'))
			{
				const deleteButton = document.createElement("button");
				deleteButton.textContent = "Delete";
				deleteButton.className = "btn-small delete-btn";
				deleteButton.setAttribute('data-id', item.FileID);
				deleteButton.setAttribute('data-type', 'file');
				deleteButton.onclick = async () =>
				{
					await handleDelete(item.FileID, 'file');
				};
				actionsCell.appendChild(deleteButton);
			}
			row.appendChild(actionsCell);

			const dateCell = document.createElement("td");
			dateCell.textContent = convertToDateFormat(item.CreatedAt);
			row.appendChild(dateCell);

			folderTableBody.appendChild(row);
		});
	} catch (error)
	{
		alert('Error searching folders and files: ' + error.message);
	}
}
