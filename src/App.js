import React from 'react';
import './App.css';
import config from "./config";

import Pyramid from "react-pyramid";
import Spinner from './components/Spinner';

const App = ({state, actions, width, height}) => {

  const handleChange = (e) => {
    let postalCode = e.target.value;

    actions.setPostalCode(postalCode);
  };

  const formatPostalCode = postalCode => {
    let pCode = postalCode.replace(/\s/g,'');
    pCode = pCode.substring(0,3) + "+" + pCode.substring(3);

    return pCode;
  }

  const fetchPostalCity = (postalCode) => {
    let apiKey = config.pAPIKEY;
    let pCode = this.formatPostalCode(postalCode);

    let url = `https://papapi.se/json/?z=${ pCode }&token=${ apiKey }`;

    fetch(url).then(
      response => response.json()
    ).then(
      // if(json.length)
      json => {
        let postalCity = json.result[0].city;
        actions.setPostalCity(postalCity);

        let city = postalCity.toLowerCase();
        let zipCode = postalCode.replace(" ", "");
        zipCode = zipCode.replace("+", "");
        
        let url = "https://api.hungrig.se/restaurants/search?city=" + city + "&deliveryType=1&find=&zip=" + zipCode;
        fetch(url).then(
          response => response.json()
        ).then((json) => {
          let restaurants = json.data;
          console.log(restaurants);

          actions.setRetaurants(restaurants);
        });
      }
    ).catch(e => {
      console.error(e);
    });
  };

  const go = (e) => {
    this.fetchPostalCity(state.postalCode);
  };
  
  let restaurantsToRender = state.restaurants.map( (restaurant, index) => {
    let { restaurantName, availableLogoImageFormats } = restaurant;

    return (
      <img style={{width:"100%", height: "100%"}} src={availableLogoImageFormats[0].url} width="100" height="100" key={index} />
    );
  });


  let items = [{
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }, {
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }, {
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }, {
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }, {
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }, {
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }, {
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }, {
    imgSrc: "https://www.pizzahut.se/images/pizza-hut-icon.png?v=20180214122245"
  }]

  // let items = state.restaurants.map( (restaurant, index) => {
  //   let { restaurantName, availableLogoImageFormats } = restaurant;

  //   return {
  //     imgSrc: availableLogoImageFormats[0].url,
  //     restaurantName
  //   }
  // });

  // return (
  //   <div className="App">
  //     {
  //       restaurantsToRender.length === 0 ? (
  //         <div className="container">
  //           <div className="form-container">
  //             <label html-for="postal-code">Ange Postkod:</label>
  //             <input html-name="postal-code" type="text" placeholder={"123 45"} onChange={this.handleChange} value={state.postalCode} />
  //             <button onClick={this.go}>Go!</button>

  //             <h1>{state.postalCode}</h1>
  //           </div> 
  //         </div>
  //       ) : (
  //         <Pyramid style={{width:"100vw", height: "100vh"}} className="restaurants">
  //         {
  //           restaurantsToRender
  //         }
  //         </Pyramid>
  //       )
  //     }
  //   </div>
  // );

  const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "yellow",
      width: "100%",
      height: "100%"
  };

  const spinnerWidth = Math.min(width, height);
  const spinnerHeight = Math.min(width, height);

  const spinnerContainer = {
    width: 100 * spinnerWidth/width + "%",
    height: 100 * spinnerHeight/height + "%",
  };

  let spinnerProps = {
    items,
    width: spinnerWidth,
    height: spinnerHeight,
    isSpinning: state.spinRestaurants
  }

  let spinRestaurantsButton = {
    position: "fixed",
    top: "50px",
    left: "50px"
  }

  return (
    <div style={containerStyle}>

          <button style={spinRestaurantsButton} onClick={() => {actions.toggleRestaurantSpinner()} }>Spin Restaurant wWheel</button>

          <div style={spinnerContainer}>
            <Spinner {...spinnerProps}>

            </Spinner>
          </div>
    </div>
  );
};

export default App;
