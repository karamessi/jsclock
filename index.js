const secondHand = document.getElementById('secondHand');
const minuteHand = document.getElementById('minuteHand');
const hourHand = document.getElementById('hourHand');

const updateSeconds = (currentTime) => {
  var seconds = currentTime.getSeconds();
  var rotation = 6 * seconds;
  setRotation(secondHand, rotation);
};

const updateMinutes = (currentTime) => {
  var minutes = currentTime.getMinutes();
  var rotation = 6 * minutes;
  setRotation(minuteHand, rotation);
};

const updateHour = (currentTime) => {
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  var rotation = 30 * hours + minutes / 2;
  setRotation(hourHand, rotation);
};

const setRotation = (el, rotation) => {
  if (rotation === 0) {
    el.style.transform = `rotate(360deg)`;
    // reset back to 0 so transform does not cycle back
    setTimeout(() => {
      el.style.transition = 'none';
      el.style.transform = `rotate(0deg)`;
    }, 500);
  } else {
    el.style.transform = `rotate(${rotation}deg)`;
    el.style.transition = '500ms';
  }
};

const getDate = () => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: getTz() }));
};

const updateTime = () => {
  var currentTime = getDate();
  updateSeconds(currentTime);
  updateMinutes(currentTime);
  updateHour(currentTime);

  window.requestAnimationFrame(updateTime);
};

const createHourLabels = () => {
  var clock = document.getElementById('clockFace');
  for (var i = 0; i < 12; i++) {
    var pt = document.createElement('div');
    var inner = document.createElement('span');
    pt.appendChild(inner);

    pt.className = 'points';
    inner.textContent = i == 0 ? 12 : i;

    var rotation = i * 30 - 90;
    pt.style.transform = `rotate(${rotation}deg) translate(125px)`;
    inner.style.transform = `rotate(${rotation * -1}deg)`;
    clock.appendChild(pt);
  }
};

createHourLabels();
window.requestAnimationFrame(updateTime);
