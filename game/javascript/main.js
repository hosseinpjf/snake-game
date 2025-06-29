const parentBox = document.getElementById('parentBox');
const scores = document.querySelectorAll('.score h2 span');
let boxes = [];

document.addEventListener('DOMContentLoaded', () => {

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
})

//////////////////////////////////////////////////////////////////////////// buttons

let intervalId;

const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const topBtn = document.getElementById('topBtn');
const bottomBtn = document.getElementById('bottomBtn');

leftBtn.addEventListener('mousedown', startActionLeft);
leftBtn.addEventListener('mouseup', stopActionLeft);
leftBtn.addEventListener('mouseleave', stopActionLeft);

leftBtn.addEventListener('touchstart', startActionLeft);
leftBtn.addEventListener('touchend', stopActionLeft);
leftBtn.addEventListener('touchcancel', stopActionLeft);

function startActionLeft() {
    intervalId = setInterval(() => {
        move(-1);
    }, 150);
};
function stopActionLeft() {
    clearInterval(intervalId);
};


rightBtn.addEventListener('mousedown', startActionRight);
rightBtn.addEventListener('mouseup', stopActionRight);
rightBtn.addEventListener('mouseleave', stopActionRight);

rightBtn.addEventListener('touchstart', startActionRight);
rightBtn.addEventListener('touchend', stopActionRight);
rightBtn.addEventListener('touchcancel', stopActionRight);

function startActionRight() {
    intervalId = setInterval(() => {
        move(1);
    }, 150);
};
function stopActionRight() {
    clearInterval(intervalId);
};


topBtn.addEventListener('mousedown', startActionTop);
topBtn.addEventListener('mouseup', stopActionTop);
topBtn.addEventListener('mouseleave', stopActionTop);

topBtn.addEventListener('touchstart', startActionTop);
topBtn.addEventListener('touchend', stopActionTop);
topBtn.addEventListener('touchcancel', stopActionTop);

function startActionTop() {
    intervalId = setInterval(() => {
        move(-20);
    }, 150);
};
function stopActionTop() {
    clearInterval(intervalId);
};


bottomBtn.addEventListener('mousedown', startActionBottom);
bottomBtn.addEventListener('mouseup', stopActionBottom);
bottomBtn.addEventListener('mouseleave', stopActionBottom);

bottomBtn.addEventListener('touchstart', startActionBottom);
bottomBtn.addEventListener('touchend', stopActionBottom);
bottomBtn.addEventListener('touchcancel', stopActionBottom);

function startActionBottom() {
    intervalId = setInterval(() => {
        move(20);
    }, 150);
};
function stopActionBottom() {
    clearInterval(intervalId);
};

//////////////////////////////////////////////////////////////////////////// addEventListener buttons

let marhale = [], eaten = 0;

function backType() {
    marhale.push(marhale[0]);
    eaten++;
}

function move(m) {

    for (let n = 0; n < boxes.length; n++) {

        if (m === -1) {
            if (n % 20 !== 0) {
                if (boxes[n + m]) {
                    if (boxes[n].children[0].classList.contains('head') == true) {
                        boxes[n].children[0].classList.remove('head');
                        boxes[n + m].children[0].classList.add('head');

                        tanzim(n);

                        break;
                    }
                }
            }
        }

        if (m === 1) {
            if ((n + 1) % 20 !== 0) {
                if (boxes[n + m]) {
                    if (boxes[n].children[0].classList.contains('head') == true) {
                        boxes[n].children[0].classList.remove('head');
                        boxes[n + m].children[0].classList.add('head');

                        tanzim(n);

                        break;
                    }
                }
            }
        }

        if (m === -20 || m === 20) {
            if (boxes[n + m]) {
                if (boxes[n].children[0].classList.contains('head') == true) {
                    boxes[n].children[0].classList.remove('head');
                    boxes[n + m].children[0].classList.add('head');

                    tanzim(n);

                    break;
                }
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

//////////////////////////////////////////////////////////////////////////// works functions

function createTail(n) {
    marhale.forEach(number => {
        boxes[number].children[0].classList.add('tail');
        if (number !== n) {
            boxes[n].children[0].classList.remove('tail');
        }
    });
}

function tanzim(n) {
    for (let i = 0; i < marhale.length; i++) {
        marhale[i] = marhale[i + 1]
    }
    marhale.splice(eaten, 1, n);
    console.log(marhale);
}

function ballRandom() {
    let random = Math.floor(Math.random() * 200);
    marhale.forEach(number => {
        if (number == random) {
            random = Math.floor(Math.random() * 200);
        }
    });
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

const settings = document.getElementsByClassName('settings')[0];
const parentBoxesSettings = document.getElementsByClassName('parentBoxesSettings')[0];

settings.addEventListener('click', () => {
    parentBoxesSettings.classList.toggle('settingsHeightClick');
    settings.children[0].classList.toggle('settingsRotateClick');
    settings.children[2].classList.toggle('settingsRotateClick');
})


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


class PositionColorTextColor {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--textColor', this.colorLocal);
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(4) input[type=color]').value;
        document.documentElement.style.setProperty('--textColor', color);
        settingsLoc('TextColor', color);
    }
}
let TextColorShow = new PositionColorTextColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(4) input[type=button]').addEventListener('click', TextColorShow.show.bind(TextColorShow));


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
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(5) input[type=color]').value;
        btns.forEach(element => {
            element.style.backgroundColor = color;
        })
        settingsLoc('ButtonColor', color);
    }
}
let ButtonColorShow = new PositionColorButtonColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(5) input[type=button]').addEventListener('click', ButtonColorShow.show.bind(ButtonColorShow));


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
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(6) input[type=color]').value;
        btns.forEach(element => {
            element.style.color = color;
        })
        settingsLoc('ButtonIndicatorColor', color);
    }
}
let ButtonIndicatorColorShow = new PositionColorButtonIndicatorColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(6) input[type=button]').addEventListener('click', ButtonIndicatorColorShow.show.bind(ButtonIndicatorColorShow));


class PositionColorSnakeBody {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--colorTail', this.colorLocal)
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(7) input[type=color]').value;
        document.documentElement.style.setProperty('--colorTail', color)
        settingsLoc('SnakeBody', color);
    }
}
let SnakeBodyShow = new PositionColorSnakeBody();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(7) input[type=button]').addEventListener('click', SnakeBodyShow.show.bind(SnakeBodyShow));


class PositionColorSnakeHead {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--colorHead', this.colorLocal)
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(8) input[type=color]').value;
        document.documentElement.style.setProperty('--colorHead', color)
        settingsLoc('SnakeHead', color);
    }
}
let SnakeHeadShow = new PositionColorSnakeHead();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(8) input[type=button]').addEventListener('click', SnakeHeadShow.show.bind(SnakeHeadShow));


class PositionColorFoodColor {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        document.documentElement.style.setProperty('--colorBall', this.colorLocal)
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(9) input[type=color]').value;
        document.documentElement.style.setProperty('--colorBall', color)
        settingsLoc('FoodColor', color);
    }
}
let FoodColorShow = new PositionColorFoodColor();
parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(9) input[type=button]').addEventListener('click', FoodColorShow.show.bind(FoodColorShow));


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
    let getLocal = new Map(JSON.parse(localStorage.getItem('personalization')));
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
    if (getLocal.get('TextColor')) {
        let TextColorSendy = new PositionColorTextColor(getLocal.get('TextColor'));
        TextColorSendy.sendy();
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
    if (getLocal.get('BorderBoxes')) {
        let BorderBoxesSendy = new PositionColorBorderBoxes(getLocal.get('BorderBoxes'));
        BorderBoxesSendy.sendy();
    }

})

//////////////////////////////////////////////////////////////////////////// showBoxes


document.getElementById('btnShowSettings').addEventListener('click', () => {
    document.getElementById('boxShowSettings').classList.add('thisBoxShow');
})

document.querySelector('.closeBox button').addEventListener('click', () => {
    document.getElementById('boxShowSettings').classList.remove('thisBoxShow');
})
