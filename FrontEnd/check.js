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
            var problem = (problemArray[tamanho-1].problem)
            actionPlan = (problemArray[tamanho-1].actionPlan)

            document.getElementById('problemID').innerHTML = problem
        }
    }

    var xmlSolution = new XMLHttpRequest()

    xmlSolution.open("GET", "http://localhost:3000/solution", true)
    xmlSolution.send()
    xmlSolution.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var solutionArray = JSON.parse(this.responseText)
            var tamanho = solutionArray.length
            var solution = (solutionArray[tamanho-1].solution)

            document.getElementById('solutionID').innerHTML = solution
        }
    }
}

// ======================CHECK PAGE======================

function Check(){

    var entrada = document.getElementById("entrada").value
    var saida = document.getElementById("saida").value
    var ph = document.getElementById("ph").value
    var temperatura = document.getElementById("temperatura").value

    const eficiencia = (100-((saida*100)/entrada))

    //Recuperando informações de resposta do servidor
    fetch('http://localhost:3000/datainfo')
    .then(response => {
        return response.json()
    })
    .then(response => {
            var xhr = new XMLHttpRequest()
            xhr.open("POST", "http://localhost:3000/datainfo", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            var data = JSON.stringify({"entrada": entrada, "saida": saida, "ph": ph, "temperatura": temperatura, "eficiencia": eficiencia})
            try {
                xhr.send(data)
                window.alert("Dados salvos!");
                window.location.href = "act.html";
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