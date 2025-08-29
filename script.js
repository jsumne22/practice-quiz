
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
    },
    // Q4
    {
        type: 'text',
        question: 'What is the slope of the line that passes through the points (7, -8) and (-2, 4)?',
        answer: '-1.333',
        plot: {
            type: 'points-line',
            points: [
                {x: 7, y: -8},
                {x: -2, y: 4}
            ],
            xaxis: {range: [-12, 12], title: 'x'},
            yaxis: {range: [-12, 12], title: 'y'},
            color: 'blue'
        }
    },
    // Q5
    {
        type: 'text',
        question: 'What is the slope of the line that passes through the points (-9, 10) and (5, -6)?',
        answer: '-1.143',
        plot: {
            type: 'points-line',
            points: [
                {x: -9, y: 10},
                {x: 5, y: -6}
            ],
            xaxis: {range: [-12, 12], title: 'x'},
            yaxis: {range: [-12, 12], title: 'y'},
            color: 'blue'
        }
    },
    // Q6
    {
        type: 'text',
        question: 'What is the slope of the line that passes through the points (10, -3) and (-4, 7)?',
        answer: '-0.714',
        plot: {
            type: 'points-line',
            points: [
                {x: 10, y: -3},
                {x: -4, y: 7}
            ],
            xaxis: {range: [-12, 12], title: 'x'},
            yaxis: {range: [-12, 12], title: 'y'},
            color: 'blue'
        }
    },
    // Q7
    {
        type: 'text',
        question: 'What is the slope of the line that passes through the points (-8, -10) and (6, 2)?',
        answer: '0.857',
        plot: {
            type: 'points-line',
            points: [
                {x: -8, y: -10},
                {x: 6, y: 2}
            ],
            xaxis: {range: [-12, 12], title: 'x'},
            yaxis: {range: [-12, 12], title: 'y'},
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
        // Add a submit button and a container for the solution/feedback
        html += `<button type="button" class="question-submit" data-idx="${idx}">Submit</button>`;
        html += `<div class="solution" id="solution${idx}"></div>`;
        div.innerHTML = html;
        form.appendChild(div);
    });
}



function gradeQuestion(idx) {
    const q = questions[idx];
    const form = document.getElementById('quiz-form');
    let userAnswer = '';
    if (q.type === 'multiple-choice') {
        const radios = form.querySelectorAll(`input[name="q${idx}"]`);
        radios.forEach(radio => { if (radio.checked) userAnswer = radio.value; });
    } else {
        userAnswer = form[`q${idx}`].value.trim();
    }
    const isCorrect = userAnswer === q.answer;
    const solutionDiv = document.getElementById(`solution${idx}`);
    if (solutionDiv) {
        solutionDiv.innerHTML = `<div class="${isCorrect ? 'correct' : 'incorrect'}">`
            + `Your answer: ${userAnswer} <br>`
            + `Correct answer: ${q.answer}`
            + `</div>`;
    }
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
    document.getElementById('quiz-form').addEventListener('click', function(e) {
        if (e.target.classList.contains('question-submit')) {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            gradeQuestion(idx);
        }
    });
});
