//Verificar possibilidade de criar scripts únicos para cada página

window.onload = function what(){
    event.preventDefault();
    var xmlProblem = new XMLHttpRequest()

    xmlProblem.open("GET", "http://localhost:3000/problem", true)
    xmlProblem.send()
    xmlProblem.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var problemArray = JSON.parse(this.responseText)

            if (problemArray.length == 0){
                window.alert("Você deve preencher o 'Plan' antes do 'Do'");
                window.location.href = "plan.html";
            }else{
                var tamanho = problemArray.length
                var problem = (problemArray[tamanho-1].problem)
                actionPlan = (problemArray[tamanho-1].actionPlan)
    
                document.getElementById('problemID').innerHTML = problem
                document.getElementById('actionPlanID').innerHTML = actionPlan
            }

        }
    }
}

// ======================DO PAGE======================

function Do(){
    event.preventDefault();
    var solution = document.getElementById("solution").value

    if (solution == "") {
        window.alert("Você não pode deixar campos vazios");
    }else {
    //Recuperando informações de resposta do servidor

    const data = { "solution": solution };
    fetch('http://localhost:3000/solution', {
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