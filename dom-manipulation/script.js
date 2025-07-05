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
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
showRandomQuote();

newQuote.addEventListener("click", showRandomQuote);

function showRandomQuote() {
  let quoteNum = Math.floor(Math.random() * quotes.length);
  //   quoteDisplay.innerHTML = quotes[quoteNum]["text"];

  const quotePara = document.createElement("p");
  quotePara.textContent = quotes[quoteNum]["text"];

  const categorySpan = document.createElement("span");
  categorySpan.textContent = `(${quotes[quoteNum].category})`;

  quotePara.appendChild(categorySpan);
  quoteDisplay.appendChild(quotePara);
}

function createAddQuoteForm() {
  const trimmedQuoteText = newQuoteText.value.trim();
  const trimmedQuoteCategory = newQuoteCategory.value.trim();
  if (!trimmedQuoteText || !trimmedQuoteCategory) {
    console.error("Please fill the provided fields before proceeding.");
    return false;
  }

  const newQuoteObj = {
    text: trimmedQuoteText,
    category: trimmedQuoteCategory,
  };

  quotes.push(newQuoteObj);
  //   Save to local storage after adding a quote.
  localStorage.setItem("quotes", JSON.stringify(quotes));

  newQuoteText.value = "";
  newQuoteCategory.value = "";

  showRandomQuote();
}

function addQuote() {
  createAddQuoteForm();
}