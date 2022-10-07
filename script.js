window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(
    ".temperature-degree"
  );
  let locationTimezone = document.querySelector(".location-timezone");
  let iconTag = document.querySelector(".icon");
  let temperatureSection = document.querySelector(
    ".temperature-section"
  );
  let temperatureSpan = document.querySelector(
    ".temperature-section span"
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const APIkey = "0aaf9b32b941a7c6faacbbf24426c8d2";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { description, icon } = data.weather[0];
          const { temp } = data.main;
          //Set DOM elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.name;
          // Formula for temp to celcius / Fahrenheit
          let fahrenheit = (temp * 9) / 5 + 32;
          //setIcons
          const iconSource = `https://openweathermap.org/img/wn/${icon}@4x.png`;
          iconTag.src = iconSource;
          // change temperature to celsius/fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp;
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = fahrenheit.toFixed(2);
            }
          });
        });
    });
  }
});
