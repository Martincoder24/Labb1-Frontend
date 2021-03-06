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
    for (let i = 0; i < data.length; i++) {
      const course = new Course(data[i]);
      courses.push(course);
    }
    getCourses();
  });

function getCourses() {
  const courseContainer = document.getElementById("course-container");
  courseContainer.innerHTML = "";
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const div1 = document.createElement("div");
    div1.classList.add("course");
    const img = document.createElement("img");
    img.src = course.kursBild;
    img.setAttribute("alt" , `${course.kursTitel}`)
    const div2 = document.createElement("div");
    div2.classList.add("overlay");
    const div3 = document.createElement("div");
    div3.classList.add("image-Title");
    div3.innerText = course.kursTitel;
    const p = document.createElement("p");
    p.classList.add("image_description");
    p.innerText = course.kursBeskrivning;
    const div4 = document.createElement("div");
    div4.classList.add("third-section");
    const p1 = document.createElement("p");
    p1.classList.add("length-price");
    p1.innerText = `${course.kursLängd}V - ${course.kursPris} kr`
    const a = document.createElement("a");
    a.classList.add("add-btn");
    a.setAttribute("onclick", `addCourseToCart(${course.kursNummer})`);
    a.innerText = "Lägg till";
    div1.appendChild(img);
    div1.appendChild(div2);
    div2.appendChild(div3);
    div2.appendChild(p); 
    div2.appendChild(div4); 
    div4.appendChild(p1);
    div4.appendChild(a);
    courseContainer.appendChild(div1);
  }
}

function openMenu() {
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
    li.setAttribute("id", `${number}`);
    const img = document.createElement("img");
    img.src = currentCourse.kursBild;
    const div = document.createElement("div");
    const p1 = document.createElement("p");
    p1.innerText = currentCourse.kursTitel;
    const p2 = document.createElement("p");
    p2.classList.add("value-color");
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
  let li = document.getElementById(`${number}`);
  cartList.removeChild(li);
  total -= addToCartTotal(number);
  updateTotal();
  cartCounter--;
  updateCounter();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] === number) {
      cart.splice(i, 1);
      emptyCart();
      return;
    }
  }
}

function updateCounter() {
  const counter = document.getElementById("cart-counter");
  counter.innerHTML = `<span>${cartCounter}</span>`;
  if (cartCounter > 0) {
    counter.style.opacity = 1;
  } else {
    counter.style.opacity = 0;
  }
}
//När jag tömmer min vagn måste jag lägga till <p>-taggen igen.
function emptyCart() {
  const p = document.getElementById("empty");
  if (cart.length === 0) {
    p.style.display = "flex";
  } else {
    p.style.display = "none";
  }
}
//Öppna,stänga samt resetta modalen.
function openModal() {
  document.querySelector("form").reset();
  const modal = document.getElementById("modal-new");
  if (modal.style.visibility === "visible") {
    modal.style.visibility = "hidden";
  } else {
    modal.style.visibility = "visible";
  }
}

function addCourse() {
  let checkImage = !document.getElementById("course-image").value.length == 0;
  //Måste kontrollera så att jag inte väljer ett befintligt kursNummer
  let checkCourseNumber = Number(document.getElementById("course-number").value);
  let checkCourseTitle = document.getElementById("course-title").value;
  let checkCourseDescription = document.getElementById("course-description").value;
  let checkCourseLength = Number(document.getElementById("course-length").value);
  let checkCoursePrice = Number(document.getElementById("course-price").value);

  
  if (checkCourseNumber === 0){
    window.alert("Du måste fylla i ett kursnummer")
    return;
  }
  
  let courseNumberIsTaken = false;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].kursNummer === checkCourseNumber) {
      window.alert(
        "Din nya kurs kan inte ha samma Kursnummer som en befintlig kurs!"
      );
      courseNumberIsTaken = true;
      return;
    }
  };
  //Kontrollerar ifall de andra fälten är tomma
  console.log(checkCourseTitle)
  if (checkCourseTitle === "") {
    window.alert("Du måste fylla i en kurstitel");
    return;
  }
  if (checkCourseDescription === "") {
    window.alert("Du måste fylla i en kursbeskrivning");
    return;
  }
  if (checkCourseLength === 0) {
    window.alert("Du måste fylla i en kurslängd");
    return;
  }
  if (checkCoursePrice === 0) {
    window.alert("Du måste fylla i ett kurspris");
    return;
  }
  //kursNummer får inte vara = med nåt kursNummer i courses object arrayen
  const newCourse = {
    kursNummer: checkCourseNumber,
    kursTitel: document.getElementById("course-title").value,
    kursBeskrivning: document.getElementById("course-description").value,
    kursLängd: Number(document.getElementById("course-length").value),
    kursPris: Number(document.getElementById("course-price").value),
    kursBild: checkImage
      ? document.getElementById("course-image").value
      : "./Images/Defaultbild.png",
  };
  if(courseNumberIsTaken === false){
      courses.push(new Course(newCourse));
      getCourses();
      openModal();
  }
  
}
// När man bekräftar köpet ska det komma en popup som säger att du har köpt dina kurser
//CLearar vagnen samt kurserna
function confirm() {
  if(cart.length >> 0){
      proceed();
      cart.length = 0;
      total = 0;
      updateTotal();
      cartCounter = 0;
      updateCounter();
      const cartList = document.getElementById("shopping-cart-list");
      cartList.innerHTML = "";
      const p = document.createElement("p");
      p.setAttribute("id", "empty");
      cartList.appendChild(p);
      const empty = document.getElementById("empty");
      empty.innerText = "Din kundvagn är tom!";
  } else {
    window.alert("Din kundvagn är tom!")
  }
  
}

function proceed() {
  const confirm = document.getElementById("confirm-purchase");
  if (confirm.style.visibility === "visible") {
    confirm.style.visibility = "hidden";
  } else {
    confirm.style.visibility = "visible";
  }
}
//Måste kolla ifall alla fält är ifyllda
