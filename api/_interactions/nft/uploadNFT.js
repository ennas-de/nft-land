
const data = {
    firstname: "Abdulhakeem", 
    lastname: "Muhammed", 
    age: 34, 
    gender: "Male", 
    words: "I Made It", 
    digits: 111, 
    petname: "victory",
    addresses: {
        country: "Nigeria",
        state: "Kwara",
        city: "Ilorin",
        street: "Osere",
        house: "Zone B5",
        zipcode: "210101"
    }
}

const response = await fetch(`http://localhost:5000/api/v1/user/update-account`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRjMDQxODQzODMxOGIyNTVjOWYzZDEiLCJpYXQiOjE3MzMwMzUzNzEsImV4cCI6MTczMzY0MDE3MX0.2BzVl7SvXrD7-Ne_jJvlsj5Y0pUsIs4fAeGJ2UiJvgE"
    },
    body: JSON.stringify(data),
});

const dataJSON = await response.json()

console.log(dataJSON)
