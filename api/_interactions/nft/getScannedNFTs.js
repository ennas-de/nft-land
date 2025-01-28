

const response = await fetch(
    `http://localhost:5000/api/v1/user/dashboard`,
    {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRjMDQxODQzODMxOGIyNTVjOWYzZDEiLCJpYXQiOjE3MzMwMzUzNzEsImV4cCI6MTczMzY0MDE3MX0.2BzVl7SvXrD7-Ne_jJvlsj5Y0pUsIs4fAeGJ2UiJvgE"
        },
    }
);

const data = await response.json();

console.log(data.wallet);
console.log(data["wallet"]);
console.log({data});