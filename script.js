async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const status = document.getElementById('status');
    const weatherResult = document.getElementById('weatherResult');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const description = document.getElementById('description');

    if (!cityInput) {
        status.textContent = 'Please enter a city name.';
        return;
    }

    status.textContent = 'Fetching weather data...';
    weatherResult.style.display = 'none';

    try {
        const response = await fetch(`https://localhost:7173/api/WeatherForecast/${encodeURIComponent(cityInput)}`);
        if (!response.ok) throw new Error('City not found or API error.');

        const data = await response.json();
        cityName.textContent = data.city;
        temperature.textContent = data.temperature;
        humidity.textContent = data.humidity;
        description.textContent = data.description;

        weatherResult.style.display = 'block';
        status.textContent = '';
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
}

// Allow Enter key to trigger search
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});