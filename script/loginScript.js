const formularioLogin = document.querySelector(".formulario-login");
const login = document.querySelector(".login");
const fechar = document.querySelector(".botao-fechar");

login.addEventListener("click", () => {
  formularioLogin.setAttribute("data-lista", "mostrar");
  fechar.setAttribute("data-lista", "mostrar-fechar");
});

fechar.addEventListener("click", () => {
  formularioLogin.setAttribute("data-lista", "esconder");
  fechar.setAttribute("data-lista", "esconder");
});


document.getElementById("btn-login").addEventListener("click", function () {
    
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    
    var dadosLogin = {
        email: email,
        senha: senha
    };

    
    fetch('http://localhost:8080/cliente/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
    })
        .then(function (response) {
            if (response.ok) {
            
                window.location.href = "logon.html";
            } else {
                
                alert("Email ou senha incorretos");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});




    