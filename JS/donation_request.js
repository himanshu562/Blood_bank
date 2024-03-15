const approveButton = document.getElementById("approve-button");
const rejectButton = document.getElementById("reject-button");
const emergencyButton=document.getElementById("emergency-button");

approveButton.addEventListener("click", () => {
	alert("Blood donation request approved!");
});

rejectButton.addEventListener("click", () => {
	alert("Blood donation request rejected.");
});
