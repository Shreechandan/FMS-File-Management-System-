import {
	showLoginModal,
	hideLoginModal,
	handleLogin,
	replaceLoginWithLogout,
	handleLogout,
} from "./auth.js";
import { loadRootFolders, loadFolderContents } from "./folder.js";
import {
	showAddFolderModal,
	hideAddFolderModal,
	handleAddFolder,
	handleDeleteFolder,
	showAddRootFolderModal,
	hideAddRootFolderModal,
	handleAddRootFolder,
} from "./folder.js";
import { showAddFileModal, hideAddFileModal, handleAddFile } from "./file.js";
import { searchText } from "./search.js";

document.addEventListener("DOMContentLoaded", async () => {
	document
		.getElementById("loginButton")
		.addEventListener("click", showLoginModal);
	document
		.getElementById("closeModal")
		.addEventListener("click", hideLoginModal);
	document
		.getElementById("loginModalContent")
		.addEventListener("submit", handleLogin);
	document.getElementById("searchBox").addEventListener("input", searchText);

	let authToken = localStorage.getItem("authToken");
	let currentUsername = localStorage.getItem("currentUsername");

	await loadRootFolders();

	if (authToken && currentUsername) {
		replaceLoginWithLogout();
		await loadRootFolders();
		document.getElementById("addFolderButton").style.display =
			"inline-block";
		document.getElementById("addRootFolderButton").style.display =
			"inline-block";
		document.getElementById("addFileButton").style.display = "inline-block";
	} else {
		document.getElementById("addFolderButton").style.display = "none";
		document.getElementById("addRootFolderButton").style.display = "none";
		document.getElementById("addFileButton").style.display = "none";
	}

	document
		.getElementById("addFolderButton")
		.addEventListener("click", showAddFolderModal);
	document
		.getElementById("addRootFolderButton")
		.addEventListener("click", showAddRootFolderModal);
	document
		.getElementById("addFileButton")
		.addEventListener("click", showAddFileModal);

	document
		.getElementById("closeAddFolderModal")
		.addEventListener("click", hideAddFolderModal);
	document
		.getElementById("closeAddRootFolderModal")
		.addEventListener("click", hideAddRootFolderModal);
	document
		.getElementById("closeAddFileModal")
		.addEventListener("click", hideAddFileModal);

	document
		.getElementById("addFolderModalContent")
		.addEventListener("submit", handleAddFolder);
	document
		.getElementById("addRootFolderModalContent")
		.addEventListener("submit", handleAddRootFolder);
	document
		.getElementById("addFileModalContent")
		.addEventListener("submit", handleAddFile);
});
