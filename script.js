const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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


// EVENT LISTENERS
itemForm.addEventListener('submit', addItem);  
