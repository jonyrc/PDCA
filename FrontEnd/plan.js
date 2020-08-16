function Plan(){

    var problem = document.getElementById("problem").value
    var actionplan = document.getElementById("actionPlan").value

    //Recuperando informações de resposta do servidor
    fetch('http://localhost:3000/problem')
    .then(response => {
            var xhr = new XMLHttpRequest()
            xhr.open("POST", "http://localhost:3000/problem", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            var data = JSON.stringify({"problem": problem, "actionPlan": actionplan})
            try {
                xhr.send(data)
                window.alert("Dados salvos!");
                window.location.href = "do.html";
            } catch(err) {
                console.log("Algo deu errado: "+err)
                window.alert("Não foi possível salvar os dados");
            }

    })
    .catch(err => {
        console.log("Não foi possível recuperar as informações necessárias: "+err)
        window.alert("Não foi possível acessar a API de dados");
    })
}