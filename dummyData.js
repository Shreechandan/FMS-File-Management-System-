// dummyData.js

const dummyFolders = [
	{ FolderID: "1", Name: "Railway Board", ParentfolderID: null },
	{ FolderID: "2", Name: "Policy", ParentfolderID: "1" },
	{ FolderID: "3", Name: "2024", ParentfolderID: "2" },
	{ FolderID: "4", Name: "SUBJECT 1", ParentfolderID: "3" },
	{ FolderID: "5", Name: "SUBJECT 2", ParentfolderID: "3" },
	{ FolderID: "6", Name: "2023", ParentfolderID: "2" },
	{ FolderID: "7", Name: "SUBJECT 1", ParentfolderID: "6" },
	{ FolderID: "8", Name: "Recruitment", ParentfolderID: "1" },
	{ FolderID: "9", Name: "2024", ParentfolderID: "8" },
	{ FolderID: "10", Name: "POST 1", ParentfolderID: "9" },

	{ FolderID: "11", Name: "Accounts", ParentfolderID: null },
	{ FolderID: "12", Name: "Policy", ParentfolderID: "11" },
	{ FolderID: "13", Name: "2024", ParentfolderID: "12" },
	{ FolderID: "14", Name: "SUBJECT 1", ParentfolderID: "13" },
	{ FolderID: "15", Name: "SUBJECT 2", ParentfolderID: "13" },
	{ FolderID: "16", Name: "2023", ParentfolderID: "12" },
	{ FolderID: "17", Name: "SUBJECT 1", ParentfolderID: "16" },
	{ FolderID: "18", Name: "Private", ParentfolderID: "11" },
	{ FolderID: "19", Name: "2024", ParentfolderID: "18" },
	{ FolderID: "20", Name: "POST 1", ParentfolderID: "19" },
	{ FolderID: "21", Name: "POST 2", ParentfolderID: "19" },

	{ FolderID: "22", Name: "Personnel", ParentfolderID: null },
	{ FolderID: "23", Name: "Policy", ParentfolderID: "22" },
	{ FolderID: "24", Name: "2024", ParentfolderID: "23" },
	{ FolderID: "25", Name: "SUBJECT 1", ParentfolderID: "24" },
	{ FolderID: "26", Name: "2023", ParentfolderID: "23" },
	{ FolderID: "27", Name: "SUBJECT 1", ParentfolderID: "26" },
	{ FolderID: "28", Name: "SUBJECT 2", ParentfolderID: "26" },
	{ FolderID: "29", Name: "Recruitment", ParentfolderID: "22" },
	{ FolderID: "30", Name: "2024", ParentfolderID: "29" },
	{ FolderID: "31", Name: "POST 1", ParentfolderID: "30" },

	{ FolderID: "32", Name: "S&T", ParentfolderID: null },
	{ FolderID: "33", Name: "Policy", ParentfolderID: "32" },
	{ FolderID: "34", Name: "2024", ParentfolderID: "33" },
	{ FolderID: "35", Name: "SUBJECT 1", ParentfolderID: "34" },
	{ FolderID: "36", Name: "Reports", ParentfolderID: "32" },
	{ FolderID: "37", Name: "2024", ParentfolderID: "36" },
	{ FolderID: "38", Name: "Report 1", ParentfolderID: "37" },

	{ FolderID: "39", Name: "RPF", ParentfolderID: null },
	{ FolderID: "41", Name: "2024", ParentfolderID: "40" },
	{ FolderID: "42", Name: "SUBJECT 1", ParentfolderID: "41" },
	{ FolderID: "43", Name: "2023", ParentfolderID: "40" },
	{ FolderID: "44", Name: "SUBJECT 1", ParentfolderID: "43" },
	{ FolderID: "45", Name: "Training", ParentfolderID: "39" },
	{ FolderID: "46", Name: "2024", ParentfolderID: "45" },
	{ FolderID: "47", Name: "Course 1", ParentfolderID: "46" },

	{ FolderID: "48", Name: "COMMERCIAL", ParentfolderID: null },
	{ FolderID: "50", Name: "2024", ParentfolderID: "49" },
	{ FolderID: "51", Name: "SUBJECT 1", ParentfolderID: "50" },
	{ FolderID: "52", Name: "Sales", ParentfolderID: "48" },
	{ FolderID: "53", Name: "2024", ParentfolderID: "52" },
	{ FolderID: "54", Name: "Sale 1", ParentfolderID: "53" },

	{ FolderID: "55", Name: "OPERATING", ParentfolderID: null },
	{ FolderID: "57", Name: "2024", ParentfolderID: "56" },
	{ FolderID: "58", Name: "SUBJECT 1", ParentfolderID: "57" },
	{ FolderID: "59", Name: "2023", ParentfolderID: "56" },
	{ FolderID: "60", Name: "SUBJECT 1", ParentfolderID: "59" },
	{ FolderID: "61", Name: "Procedures", ParentfolderID: "55" },
	{ FolderID: "62", Name: "2024", ParentfolderID: "61" },
	{ FolderID: "63", Name: "Procedure 1", ParentfolderID: "62" },

	{ FolderID: "64", Name: "MECHANICAL", ParentfolderID: null },
	{ FolderID: "66", Name: "2024", ParentfolderID: "65" },
	{ FolderID: "67", Name: "SUBJECT 1", ParentfolderID: "66" },
	{ FolderID: "68", Name: "Maintenance", ParentfolderID: "64" },
	{ FolderID: "69", Name: "2024", ParentfolderID: "68" },
	{ FolderID: "70", Name: "Task 1", ParentfolderID: "69" },
	{ FolderID: "71", Name: "Task 2", ParentfolderID: "69" },
];

const dummyFiles = [
	{ _id: "1", Name: "Doc 1", folder_id: "4", url: "http://example.com/railwayboard/policy/2024/subject1/doc1" },
	{ _id: "2", Name: "Doc 2", folder_id: "4", url: "http://example.com/railwayboard/policy/2024/subject1/doc2" },
	{ _id: "3", Name: "Doc 1", folder_id: "5", url: "http://example.com/railwayboard/policy/2024/subject2/doc1" },
	{ _id: "4", Name: "Doc 1", folder_id: "7", url: "http://example.com/railwayboard/policy/2023/subject1/doc1" },
	{ _id: "5", Name: "Doc 1", folder_id: "10", url: "http://example.com/railwayboard/recruitment/2024/post1/doc1" },
	{ _id: "6", Name: "Doc 1", folder_id: "14", url: "http://example.com/accounts/policy/2024/subject1/doc1" },
	{ _id: "7", Name: "Doc 2", folder_id: "14", url: "http://example.com/accounts/policy/2024/subject1/doc2" },
	{ _id: "8", Name: "Doc 1", folder_id: "15", url: "http://example.com/accounts/policy/2024/subject2/doc1" },
	{ _id: "9", Name: "Doc 1", folder_id: "17", url: "http://example.com/accounts/policy/2023/subject1/doc1" },
	{ _id: "10", Name: "Doc 1", folder_id: "20", url: "http://example.com/accounts/recruitment/2024/post1/doc1" },
	{ _id: "11", Name: "Doc 2", folder_id: "21", url: "http://example.com/accounts/recruitment/2024/post2/doc1" },
	{ _id: "12", Name: "Doc 1", folder_id: "25", url: "http://example.com/personnel/policy/2024/subject1/doc1" },
	{ _id: "13", Name: "Doc 1", folder_id: "27", url: "http://example.com/personnel/policy/2023/subject1/doc1" },
	{ _id: "14", Name: "Doc 2", folder_id: "28", url: "http://example.com/personnel/policy/2023/subject2/doc1" },
	{ _id: "15", Name: "Doc 1", folder_id: "31", url: "http://example.com/personnel/recruitment/2024/post1/doc1" },
	{ _id: "16", Name: "Doc 1", folder_id: "35", url: "http://example.com/sandt/policy/2024/subject1/doc1" },
	{ _id: "17", Name: "Doc 1", folder_id: "38", url: "http://example.com/sandt/reports/2024/report1/doc1" },
	{ _id: "18", Name: "Doc 1", folder_id: "42", url: "http://example.com/rpf/policy/2024/subject1/doc1" },
	{ _id: "19", Name: "Doc 2", folder_id: "42", url: "http://example.com/rpf/policy/2024/subject2/doc1" },
	{ _id: "20", Name: "Doc 1", folder_id: "44", url: "http://example.com/rpf/policy/2023/subject1/doc1" },
	{ _id: "21", Name: "Doc 1", folder_id: "47", url: "http://example.com/rpf/training/2024/course1/doc1" },
	{ _id: "22", Name: "Doc 1", folder_id: "51", url: "http://example.com/commercial/policy/2024/subject1/doc1" },
	{ _id: "23", Name: "Doc 1", folder_id: "54", url: "http://example.com/commercial/sales/2024/sale1/doc1" },
	{ _id: "24", Name: "Doc 1", folder_id: "58", url: "http://example.com/operating/policy/2024/subject1/doc1" },
	{ _id: "25", Name: "Doc 1", folder_id: "60", url: "http://example.com/operating/policy/2023/subject1/doc1" },
	{ _id: "26", Name: "Doc 1", folder_id: "63", url: "http://example.com/operating/procedures/2024/procedure1/doc1" },
	{ _id: "27", Name: "Doc 1", folder_id: "67", url: "http://example.com/mechanical/policy/2024/subject1/doc1" },
	{ _id: "28", Name: "Doc 1", folder_id: "70", url: "http://example.com/mechanical/maintenance/2024/task1/doc1" },
	{ _id: "29", Name: "Doc 2", folder_id: "71", url: "http://example.com/mechanical/maintenance/2024/task2/doc1" }
];


async function mockFetch(url)
{
	if (url === '/folders')
	{
		return {
			json: async () => dummyFolders.filter(folder => !folder.ParentfolderID)
		};
	}

	const folderMatch = url.match(/\/folders\/(.+)/);
	if (folderMatch)
	{
		const folderId = folderMatch[1];
		return {
			json: async () => [
				...dummyFolders.filter(folder => folder.ParentfolderID === folderId),
				...dummyFiles.filter(file => file.folder_id === folderId)
			]
		};
	}

	throw new Error('Unknown endpoint');
}
