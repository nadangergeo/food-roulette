import React, { Component } from 'react';
import './App.css';
import config from "./config";

import Pyramid from "react-pyramid";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      postalCode: "112 20",
      postalCity: null,
      restaurants: []
    };

    this.handleChange = (e) => {
      let postalCode = e.target.value;

      this.setState({
        postalCode
      });
    };

    this.formatPostalCode = postalCode => {
      let pCode = postalCode.replace(/\s/g,'');
      pCode = pCode.substring(0,3) + "+" + pCode.substring(3);

      return pCode;
    }

    this.fetchPostalCity = (postalCode) => {
      let apiKey = config.pAPIKEY;
      let pCode = this.formatPostalCode(postalCode);

      let url = `https://papapi.se/json/?z=${ pCode }&token=${ apiKey }`;

      fetch(url).then(
        response => response.json()
      ).then(
        // if(json.length)
        json => {
        this.setState({
          postalCity: json.result[0].city
        }, () => {
          let city = this.state.postalCity.toLowerCase();
          let zipCode = postalCode.replace(" ", "");
          zipCode = zipCode.replace("+", "");
          
          let url = "https://api.hungrig.se/restaurants/search?city=" + city + "&deliveryType=1&find=&zip=" + zipCode;
          fetch(url).then(
            response => response.json()
          ).then((json) => {
            let restaurants = json.data;
            console.log(restaurants);

            this.setState({
              restaurants
            })
          });
        });
        }
      ).catch(e => {
        console.error(e);
      });
    }

    this.go = (e) => {
      this.fetchPostalCity(this.state.postalCode);
    }
  }
  
  render() {
    let restaurantsToRender = this.state.restaurants.map( (restaurant, index) => {
      let { restaurantName, availableLogoImageFormats } = restaurant;

      return (
        <img style={{width:"100%", height: "100%"}} src={availableLogoImageFormats[0].url} width="100" height="100" key={index} />
      );
    });

    return (
      <div className="App">
        {
          restaurantsToRender.length === 0 ? (
            <div className="container">
              <div className="form-container">
                <label html-for="postal-code">Ange Postkod:</label>
                <input html-name="postal-code" type="text" placeholder={"123 45"} onChange={this.handleChange} value={this.state.postalCode} />
                <button onClick={this.go}>Go!</button>

                <h1>{this.state.postalCode}</h1>
              </div> 
            </div>
          ) : (
            <Pyramid style={{width:"100vw", height: "100vh"}} className="restaurants">
            {
              restaurantsToRender
            }
            </Pyramid>
          )
        }
      </div>
    );
  }
}

export default App;
