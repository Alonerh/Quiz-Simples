/* Initial Data */
let currentQuestion= 0;
let correctAnswers = 0;



showQuestion()
/* Events */

// Botão reset
document.querySelector('.scoreArea button').addEventListener('click', reset)


/* Functions */
function showQuestion() {
    if (questions[currentQuestion]) { // Tem questões ainda
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100); // Porcentagem da barra 

        document.querySelector('.progress--bar').style.width = `${pct}%`; // Largura da barra

        document.querySelector('.scoreArea').style.display = 'none'; // Esconde a área do resultado
        document.querySelector('.questionArea').style.display = 'block'; // Mostra a área das perguntas

        document.querySelector('.question').innerHTML = q.question;

        document.querySelector('.options').innerHTML = ''; // Limpa as opções

        let optionsHtml = '';

        for (let i in q.options) {     // ParsInt transforma em número inteiro fazendo o número da questão aparecer a partir do 1   
            optionsHtml += `<div data-op=${i} class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>` // Concatena com o que já tem    
        } 
        document.querySelector('.options').innerHTML = optionsHtml; // Essa é mais eficiente

        document.querySelectorAll('.options .option').forEach(item=>{ // Evento de clique nas perguntas
            item.addEventListener('click', optionClickEvent)
        })
    } else { // Se acabar as questões
        finishQuiz()
    }
}


function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op')); // De string vira number

    if (questions[currentQuestion].answer === clickedOption) {
        console.log("Acertou")
        correctAnswers++;
    } else {
        console.log("Errou")
    }

    // Próxima questão
    currentQuestion++; 
    showQuestion();

}

function finishQuiz() {

    let points = Math.floor((correctAnswers / questions.length) * 100);

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ruim!';
        document.querySelector('.scorePct').style.color = '#f00';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem!';
        document.querySelector('.scorePct').style.color = '#ff0';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0f0';
    }

    /* Mudanças da frases e cores
        - 30 % = Tá ruim! | Vermelha
        - + 30 - 70% = Muito bem! | Amarela
        - + 70% = Parabéns! | Verde
    */



    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`


    document.querySelector('.scoreArea').style.display ='block'; // Mostra os resultados
    document.querySelector('.questionArea').style.display = 'none'; // Esconde as questões
    document.querySelector('.progress--bar').style.width = `100%`; // Barra vai para 100%

}

function reset() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion()
}