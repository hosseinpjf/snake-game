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
        scores[0].textContent = 1;
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

leftBtn.addEventListener('touchstart', () => {
    move(-1);
});
rightBtn.addEventListener('touchstart', () => {
    move(1);
});
topBtn.addEventListener('touchstart', () => {
    move(-20);
});
bottomBtn.addEventListener('touchstart', () => {
    move(20);
});

//////////////////////////////////////////////////////////////////////////// buttons hover

const hoverBtn = Array.from(document.getElementsByClassName('hoverBtn'));
const leftBtnHover = document.getElementById('leftBtnHover');
const rightBtnHover = document.getElementById('rightBtnHover');
const topBtnHover = document.getElementById('topBtnHover');
const bottomBtnHover = document.getElementById('bottomBtnHover');

function deleteHover() {
    hoverBtn.forEach(element => {
        element.classList.remove('backgroundHoverBtn');
    })
}

leftBtnHover.addEventListener('mouseenter', () => {
    deleteHover();
    move(-1);
});
rightBtnHover.addEventListener('mouseenter', () => {
    deleteHover();
    move(1);
});
topBtnHover.addEventListener('mouseenter', () => {
    deleteHover();
    move(-20);
});
bottomBtnHover.addEventListener('mouseenter', () => {
    deleteHover();
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
                setTimeout(() => {
                    endMove = m;
                    stopGoBottom();
                    stopGoTop();
                    stopGoRight();
                    startGoLeft();
                }, speed);
                leftBtnHover.classList.add('backgroundHoverBtn');
            }
        }
        if (endMove !== -1) {
            if (m === 1) {
                setTimeout(() => {
                    endMove = m;
                    stopGoBottom();
                    stopGoTop();
                    stopGoLeft();
                    startGoRight();
                }, speed);
                rightBtnHover.classList.add('backgroundHoverBtn');
            }
        }
        if (endMove !== 20) {
            if (m === -20) {
                setTimeout(() => {
                    endMove = m;
                    stopGoLeft();
                    stopGoRight();
                    stopGoTop();
                    startGoBottom();
                }, speed);
                topBtnHover.classList.add('backgroundHoverBtn');
            }
        }
        if (endMove !== -20) {
            if (m === 20) {
                setTimeout(() => {
                    endMove = m;
                    stopGoLeft();
                    stopGoRight();
                    stopGoBottom();
                    startGoTop();
                }, speed);
                bottomBtnHover.classList.add('backgroundHoverBtn');
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
        scores[1].textContent = 1;
        marhale = [];
        eaten = 0;
        endMove = 0;
        loseOrNot = true;

        parentBox.innerHTML = '';
        boxes = [];

        startGame();

        let getLocal = new Map(JSON.parse(localStorage.getItem('personalization')));
        if (getLocal.get('BorderBoxes')) {
            let BorderBoxesSendy = new PositionColorBorderBoxes(getLocal.get('BorderBoxes'));
            BorderBoxesSendy.sendy();
        }

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
const sidebar = document.getElementsByClassName('sidebar')[0];

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
const dokme = document.getElementsByClassName('dokme')[0];
class PositionColorButtonColor {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        btns.forEach(element => {
            element.style.backgroundColor = this.colorLocal;
        })
        hoverBtn.forEach(element => {
            element.style.backgroundColor = this.colorLocal;
        })
        dokme.style.backgroundColor = this.colorLocal;
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(7) input[type=color]').value;
        btns.forEach(element => {
            element.style.backgroundColor = color;
        })
        hoverBtn.forEach(element => {
            element.style.backgroundColor = color;
        })
        dokme.style.backgroundColor = color;
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
        document.documentElement.style.setProperty('--backgroundHoverBtn', this.colorLocal);
    }
    show() {
        let color = parentBoxesSettings.querySelector('.boxChooseColor:nth-of-type(8) input[type=color]').value;
        btns.forEach(element => {
            element.style.color = color;
        })
        document.documentElement.style.setProperty('--backgroundHoverBtn', color);
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




const parentBtn = document.getElementById('parentBtn');
const parentBtnHover = document.getElementById('parentBtnHover');
const selectedShapeBtn = Array.from(parentBoxesSettings.querySelectorAll('.boxChooseBtn button'));
class PositionShapeBtns {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        if (this.colorLocal == 2) {
            parentBtn.style.display = 'none';
            parentBtnHover.style.display = 'grid';
            // selectedShapeBtn[0].style.backgroundColor = '#0078d4';
            // selectedShapeBtn[1].style.backgroundColor = '#f0f0f0';
            selectedShapeBtn[0].classList.add('selectedBtns');
            selectedShapeBtn[1].classList.remove('selectedBtns');
        }
        else if (this.colorLocal == 1) {
            parentBtnHover.style.display = 'none';
            parentBtn.style.display = 'grid';
            selectedShapeBtn[1].classList.add('selectedBtns');
            selectedShapeBtn[0].classList.remove('selectedBtns');
        }
    }
    show(element) {
        if (element.classList.contains('btnSelectCircle')) {
            parentBtn.style.display = 'none';
            parentBtnHover.style.display = 'grid';
            selectedShapeBtn[0].classList.add('selectedBtns');
            selectedShapeBtn[1].classList.remove('selectedBtns');
            settingsLoc('ShapeBtns', 2);
        }
        else if (element.classList.contains('btnSelectButtons')) {
            parentBtnHover.style.display = 'none';
            parentBtn.style.display = 'grid';
            selectedShapeBtn[1].classList.add('selectedBtns');
            selectedShapeBtn[0].classList.remove('selectedBtns');
            settingsLoc('ShapeBtns', 1);
        }
    }
}
let ShapeBtnsShow = new PositionShapeBtns();
selectedShapeBtn.forEach(element => {
    element.addEventListener('click', ShapeBtnsShow.show.bind(ShapeBtnsShow, element))
})









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
parentBoxesSettings.querySelector('.boxChooseSpeed button').addEventListener('click', SnakeSpeedShow.show.bind(SnakeSpeedShow));


const checkboxBorder = Array.from(parentBoxesSettings.querySelectorAll('.boxChooseBoard button, .boxChooseBoard button input'));
class PositionColorBorderBoxes {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        checkboxBorder[1].checked = this.colorLocal;
        if (this.colorLocal) {
            boxes.forEach(element => {
                element.classList.add('boxBorderClick');
            })
            checkboxBorder[0].style.backgroundColor = '#0078d4';
            checkboxBorder[0].textContent = 'No';
        }
        else {
            boxes.forEach(element => {
                element.classList.remove('boxBorderClick');
            })
            checkboxBorder[0].style.backgroundColor = '#f0f0f0';
            checkboxBorder[0].textContent = 'Yes';
        }
    }
    show() {
        checkboxBorder[1].checked = !checkboxBorder[1].checked;
        if (checkboxBorder[1].checked) {
            boxes.forEach(element => {
                element.classList.add('boxBorderClick');
            })
            checkboxBorder[0].style.backgroundColor = '#0078d4';
            checkboxBorder[0].textContent = 'No';
        }
        else {
            boxes.forEach(element => {
                element.classList.remove('boxBorderClick');
            })
            checkboxBorder[0].style.backgroundColor = '#f0f0f0';
            checkboxBorder[0].textContent = 'Yes';
        }
        settingsLoc('BorderBoxes', checkboxBorder[1].checked);
    }
}
let BorderBoxesShow = new PositionColorBorderBoxes();
checkboxBorder.forEach(element => {
    element.addEventListener('click', BorderBoxesShow.show.bind(BorderBoxesShow));
});


const closeBox = document.getElementsByClassName('closeBox')[0];
const btnDirectionSidebar = parentBoxesSettings.querySelector('.boxChooseSidebarDirection button i');
class PositionDirectionSidebar {
    constructor(colorLocal) {
        this.colorLocal = colorLocal;
    }
    sendy() {
        if (btnDirectionSidebar.classList.contains(this.colorLocal)) {
            btnDirectionSidebar.classList.replace('fa-long-arrow-right', 'fa-long-arrow-left');
            sidebar.style.order = 1;
            closeBox.style.justifyContent = 'flex-start';
            boxShowSettings.style.transform = 'translateX(120%)';
            document.documentElement.style.setProperty('--transformBoxSowClick1', 'translateX(-105px)');
            document.documentElement.style.setProperty('--transformBoxSowClick2', 'translateX(-85px)');
            document.documentElement.style.setProperty('--transformBoxSowClick3', 'translateX(-55px)');
        }
        else {
            btnDirectionSidebar.classList.replace('fa-long-arrow-left', 'fa-long-arrow-right')
            sidebar.style.order = 0;
            closeBox.style.justifyContent = 'flex-end';
            boxShowSettings.style.transform = 'translateX(-120%)';
            document.documentElement.style.setProperty('--transformBoxSowClick1', 'translateX(0)');
            document.documentElement.style.setProperty('--transformBoxSowClick2', 'translateX(0)');
            document.documentElement.style.setProperty('--transformBoxSowClick3', 'translateX(0)');
        }
    }
    show() {
        if (btnDirectionSidebar.classList.contains('fa-long-arrow-right')) {
            btnDirectionSidebar.classList.replace('fa-long-arrow-right', 'fa-long-arrow-left');
            sidebar.style.order = 1;
            closeBox.style.justifyContent = 'flex-start';
            boxShowSettings.style.transform = 'translateX(120%)';
            document.documentElement.style.setProperty('--transformBoxSowClick1', 'translateX(-105px)');
            document.documentElement.style.setProperty('--transformBoxSowClick2', 'translateX(-85px)');
            document.documentElement.style.setProperty('--transformBoxSowClick3', 'translateX(-55px)');
            settingsLoc('directionSidebar', 'fa-long-arrow-right');
        }
        else {
            btnDirectionSidebar.classList.replace('fa-long-arrow-left', 'fa-long-arrow-right')
            sidebar.style.order = 0;
            closeBox.style.justifyContent = 'flex-end';
            boxShowSettings.style.transform = 'translateX(-120%)';
            document.documentElement.style.setProperty('--transformBoxSowClick1', 'translateX(0)');
            document.documentElement.style.setProperty('--transformBoxSowClick2', 'translateX(0)');
            document.documentElement.style.setProperty('--transformBoxSowClick3', 'translateX(0)');
            settingsLoc('directionSidebar', 'fa-long-arrow-left');
        }
    }
}
let directionSidebarShow = new PositionDirectionSidebar();
parentBoxesSettings.querySelector('.boxChooseSidebarDirection button').addEventListener('click', directionSidebarShow.show.bind(directionSidebarShow));



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

    if (getLocal.get('ShapeBtns')) {
        let ShapeBtnsSendy = new PositionShapeBtns(getLocal.get('ShapeBtns'));
        ShapeBtnsSendy.sendy();
    }
    // else{
    //     parentBtnHover.style.display = 'none';
    //     selectedShapeBtn[1].classList.add('selectedBtns');
    // };
    if (getLocal.get('SnakeSpeed')) {
        let SnakeSpeedSendy = new PositionSnakeSpeed(getLocal.get('SnakeSpeed'));
        SnakeSpeedSendy.sendy();
    }

    if (getLocal.get('BorderBoxes')) {
        let BorderBoxesSendy = new PositionColorBorderBoxes(getLocal.get('BorderBoxes'));
        BorderBoxesSendy.sendy();
    }
    if (getLocal.get('directionSidebar')) {
        let directionSidebarSendy = new PositionDirectionSidebar(getLocal.get('directionSidebar'));
        directionSidebarSendy.sendy();
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
        if (element == '') {
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