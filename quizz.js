document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.question-container');
    const progressBar = document.getElementById('progress-bar');
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');
    const quizForm = document.getElementById('quiz-form');
    const resultContainer = document.getElementById('quiz-result');

    let currentQuestionIndex = 0;

    // Réponses correctes
    const correctAnswers = ['A', 'B'];
    let score = 0;

    // Affiche la question actuelle
    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.classList.remove('d-none');
            } else {
                question.classList.add('d-none');
            }
        });

        // Met à jour la barre de progression
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;

        // Gère la visibilité des boutons
        if (index === questions.length - 1) {
            nextButton.classList.add('d-none');
            submitButton.classList.remove('d-none');
        } else {
            nextButton.classList.remove('d-none');
            submitButton.classList.add('d-none');
        }
    }

    // Affiche la question suivante
    nextButton.addEventListener('click', function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });

    // Gère la soumission du formulaire
    quizForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Calcule le score
        questions.forEach((question, index) => {
            const selectedAnswer = question.querySelector('input[type="radio"]:checked');
            if (selectedAnswer && selectedAnswer.value === correctAnswers[index]) {
                score++;
            }
        });

        // Affiche le résultat
        resultContainer.textContent = `Votre score : ${score}/${correctAnswers.length}`;
        if (score === correctAnswers.length) {
            resultContainer.style.color = 'green';
            resultContainer.textContent += ' - Excellent !';
        } else {
            resultContainer.style.color = 'red';
            resultContainer.textContent += ' - Essayez encore !';
        }

        // Cache les questions après soumission
        quizForm.classList.add('d-none');
    });

    // Initialise la première question
    showQuestion(currentQuestionIndex);
});
