const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

let quotes = [
];

// Implement localStorage to store newly added quotes
const storedQuotes = localStorage.getItem("quotes");
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
} else {
  quotes = [
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      category: "Motivation",
    },
    {
      text: "In the middle of every difficulty lies opportunity.",
      category: "Inspiration",
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life",
    },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    {
      text: "Success usually comes to those who are too busy to be looking for it.",
      category: "Success",
    },
  ];

  saveQuotes();
}
showRandomQuote();

newQuote.addEventListener("click", showRandomQuote);

function showRandomQuote() {
  if (quotes.length === 0) return;

  quoteDisplay.innerHTML = ""; // Clear old quote

  const quoteNum = Math.floor(Math.random() * quotes.length);

  const quotePara = document.createElement("p");
  quotePara.textContent = quotes[quoteNum]["text"];

  const categorySpan = document.createElement("span");
  categorySpan.textContent = ` (${quotes[quoteNum].category})`;

  quotePara.appendChild(categorySpan);
  quoteDisplay.appendChild(quotePara);
}

function addQuote() {
  const trimmedQuoteText = newQuoteText.value.trim();
  const trimmedQuoteCategory = newQuoteCategory.value.trim();
  if (!trimmedQuoteText || !trimmedQuoteCategory) {
    console.error("Please fill the provided fields before proceeding.");
    return;
  }

  const newQuoteObj = {
    text: trimmedQuoteText,
    category: trimmedQuoteCategory,
  };

  quotes.push(newQuoteObj);
  saveQuotes();

  newQuoteText.value = "";
  newQuoteCategory.value = "";

  showRandomQuote();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportToJsonFile(){
  if (quotes.length === 0) {
    alert("No quotes to export.");
    return;
  }

  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], {type:"application/json"});
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);

  alert(`Quotes exported successfully.`)
}
