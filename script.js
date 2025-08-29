
// script.js for quiz app
// Define your questions here. Add one at a time as you work.
const questions = [
    {
        type: 'multiple-choice',
        question: 'Look at the graph below. What is the slope of the line?',
        options: [
            'Positive',
            'Negative',
            'Zero',
            'Undefined'
        ],
        answer: 'Positive',
        plot: {
            type: 'line',
            x: [-5, 5],
            y: [-5 * 2 + 10, 5 * 2 + 10],
            xaxis: {range: [-5, 10], title: 'x'},
            yaxis: {range: [0, 25], title: 'y'},
            color: 'blue'
        }
    },
    {
        type: 'multiple-choice',
        question: 'Look at the graph below. What is the slope of the line?',
        options: [
            'Positive',
            'Negative',
            'Zero',
            'Undefined'
        ],
        answer: 'Undefined',
        plot: {
            type: 'vertical',
            x: [5, 5],
            y: [0, 25],
            xaxis: {range: [-5, 10], title: 'x'},
            yaxis: {range: [0, 25], title: 'y'},
            color: 'blue'
        }
    },
    {
        type: 'text',
        question: 'What is the slope of the line that passes through the points (6, 9) and (3, 3)?',
        answer: '2',
        plot: {
            type: 'points-line',
            points: [
                {x: 6, y: 9},
                {x: 3, y: 3}
            ],
            xaxis: {range: [0, 10], title: 'x'},
            yaxis: {range: [0, 12], title: 'y'},
            color: 'blue'
        }
    }
];

function renderQuiz() {
    const form = document.getElementById('quiz-form');
    form.innerHTML = '';
    questions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'question';
        let html = `<label>${idx + 1}. ${q.question}</label>`;
        if (q.plot) {
            html += `<div id="plot${idx}" style="width:100%;max-width:400px;height:300px;"></div>`;
        }
        if (q.type === 'multiple-choice') {
            q.options.forEach(opt => {
                html += `<label><input type="radio" name="q${idx}" value="${opt}" required> ${opt}</label>`;
            });
        } else if (q.type === 'text') {
            html += `<input type="text" id="q${idx}" name="q${idx}" required />`;
        }
        // Add a container for the solution/feedback
        html += `<div class="solution" id="solution${idx}"></div>`;
        div.innerHTML = html;
        form.appendChild(div);
    });
}


function gradeQuiz(event) {
    event.preventDefault();
    const form = document.getElementById('quiz-form');
    let score = 0;
    questions.forEach((q, idx) => {
        let userAnswer = '';
        if (q.type === 'multiple-choice') {
            const radios = form.querySelectorAll(`input[name="q${idx}"]`);
            radios.forEach(radio => { if (radio.checked) userAnswer = radio.value; });
        } else {
            userAnswer = form[`q${idx}`].value.trim();
        }
        const isCorrect = userAnswer === q.answer;
        if (isCorrect) score++;
        // Show solution/feedback under each question
        const solutionDiv = document.getElementById(`solution${idx}`);
        if (solutionDiv) {
            solutionDiv.innerHTML = `<div class="${isCorrect ? 'correct' : 'incorrect'}">`
                + `Your answer: ${userAnswer} <br>`
                + `Correct answer: ${q.answer}`
                + `</div>`;
        }
    });
    const scoreHTML = `<div id="quiz-score">${score} / ${questions.length}</div>`;
    document.getElementById('result').innerHTML = scoreHTML;
    document.getElementById('submit-btn').disabled = true;
}

function renderPlots() {
    questions.forEach((q, idx) => {
        if (q.plot) {
            let trace, layout;
            const color = q.plot.color || 'blue';
            if (q.plot.type === 'points-line') {
                trace = {
                    x: q.plot.points.map(p => p.x),
                    y: q.plot.points.map(p => p.y),
                    mode: 'lines+markers',
                    type: 'scatter',
                    line: {color: color, width: 3},
                    marker: {color: color, size: 10}
                };
                layout = {
                    xaxis: q.plot.xaxis,
                    yaxis: q.plot.yaxis,
                    margin: {t: 10},
                    showlegend: false
                };
            } else {
                trace = {
                    x: q.plot.x,
                    y: q.plot.y,
                    mode: 'lines',
                    type: 'scatter',
                    line: {color: color, width: 3}
                };
                layout = {
                    xaxis: q.plot.xaxis,
                    yaxis: q.plot.yaxis,
                    margin: {t: 10},
                    showlegend: false
                };
            }
            Plotly.newPlot(`plot${idx}`, [trace], layout, {displayModeBar: false});
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
    setTimeout(renderPlots, 0);
    document.getElementById('quiz-form').addEventListener('submit', gradeQuiz);
});
