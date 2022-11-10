//document.querySelector constants go here
const bill = document.querySelector("#bill"); // bill total input
const radioTips = document.querySelectorAll(".radio");
const customTip = document.querySelector("#custom"); // custom tip value
const people = document.querySelector("#people"); // number of people splitting the bill
const tipPerPerson = document.querySelector("#tip-per-person"); // tip amount per person
const totalPerPerson = document.querySelector("#total-per-person"); // total amount per person
const inputs = document.querySelectorAll(".input");
const reset = document.querySelector("#reset");
const errorMessage = document.querySelector("#error-message");
//functions go here

// calculates tip per person
const tip = (percent = 0) => {
  return (bill.value * percent) / 100 / people.value;
};

// calculates total per person
const total = (percent = 0) => {
  return bill.value / people.value + tip(percent);
};

// resets the div text on reset click
reset.addEventListener("click", () => {
  tipPerPerson.textContent = `$0.00`;
  totalPerPerson.textContent = `$0.00`;
});

// populates the calculated tip and total into their respective end locations
let calc = () => {
  let selected = document.querySelector(".selected");
  tipPerPerson.textContent = `$${tip(selected.value).toFixed(2)}`;
  totalPerPerson.textContent = `$${total(selected.value).toFixed(2)}`;
  document.querySelector(".error")?.classList.remove("error");
  errorMessage.hidden = true;
};

// changes text content of html elements to the calculated values
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.name === "radio" && people.value >= 1) {
      document.querySelector(".selected")?.classList.remove("selected");
      input.classList.add("selected");
      calc();
    } else if (people.value >= 1) {
      calc();
    } else if (people.value <= 0 && input.id === "people") {
      people.classList.add("error");
      errorMessage.hidden = false;
    }
  });
});

// removes the checked state from radio buttons when a value is added to customTip
customTip.addEventListener("input", () => {
  radioTips.forEach((tip) => {
    tip.checked = false;
  });
});
