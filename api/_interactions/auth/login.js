// import 


const data = {
    password: "I Made It 111 none"
}

const response = await fetch(`http://localhost:5000/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});

const dataJSON = await response.json();

console.log(dataJSON);