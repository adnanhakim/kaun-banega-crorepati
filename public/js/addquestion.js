const form = {
    question: document.getElementById('question'),
    option1: document.getElementById('option1'),
    option2: document.getElementById('option2'),
    option3: document.getElementById('option3'),
    option4: document.getElementById('option4'),
    answer: document.getElementById('answer'),
    slot: document.getElementById('price'),
    messages: document.getElementById('form-messages'),
    status: document.getElementById('status'),
    submit: document.getElementById('btn-submit')
};

form.submit.addEventListener('click', () => {
    console.log('Pressed');

    const request = new XMLHttpRequest();

    while (form.messages.firstElementChild) {
        form.messages.removeChild(form.messages.firstElementChild);
    }
    form.messages.style.display = 'none';

    while (form.status.firstElementChild) {
        form.status.removeChild(form.status.firstElementChild);
    }
    form.status.style.display = 'none';

    request.onload = () => {
        let responseObject = null;

        try {
            responseObject = JSON.parse(request.responseText);
        } catch (err) {
            console.log('Could not parse JSON!');
        }

        if (responseObject) handleResponse(responseObject, request.status);
    };

    const requestData = {
        question: form.question.value,
        option1: form.option1.value,
        option2: form.option2.value,
        option3: form.option3.value,
        option4: form.option4.value,
        answer: form.answer.value,
        slot: form.slot.value
    };

    request.open('post', 'http://localhost:3000/api/add', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(requestData));
});

function handleResponse(responseObject, status) {
    console.log(responseObject);
    console.log(status);
    if (status == 200) {
        const liQuestionId = document.createElement('li');
        liQuestionId.textContent =
            'Question Id: ' + responseObject.question._id;

        form.status.appendChild(liQuestionId);
        form.status.style.display = 'block';
        clear();
    } else {
        const liError = document.createElement('li');
        liError.textContent = responseObject.error;
        form.messages.appendChild(liError);
        form.messages.style.display = 'block';
    }
}

function clear() {
    form.question.value = '';
    form.option1.value = '';
    form.option2.value = '';
    form.option3.value = '';
    form.option4.value = '';
    form.answer.value = '';
}
