//Skaffa en cart som man kan spara kurserna i
const cart = [];
const courses = [];
let total = 0;
let cartCounter = 0;

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

fetch("./allCourses.json")
  .then((response) => response.json())
  .then((data) => {
    const courseContainer = document.getElementById("course-container");
    for (let i = 0; i < data.length; i++) {
      const course = new Course(data[i]);
      const div1 = document.createElement("div");
      div1.classList.add("course");
      const img = document.createElement("img");
      img.src = course.kursBild;
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
  ).innerHTML = `Total: <div class="value-color">${total}kr</div>`;
}

function addToCartTotal(number) {
  let currentCourse = courses.find((obj) => obj.kursNummer === number);
  return currentCourse.kursPris;
}

function addCourseToCart(number) {
  if (!cart.includes(number)) {
    cart.push(number);
    emptyCart(); 
    //Här måste jag lägga till <li> i min kundvagn
    const cartList = document.getElementById("shopping-cart-list");
    let currentCourse = courses.find((obj) => obj.kursNummer === number);
    const li = document.createElement("li");
    li.setAttribute("id", `${number}`)
    const img = document.createElement("img");
    img.src = currentCourse.kursBild;
    const div = document.createElement("div");
    const p1 = document.createElement("p");
    p1.innerText = currentCourse.kursTitel;
    const p2 = document.createElement("p");
    p2.innerText = `${currentCourse.kursPris} kr`;
    const a = document.createElement("a");
    a.setAttribute("onclick", `removeCourseFromCart(${number})`);
    const i = document.createElement("i");
    i.classList.add("fa");
    i.classList.add("fa-trash");
    li.appendChild(img);
    li.appendChild(div);
    div.appendChild(p1);
    div.appendChild(p2);
    li.appendChild(a);
    a.appendChild(i);
    cartList.appendChild(li);
    //Lägger till priset
    total += addToCartTotal(number);
    updateTotal();
    cartCounter++;
    updateCounter();
  } else {
    window.alert("Du kan inte lägga in samma kurs mer än en gång");
  }
}

function removeCourseFromCart(number) {
  const cartList = document.getElementById("shopping-cart-list");
  let li = document.getElementById(`${number}`)
  cartList.removeChild(li);
  total -= addToCartTotal(number);
  updateTotal();
  cartCounter--;
  updateCounter();
  for (let i = 0; i < cart.length; i++) {
    if(cart[i] === number){
      cart.splice(i, 1);
      emptyCart(); 
      return
    }
  }
  
}

function updateCounter(){  
  const counter = document.getElementById("cart-counter");
  counter.innerHTML = `<span>${cartCounter}</span>`;
  if(cartCounter > 0){
    counter.style.opacity = 1;
  } else {
    counter.style.opacity = 0;
  }
}

function emptyCart() {
  const p = document.getElementById("empty");
  if(cart.length === 0){
    p.style.display = "flex";
  } else {
    p.style.display = "none";
  }
  
}
