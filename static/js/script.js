const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const popupImage = document.getElementById("popup-image");
const popupText = document.getElementById("popup-text");

fileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    uploadFile(file);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  footer = document.querySelector("footer");

  setTimeout(() => {
    footer.style.visibility = "visible";
    footer.style.opacity = 1;
    footer.style.bottom = 0;
  }, 2000);
});

function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        popupImage.src = data.image_url;
        popupText.value = data.text;
        popup.style.display = "block";
        overlay.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function copyText() {
  coptBtn = document.getElementById("copy");
  popupText.select();
  document.execCommand("copy");
  coptBtn.innerHTML = `<i class='bx bxs-copy'></i> Copied`;

  setTimeout(() => {
    coptBtn.innerHTML = "<i class='bx bx-copy'></i> Copy";
  }, 2000);
}

function closePopup() {
  popup.style.display = "none";
  overlay.style.display = "none";
}

function startFree() {
  startFreeBtn = document.querySelector(".start-btn");
  footer.style.visibility = "hidden";
  footer.style.opacity = 0;
  footer.style.bottom = "-10px";
}
