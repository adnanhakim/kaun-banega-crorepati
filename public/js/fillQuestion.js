// TODO Get the questions per slot

const container = {
    question: document.getElementById('question'),
    option1: document.getElementById('option1'),
    option2: document.getElementById('option2'),
    option3: document.getElementById('option3'),
    option4: document.getElementById('option4')
};

let questionId = 0;

const request = new XMLHttpRequest();

request.onload = () => {
    let responseObject = null;

    try {
        responseObject = JSON.parse(request.responseText);
    } catch (err) {
        console.log('Could not parse JSON!');
    }

    if (responseObject) handleResponse(responseObject, request.status);
};

request.open('get', 'http://localhost:3000/api/question/640000', true);
request.send();

function handleResponse(responseObject, status) {
    console.log(responseObject);
    console.log(status);
    if (status == 200) {
        questionId = responseObject[0]._id;
        container.question.innerHTML = responseObject[0].question;
        setTimeout(() => {
            container.option1.innerHTML = `<input type="radio" name="answer" id="1" value="1" /><span class="option-color" id="option-color1">A:&nbsp;</span> ${responseObject[0].option1} <span class="checked"></span>`;
            container.option2.innerHTML = `<input type="radio" name="answer" id="2" value="2" /><span class="option-color" id="option-color2">B:&nbsp;</span> ${responseObject[0].option2} <span class="checked"></span>`;
            container.option3.innerHTML = `<input type="radio" name="answer" id="3" value="3" /><span class="option-color" id="option-color3">C:&nbsp;</span> ${responseObject[0].option3} <span class="checked"></span>`;
            container.option4.innerHTML = `<input type="radio" name="answer" id="4" value="4" /><span class="option-color" id="option-color4">D:&nbsp;</span> ${responseObject[0].option4} <span class="checked"></span>`;
        }, 5000);
    } else {
        console.log('Error');
    }
}

const lock = document.getElementById('lock-button');
console.log(lock);
lock.addEventListener('click', () => {
    // Gets the selected input radio button
    const selectedAnswer = Array.from(
        document.getElementsByName('answer')
    ).filter(element => element.checked == true);
    console.log(selectedAnswer);

    // Gets the parent of input button -> Label
    const answerLabel = selectedAnswer[0].parentNode;

    // Gets the last child of Label -> Span and hides it after it has been clicked
    const spans = document.querySelectorAll('.checked');
    spans.forEach(span => {
        span.style.visibility = 'hidden';
    });

    // Gets the corrected answer option color and makes it white
    const optionColorSpan = document.getElementById(
        `option-color${selectedAnswer[0].value}`
    );
    optionColorSpan.style.color = '#ececec';

    // Sets the color of label to yellow
    answerLabel.style.background =
        'linear-gradient(90deg, rgba(240,176,0,1) 0%, rgba(224,209,70,1) 50%, rgba(240,176,0,1) 100%)';
    answerLabel.style.color = '#2a2a2a';
    console.log(selectedAnswer[0].parentNode);
    console.log(selectedAnswer[0].value);

    checkAnswer(selectedAnswer[0].value);
    lock.disabled = true;
});

function checkAnswer(selectedAnswer) {
    const checkRequest = new XMLHttpRequest();

    checkRequest.onload = () => {
        let responseObject = null;
        try {
            responseObject = JSON.parse(checkRequest.responseText);
        } catch (err) {
            console.log('Could not parse JSON!');
        }

        if (responseObject) {
            if (checkRequest.status == 200) {
                const selectedAnswerLabel = document.getElementById(
                    `option${selectedAnswer}`
                );
                setTimeout(() => {
                    if (responseObject.answer == selectedAnswer) {
                        console.log('Correct answer!');
                        selectedAnswerLabel.style.background =
                            'linear-gradient(90deg, rgba(47,132,4,1) 0%, rgba(87,212,8,1) 50%, rgba(47,132,4,1) 100%)';
                        selectedAnswerLabel.style.color = '#ffffff';

                        const optionColorSpan = document.getElementById(
                            `option-color${selectedAnswer}`
                        );
                        optionColorSpan.style.color = '#f0d245';
                    } else {
                        console.log('Incorrect answer!');
                        selectedAnswerLabel.style.background =
                            'linear-gradient(90deg, rgba(240,176,0,1) 0%, rgba(224,209,70,1) 50%, rgba(240,176,0,1) 100%)';
                        const correctAnswerLabel = document.getElementById(
                            `option${responseObject.answer}`
                        );
                        correctAnswerLabel.style.background =
                            'linear-gradient(90deg, rgba(47,132,4,1) 0%, rgba(87,212,8,1) 50%, rgba(47,132,4,1) 100%)';
                        correctAnswerLabel.style.color = '#ffffff';
                    }
                }, 2000);
            } else {
                console.log('Error: ' + responseObject.error);
            }
        }
    };

    checkRequest.open(
        'get',
        `http://localhost:3000/api/checkanswer/${questionId}`,
        true
    );
    checkRequest.send();
}

// Lifelines
const audiencePoll = document.getElementById('audience-poll');
const fiftyFifty = document.getElementById('50-50');
const flipTheQuestion = document.getElementById('flip-the-question');
const askTheExpert = document.getElementById('ask-the-expert');

audiencePoll.addEventListener('click', () => {
    const div = document.getElementById('audience-poll-div');
    if (div.classList.contains('unused')) {
        // Use the lifeline
        const dialog = document.getElementById('audience-poll-dialog');
        dialog.style.display = 'block';

        const audiencePollRequest = new XMLHttpRequest();
        audiencePollRequest.onload = () => {
            let responseObject = null;

            try {
                responseObject = JSON.parse(audiencePollRequest.responseText);
            } catch (err) {
                console.log('Could not parse JSON!');
            }

            if (responseObject) {
                if (audiencePollRequest.status == 200) {
                    createChart(
                        responseObject.option1,
                        responseObject.option2,
                        responseObject.option3,
                        responseObject.option4
                    );
                } else {
                    console.log('Error');
                }
            }
        };
        audiencePollRequest.open(
            'get',
            `http://localhost:3000/api/lifelines/audiencepoll/${questionId}`,
            true
        );
        audiencePollRequest.send();

        const btnClose = document.getElementById('audience-poll-close');
        btnClose.addEventListener('click', () => {
            const dialog = document.getElementById('audience-poll-dialog');
            dialog.style.display = 'none';
        });

        div.classList.remove('unused');
    } else {
        console.log('Already used');
    }
});

function createChart(option1, option2, option3, option4) {
    Chart.defaults.global.defaultFontFamily = 'Poppins';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = '#fff';

    const ctx = document.getElementById('chart').getContext('2d');
    ctx.fillStyle = 'white';
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(240,176,0,1)');
    gradient.addColorStop(0.5, 'rgba(224,209,70,1)');
    gradient.addColorStop(1, 'rgba(240,176,0,1)');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [
                {
                    label: 'Percentage',
                    data: [option1, option2, option3, option4],
                    backgroundColor: gradient
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Audience Poll',
                fontSize: 18
            },
            legend: {
                display: false
            },
            gridLines: {
                color: '#fff'
            },
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 20
                        }
                    }
                ],
                xAxes: [
                    {
                        categorySpacing: 0.5,
                        barPercentage: 0.5,
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        }
    });
}

fiftyFifty.addEventListener('click', () => {
    if (fiftyFifty.classList.contains('unused')) {
        // Use the lifeline
    } else {
        console.log('Already used');
    }
});

flipTheQuestion.addEventListener('click', () => {
    if (flipTheQuestion.classList.contains('unused')) {
        // Use the lifeline
    } else {
        console.log('Already used');
    }
});

askTheExpert.addEventListener('click', () => {
    if (askTheExpert.classList.contains('unused')) {
        // Use the lifeline
    } else {
        console.log('Already used');
    }
});
