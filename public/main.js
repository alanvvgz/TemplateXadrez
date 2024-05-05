document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Usando fetch
    fetch('http://localhost:3000/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Redireciona para outra página após o login
        window.location.href = "xadrez2.html";
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Usando axios
    axios.post('http://localhost:3000/authenticate', {
        username,
        password
    })
    .then(function (response) {
        console.log(response);
        // Redireciona para outra página após o login
        window.location.href = "xadrez2.html";
    })
    .catch(function (error) {
        console.log(error);
    });
});
