(function(){
    "use strict";

    const sourceTextarea = document.getElementById('sourceText');
    const translateBtn = document.getElementById('translateButton');
    const translationSpan = document.getElementById('translationResult');
    const outputPlaque = document.getElementById('outputPlaque');

    function autoResizeTextarea() {
        sourceTextarea.style.height = 'auto';
        sourceTextarea.style.height = sourceTextarea.scrollHeight + 'px';
    }

    sourceTextarea.addEventListener('input', autoResizeTextarea);
    function up(z) {
        return z.toUpperCase() === z;
    }
    function translateText(input) {
        if (!input || input.trim() === '') {
            return 'Введите текст для перевода';
        }
        let lines = input.split('\n');
        let ans = '';
        for (let line of lines) {
            let words = line.split(' ');
            for (let word of words) {
                let hasDig = /\d/.test(word);
                if (hasDig || word.length < 2 && word !== 'я' && word !== 'Я') {
                    ans += word;
                }
                else if (['я', 'меня', 'мне', 'мной', 'мною', 'мой', 'моего', 'моему', 'моим', 'моём', 'моя', 'моей', 'мою', 'моё', 'мои', 'моих', 'моим', 'моими'].includes(word)) {
                    if (up(word[0])) {
                        ans += 'Ч';
                    }
                    else {
                        ans += 'ч';
                    }
                }
                else if (word.slice(0, 3) === 'дру') {
                    ans += word.slice(0, 3) + 'н' + word.slice(4);
                }
                else {
                    if (word[word.length - 1] === 'й') {
                        ans += word + 'ный';
                    }
                    else if (word[word.length - 1] === 'о') {
                        ans += word + 'сть';
                    }
                    else {
                        ans += word + 'ность';
                    }
                }
                ans += ' ';
            }
            ans = ans.slice(0, -1);
            ans += '<br>';
        }
        return ans;
    }

    function onTranslateClick() {
        const inputValue = sourceTextarea.value;
        const translated = translateText(inputValue);

        translationSpan.innerHTML = translated;

        if (translated === 'Введите текст для перевода') {
            translationSpan.classList.add('placeholder-text');
        }
        else {
            translationSpan.classList.remove('placeholder-text');
        }
        outputPlaque.style.transition = 'background 0.15s, box-shadow 0.2s';
        outputPlaque.style.background = '#f4f9ff';
        outputPlaque.style.boxShadow = '0 8px 20px -8px rgba(46, 91, 255, 0.12), inset 0 0 0 1px #ffffff, inset 0 2px 4px #fff';

        setTimeout(() => {
            outputPlaque.style.background = '#fbfdff';
            outputPlaque.style.boxShadow = '0 8px 18px -6px rgba(0, 0, 0, 0.05), inset 0 0 0 1px #ffffff, inset 0 2px 4px #ffffff';
        }, 120);
    }

    function onTextareaKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onTranslateClick();
        }
    }

    translateBtn.addEventListener('click', onTranslateClick);
    sourceTextarea.addEventListener('keydown', onTextareaKeyDown);

    window.addEventListener('load', () => {
        sourceTextarea.focus();
    });

})();