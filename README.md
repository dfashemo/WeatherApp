# Weather App

A responsive React application that shows the current 5-day forecast for any city or your current location, with support for Celsius/Fahrenheit and history of recent searches.

## 🌤️ Features

- **Search by city name** or **“Use My Location”** (browser Geolocation API)  
- **Current conditions**: temperature, description, “feels like”, humidity, wind  
- **5-day daily forecast** with icon, high/low, description  
- **Hourly forecast** toggle with time-by-time temperatures  
- **Units toggle**: switch between °C (Metric) and °F (Imperial)  
- **Recent searches** list for quick lookup  
- **Responsive layout** built with Tailwind CSS  

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)  
- npm (comes with Node) or Yarn  

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the project root:
   ```bash
   REACT_APP_GOOGLE_WEATHER_API_KEY=your_google_weather_api_key
   REACT_APP_GOOGLE_GEOCODING_API_KEY=your_google_geocoding_api_key
   ```
   - Enable **“Maps Platform Weather API”** and **“Geocoding API”** in Google Cloud Console  
   - Attach a billing account (free tier available)  
   - (Optional) Restrict your key to `http://localhost:3000/*` for local testing

### Running the App

```bash
npm start
# or
yarn start
```

- Opens at `http://localhost:3000`  
- Live-reloads on code changes  


---

## 🗂️ Project Structure

```
weather-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/
│   │   └── weather.js           # Google Weather + Geocoding wrappers
│   ├── components/
│   │   ├── CurrentWeatherCard.jsx
│   │   ├── ForecastList.jsx
│   │   ├── HourlyList.jsx
│   │   ├── Loader.jsx
│   │   ├── Error.jsx
│   │   └── SearchBar.jsx
│   ├── context/
│   │   └── WeatherContext.jsx   # City + history state
│   ├── hooks/
│   │   ├── useWeather.js        # Fetches weather on city/geo/units change
│   │   └── useGeolocation.js    # Browser Geolocation wrapper
│   ├── utils/
│   │   └── geolocation.js       # Promise-based getCurrentPosition
│   ├── styles/
│   │   └── globals.css          # Tailwind imports & custom styles
│   ├── App.jsx
│   └── index.js
├── .env
├── tailwind.config.js
├── package.json
└── README.md
```

---

## ⚙️ Usage

1. **Search** any city in the input and hit **Search**  
2. **Click the 📍** button to use your current location  
3. **Toggle units** between °C/°F with the dropdown  
4. **Switch views** between Daily and Hourly forecasts  
5. **Recent searches** appear at the bottom—click one to re-load  

---

## 🔧 Technologies

- **React** with Hooks & Context API  
- **Axios** for HTTP requests  
- **Tailwind CSS** for utility-first styling  
- **Google Maps Platform**  
  - Weather API (`currentConditions:lookup`, `forecast/days:lookup`, `forecast/hours:lookup`)  
  - Geocoding API for city → lat/lon  
- **Browser Geolocation API**

---

## 🛠️ Future Improvements

- Caching responses to reduce API calls  
- Add graph/charts for temperature trends (e.g. using Recharts)  
- Dark mode / theming  
- Localization (multi-language support)  
- Error retry and offline support (service worker)


> Built with ❤️ by Demi Fashemo
