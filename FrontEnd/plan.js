function Plan() {
    event.preventDefault();
    var problem = document.getElementById("problem").value
    var actionPlan = document.getElementById("actionPlan").value
    if (problem == "" || actionPlan == "") {
        window.alert("Você não pode deixar campos vazios");
    }else {
        //Recuperando informações de resposta do servidor
        const data = { "problem": problem, "actionPlan": actionPlan };
        fetch('http://localhost:3000/problem', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                window.alert("Dados salvos!");
                window.location.href = "do.html";
            })
            .catch((error) => {
                console.log("Não foi possível recuperar as informações necessárias: " + error)
                window.alert("Não foi possível acessar a API de dados");
            });
    }


}