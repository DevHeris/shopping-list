const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');


// PHASE 1 === Add items to list via form
function addItem(event) {
    event.preventDefault(); //STOPS THE FORM FROM SUBMITTING TO THE PAGE

    const newItem = itemInput.value;

    // VALIDATE INPUT
    if (newItem === '') {
        alert('Please add an item');
        return;
    };

    //CREATE LIST ITEM
    const li = document.createElement('li');
    li.textContent = newItem;

    const button = createButton('remove-item btn-link text-red'); //Function calling
    li.appendChild(button);

    // ADD LIST ITEM TO THE DOM
    itemList.appendChild(li);
    // CLEAR THE INPUT AFTER ADDING
    itemInput.value = '';
};

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark'); //Function calling
    button.appendChild(icon);
    return button; //I.e return the value of button to the caller(addItem) function
};

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon; //I.e return the value of icon to the caller(createButton) function
};


// PHASE 2 === Remove items from list by clicking by clicking the 'x' button
function removeItem(event) {
    if (event.target.classList[1] === "fa-xmark") {
      event.target.parentElement.parentElement.remove();  
    };  
};

// PHASE 3 === Clear all items with 'clear' button

function clearItems (event) {
//    itemList.innerHTML='';
while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
};
};



// EVENT LISTENERS
itemForm.addEventListener('submit', addItem);  
itemList.addEventListener('click', removeItem);  
clearBtn.addEventListener('click', clearItems);  

