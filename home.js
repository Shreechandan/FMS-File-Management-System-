const reviewContainer = document.querySelector(".reviews-container");

async function getReviews() {
	const res = await fetch("https://randomuser.me/api/?results=8");
	const data = await res.json();
	// console.log(data);
	for (const review of data.results) {
		let randomNumber = Math.floor(Math.random() * 5);
		console.log("🚀 ~ getReviews ~ randomNumber:", randomNumber);
		console.log(review);
		reviewContainer.innerHTML += `<div class="review-card">
						<img src="${review.picture.thumbnail}" alt="User" />
						<h3>${review.name.first} ${review.name.last}</h3>
						<div class="stars">${"★".repeat(randomNumber)}${"☆".repeat(
			5 - randomNumber
		)}</div>
						<p>“Add review”</p>
					</div>`;
	}
}

getReviews();



