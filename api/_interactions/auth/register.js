

const data = {
    firstname: "ennas", 
    lastname: "de", 
    age: 34, 
    gender: "Male", 
    words: "I Made It", 
    digits: 111, 
    petname: "none"
}

const response = await fetch(`http://localhost:5000/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});

const dataJSON = await response.json()

console.log(dataJSON)
