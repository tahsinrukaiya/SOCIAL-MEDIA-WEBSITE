// Using localStorage.setItem to store data in the browser's localStorage
// The key parameter is a string identifier for the data, and the value parameter is the actual data to be stored.
// The value is first converted to a JSON string using JSON.stringify

export function saveStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

//to retrieve and parse data from the browser's localStorage
export function loadStorage(key) {
    try {
        // Attempting to retrieve the stored data from localStorage using the provided key
        const value = localStorage.getItem(key);
        // Parsing the retrieved JSON string back into its original form
        return JSON.parse(value);
    } catch {
        // If there is an error (e.g., if the data is not valid JSON), return null
        return null;
    }
}

// Using removeItem method of the localStorage object to remove the item with the specified key from the browser's localStorage
export function removeStorage(key) {
    // Using localStorage.removeItem to remove the item with the specified key from localStorage
    localStorage.removeItem(key);
}
