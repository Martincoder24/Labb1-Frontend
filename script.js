updateTotal();

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function shopCart() {
  var x = document.getElementById("shopping-menu");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}
//Anropa denna varje gång man klickar på att lägga till en kurs eller tar bort en kurs
function updateTotal() {
  document.getElementById(
    "total"
  ).innerHTML = `Total: <div class="value-color">${getCartTotal()}kr</div>`;
}
//Placeholder
function getCartTotal() {
  return 10;
}
