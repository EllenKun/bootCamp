const carType = [
    { value: 1, text: '拖拉机', imgPath: './img/car1.png' },
    { value: 2, text: '卡车', imgPath: './img/car2.png' },
    { value: 3, text: '摩托车', imgPath: './img/car3.png' },
    { value: 4, text: '跑车', imgPath: './img/car4.png' },
    { value: 5, text: '电动车', imgPath: './img/car5.png' },
    { value: 6, text: '自行车', imgPath: './img/car6.png' }
];

let step = 1;
let left = 0;
let topPosition = 0;

const speedDropdown = document.getElementById('carSpeed');
const typeDropdown = document.getElementById('carType');
const movingCar = document.querySelector('#movingCar');
const runArea = document.querySelector('#runArea');

const dialog = document.getElementById("myDialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");


function Init(){
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i.toString();
        speedDropdown.appendChild(option);
    }

    carType.forEach(car => {
        const option = document.createElement('option');
        option.value = car.value;
        option.text = car.text;
        typeDropdown.appendChild(option);
    });

    const savedCar = JSON.parse(localStorage.getItem('carType'));
    const savedPosition = JSON.parse(localStorage.getItem('carPosition'));
    const savedDirection = JSON.parse(localStorage.getItem('carDirection'));
    const savedSpeed = JSON.parse(localStorage.getItem('carSpeed'));

    if (savedCar) {
        typeDropdown.value = savedCar.value;
        movingCar.src = savedCar.imgPath;
    }

    left = savedPosition.left;
    topPosition = savedPosition.topPosition;

    movingCar.style.left = left + 'px';
    movingCar.style.top = topPosition + 'px';
    
    if (savedPosition.left) {
        updateImageDirection(savedDirection.direction)
    }

    if (savedSpeed) {
        speedDropdown.value = savedSpeed;
        step = savedSpeed * 2;
        
    }
};

typeDropdown.addEventListener('change', () => {
    const selectedValue = parseInt(typeDropdown.value, 10);
    const selectedCar = carType.find(car => car.value === selectedValue);
    if (selectedCar) {
        movingCar.src = selectedCar.imgPath;
        localStorage.setItem('carType', JSON.stringify(selectedCar));
    }
    setTimeout(() => {
        typeDropdown.blur();
    }, 0);
});


speedDropdown.addEventListener('change', () => {
    step = speedDropdown.value * 2;
    localStorage.setItem('carSpeed', JSON.stringify(step / 2));
    setTimeout(() => {
        speedDropdown.blur();
    }, 0);
})

document.addEventListener('keydown', function(event){
    if(dialog.open && event.key !== 'Enter') {
        event.preventDefault();
        return;
    }
    updateImagePosition(event.key); 
    updateImageDirection(event.key);
})

function updateImageDirection(direction) {
    switch (direction) {
        case 'ArrowLeft':
            movingCar.style.transform = 'scaleX(-1)';
            break;
        case 'ArrowUp':
            movingCar.style.transform = 'rotate(270deg)';
            break;
        case 'ArrowRight':
            movingCar.style.transform = 'rotate(0deg)';
            break;
        case 'ArrowDown':
            movingCar.style.transform = 'rotate(90deg)';
            break;
        default:
            return;
    }
    localStorage.setItem('carDirection', JSON.stringify({ direction }));

}

function updateImagePosition(direction) {
    switch (direction) {
        case 'ArrowLeft':
            left -= step;
            break;
        case 'ArrowUp':
            topPosition -= step;
            break;
        case 'ArrowRight': 
            left += step;
            break;
        case 'ArrowDown':
            topPosition += step;
            break;
        default:
            return;
    }
    let flag = false;
    if(left < 0) {
        left += step;
        flag = true
    }
    if(left + 28 > 1000) {
        left -= step;
        flag = true
    }
    if (topPosition < 0) {
        topPosition += step;
        flag = true
    }
    if(topPosition + 28 > 500) {
        topPosition -= step;
        flag = true
    }
    if (flag) {
        dialog.showModal();

    }
    movingCar.style.left = left + 'px';
    movingCar.style.top = topPosition + 'px';
    
    localStorage.setItem('carPosition', JSON.stringify({ topPosition, left }));
}

closeDialogBtn.onclick = function() {
    dialog.close();
}



window.onload = Init();

