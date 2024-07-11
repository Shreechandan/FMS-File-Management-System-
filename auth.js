import {
	loadRootFolders,
	loadFolderContents,
	getCurrentFolderID,
	getCurrentFolderName,
} from "./folder.js";

let authToken = localStorage.getItem("authToken");
let currentUsername = localStorage.getItem("currentUsername");

export function showLoginModal() {
	const loginModal = document.getElementById("loginModal");
	loginModal.showModal();
}

export function hideLoginModal() {
	const loginModal = document.getElementById("loginModal");
	loginModal.close();
}

export async function handleLogin(e) {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	try {
		const response = await fetch("http://localhost:8000/admin/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				username: username,
				password: password,
			}),
		});

		if (!response.ok) {
			throw new Error("Login failed");
		}

		const data = await response.json();
		authToken = data.access_token;

		// Decode JWT to get the username
		const payload = JSON.parse(atob(authToken.split(".")[1]));
		currentUsername = payload.sub;

		// Save to localStorage
		localStorage.setItem("authToken", authToken);
		localStorage.setItem("currentUsername", currentUsername);

		hideLoginModal();
		await loadRootFolders();
		replaceLoginWithLogout();

		document.getElementById("addFolderButton").style.display =
			"inline-block";
		document.getElementById("addRootFolderButton").style.display =
			"inline-block";
		document.getElementById("addFileButton").style.display = "inline-block";
	} catch (error) {
		alert("Login failed: " + error.message);
	}
}

export function replaceLoginWithLogout() {
	const loginButton = document.getElementById("loginButton");
	loginButton.textContent = "Log Out";
	loginButton.removeEventListener("click", showLoginModal);
	loginButton.addEventListener("click", handleLogout);
}

export function handleLogout() {
	authToken = null;
	currentUsername = null;
	localStorage.removeItem("authToken");
	localStorage.removeItem("currentUsername");
	const loginButton = document.getElementById("loginButton");
	loginButton.textContent = "Log In";
	loginButton.removeEventListener("click", handleLogout);
	loginButton.addEventListener("click", showLoginModal);
	document.getElementById("addFolderButton").style.display = "none";
	document.getElementById("addRootFolderButton").style.display = "none";
	document.getElementById("addFileButton").style.display = "none";
	loadFolderContents(getCurrentFolderID(), getCurrentFolderName()); // Refresh folder contents
}
