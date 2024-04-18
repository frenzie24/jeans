document
  .getElementById("openModalBtn")
  .addEventListener("click", function () {
    document.getElementById("modal").classList.remove("hidden");
  });

document
  .getElementById("closeModalBtn")
  .addEventListener("click", function () {
    document.getElementById("modal").classList.add("hidden");
  });

document
  .getElementById("creatorsOpenModalBtn")
  .addEventListener("click", function () {
    document.getElementById("creatorsModal").classList.remove("hidden");
  });

document
  .getElementById("creatorsCloseModalBtn")
  .addEventListener("click", function () {
    document.getElementById("creatorsModal").classList.add("hidden");
  });