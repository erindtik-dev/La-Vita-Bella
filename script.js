const questions = [
    {
        question: "Kush është regjisori i filmit 'La Vita è Bella'?",
        options: ["Roberto Benigni", "Steven Spielberg", "Martin Scorsese"],
        answer: 0
    },
    {
        question: "Cila është tema kryesore e filmit që zhvillohet gjatë Luftës së Dytë Botërore?",
        options: ["Dashuria dhe mbrojtja e një babai", "Një dokumentar lufte", "Një shfaqje komike"],
        answer: 0
    },
    {
        question: "Çfarë do të thotë 'La Vita è Bella' në gjuhën Shqipe?",
        options: ["Jeta është e Bukur", "Jeta është e Vështirë", "Jeta është e Shkurtër"],
        answer: 0
    },
    {
        question: "Çfarë roli luan Guido në film?",
        options: ["Një kamarier dhe baba", "Një ushtar", "Një mësues"],
        answer: 0
    },
    {
        question: "Si përfundon filmi për Guidon dhe djalin e tij?",
        options: ["Ata mbijetojnë dhe ribashkohen", "Ata vdesin në kamp", "Ata ikin herët"],
        answer: 0
    },
    {
        question: "Cila është emri i djalit të Guidos?",
        options: ["Giosuè", "Luca", "Marco"],
        answer: 0
    },
    {
        question: "Në cilin vit është prodhuar filmi 'La Vita è Bella'?",
        options: ["1997", "1995", "2000"],
        answer: 0
    },
    {
        question: "Çfarë çmimi fitoi filmi në Oscar?",
        options: ["Oscar për Filmin e Huaj", "Oscar për Aktorin Kryesor", "Oscar për Regjinë"],
        answer: 0
    },
    {
        question: "Si e shpjegon Guido luftën për djalin e tij?",
        options: ["Si një lojë", "Si një aventurë", "Si një histori të trishtë"],
        answer: 0
    },
    {
        question: "Kush është aktorja që luan rolin e Dorës?",
        options: ["Nicoletta Braschi", "Monica Bellucci", "Sophia Loren"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let playerName = '';

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.querySelectorAll('.option-btn').forEach(btn => btn.addEventListener('click', selectAnswer));
document.getElementById('generate-pdf').addEventListener('click', generatePDF);

function startQuiz() {
    playerName = document.getElementById('player-name').value.trim();
    if (!playerName) {
        alert('Ju lutem shkruani emrin tuaj. 😊');
        return;
    }
    document.getElementById('name-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }
    const q = questions[currentQuestionIndex];
    document.getElementById('question').textContent = q.question;
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.disabled = false;
        btn.style.background = 'linear-gradient(45deg, #a0522d, #cd853f)';
    });
    document.getElementById('feedback').classList.add('hidden');
    timeLeft = 15;
    document.getElementById('timer').textContent = `Koha e Mbetur: ${timeLeft} ⏳`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Koha e Mbetur: ${timeLeft} ⏳`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFeedback(false);
        }
    }, 1000);
}

function selectAnswer(e) {
    clearInterval(timer);
    const selected = parseInt(e.target.dataset.index);
    const correct = questions[currentQuestionIndex].answer;
    if (selected === correct) {
        score += 10;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = isCorrect ? 'Saktë! +10 pikë 🎉' : 'Gabim! 😔';
    feedback.style.color = isCorrect ? '#00ff00' : '#ff0000';
    feedback.classList.remove('hidden');
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function showResults() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('score-display').textContent = `Pikët Tuaja: ${score} 🌟`;
    let medal = 'Bronze 🥉';
    if (score >= 70) medal = 'Gold 🥇';  // Adjusted for more questions (max 100 points)
    else if (score >= 50) medal = 'Silver 🥈';
    document.getElementById('medal-display').textContent = `Medalja: ${medal}`;
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Certifikatë e Përfundimit', 105, 30, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`Emri: ${playerName}`, 20, 60);
    doc.text(`Pikët: ${score}`, 20, 80);
    doc.text(`Medalja: ${document.getElementById('medal-display').textContent.split(': ')[1]}`, 20, 100);
    doc.text('Nënshkruar: Mësuesja Kationa Olldashi', 20, 120);
    doc.save('certifikata.pdf');

}
