const React = require('react');
const socket = require('../socket.js');
const log = require('../dispatcher/logDispatcher.js');

const buttons = {
  0: 'left',
  1: 'middle',
  2: 'right'
};

function onClick(event) {
  let button = buttons[event.button] || 'left';
  socket.emit('click', { button: button, double: false });
}

function onDoubleClick(event) {
  let button = buttons[event.button] || 'left';
  socket.emit('click', { button: button, double: true });
}

function mousepad({throttle}) {
  let lastX, lastY;
  let lastMouseSent = Date.now();

  function onMouseEnter({clientX, clientY}) {
    lastX = clientX;
    lastY = clientY;
  }

  function handleMouse(posX, posY) {
    let x = posX - lastX;
    let y = posY - lastY;

    lastX = posX;
    lastY = posY;

    if (throttle && Date.now() - lastMouseSent < throttle) return;

    socket.emit('mousemove', {x, y});
    lastMouseSent = Date.now();
  }

  function onMouseMove({clientX, clientY}) {
    handleMouse(clientX, clientY);
  }

  function onTouchStart(event) {
    let touch = event.touches[0];
    lastX = touch.clientX;
    lastY = touch.clientY;
  }

  function onTouchMove(event) {
    event.preventDefault();
    let touch = event.touches[0];
    handleMouse(touch.clientX, touch.clientY);
  }

  return (
    <div className="mousepad"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      <span className="icon icon-mouse" />
    </div>
  );

}

module.exports = mousepad;
