function txtPreprocess(str) {
    var map = {
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
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・', 'ﾞ': '゛', 'ﾟ': '゜', '　': ' '
    };
    var reg = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');
    return str.replace(reg, function (match) {return map[match];})
};

function render(str) {
    var txt = (typeof str == 'string') ? str : document.getElementById('txt').value || 'Awaiting input...';
    txt = txtPreprocess(txt).replace(/[！-～]/g, function (s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);});
    var imgseq = '';
    for (var i = 0; i < txt.length; i++) {
        if (txt.codePointAt(i) == 0x0a) {
            imgseq += '<span class="height-spacer"></span><br clear="both">';
            continue;
        }
        imgseq += '<img class="glyph" src="glyphs/16seg/' + txt.codePointAt(i).toString(16) + '.png">';
    }
    document.getElementById('imgseq').innerHTML = imgseq;
}

function updateDescription() {
    var font = document.getElementById('font').value;
    var desc = document.getElementById('description');
    switch (font) {
        case '16seg':
            desc.innerText = '16-segment display. Compatible with ASCII, Hiragana, and Katakana.';
            break;
        default:
            desc.innerText = 'Description unavailable.';
            break;
    }
}

let txt = document.getElementById('txt');
txt.addEventListener('input', render);
let font = document.getElementById('font');
font.addEventListener('change', updateDescription);
window.onload = render('Hello, world!\nこんにちは、せかい!');