const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.querySelector("#filter");

// PHASE 1 === Add items to list via form
function addItem(event) {
  event.preventDefault(); //STOPS THE FORM FROM SUBMITTING TO THE PAGE

  const newItem = itemInput.value;

  // VALIDATE INPUT
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  //CREATE LIST ITEM
  const li = document.createElement("li");
  li.textContent = newItem;

  const button = createButton("remove-item btn-link text-red"); //Function calling
  li.appendChild(button);

  // ADD LIST ITEM TO THE DOM
  itemList.appendChild(li);

  checkUI(); //This function is called again to check if the item.length===0 after an item has been added to the dom

  // CLEAR THE INPUT AFTER ADDING
  itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark"); //Function calling
  button.appendChild(icon);
  return button; //I.e return the value of button to the caller(addItem) function
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon; //I.e return the value of icon to the caller(createButton) function
}

// PHASE 2 === Remove items from list by clicking by clicking the 'x' button
function removeItem(event) {
  if (event.target.classList[1] === "fa-xmark") {
    if (
      confirm(
        `Are you sure you want to remove ${event.target.parentElement.parentElement.textContent}?`
      )
    ) {
      event.target.parentElement.parentElement.remove();

      checkUI(); //Called again to check if there is no list item anymore so it can remove the filter and the clear button
    }
  }
}

// PHASE 3 === Clear all items with 'clear' button

function clearItems(event) {
  //    itemList.innerHTML='';
  if (confirm("Are you sure you want to clear all?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  checkUI(); //Still called again for a similar reason
}

// PHASE 4 === Removing the Filter input and the clear button whenever there is no list item currently

function checkUI() {
  const items = itemList.querySelectorAll("li"); //CREATING THIS VARIABLE IN THIS SCOPE AND NOT THE GLOBAL SCOPE IS VERY IMPORTANT
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// EVENT LISTENERS
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

checkUI(); //ONLY RUNS WHEN THE PAGE LOADS //Note that this can also be called resetUI
