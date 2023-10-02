const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });

  checkUI();
}

function onAddItemSubmit(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  //   Validate Input
  if (newItem === "") {
    alert("Please add an item");

    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDOM(item) {
  //   Create list item
  const li = document.createElement("li");

  li.textContent = item;

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");

  button.className = classes;

  const icon = createIcon("fa-solid fa-xmark");

  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");

  icon.className = classes;

  return icon;
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage(); //DRY principle(Don't repeat yourself)

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON String and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(event) {
  if (event.target.className === "fa-solid fa-xmark") {
    removeItem(event.target.parentElement.parentElement);
  }
}

function removeItem(item) {
  if (confirm(`Are you sure you want to remove ${item.textContent}`)) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // FIlter out item to be removed from storage
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item); //This gives an array of the remaining items

  // Re-set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems(event) {
  if (confirm("Are you sure you want to clear all items?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  // Clear from localStorage
  localStorage.removeItem("items");

  checkUI();
}

function filterItems(event) {
  const text = event.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
