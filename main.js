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

        '”': '"', '“': '"', '’': "'", '‘': '`'
    };
    const reg = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');
    return str.replace(reg, (match) => map[match])
        .replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
};

function renderText(str) {
    const txt = txtPreprocess((typeof str == 'string') ? str : document.getElementById('txt').value || 'Awaiting input...');
    let imgseq = '';
    for (let i = 0; i < txt.length; i++) {
        if (txt.codePointAt(i) == 0x0a) {
            imgseq += '<span class="height-spacer"></span><br clear="both">';
            continue;
        }
        imgseq += '<img class="glyph" src="glyphs/16seg/' + txt.codePointAt(i).toString(16) + '.png">';
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

const txt = document.getElementById('txt');
txt.addEventListener('input', renderText);
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
                    txt.value = 'トリナクコヱス ユメサマセ\nミヨアケワタル ヒンカシヲ\nソライロハエテ オキツヘニ\nホフネムレヰヌ モヤノナカ';
                    break;
                default:
                    break;
            }
            renderText();
        }
    );
}
document.getElementById('type-text').addEventListener('click', () => txt.focus());
const font = document.getElementById('font');
font.addEventListener('change', updateDescription);
const clockFormat = document.getElementById('clock-format');
clockFormat.addEventListener('input', renderClock);
let timerID = null;
const types = document.querySelectorAll('input[name="type"]');
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
                    renderText();
                    break;
                case 'clock':
                    clockWrap.style.display = 'block';
                    renderClock();
                    timerID = setInterval(renderClock, 1000);
                    break;
                default:
                    break;
            }
        }
    );
}
window.onload = function () {renderText('Hello, world!\nこんにちは、せかい!'); updateDescription();};