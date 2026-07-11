const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

const briefForm = document.querySelector("[data-brief-form]");

if (briefForm) {
  briefForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(briefForm);
    const body = [
      "Bonjour Ahmed,",
      "",
      "Je souhaite vous contacter pour un besoin freelance.",
      "",
      `Nom / entreprise : ${data.get("Nom") || ""}`,
      `Email : ${data.get("Email") || ""}`,
      `Type de besoin : ${data.get("Besoin") || ""}`,
      `Budget ou durée : ${data.get("Budget") || ""}`,
      "",
      "Message :",
      data.get("Message") || "",
      "",
      "Merci,",
    ].join("\n");

    const subject = encodeURIComponent("Brief projet freelance Symfony");
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:ahmedbhs123@gmail.com?subject=${subject}&body=${encodedBody}`;
  });
}
