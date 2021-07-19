function toggleClass() {
  let menu = document.querySelector(".mainMenu");
  menu.classList.toggle("toggleCls");
};

const contactForm = document.querySelector(".contact-form");
contactForm ? contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const phoneNumber = document.getElementById("number").value;
  const email = document.getElementById("email").value;
  const emailConfirmation = document.getElementById("conEmail").value;
  const message = document.getElementById("message").value;

  const firstNameError = document.getElementsByClassName("fname")[0];
  const lastNameError = document.getElementsByClassName("lname")[0];
  const phoneNumberError = document.getElementsByClassName("number")[0];
  const emailError = document.getElementsByClassName("email")[0];
  const messageError = document.getElementsByClassName("message")[0];

  const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
  const isEmailValid = emailRegex.test(email);
  const isRepeatedEmailValid = emailRegex.test(emailConfirmation);
  const isPhoneNumberValid = phoneNumber.length >= 9 && phoneNumber.length <= 12;

  if (email !== emailConfirmation) {
    return emailError.innerHTML = "Emails should match";
  }
  if (!isEmailValid || !isRepeatedEmailValid) {
    return emailError.innerHTML = "Invalid email";
  }
  if (!isPhoneNumberValid) {
    return phoneNumberError.innerHTML = "Invalid phone number";
  }
  if (firstName.length <= 3) {
    return firstNameError.innerHTML = "First name must be longer than 3 characters"
  }
  if (lastName.length <= 3) {
    return lastNameError.innerHTML = "Last name must be longer than 3 characters"
  }
  if (!message) {
    return messageError.innerHTML = "Message cannot be empty";
  }

  localStorage.setItem("validatedData", JSON.stringify({
    firstName,
    lastName,
    phoneNumber,
    email,
    emailConfirmation,
    message
  }));

  window.location.href = "./confirm.html"
}) : null;

const pTag = document.querySelector(".validated-data");
if (pTag) {
  const { email, firstName, lastName, message, phoneNumber } = JSON.parse(localStorage.getItem("validatedData"));
  pTag.innerHTML = `
    <p> Thank You for your message ${firstName} ${lastName} we get your message:</p><br>
    <p> ${message}</p><br>
    <p> In 24 hours we contact with you by ${email} or ${phoneNumber}</p>
  `;
}

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const firstImage = document.querySelector(".slides>img");
const images = [...document.querySelectorAll(".images>img")] || [];
const slideWidth = firstImage ? firstImage.offsetWidth : null;
const maxSlides = 4;
let currentSlide = 0;

images.forEach((image, i) => {
  image.addEventListener(("click"), () => {
    currentSlide = i;
    firstImage.style.marginLeft = `-${currentSlide * slideWidth}px`;
  })
})

leftArrow ? leftArrow.addEventListener('click', (e) => {
  if (currentSlide === 0) {
    currentSlide = maxSlides;
  }
  currentSlide--;
  firstImage.style.marginLeft = `-${currentSlide * slideWidth}px`;
}) : null;
rightArrow ? rightArrow.addEventListener('click', (e) => {
  currentSlide++;
  if (currentSlide === maxSlides) {
    currentSlide = 0;
  }
  firstImage.style.marginLeft = `-${currentSlide * slideWidth}px`;
}) : null;