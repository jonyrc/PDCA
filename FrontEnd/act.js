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

    var xmlDataInfo = new XMLHttpRequest()

    xmlDataInfo.open("GET", "http://localhost:3000/dataInfo", true)
    xmlDataInfo.send()
    xmlDataInfo.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var datainfoArray = JSON.parse(this.responseText)

            var temperaturaArray = [], phArray = [], eficienciaArray = [], dateArray = [];
            for (var i = 0; i < datainfoArray.length; i++) {
                temperaturaArray.push(datainfoArray[i].temperatura);
                phArray.push(datainfoArray[i].ph);
                eficienciaArray.push(datainfoArray[i].eficiencia);
                dateArray.push(datainfoArray[i].data.slice(0,10).replace(/-/g, " "));
            }

            // Gráfico
            var ctxL = document.getElementById("lineChart").getContext('2d');
            var myLineChart = new Chart(ctxL, {
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