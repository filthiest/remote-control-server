const React = require('react');

const Mousepad = require('./mousepad.js');
const Input = require('./input.js');
const Log = require('./log.js');
const Navbar = require('./navbar.js');

const navStore = require('../store/navStore.js');

function app() {
  let active = navStore.getActive();

  let panels = {
    mousepad: <Mousepad throttle="10" />,
    log: <Log />
  };

  let panel = panels[active] || <div className="blank" />;

  return (<div className="app">
    <Navbar />
    {panel}
    <Input />
  </div>);
}

module.exports = app;
