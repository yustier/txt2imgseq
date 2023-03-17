class img16seg {
    static width = 40;
    static height = 52;
}

let imgseqText = 'Hello, world!\nこんにちは、せかい!';

function txtPreprocess(str) {
    const map = {
        'が': 'か゛', 'ぎ': 'き゛', 'ぐ': 'く゛', 'げ': 'け゛', 'ご': 'こ゛',
        'ざ': 'さ゛', 'じ': 'し゛', 'ず': 'す゛', 'ぜ': 'せ゛', 'ぞ': 'そ゛',
        'だ': 'た゛', 'ぢ': 'ち゛', 'づ': 'つ゛', 'で': 'て゛', 'ど': 'と゛',
        'ば': 'は゛', 'び': 'ひ゛', 'ぶ': 'ふ゛', 'べ': 'へ゛', 'ぼ': 'ほ゛',
        'ぱ': 'は゜', 'ぴ': 'ひ゜', 'ぷ': 'ふ゜', 'ぺ': 'へ゜', 'ぽ': 'ほ゜',
        'ゔ': 'う゛',

        'ガ': 'カ゛', 'ギ': 'キ゛', 'グ': 'ク゛', 'ゲ': 'ケ゛', 'ゴ': 'コ゛',
        'ザ': 'サ゛', 'ジ': 'シ゛', 'ズ': 'ス゛', 'ゼ': 'セ゛', 'ゾ': 'ソ゛',
        'ダ': 'タ゛', 'ヂ': 'チ゛', 'ヅ': 'ツ゛', 'デ': 'テ゛', 'ド': 'ト゛',
        'バ': 'ハ゛', 'ビ': 'ヒ゛', 'ブ': 'フ゛', 'ベ': 'ヘ゛', 'ボ': 'ホ゛',
        'パ': 'ハ゜', 'ピ': 'ヒ゜', 'プ': 'フ゜', 'ペ': 'ヘ゜', 'ポ': 'ホ゜',
        'ヴ': 'ウ゛', 'ヷ': 'ワ゛', 'ヸ': 'ヰ゛', 'ヹ': 'ヱ゛', 'ヺ': 'ヲ゛',

        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・', 'ﾞ': '゛', 'ﾟ': '゜', '　': ' ',

        '”': '"', '“': '"', '’': "'", '‘': '`', '…': '...'
    };
    const reg = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');
    return str.replace(reg, (match) => map[match])
              .replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
}

function renderText(str) {
    const text = txtPreprocess((typeof str == 'string') ? str : txt.value || 'Awaiting input...');
    imgseqText = text;
    let imgseq = '';
    for (let i = 0; i < text.length; i++) {
        if (text.codePointAt(i) == 0x0a) {
            imgseq += '<span class="height-spacer"></span><br clear="both">';
            continue;
        }
        imgseq += '<img class="glyph" src="glyphs/' + font.value + '/' + text.codePointAt(i).toString(16) + '.png">';
    }
    document.getElementById('imgseq').innerHTML = imgseq;
}

function renderClock() {
    const time = new Date().format(clockFormat.value);
    renderText(time);
}

function updateDescription() {
    const desc = document.getElementById('description');
    switch (font.value) {
        case '16seg':
            desc.innerText = '16-segment display. Compatible with ASCII, JIS X 0201, Hiragana, Katakana, and some glyphs from dot matrix LCD.';
            break;
        default:
            desc.innerText = 'Description unavailable.';
            break;
    }
}

function saveImage() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext) {
        const imgseq = document.getElementById('imgseq');
        const ctx = canvas.getContext('2d');
        const text = imgseqText;
        console.log(text.length);
        if (text.length == 0) {
            return;
        }
        let xmax = 0;
        let ymax = 1;
        let x = 0;
        let y;
        for (let i = 0; i < text.length; i++) {
            if (text.codePointAt(i) == 0x0a) {
                ymax++;
                x = 0;
                continue;
            }
            x++;
            xmax = Math.max(xmax, x);
        }
        const size = document.getElementById('size').value;
        canvas.width = xmax * img16seg.width * size;
        canvas.height = ymax * img16seg.height * size;
        if (document.getElementById('fill-bg').checked) {
            const space = document.querySelector('img[src="glyphs/' + font.value + '/20.png"]');
            const spaceTile = document.createElement('canvas');
            spaceTile.width = space.width * size;
            spaceTile.height = space.height * size;
            const spacetilectx = spaceTile.getContext('2d');
            spacetilectx.drawImage(space, 0, 0, spaceTile.width, spaceTile.height);
            ctx.fillStyle = ctx.createPattern(spaceTile, 'repeat');
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        x = 0;
        y = 0;
        for (let i = 0; i < text.length; i++) {
            if (text.codePointAt(i) == 0x0a) {
                y++;
                x = 0;
                continue;
            }
            const glyph = document.querySelector('img[src="glyphs/' + font.value + '/' + text.codePointAt(i).toString(16) + '.png"]');
            ctx.drawImage(glyph, x * glyph.width * size, y * glyph.height * size, glyph.width * size, glyph.height * size);
            x++;
        }
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = '';
        link.click();

    } else {
        alert('Currently, this feature is only available in modern browsers.');
        // I may add a fallback in the future
    }
}

const txt = document.getElementById('txt');
txt.addEventListener('input', function () {
    txt.value ? save.disabled = false : save.disabled = true;
    renderText();
});

const samples = document.querySelectorAll('input[name="sample"]');
for (let sample of samples) {
    sample.addEventListener('click',
        function () {
            switch (sample.value) {
                case 'Pangram':
                    txt.value = 'The quick brown fox\n'+
                                'jumps over the lazy dog.\n'+
                                'WALTZ, BAD NYMPH,\n'+
                                'FOR QUICK JIGS VEX!';
                    break;
                case 'Lorem ipsum':
                    txt.value = 'Lorem ipsum dolor sit amet,\n'+
                                'consectetur adipiscing elit,\n'+
                                'sed do eiusmod tempor\n'+
                                'incididunt ut labore et\n'+
                                'dolore magna aliqua.';
                    break;
                case 'いろはうた':
                    txt.value = 'いろはにほへと ちりぬるを\nわかよたれそ  つねならむ\nうゐのおくやま けふこえて\nあさきゆめみし ゑひもせす';
                    break;
                case 'トリナクウタ':
                    txt.value = 'トリナクコヱス ユメサマセ\nミヨアケワタル ヒンカシヲ\nソライロハエテ オキツヘニ\nホフネムレヰヌ モヤノウチ';
                    break;
                default:
                    break;
            }
            renderText();
        }
    );
}

const font = document.getElementById('font');
font.addEventListener('change', updateDescription);

const clockFormat = document.getElementById('clock-format');
clockFormat.addEventListener('input', renderClock);

const types = document.querySelectorAll('input[name="type"]');
let timerID = null;
for (let type of types) {
    type.addEventListener('change',
        function changeInputArea() {
            const txtWrap = document.getElementById('txt-wrap');
            const clockWrap = document.getElementById('clock-wrap');
            txtWrap.style.display = 'none';
            clockWrap.style.display = 'none';
            clearInterval(timerID);
            switch (type.value) {
                case 'text':
                    txtWrap.style.display = 'block';
                    txt.focus();
                    renderText();
                    break;
                case 'clock':
                    clockWrap.style.display = 'block';
                    clockFormat.focus();
                    clockFormat.setSelectionRange(clockFormat.value.length, clockFormat.value.length);
                    renderClock();
                    timerID = setInterval(renderClock, 1000);
                    break;
                default:
                    break;
            }
        }
    );
}

const save = document.getElementById('save');
save.addEventListener('click', saveImage);

window.onload = function () {renderText(imgseqText); updateDescription();};