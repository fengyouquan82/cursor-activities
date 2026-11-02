const billInput = document.getElementById("bill");
const tipSelect = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const calculateButton = document.getElementById("calculate");
const result = document.getElementById("result");

function money(value) {
  return Number(value).toFixed(2);
}

function showError(message) {
  result.className = "error";
  result.textContent = message;
}

function showResult(tipAmount, total, perPerson) {
  result.className = "";
  result.innerHTML =
    `<p>Tip: $${money(tipAmount)}</p>` +
    `<p>Total: $${money(total)}</p>` +
    `<p>Per person: $${money(perPerson)}</p>`;
}

function parseAmount(value) {
  const trimmed = String(value).trim();
  if (trimmed === "") {
    return { empty: true };
  }
  const amount = Number(trimmed);
  if (!Number.isFinite(amount)) {
    return { invalid: true };
  }
  return { amount };
}

function calculate() {
  const billParsed = parseAmount(billInput.value);
  const peopleParsed = parseAmount(peopleInput.value);
  const tipPercent = Number(tipSelect.value);

  if (billParsed.empty || billParsed.invalid) {
    showError("Please enter a bill amount.");
    return;
  }
  if (billParsed.amount < 0) {
    showError("Bill amount can't be negative.");
    return;
  }

  if (peopleParsed.empty || peopleParsed.invalid) {
    showError("Please enter the number of people.");
    return;
  }
  if (peopleParsed.amount <= 0) {
    showError("Number of people must be at least 1.");
    return;
  }

  const tipAmount = billParsed.amount * (tipPercent / 100);
  const total = billParsed.amount + tipAmount;
  const perPerson = total / peopleParsed.amount;

  showResult(tipAmount, total, perPerson);
}

calculateButton.addEventListener("click", calculate);
