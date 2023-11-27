const dialog = document.getElementById("myDialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");


const firstTrain = document.querySelector('#firstTrain');
const secondTrain = document.querySelector('#secondTrain');
const thirdTrain = document.querySelector('#thirdTrain');

const trainList = [thirdTrain, secondTrain, firstTrain];

const isPlay = document.querySelector('#isPlay');

const trainAudio = document.querySelector('#trainAudio');

isPlay.addEventListener('change', () => {  
    if(isPlay.value === 'true') {
        trainAudio.play();
    } else {
        trainAudio.pause();
    }
})

function Init(){
    trainAudio.pause();
    renderTrain(trainListObj);
    moveTrain();
};



const trainListInit = [
    {
        top:0,
        left:0,
        direction: 'right'
    },
    {
        top: 0,
        left: 22,
        direction: 'right'
    },
    {
        top: 0,
        left: 44,
        direction: 'right'
    }
];

let trainListObj = JSON.parse(JSON.stringify(trainListInit));

let trainHead = 'right';

function replaceFront(data, index) {
    data.top = trainListObj[index + 1].top;
    data.left = trainListObj[index + 1].left;
    data.direction = trainListObj[index + 1].direction;
};

function moveTrain() {
    const _move = function (direction) {
        for (let i = 0; i < trainListObj.length; i++ ) {
            const data = trainListObj[i];
            if (direction === 'right') {
                if(i === 2) {
                    data.left += 22;
                } else {
                    // 用后面的位置替换前面的位置
                    replaceFront(data, i);
                }
            } else if (direction === 'left') {
                if(i === 2) {
                    data.left -= 22;
                } else {
                    replaceFront(data, i);
                }
            } else if (direction === 'up') {
                if(i === 2) {
                    data.top -= 22;
                } else {
                    replaceFront(data, i);
                }
            } else if (direction === 'down') {
                if(i === 2) {
                    data.top += 22;
                } else {
                    replaceFront(data, i);
                }
            }
    
        }
        const tempTrain = trainListObj[2];
        let flag = false;
        if(tempTrain.left < 0 || tempTrain.left + 22 > 1000 || tempTrain.top < 0 || tempTrain.top +22 > 500) {
            flag = true
        }
        if(flag) {
            dialog.showModal();
            clearInterval(timer);
        }

        renderTrain(trainListObj);
    };

    const timer = setInterval(() => {
        _move(trainHead);
    }, 300);
    

}

closeDialogBtn.onclick = function() {
    dialog.close();
    trainListObj = JSON.parse(JSON.stringify(trainListInit));
    trainHead = 'right';
    Init();
}


function rotateTrain(event) {
    let keyDirection = '';
    switch (event.key) {
        case 'ArrowRight':
            keyDirection = 'right';
            break;
        case 'ArrowLeft':
            keyDirection = 'left';
            break;
        case 'ArrowUp':
            keyDirection = 'up';
            break;
        case 'ArrowDown':
            keyDirection = 'down';
            break;
        default: 
            break;
    }
    if ((keyDirection === 'right' && trainHead === 'left')
        || (keyDirection === 'left' && trainHead === 'right')
        || (keyDirection === 'down' && trainHead === 'up')
        || (keyDirection === 'up' && trainHead === 'down')) {
            return;
    }
    changeTrainDirection(keyDirection);
}

function changeTrainDirection(direction) {
    trainHead = direction;
    trainListObj[trainListObj.length - 1].direction = direction;
    renderTrain(trainListObj);
}



function renderTrain(trainListObj) {
    let trainNodeList = document.querySelectorAll('.train-item');
    for(let i = 0; i < trainList.length; i++) {
        const trainNodeData = trainListObj[i];
        const trainNode = trainNodeList[i];
        trainNode.style.left = `${trainNodeData.left}px`;
        trainNode.style.top = `${trainNodeData.top}px`;
        trainNode.classList.remove('left','right','up','down');
        switch (trainNodeData.direction) {
            case 'up':
                trainNode.classList.add('up');
                break;
            case 'right':
                trainNode.classList.add('right');
                break;
            case 'left':
                trainNode.classList.add('left');
                break;
            case 'down':
                trainNode.classList.add('down');
        }
    }
}

document.addEventListener('keydown', rotateTrain);


window.onload = Init();

