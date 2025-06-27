let parentBox = document.getElementById('parentBox');

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
})

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
        }

        createTail(n);
    }
}

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