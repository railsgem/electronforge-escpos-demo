import React from 'react';
import escpos from 'escpos';
// const escpos = require('escpos');

export default class App extends React.Component {

// const device  = new escpos.Network('localhost');
  constructor(props) {
    super(props);


    this.state = {
      message: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log('asdfasfsd');
    event.preventDefault();

    // const device  = new escpos.Network('192.168.1.245');
    // const device  = new escpos.Serial('/dev/usb/lp0');
    const device = new escpos.Serial('COM4');


    console.log(device);
    const options = { encoding: "GB18030" /* default */ }
    console.log(options);
    
    // encoding is optional
    
    const printer = new escpos.Printer(device, options);
    console.log(printer);
    
    device.open(function(){
      printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text('The quick brown fox jumps over the lazy dog')
      .text('敏捷的棕色狐狸跳过懒狗')
      .barcode('1234567', 'EAN8')
      .qrimage('https://github.com/song940/node-escpos', function(err){
        this.cut();
        this.close();
        console.log(err && err.message);
      });
    });

    this.setState({ message: "success" });
  }

  render() {
    return (<div>
      <h2>Welcome to React!</h2>
      <button onClick={this.handleClick}>Print </button>
      <h2>{this.state.message}</h2>
    </div>);
  }
}
