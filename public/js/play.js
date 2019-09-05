const lock = document.getElementById('lock-button');
lock.addEventListener('click', () => {
    selected_answer = Array.from(document.getElementsByName('answer')).filter(
        element => element.checked == true
    );
    const answer_label = selected_answer[0].parentNode;
    answer_label.style.backgroundColor = '#f0d245';
    answer_label.style.color = '#2a2a2a';
    console.log(selected_answer[0].parentNode);
    console.log(selected_answer[0].value);

    lock.disabled = true;
});
