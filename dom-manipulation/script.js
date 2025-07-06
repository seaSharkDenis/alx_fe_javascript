const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categoryFilter = document.getElementById("categoryFilter");

let quotes = [];

// Load quoets from localStorage or use defaults
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

populateCategories();
showRandomQuote();

newQuote.addEventListener("click", showRandomQuote);

// Restore last selected filter or show random quote
const savedCategory = localStorage.getItem("selectedCategory");
if (savedCategory) {
  categoryFilter.value = savedCategory;
  filterQuotes();
} else {
  showRandomQuote();
}

function showRandomQuote() {
  if (quotes.length === 0) return;

  quoteDisplay.innerHTML = ""; // Clear old quote

  const quoteNum = Math.floor(Math.random() * quotes.length);
  displayQuote(quotes[quoteNum]);
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

  populateCategories();
  filterQuotes();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch (e) {
      alert("Failed to import. Please ensure the JSON file is valid.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  if (quotes.length === 0) {
    alert("No quotes to export.");
    return;
  }

  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);

  alert(`Quotes exported successfully.`);
}

function populateCategories() {
  const uniqueCategories = new Set(quotes.map((quote) => quote.category));

  // clear existing categories except "All"
  categoryFilter.innerHTML = `<option value= "all">All Categories</option>`;

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;

  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  displayQuote(filteredQuotes[randomIndex]);
}

function displayQuote(quoteObj) {
  const quotePara = document.createElement("p");
  quotePara.textContent = quoteObj.text;

  const categorySpan = document.createElement("span");
  categorySpan.textContent = ` (${quoteObj.category})`;

  quotePara.appendChild(categorySpan);
  quoteDisplay.appendChild(quotePara);
}


// -------- Server Sync Logic --------
async function fetchQuotesFromServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data.map(post => ({ text: post.title, category: post.body || "Uncategorized" }));
  } catch (err) {
    console.error("Error fetching server quotes:", err);
    return [];
  }
}

async function syncWithServer() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    let newQuotes = 0;
    let conflicts = 0;

    serverQuotes.forEach(serverQuote => {
      const local = quotes.find(q => q.text === serverQuote.text);
      if (!local) {
        quotes.push(serverQuote);
        newQuotes++;
      } else if (local.category !== serverQuote.category) {
        local.category = serverQuote.category; // Server takes priority
        conflicts++;
      }
    });

    if (newQuotes > 0 || conflicts > 0) {
      saveQuotes();
      populateCategories();
      filterQuotes();
      showNotification(`${newQuotes} new quote(s) added, ${conflicts} conflict(s) resolved.`);
    }
  } catch (err) {
    console.error("Error during sync:", err);
  }
}

function showNotification(message) {
  const notif = document.createElement("div");
  notif.textContent = message;
  Object.assign(notif.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    zIndex: 1000,
  });

  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

// Start periodic sync every 15 seconds
setInterval(syncWithServer, 15000);

// Initial sync on page load
syncWithServer();
