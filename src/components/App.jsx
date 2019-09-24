import React, { Component } from 'react';

import Conversion from './Conversion';

import '../css/App.css';
class App extends Component{

  render() {
    return (
        <div className="height-90">
          <div className="flex-container text-center">
            <div className='card'>
              <div className="card-header">
                <h1>Redux Training</h1>
              </div>
              <div className="card-body">
                <h3>Currency Change</h3>
                <Conversion/>
              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default App;