//Skaffa en cart som man kan spara kurserna i
const cart = [];
const courses = [];

class Course {
  constructor(input) {
    this.kursNummer = input.kursNummer;
    this.kursTitel = input.kursTitel;
    this.kursBeskrivning = input.kursBeskrivning;
    this.kursLängd = input.kursLängd;
    this.kursPris = input.kursPris;
    this.kursBild = input.kursBild;
  }
}
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

function addCourseToCart(number) {
  if(!cart.includes(number)){
      cart.push(number); 
  }else{
    window.alert("Du kan inte lägga in samma kurs mer än en gång")
  }
  
}

function removeCourseFromCart() {

}

fetch("./allCourses.json")
.then(response => response.json())
.then(data=>{
  const courseContainer = document.getElementById("course-container");
  for (let i = 0; i < data.length; i++) {
    const course = new Course(data[i]);
    const div1 = document.createElement("div");
    div1.classList.add("course");
    const img = document.createElement("img");
    img.src= course.kursBild;
    const div2 = document.createElement("div");
    div2.classList.add("overlay");
    const div3 = document.createElement("div");
    div3.classList.add("image-Title");
    div3.innerText = course.kursTitel;
    const p = document.createElement("p");
    p.classList.add("image_description");
    p.innerText = course.kursBeskrivning;
    const a = document.createElement("a");
    a.classList.add("add-btn");
    a.setAttribute("onclick", `addCourseToCart(${course.kursNummer})`);
    a.innerText = "Köp";
    div1.appendChild(img);
    div1.appendChild(div2);
    div2.appendChild(div3);
    div2.appendChild(p);
    div2.appendChild(a);
    courseContainer.appendChild(div1);
    courses.push(course);
  }

})