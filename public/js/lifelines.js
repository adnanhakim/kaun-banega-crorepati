const audiencePoll = document.getElementById('audience-poll');
const fiftyFifty = document.getElementById('50-50');
const flipTheQuestion = document.getElementById('flip-the-question');
const askTheExpert = document.getElementById('ask-the-expert');

audiencePoll.addEventListener('click', () => {
    if (audiencePoll.classList.contains('unused')) {
        // Use the lifeline
    } else {
        console.log('Already used');
    }
});

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
