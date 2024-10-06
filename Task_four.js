
const Data = [];
for (let count = 1; count <= 10000; count++) {
    Data.push(`Item${count}`);
}

const itemsPerPage = 100;
let currentPage = 1;
let filteredItems = [];

const List = document.getElementById('List');
const search = document.getElementById('search');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const page = document.getElementById('page');

function displayItems() {
    List.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = filteredItems.slice(start, end);

    itemsToDisplay.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('list-item');
        div.textContent = item;
        List.appendChild(div);
    });

    page.textContent = `Page ${currentPage} of ${Math.ceil(filteredItems.length / itemsPerPage)}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(filteredItems.length / itemsPerPage);
}

function debounce(func, delay) {
    let debounceTimer;
    return function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    };
}


function handleSearch() {
    const searchQuery = search.value.toLowerCase();
    filteredItems = Data.filter(item => item.toLowerCase().includes(searchQuery));
    currentPage = 1;
    displayItems();
}

function Pagination(direction) {
    if (direction === 'next' && currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    displayItems();
}

search.addEventListener('input', debounce(handleSearch, 300));

prevButton.addEventListener('click', () => Pagination('prev'));
nextButton.addEventListener('click', () => Pagination('next'));

filteredItems = Data;
displayItems();
