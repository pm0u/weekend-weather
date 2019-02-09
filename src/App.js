import React, { Component } from 'react';
import City from './City'

class App extends Component {

  state = {
    cities:[['Estes Park','Rocky Mountain National Park'], ['Center','Great Sand Dunes National Park'], ['Ouray','Uncompahgre National Forest']],
  }


  render() {
   return (
      <>
      <div className='row'>
      {this.state.cities.map((city,i)=> {
      return (<City location={city} key={i}/>)
      })}
      </div>
      <h5 className='center-align' style={{paddingBottom:30}}>What'll it be this weekend?? Type 2 or type 1 fun?</h5>
      </>
    );
  }
}

export default App;
