const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

const quotes = [
  {
    quote:
      "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    category: "Inspiration",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  { quote: "The purpose of our lives is to be happy.", category: "Happiness" },
  {
    quote:
      "Success usually comes to those who are too busy to be looking for it.",
    category: "Success",
  },
];

newQuote.addEventListener("click", ShowRandomQuote);

function ShowRandomQuote() {
  let quoteNum = Math.floor(Math.random() * quotes.length);
  quoteDisplay.innerHTML = quotes[quoteNum]["quote"];
}

function createAddQuoteForm() {
    const trimmedQuoteText = newQuoteText.value.trim();
    const trimmedQuoteCategory = newQuoteCategory.value.trim();
    if(!trimmedQuoteText || !trimmedQuoteCategory){
        console.error("Please fill the provided fields before proceeding.");
        return false;
    }
    // newQuoteText.innerHTML = "";
    // newQuoteText.innerHTML = "";
  const newQuoteObj = {
    text: trimmedQuoteText,
    category: trimmedQuoteCategory
  };
  quotes.push(newQuoteObj);
  alert(`Quote Added: ${newQuoteObj["text"], newQuoteObj["category"]}`);
}

function addQuote() {
  createAddQuoteForm();
}
