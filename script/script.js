document.getElementById('btn-cadastrar').addEventListener('click', function () {

	var nome = document.getElementById('nome').value;
	var email = document.getElementById('email').value;
	var senha = document.getElementById('senha').value;


	var data = {
		nome: nome,
		email: email,
		senha: senha
	};


	fetch('http://localhost:8080/cliente', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(function (response) {
			if (response.ok) {
				alert('Cadastro realizado com sucesso!');
				console.log('Cadastro realizado com sucesso!');

			} else {
				alert('Erro ao cadastrar!');
				console.error('Erro ao cadastrar!');

			}
		})
		.catch(function (error) {

			console.error('Erro na requisição:', error);

		});
});


document.getElementById('addPinForm').addEventListener('submit', function (event) {
	event.preventDefault();

	var latitude = document.getElementById('latitude').value;
	var longitude = document.getElementById('longitude').value;
	var description = document.getElementById('description').value;

	var pinData = {
		latitude: latitude,
		longitude: longitude,
		description: description
	};

	
	fetch('http://localhost:8080/cliente/pin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(pinData)
	})
		.then(function (response) {
			if (response.ok) {
				alert('Pin salvo com sucesso!');
				$('#addPinModal').modal('hide');
			} else {
				alert('Erro ao salvar o pin. Por favor, tente novamente.');
			}
		})
		.catch(function (error) {
			console.error('Erro:', error);
			alert('Erro ao salvar o pin. Por favor, tente novamente.');
		});
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

