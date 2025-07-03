const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

const quotes = [
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

newQuote.addEventListener("click", showRandomQuote);

function showRandomQuote() {
  let quoteNum = Math.floor(Math.random() * quotes.length);
  quoteDisplay.innerHTML = quotes[quoteNum]["text"];
}

function createAddQuoteForm() {
  const trimmedQuoteText = newQuoteText.value.trim();
  const trimmedQuoteCategory = newQuoteCategory.value.trim();
  if (!trimmedQuoteText || !trimmedQuoteCategory) {
    console.error("Please fill the provided fields before proceeding.");
    return false;
  }
  // newQuoteText.innerHTML = "";
  // newQuoteText.innerHTML = "";
  const newQuoteObj = {
    text: trimmedQuoteText,
    category: trimmedQuoteCategory,
  };
  quotes.push(newQuoteObj);
  showRandomQuote();
}

function addQuote() {
  createAddQuoteForm();
}
