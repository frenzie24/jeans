document
  .getElementById("open-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("modal").classList.remove("hidden");
  });

document
  .getElementById("close-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("modal").classList.add("hidden");
  });

document
  .getElementById("creators-open-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("creatorsModal").classList.remove("hidden");
  });

document
  .getElementById("creators-close-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("creatorsModal").classList.add("hidden");
  });