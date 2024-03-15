function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);
const uploadButton = document.getElementById("upload-button");
const pdfContent = document.getElementById("pdf-content");

uploadButton.addEventListener("click", () => {
	const input = document.getElementById("pdf-file");
	const file = input.files[0];

	const reader = new FileReader();
	reader.onload = () => {
		const pdfData = new Uint8Array(reader.result);
		pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
			const pageNumber = 1;
			pdf.getPage(pageNumber).then((page) => {
				const scale = 1.5;
				const viewport = page.getViewport({ scale });
				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				pdfContent.appendChild(canvas);
				page.render({ canvasContext: context, viewport });
			});
		});
	};
	reader.readAs