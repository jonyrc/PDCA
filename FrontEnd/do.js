//Verificar possibilidade de criar scripts únicos para cada página

window.onload = function what(){
    event.preventDefault();
    var xmlProblem = new XMLHttpRequest()

    xmlProblem.open("GET", "http://localhost:3000/problem", true)
    xmlProblem.send()
    xmlProblem.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var problemArray = JSON.parse(this.responseText)
            var tamanho = problemArray.length
            console.log("o tamanho e: " + tamanho)
            console.log(problemArray)
            var problem = (problemArray[tamanho-1].problem)
            actionPlan = (problemArray[tamanho-1].actionPlan)

            document.getElementById('problemID').innerHTML = problem
            document.getElementById('actionPlanID').innerHTML = actionPlan
        }
    }
}

// ======================DO PAGE======================

function Do(){

    var solution = document.getElementById("solution").value
    //Recuperando informações de resposta do servidor
    fetch('http://localhost:3000/solution')
    .then(response => {
        return response.json()
    })
    .then(response => {
            var xhr = new XMLHttpRequest()
            xhr.open("POST", "http://localhost:3000/solution", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            var data = JSON.stringify({"solution": solution})
            console.log(data)
            try {
                xhr.send(data)
                window.alert("Dados salvos!");
                window.location.href = "check.html";
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