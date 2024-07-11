// ui.js
import
{
	loadFolderContents,
	getCurrentFolderID,
	setCurrentFolderID,
	getCurrentFolderName,
	setCurrentFolderName,
	getCurrentFolderHistory,
	setCurrentFolderHistory,
} from "./folder.js";

export function updateBreadcrumb()
{
	const breadcrumbNav = document.querySelector("#breadcrumb .nav-wrapper");
	breadcrumbNav.innerHTML = ""; // Clear existing breadcrumbs

	// Add root breadcrumb
	// const rootBreadcrumb = document.createElement("p");
	// // rootBreadcrumb.href = "#!";
	// rootBreadcrumb.textContent = "Root";
	// rootBreadcrumb.className = "breadcrumb";
	// rootBreadcrumb.onclick = () =>
	// {
	// 	loadFolderContents("0", "Root");
	// 	currentFolderID = "0";
	// 	currentFolderName = "Root";
	// 	folderHistory = [];
	// 	return false;
	// };
	// breadcrumbNav.appendChild(rootBreadcrumb);

	// Add breadcrumbs for each folder in history
	getCurrentFolderHistory().forEach((folder, index) =>
	{
		const breadcrumbLink = document.createElement("p");
		// breadcrumbLink.href = "#!";
		breadcrumbLink.textContent = folder.name;
		breadcrumbLink.className = "breadcrumb";
		breadcrumbLink.onclick = () =>
		{
			loadFolderContents(folder.id, folder.name);
			setCurrentFolderID(folder.id);
			setCurrentFolderName(folder.name);
			setCurrentFolderHistory(getCurrentFolderHistory().slice(0, index)); // Remove folders after this one
			updateBreadcrumb();
			return false;
		};
		breadcrumbNav.appendChild(breadcrumbLink);
	});

	// Add current folder to breadcrumb
	if (getCurrentFolderID() !== "0")
	{
		const currentBreadcrumb = document.createElement("p");
		// currentBreadcrumb.href = "#!";
		currentBreadcrumb.textContent = getCurrentFolderName();
		currentBreadcrumb.className = "breadcrumb";
		breadcrumbNav.appendChild(currentBreadcrumb);
	}
}
