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
                window.alert("Você deve preencher o 'Plan' antes de verificar os resultados");
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
                            window.alert("Você deve preencher o 'Do' antes de verificar os resultados");
                            window.location.href = "do.html";
                        } else {
                            var tamanho = solutionArray.length
                            var solution = (solutionArray[tamanho - 1].solution)

                            document.getElementById('solutionID').innerHTML = solution

                            var xmlDataInfo = new XMLHttpRequest()

                            xmlDataInfo.open("GET", "http://localhost:3000/dataInfo", true)
                            xmlDataInfo.send()
                            xmlDataInfo.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    var datainfoArray = JSON.parse(this.responseText)
                                    if (datainfoArray.length == 0) {
                                        window.alert("Você deve preencher o 'Check' antes de verificar os resultados");
                                        window.location.href = "check.html";
                                    } else {

                                        var temperaturaArray = [], phArray = [], eficienciaArray = [], dateArray = [], oxigenioArray = [];
                                        for (var i = 0; i < datainfoArray.length; i++) {
                                            temperaturaArray.push(datainfoArray[i].temperatura);
                                            phArray.push(datainfoArray[i].ph);
                                            oxigenioArray.push(datainfoArray[i].oxigenio);
                                            eficienciaArray.push(datainfoArray[i].eficiencia);
                                            dateArray.push(datainfoArray[i].data.slice(0, 10).replace(/-/g, " "));
                                        }

                                        // Gráfico
                                        var ctxL = document.getElementById("lineChart").getContext('2d');
                                        new Chart(ctxL, {
                                            type: 'line',
                                            data: {
                                                labels: dateArray,
                                                datasets: [{
                                                    label: "Temperatura",
                                                    data: temperaturaArray,
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(255,99,132,1)',
                                                    ],
                                                    borderWidth: 2
                                                },
                                                {
                                                    label: "Eficiencia",
                                                    data: eficienciaArray,
                                                    backgroundColor: [
                                                        'rgba(75, 192, 192, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(75, 192, 192, 1)',
                                                    ],
                                                    borderWidth: 2
                                                },
                                                {
                                                    label: "PH",
                                                    data: phArray,
                                                    backgroundColor: [
                                                        'rgba(255, 206, 86, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(255, 206, 86, 1)',
                                                    ],
                                                    borderWidth: 2
                                                },
                                                {
                                                    label: "Oxigênio Dissolvido",
                                                    data: oxigenioArray,
                                                    backgroundColor: [
                                                        'rgba(54, 162, 235, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(54, 162, 235, 1)',
                                                    ],
                                                    borderWidth: 2
                                                }
                                                ]
                                            },
                                            options: {
                                                responsive: true
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


    }
}