//Verificar possibilidade de criar scripts únicos para cada página

window.onload = function what() {
    event.preventDefault();
    var xmlProblem = new XMLHttpRequest()

    xmlProblem.open("GET", "http://localhost:3000/problem", true)
    xmlProblem.send()
    xmlProblem.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var problemArray = JSON.parse(this.responseText)
            if (problemArray.length == 0) {
                window.alert("Você deve preencher o 'Plan' antes do 'Check'");
                window.location.href = "plan.html";
            } else {
                var tamanho = problemArray.length
                var problem = (problemArray[tamanho - 1].problem)
                actionPlan = (problemArray[tamanho - 1].actionPlan)

                document.getElementById('problemID').innerHTML = problem
                var xmlSolution = new XMLHttpRequest()

                xmlSolution.open("GET", "http://localhost:3000/solution", true)
                xmlSolution.send()
                xmlSolution.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var solutionArray = JSON.parse(this.responseText)
                        if (solutionArray.length == 0) {
                            window.alert("Você deve preencher o 'Do' antes do 'Check'");
                            window.location.href = "plan.html";
                        } else {
                            var tamanho = solutionArray.length
                            var solution = (solutionArray[tamanho - 1].solution)

                            document.getElementById('solutionID').innerHTML = solution
                        }
                    }
                }
            }
        }
    }

}

// ======================CHECK PAGE======================

function Check() {
    event.preventDefault();
    var entrada = document.getElementById("entrada").value
    var saida = document.getElementById("saida").value
    var ph = document.getElementById("ph").value
    var temperatura = document.getElementById("temperatura").value
    var oxigenio = document.getElementById("oxigenio").value

    if (entrada == "" || saida == "" || ph == "" || temperatura == "" || oxigenio == "") {
        window.alert("Você não pode deixar campos vazios");
    } else {
        const eficiencia = (100 - ((saida * 100) / entrada))

        //Recuperando informações de resposta do servidor
        const data = {
            "entrada": entrada, "saida": saida, "ph": ph,
            "temperatura": temperatura, "eficiencia": eficiencia, "oxigenio": oxigenio
        };
        fetch('http://localhost:3000/datainfo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                window.alert("Dados salvos!");
                window.location.href = "check.html";
            })
            .catch((error) => {
                console.log("Não foi possível recuperar as informações necessárias: " + error)
                window.alert("Não foi possível acessar a API de dados");
            });
    }

}