const parentBox = document.getElementById('parentBox');
const scores = document.querySelectorAll('.score h2 span');
let boxes = [];


function startGame() {
    for (let t = 0; t < 200; t++) {
        if (t === 65) {
            let eleman = document.createElement('div');
            eleman.className = 'box';
            eleman.innerHTML = `<div class="head"></div>`;
            parentBox.appendChild(eleman);
            boxes.push(eleman);
        }
        else {
            let eleman = document.createElement('div');
            eleman.className = 'box';
            eleman.innerHTML = `<div class=""></div>`;
            parentBox.appendChild(eleman);
            boxes.push(eleman);
        }
    }
    ballRandom()

    if (localStorage.getItem('score')) {
        scores[0].textContent = localStorage.getItem('score').split(',');
    }
    else {
        document.querySelector('.score h1').textContent = 1;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();
})
//////////////////////////////////////////////////////////////////////////// size parentBox

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

const handleResize = () => {

    let heightWindo = window.innerHeight;
    let widthParentBox = parentBox.getBoundingClientRect().width;

    parentBox.style.height = (widthParentBox / 2) + 'px';

    if (heightWindo < (widthParentBox / 2)) {
        parentBox.style.height = heightWindo + 'px';
        parentBox.style.width = (heightWindo * 2) + 'px';
    }
};

window.addEventListener("DOMContentLoaded", handleResize);
window.addEventListener("resize", debounce(handleResize, 200));

//////////////////////////////////////////////////////////////////////////// buttons

const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const topBtn = document.getElementById('topBtn');
const bottomBtn = document.getElementById('bottomBtn');

leftBtn.addEventListener('mousedown', () => {
    move(-1);
});
rightBtn.addEventListener('mousedown', () => {
    move(1);
});
topBtn.addEventListener('mousedown', () => {
    move(-20);
});
bottomBtn.addEventListener('mousedown', () => {
    move(20);
});

//////////////////////////////////////////////////////////////////////////// addEventListener buttons


let goInterValid, speed = 150;

function goLeft() {

    for (let n = 0; n < boxes.length; n++) {

        if (n % 20 !== 0) {
            if (boxes[n - 1]) {
                if (boxes[n].children[0].classList.contains('head') == true) {
                    boxes[n].children[0].classList.remove('head');
                    boxes[n - 1].children[0].classList.add('head');

                    tanzim(n);

                    break;
                }
            }
        }
        else if (n % 20 === 0) {
            if (boxes[n].children[0].classList.contains('head') == true) {
                boxes[n].children[0].classList.remove('head');
                boxes[n + 19].children[0].classList.add('head');

                tanzim(n);

                break;
            }
        }
    }
    for (let n = 0; n < boxes.length; n++) {

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('tail') == true) {
            lose(n);
        }

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('ball') == true) {
            ballRandom();
            backType();
            saveData();
            scores[1].textContent = marhale.length;
        }

        createTail(n);

    }
}
function startGoLeft() {
    goInterValid = setInterval(() => {
        goLeft();
    }, speed);
};
function stopGoLeft() {
    clearInterval(goInterValid);
};


function goRight() {
    for (let n = 0; n < boxes.length; n++) {
        if ((n + 1) % 20 !== 0) {
            if (boxes[n + 1]) {
                if (boxes[n].children[0].classList.contains('head') == true) {
                    boxes[n].children[0].classList.remove('head');
                    boxes[n + 1].children[0].classList.add('head');

                    tanzim(n);

                    break;
                }
            }
        }
        else if ((n + 1) % 20 === 0) {
            if (boxes[n].children[0].classList.contains('head') == true) {
                boxes[n].children[0].classList.remove('head');
                boxes[n - 19].children[0].classList.add('head');

                tanzim(n);

                break;
            }
        }
    }
    for (let n = 0; n < boxes.length; n++) {

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('tail') == true) {
            lose(n);
        }

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('ball') == true) {
            ballRandom();
            backType();
            saveData();
            scores[1].textContent = marhale.length;
        }

        createTail(n);

    }
}
function startGoRight() {
    goInterValid = setInterval(() => {
        goRight();
    }, speed);
};
function stopGoRight() {
    clearInterval(goInterValid);
};


function goBottom() {
    for (let n = 0; n < boxes.length; n++) {
        if (boxes[n - 20]) {
            if (boxes[n].children[0].classList.contains('head') == true) {
                boxes[n].children[0].classList.remove('head');
                boxes[n - 20].children[0].classList.add('head');

                tanzim(n);

                break;
            }
        }
        else if (n < 20) {
            if (boxes[n].children[0].classList.contains('head') == true) {
                boxes[n].children[0].classList.remove('head');
                boxes[n + 180].children[0].classList.add('head');

                tanzim(n);

                break;
            }
        }
    }
    for (let n = 0; n < boxes.length; n++) {

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('tail') == true) {
            lose(n);
        }

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('ball') == true) {
            ballRandom();
            backType();
            saveData();
            scores[1].textContent = marhale.length;
        }

        createTail(n);

    }
}
function startGoBottom() {
    goInterValid = setInterval(() => {
        goBottom();
    }, speed);
};
function stopGoBottom() {
    clearInterval(goInterValid);
};


function goTop() {
    for (let n = 0; n < boxes.length; n++) {
        if (boxes[n + 20]) {
            if (boxes[n].children[0].classList.contains('head') == true) {
                boxes[n].children[0].classList.remove('head');
                boxes[n + 20].children[0].classList.add('head');

                tanzim(n);

                break;
            }
        }
        else if (n >= 180) {
            if (boxes[n].children[0].classList.contains('head') == true) {
                boxes[n].children[0].classList.remove('head');
                boxes[n - 180].children[0].classList.add('head');

                tanzim(n);

                break;
            }
        }
    }
    for (let n = 0; n < boxes.length; n++) {

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('tail') == true) {
            lose(n);
        }

        if (boxes[n].children[0].classList.contains('head') == true && boxes[n].children[0].classList.contains('ball') == true) {
            ballRandom();
            backType();
            saveData();
            scores[1].textContent = marhale.length;
        }

        createTail(n);

    }
}
function startGoTop() {
    goInterValid = setInterval(() => {
        goTop();
    }, speed);
};
function stopGoTop() {
    clearInterval(goInterValid);
};

let endMove, loseOrNot = true;
function move(m) {
    if (loseOrNot) {
        if (endMove !== 1) {
            if (m === -1) {
                endMove = m;
                stopGoBottom();
                stopGoTop();
                stopGoRight();
                startGoLeft();
            }
        }
        if (endMove !== -1) {
            if (m === 1) {
                endMove = m;
                stopGoBottom();
                stopGoTop();
                stopGoLeft();
                startGoRight();
            }
        }
        if (endMove !== 20) {
            if (m === -20) {
                endMove = m;
                stopGoLeft();
                stopGoRight();
                stopGoTop();
                startGoBottom();
            }
        }
        if (endMove !== -20) {
            if (m === 20) {
                endMove = m;
                stopGoLeft();
                stopGoRight();
                stopGoBottom();
                startGoTop();
            }
        }

    }

}

//////////////////////////////////////////////////////////////////////////// works functions
let marhale = [], eaten = 0;
function backType() {
    marhale.unshift(marhale[0]);
    eaten++;
}

function tanzim(n) {
    for (let i = 0; i < marhale.length; i++) {
        marhale[i] = marhale[i + 1]
    }
    marhale.splice(eaten, 1, n);
    console.log(marhale);
}

function createTail(n) {
    marhale.forEach(number => {
        boxes[number].children[0].classList.add('tail');
        if (number !== n) {
            boxes[n].children[0].classList.remove('tail');
        }
    });
}

function ballRandom() {

    let numberBall;
    for (let n = 0; n < boxes.length; n++) {
        if (boxes[n].children[0].classList.contains('head') === true) {
            numberBall = n;
        }
    }

    let random;
    do {
        random = Math.floor(Math.random() * 200);
    } while (marhale.includes(random) || random == numberBall);

    for (let o = 0; o < boxes.length; o++) {

        if (boxes[o].children[0].classList.contains('ball') === true) {
            boxes[o].children[0].classList.remove('ball');
        }
        if (o === random) {
            boxes[o].children[0].classList.add('ball');
        }
    }
}

function lose(n) {
    boxes[n].children[0].style.backgroundColor = 'red';
    loseOrNot = false;
    stopGoLeft();
    stopGoRight();
    stopGoBottom();
    stopGoTop();

    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

//////////////////////////////////////////////////////////////////////////// localStorage

function saveData() {
    if (localStorage.getItem('score') === null) {
        localStorage.setItem('score', marhale.length);
    }
    else {
        if (localStorage.getItem('score') < marhale.length) {
            localStorage.setItem('score', marhale.length)
        }
    }
}

//////////////////////////////////////////////////////////////////////////// settings

const parentBoxesSettings = document.getElementsByClassName('parentBoxesSettings')[0];
const boxShowSettings = document.getElementById('boxShowSettings');

const body = document.getElementsByTagName('body')[0];
class PositionColorFullScreen {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        body.style.backgroundColor = this.colorLocal;
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(1) input[type=color]').value;
        body.style.backgroundColor = color;
        settingsLoc('FullScreen', color);
    }
}
let FullScreenShow = new PositionColorFullScreen();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(1) input[type=button]').addEventListener('click', FullScreenShow.show.bind(FullScreenShow));


class PositionColorGameFrame {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        parentBox.style.backgroundColor = this.colorLocal;
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(2) input[type=color]').value;
        parentBox.style.backgroundColor = color;
        settingsLoc('GameFrame', color);
    }
}
let GameFrameShow = new PositionColorGameFrame();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(2) input[type=button]').addEventListener('click', GameFrameShow.show.bind(GameFrameShow));


const sidebar = document.getElementsByClassName('sidebar')[0];
class PositionColorSidebarFrame {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        sidebar.style.backgroundColor = this.colorLocal;
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(3) input[type=color]').value;
        sidebar.style.backgroundColor = color;
        settingsLoc('SidebarFrame', color);
    }
}
let SidebarFrameShow = new PositionColorSidebarFrame();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(3) input[type=button]').addEventListener('click', SidebarFrameShow.show.bind(SidebarFrameShow));

class PositionColorSettingsFrame {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        boxShowSettings.style.backgroundColor = this.colorLocal;
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(4) input[type=color]').value;
        boxShowSettings.style.backgroundColor = color;
        settingsLoc('SettingsFrame', color);
    }
}
let SettingsFrameShow = new PositionColorSettingsFrame();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(4) input[type=button]').addEventListener('click', SettingsFrameShow.show.bind(SettingsFrameShow));

class PositionColorTextColor {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--textColor', this.colorLocal);
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(5) input[type=color]').value;
        document.documentElement.style.setProperty('--textColor', color);
        settingsLoc('TextColor', color);
    }
}
let TextColorShow = new PositionColorTextColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(5) input[type=button]').addEventListener('click', TextColorShow.show.bind(TextColorShow));


const buttonsBringSettings = Array.from(document.querySelectorAll('#btnShowSettings, .closeBox button, #btnFullScreen'));
class PositionColorButtonColorBringSettings {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        buttonsBringSettings.forEach(element => {
            element.style.backgroundColor = this.colorLocal;
        })
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(6) input[type=color]').value;
        buttonsBringSettings.forEach(element => {
            element.style.backgroundColor = color;
        })
        settingsLoc('ButtonColorBringSettings', color);
    }
}
let ButtonColorBringSettingsShow = new PositionColorButtonColorBringSettings();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(6) input[type=button]').addEventListener('click', ButtonColorBringSettingsShow.show.bind(ButtonColorBringSettingsShow));


const btns = Array.from(document.getElementsByClassName('btn'));
class PositionColorButtonColor {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        btns.forEach(element => {
            element.style.backgroundColor = this.colorLocal;
        })
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(7) input[type=color]').value;
        btns.forEach(element => {
            element.style.backgroundColor = color;
        })
        settingsLoc('ButtonColor', color);
    }
}
let ButtonColorShow = new PositionColorButtonColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(7) input[type=button]').addEventListener('click', ButtonColorShow.show.bind(ButtonColorShow));


class PositionColorButtonIndicatorColor {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        btns.forEach(element => {
            element.style.color = this.colorLocal;
        })
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(8) input[type=color]').value;
        btns.forEach(element => {
            element.style.color = color;
        })
        settingsLoc('ButtonIndicatorColor', color);
    }
}
let ButtonIndicatorColorShow = new PositionColorButtonIndicatorColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(8) input[type=button]').addEventListener('click', ButtonIndicatorColorShow.show.bind(ButtonIndicatorColorShow));


class PositionColorSnakeBody {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--colorTail', this.colorLocal)
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(9) input[type=color]').value;
        document.documentElement.style.setProperty('--colorTail', color)
        settingsLoc('SnakeBody', color);
    }
}
let SnakeBodyShow = new PositionColorSnakeBody();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(9) input[type=button]').addEventListener('click', SnakeBodyShow.show.bind(SnakeBodyShow));


class PositionColorSnakeHead {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--colorHead', this.colorLocal)
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(10) input[type=color]').value;
        document.documentElement.style.setProperty('--colorHead', color)
        settingsLoc('SnakeHead', color);
    }
}
let SnakeHeadShow = new PositionColorSnakeHead();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(10) input[type=button]').addEventListener('click', SnakeHeadShow.show.bind(SnakeHeadShow));


class PositionColorFoodColor {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--colorBall', this.colorLocal)
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(11) input[type=color]').value;
        document.documentElement.style.setProperty('--colorBall', color)
        settingsLoc('FoodColor', color);
    }
}
let FoodColorShow = new PositionColorFoodColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(11) input[type=button]').addEventListener('click', FoodColorShow.show.bind(FoodColorShow));


class PositionSnakeSpeed {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        speed = this.colorLocal;
        clearInterval(goInterValid);
        parentBoxesSettings.querySelector('.boxChooseSpeed input[type=range]').value = speed;
    }
    show() {
        let speeding = parentBoxesSettings.querySelector('.boxChooseSpeed input[type=range]').value;
        speed = speeding;
        clearInterval(goInterValid);
        settingsLoc('SnakeSpeed', speeding);
    }
}
let SnakeSpeedShow = new PositionSnakeSpeed();
parentBoxesSettings.querySelector('.boxChooseSpeed input[type=button]').addEventListener('click', SnakeSpeedShow.show.bind(SnakeSpeedShow));


const checkboxBorder = parentBoxesSettings.querySelector('.boxChooseBoard input[type=checkbox]');
class PositionColorBorderBoxes {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        checkboxBorder.checked = this.colorLocal;
        if (this.colorLocal) {
            boxes.forEach(element => {
                element.classList.add('boxBorderClick');
            })
        }
        else {
            boxes.forEach(element => {
                element.classList.remove('boxBorderClick');
            })
        }
    }
    show() {
        if (checkboxBorder.checked) {
            boxes.forEach(element => {
                element.classList.add('boxBorderClick');
            })
        }
        else {
            boxes.forEach(element => {
                element.classList.remove('boxBorderClick');
            })
        }
        settingsLoc('BorderBoxes', checkboxBorder.checked);
    }
}
let BorderBoxesShow = new PositionColorBorderBoxes();
checkboxBorder.addEventListener('change', BorderBoxesShow.show.bind(BorderBoxesShow));


// class PositionColorbloodColor {
//     constructor(colorLocal) {
//         this.colorLocal = colorLocal;
//     }
//     sendy() {
//     }
//     show() {
//         let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(10) input[type=color]').value;
//         settingsLoc('bloodColor', color);
//     }
// }
// let bloodColorShow = new PositionColorbloodColor();
// parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(10) input[type=button]').addEventListener('click', bloodColorShow.show.bind(bloodColorShow));


//////////////////////////////////////////////////////////////////////////// localStorage settings

function settingsLoc(key, value) {

    let colors;

    if (localStorage.getItem('personalization') === null) {
        colors = new Map();
    }
    else {
        colors = new Map(JSON.parse(localStorage.getItem('personalization')));
    }

    colors.set(key, value);

    localStorage.setItem('personalization', JSON.stringify([...colors]));
    // let getLocal = new Map(JSON.parse(localStorage.getItem('personalization')));
}

document.addEventListener('DOMContentLoaded', () => {

    let getLocal = new Map(JSON.parse(localStorage.getItem('personalization')));

    if (getLocal.get('FullScreen')) {
        let FullScreenSendy = new PositionColorFullScreen(getLocal.get('FullScreen'));
        FullScreenSendy.sendy();
    }
    if (getLocal.get('GameFrame')) {
        let GameFrameSendy = new PositionColorGameFrame(getLocal.get('GameFrame'));
        GameFrameSendy.sendy();
    }
    if (getLocal.get('SidebarFrame')) {
        let SidebarFrameSendy = new PositionColorSidebarFrame(getLocal.get('SidebarFrame'));
        SidebarFrameSendy.sendy();
    }
    if (getLocal.get('SettingsFrame')) {
        let SidebarSettingsFrameSendy = new PositionColorSettingsFrame(getLocal.get('SettingsFrame'));
        SidebarSettingsFrameSendy.sendy();
    }
    if (getLocal.get('TextColor')) {
        let TextColorSendy = new PositionColorTextColor(getLocal.get('TextColor'));
        TextColorSendy.sendy();
    }
    if (getLocal.get('ButtonColorBringSettings')) {
        let ButtonColorBringSettingsSendy = new PositionColorButtonColorBringSettings(getLocal.get('ButtonColorBringSettings'));
        ButtonColorBringSettingsSendy.sendy();
    }
    if (getLocal.get('ButtonColor')) {
        let ButtonColorSendy = new PositionColorButtonColor(getLocal.get('ButtonColor'));
        ButtonColorSendy.sendy();
    }
    if (getLocal.get('ButtonIndicatorColor')) {
        let ButtonIndicatorColorSendy = new PositionColorButtonIndicatorColor(getLocal.get('ButtonIndicatorColor'));
        ButtonIndicatorColorSendy.sendy();
    }
    if (getLocal.get('SnakeBody')) {
        let SnakeBodySendy = new PositionColorSnakeBody(getLocal.get('SnakeBody'));
        SnakeBodySendy.sendy();
    }
    if (getLocal.get('SnakeHead')) {
        let SnakeHeadSendy = new PositionColorSnakeHead(getLocal.get('SnakeHead'));
        SnakeHeadSendy.sendy();
    }
    if (getLocal.get('FoodColor')) {
        let FoodColorSendy = new PositionColorFoodColor(getLocal.get('FoodColor'));
        FoodColorSendy.sendy();
    }
    // if (getLocal.get('bloodColor')) {
    //     let bloodColorSendy = new PositionColorbloodColor(getLocal.get('bloodColor'));
    //     bloodColorSendy.sendy();
    // }

    if (getLocal.get('SnakeSpeed')) {
        let SnakeSpeedSendy = new PositionSnakeSpeed(getLocal.get('SnakeSpeed'));
        SnakeSpeedSendy.sendy();
    }

    if (getLocal.get('BorderBoxes')) {
        let BorderBoxesSendy = new PositionColorBorderBoxes(getLocal.get('BorderBoxes'));
        BorderBoxesSendy.sendy();
    }

})

//////////////////////////////////////////////////////////////////////////// showBoxes

document.getElementById('btnShowSettings').addEventListener('click', () => {
    boxShowSettings.classList.add('thisBoxShow');
});

document.querySelector('.closeBox button').addEventListener('click', () => {
    boxShowSettings.classList.remove('thisBoxShow');
});

//////////////////////////////////////////////////////////////////////////// full Screen

const btnFullScreen = document.getElementById('btnFullScreen');

btnFullScreen.addEventListener('click', () => {
    screenFull();
})

function screenFull() {
    if (btnFullScreen.children[0].classList.contains('fa-expand') === true) {
        btnFullScreen.children[0].classList.replace('fa-expand', 'fa-compress');
    }
    else {
        btnFullScreen.children[0].classList.replace('fa-compress', 'fa-expand');
    };

    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        else if (document.documentElement.mozRequestFullscreen) {
            document.documentElement.mozRequestFullscreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

localStorage.removeItem('fullScreen');

//////////////////////////////////////////////////////////////////////////// song
const stopStartAudio = document.getElementById('stopStartAudio');
const rotationTypeAudio = document.getElementById('rotationTypeAudio');
let playNow, backAudio = [];
let socreBackAudio = 1;

const songs = Array.from(document.querySelectorAll('.chooseSong i'));
const audios = Array.from(document.querySelectorAll('.noneSong audio'));

let songing = songs[0], audiong = audios[0];

songs.forEach(song => {
    song.addEventListener('click', () => {
        songing = song;
        audiong = audios[songs.indexOf(song)];
        stopStart(songing, audiong);
        socreBackAudio = 1;
    })
})

function stopStart(btnSong, audio) {
    if (btnSong.classList.contains('fa-play-circle')) {
        stopAllAudio();
        btnSong.classList.replace('fa-play-circle', 'fa-pause-circle');
        stopStartAudio.classList.replace('fa-play', 'fa-pause');

        let songAudio = [btnSong, audio];
        backAudio.push(songAudio);

        rotationTypeIf(audio);

        checkLove(btnSong);
    }
    else {
        btnSong.classList.replace('fa-pause-circle', 'fa-play-circle');
        audio.pause();
    }

}

function stopAllAudio() {
    songs.forEach(song => {
        song.classList.replace('fa-pause-circle', 'fa-play-circle');
    })
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    })
}


const chooseSong = document.getElementsByClassName('chooseSong')[0];
document.getElementById('angleLeft').addEventListener('click', () => {
    chooseSong.scrollLeft -= 80;
})
document.getElementById('angleRight').addEventListener('click', () => {
    chooseSong.scrollLeft += 80;
})


stopStartAudio.addEventListener('click', () => {
    if (stopStartAudio.classList.contains('fa-play') == true) {
        stopStartAudio.classList.replace('fa-play', 'fa-pause');
        stopStart(songing, audiong);
        socreBackAudio = 1;
    }
    else {
        stopStartAudio.classList.replace('fa-pause', 'fa-play');
        stopAllAudio();
    }
})


rotationTypeAudio.addEventListener('click', () => {
    if (rotationTypeAudio.classList.contains('fa-exchange') == true) {
        rotationTypeAudio.classList.replace('fa-exchange', 'fa-random');
        playNow = 'random';
    }
    else if (rotationTypeAudio.classList.contains('fa-random') == true) {
        rotationTypeAudio.classList.replace('fa-random', 'fa-undo');
        playNow = 'undo';
    }
    else if (rotationTypeAudio.classList.contains('fa-undo') == true) {
        rotationTypeAudio.classList.replace('fa-undo', 'fa-dot-circle-o');
        playNow = 'dot';
    }
    else if (rotationTypeAudio.classList.contains('fa-dot-circle-o') == true) {
        rotationTypeAudio.classList.replace('fa-dot-circle-o', 'fa-exchange');
        playNow = 'exchange';
    }
});


function rotationTypeIf(thisAudio) {
    let objRotation = new RotationType(thisAudio);

    if (rotationTypeAudio.classList.contains('fa-exchange')) {
        playNow = 'exchange';
        objRotation.exchange();
    }
    else if (rotationTypeAudio.classList.contains('fa-random')) {
        playNow = 'random';
        objRotation.random();
    }
    else if (rotationTypeAudio.classList.contains('fa-undo')) {
        playNow = 'undo';
        objRotation.undo();
    }
    else if (rotationTypeAudio.classList.contains('fa-dot-circle-o')) {
        playNow = 'dot';
        objRotation.dot();
    }
}

let index, lastIndex = -1;

class RotationType {
    constructor(thisAudio) {
        this.thisAudio = thisAudio;
    }

    exchange() {
        this.thisAudio.play();
        this.thisAudio.onended = () => {
            switch (playNow) {
                case 'exchange':
                    this.exchangeTor(+1);
                    break;
                case 'random':
                    this.randomTor();
                    break;
                case 'undo':
                    this.undoTor();
                    break;
                case 'dot':
                    this.dotTor();
                    break;
            }
        }
    }
    exchangeTor(rightLeft) {
        const currentIndex = audios.indexOf(this.thisAudio);
        const nextIndex = (currentIndex + rightLeft) % audios.length;
        songing = songs[nextIndex];
        audiong = audios[nextIndex];
        stopStart(songing, audiong);
    }

    random() {
        this.thisAudio.play();
        this.thisAudio.onended = () => {
            switch (playNow) {
                case 'random':
                    this.randomTor();
                    break;
                case 'exchange':
                    this.exchangeTor(+1);
                    break;
                case 'undo':
                    this.undoTor();
                    break;
                case 'dot':
                    this.dotTor();
                    break;
            }
        }
    }
    randomTor() {
        do {
            index = Math.floor(Math.random() * audios.length);
        } while (index === lastIndex && audios.length > 1);
        lastIndex = index;
        songing = songs[index];
        audiong = audios[index];
        stopStart(songing, audiong);
    }

    undo() {
        this.thisAudio.play();
        this.thisAudio.onended = () => {
            switch (playNow) {
                case 'undo':
                    this.undoTor();
                    break;
                case 'exchange':
                    this.exchangeTor(+1);
                    break;
                case 'random':
                    this.randomTor();
                    break;
                case 'dot':
                    this.dotTor();
                    break;
            }
        };
    }
    undoTor() {
        this.thisAudio.currentTime = 0;
        this.undo();
    }
    dot() {
        this.thisAudio.play();
        this.thisAudio.onended = () => {
            switch (playNow) {
                case 'dot':
                    this.dotTor();
                    break;
                case 'undo':
                    this.undoTor();
                    break;
                case 'exchange':
                    this.exchangeTor(+1);
                    break;
                case 'random':
                    this.randomTor();
                    break;
            }
        }
    }
    dotTor() {
        this.thisAudio.pause();
        songing.classList.replace('fa-pause-circle', 'fa-play-circle');
        stopStartAudio.classList.replace('fa-pause', 'fa-play');
    }
}



const nextAudio = document.getElementById('nextAudio');
nextAudio.addEventListener('click', () => {
    let nextRotation = new RotationType(audiong);

    if (playNow == 'exchange' || playNow == 'undo' || playNow == 'dot') {
        socreBackAudio = 1;
        nextRotation.exchangeTor(+1);
    }
    else if (playNow == 'random') {
        socreBackAudio = 1;
        nextRotation.randomTor();
    }
})


const prevAudio = document.getElementById('prevAudio');
prevAudio.addEventListener('click', () => {
    let prevRotation = new RotationType(audiong);

    if (playNow == 'exchange' || playNow == 'undo' || playNow == 'dot') {
        prevRotation.exchangeTor(- 1 + audios.length);
    }

    else if (playNow == 'random') {

        stopAllAudio();
        stopStartAudio.classList.replace('fa-pause', 'fa-play');

        backAudio.forEach(element => {
            let tak = backAudio.indexOf(element);
            if (backAudio[tak - 1]) {
                if (backAudio[tak - 1][0] == element[0]) {
                    backAudio.splice(tak - 1, 1);
                }
            }
            if (backAudio[tak + 1]) {
                if (backAudio[tak + 1][0] == element[0]) {
                    backAudio.splice(tak + 1, 1);
                }
            }
        })

        socreBackAudio++;
        if (backAudio.length - socreBackAudio > -1) {

            stopStartAudio.classList.replace('fa-play', 'fa-pause');

            songing = backAudio[backAudio.length - socreBackAudio][0];
            audiong = backAudio[backAudio.length - socreBackAudio][1];

            audiong.play();
            songing.classList.replace('fa-play-circle', 'fa-pause-circle');

            let songAudio = [songing, audiong];
            backAudio.push(songAudio);
            socreBackAudio++;
        }
    }
})

const loveAudio = document.getElementById('loveAudio');
loveAudio.addEventListener('click', () => {
    if (loveAudio.classList.contains('fa-heart-o')) {
        loveAudio.classList.replace('fa-heart-o', 'fa-heart');
        concatLove(true);
    }
    else {
        loveAudio.classList.replace('fa-heart', 'fa-heart-o');
        concatLove(false);
    }
})

function concatLove(typeGo) {
    let concats;
    let indexSong = songs.indexOf(songing).toString();

    if (localStorage.getItem('loveAudio') == null) {
        concats = new Set();
        if (typeGo == true) {
            concats.add(indexSong);
        }
        else {
            concats.delete(indexSong);
        }
    }
    else {
        let likeAudio = localStorage.getItem('loveAudio').split(',');
        concats = new Set(likeAudio);
        if (typeGo == true) {
            concats.add(indexSong);
        }
        else {
            concats.delete(indexSong);
        }
    }

    concats.forEach(element => {
        if(element == ''){
            concats.delete(element);
        }
    })

    let concatsArray = Array.from(concats);
    localStorage.setItem('loveAudio', concatsArray);
}

function checkLove(thisSong) {
    if (localStorage.getItem('loveAudio') != null) {
        let likeAudio = localStorage.getItem('loveAudio').split(',');

        numberSong = songs.indexOf(thisSong).toString();
        if (likeAudio.includes(numberSong)) {
            loveAudio.classList.replace('fa-heart-o', 'fa-heart');
        }
        else {
            loveAudio.classList.replace('fa-heart', 'fa-heart-o');
        }
    }

}