function searchPokemon() {
    // Get the search input value
    const searchInput = document.getElementById("search-input").value.toLowerCase();

    // Make an API call to the Pokemon API
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
        .then(response => response.json())
        .then(data => {
            // Display the search result
            const searchResult = document.getElementById("search-result");
            searchResult.innerHTML = `<h2>${data.name}</h2><img src="${data.sprites.front_default}">`;

            // Create the table for information
            const infoTable = document.createElement("table");
            infoTable.setAttribute("id", "info-table");
            // Create the table body
            const infoBody = infoTable.createTBody();

            //Inserting rows and cells for weight
            const weightRow = infoBody.insertRow();
            const weightCell = weightRow.insertCell();
            weightCell.innerHTML = `<b>Weight:</b> ${data.weight}`;

            //Inserting rows and cells for height
            const heightRow = infoBody.insertRow();
            const heightCell = heightRow.insertCell();
            heightCell.innerHTML = `<b>Height:</b> ${data.height}`;

            const abilities = data.abilities.map(ability => ability.ability.name);
            displayList(abilities, "Abilities", infoBody);

            const types = data.types.map(type => type.type.name);
            displayList(types, "Types", infoBody);

            // Append the table to the search result element
            searchResult.appendChild(infoTable);
        })
        .catch(error => {
            console.log(error);
        });
}

const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");
const dropdownList = document.getElementById("dropdown-list");

searchInput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchPokemon();
    }
});

searchInput.addEventListener("keyup", function () {

    // Get the input value
    const inputValue = searchInput.value.toLowerCase();

    if (inputValue === "") {
        searchResult.innerHTML = "";
    }

    // Make an API call to get a list of Pokemon names
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then(response => response.json())
    .then(data => {
        // Filter the list of Pokemon names based on the input
        const filteredPokemon = data.results.filter(pokemon => pokemon.name.includes(inputValue));
        // Clear the previous dropdown list
        dropdownList.innerHTML = "";
        // Create a new dropdown list with the filtered Pokemon names
        filteredPokemon.forEach(pokemon => {
            const option = document.createElement("option");
            option.value = pokemon.name;
            option.innerHTML = pokemon.name;
            dropdownList.appendChild(option);
        });
    });
});

dropdownList.addEventListener("change", function(){
    // Get the selected option value
    const selectedValue = dropdownList.options[dropdownList.selectedIndex].value;

    // Assign the selected option value to the searchInput value
    searchInput.value = selectedValue;
})


function displayList(items, label, tableBody) {
    const row = tableBody.insertRow();
    const cell = row.insertCell();
    if (items.length > 1)
        cell.innerHTML = `<b>${label}:</b> ${items.join(", ")}`;
    else
        cell.innerHTML = `<b>${label}:</b> ${items}`;
}

