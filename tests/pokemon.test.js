const searchPokemon = require('../js/app');

test('searchPokemon function fetches Pokemon data', () => {
    // Mocking fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                name: 'Pikachu',
                sprites: { front_default: 'https://example.com/pikachu.png' },
                weight: 60,
                height: 4,
                abilities: [{ ability: { name: 'Static' } }],
                types: [{ type: { name: 'Electric' } }]
            })
        })
    );

    // Mocking DOM elements
    document.body.innerHTML = `
        <div id="search-result"></div>
        <input id="search-input" type="text" value="pikachu">
    `;

    // Calling the function
    return searchPokemon().then(() => {
        // Assertion
        expect(document.getElementById('search-result').innerHTML).toContain('Pikachu');
        expect(document.getElementById('search-result').innerHTML).toContain('https://example.com/pikachu.png');
        expect(document.getElementById('search-result').innerHTML).toContain('Weight:');
        expect(document.getElementById('search-result').innerHTML).toContain('Height:');
        expect(document.getElementById('search-result').innerHTML).toContain('Abilities:');
        expect(document.getElementById('search-result').innerHTML).toContain('Types:');
    });
});