document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    fetch('https://user-manager-mi2a.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const token = data.access_token;
        console.log('Success:', token);

        // Hacer la segunda solicitud después de obtener el token
        return fetch('https://user-manager-mi2a.onrender.com/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User Data:', data);
        // Maneja los datos del usuario aquí
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
