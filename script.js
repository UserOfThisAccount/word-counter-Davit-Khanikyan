const change_bg_button = document.querySelector('.container__button');
const word_count_element = document.querySelector('.word__count');
const letter_count_element = document.querySelector('.letter__count');
const text_input = document.querySelector('.text__input');
const container = document.querySelector('.container');
const containe_title = document.querySelector('.container__title')

function at_least_two_characters(text) {
    const letters = text.match(/[a-z]/gi) || [];
    return letters.length >= 2;
}

function abscence_of_three_consecutive_characters(text) {
    for (const character of text) {
        const occurrences = Array.from(text).filter((v) => v === character).length;
        if (occurrences >= 3) {
            return false;
        }
    }
    return true;
}

const checks = [at_least_two_characters, abscence_of_three_consecutive_characters];

text_input.addEventListener('input', () => {
    const splitted = text_input.value.trim().split(/[\s-]/);
    const letter_count = (text_input.value.match(/[a-z]/gi) || []).length;
    let wordCount = 0;

    outer:
    for (const text of splitted) {
        for (const check of checks) {
            if (!check(text)) {
                continue outer;
            }
        }
        wordCount++;
    }

    word_count_element.textContent = wordCount;
    letter_count_element.textContent = letter_count;
});

function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// change text color based on background brightness
function get_text_color(backgroundColor) {
    const rgb = hex_to_rgb(backgroundColor);
    const brightness = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    return brightness > 128 ? 'black' : 'white';
}

function hex_to_rgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

change_bg_button.addEventListener('click', () => {
    const new_color = randomColor();
    container.style.backgroundColor = new_color;

    // readable text yay
    container.style.color = get_text_color(new_color);
    containe_title.style.color = get_text_color(new_color);
    word_count_element.style.color = get_text_color(new_color);
    letter_count_element.style.color = get_text_color(new_color);
});
