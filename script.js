const questions = [
  { text: "Qual é o maior planeta do nosso sistema solar?", answers: ["Terra", "Júpiter", "Saturno", "Netuno"], correct: 1 },
  { text: "Qual linguagem é conhecida por sua cobra no logotipo?", answers: ["Python", "Ruby", "Swift", "Kotlin"], correct: 0 },
  { text: "Quantos lados tem um hexágono?", answers: ["Cinco", "Seis", "Sete", "Oito"], correct: 1 },
  { text: "Qual é o maior oceano da Terra?", answers: ["Atlântico", "Índico", "Pacífico", "Ártico"], correct: 2 },
  { text: "Quem pintou a Mona Lisa?", answers: ["Van Gogh", "Michelangelo", "Leonardo da Vinci", "Picasso"], correct: 2 }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionText = document.querySelector("#question-text");
const questionTag = document.querySelector("#question-tag");
const answersContainer = document.querySelector("#answers");
const nextButton = document.querySelector("#next-button");
const nextLabel = document.querySelector("#next-label");
const hint = document.querySelector("#hint");

function renderQuestion() {
  const question = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  selectedAnswer = null;
  questionText.textContent = question.text;
  questionTag.textContent = `PERGUNTA ${String(currentQuestion + 1).padStart(2, "0")}`;
  document.querySelector("#question-count").textContent = `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  document.querySelector("#progress-label").textContent = `${progress}% concluído`;
  document.querySelector("#progress-bar").style.width = `${progress}%`;
  nextButton.disabled = true;
  nextLabel.textContent = currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima";
  hint.textContent = "Selecione uma alternativa para continuar";
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-text">${answer}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(index) {
  if (selectedAnswer !== null) return;
  selectedAnswer = index;
  const question = questions[currentQuestion];
  const answerButtons = [...answersContainer.children];
  answerButtons[index].classList.add("selected");
  if (index === question.correct) {
    score += 1;
    hint.textContent = "Boa! Resposta correta.";
  } else {
    answerButtons[index].classList.add("wrong");
    answerButtons[question.correct].classList.add("correct");
    hint.textContent = `A resposta era ${question.answers[question.correct]}.`;
  }
  answerButtons.forEach((button) => { button.disabled = true; });
  nextButton.disabled = false;
}

function showResult() {
  document.querySelector("#quiz-card").innerHTML = `
    <div class="result-screen">
      <span class="question-tag">QUIZ FINALIZADO</span>
      <h2>Você fez<br /><em>${score} de ${questions.length}</em> pontos.</h2>
      <p>${score === questions.length ? "Impressionante. Você acertou tudo." : "Cada resposta é uma nova chance de aprender algo."}</p>
      <button class="next-button" id="restart-button" type="button">Tentar novamente <span aria-hidden="true">↗</span></button>
    </div>`;
  document.querySelector("#restart-button").addEventListener("click", () => window.location.reload());
}

nextButton.addEventListener("click", () => {
  if (currentQuestion === questions.length - 1) showResult();
  else { currentQuestion += 1; renderQuestion(); }
});

renderQuestion();