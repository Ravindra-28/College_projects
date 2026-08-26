async function getWeather(){
  const city=document.getElementById('cityInput').value.trim();
  const message=document.getElementById('message');
  if(!city){message.textContent='Please enter a city.';return;}
  message.textContent='Loading...';
  try{
    const geo=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const g=await geo.json();
    if(!g.results?.length) throw new Error('City not found');
    const place=g.results[0];
    const weather=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`);
    const w=await weather.json();
    const c=w.current;
    document.getElementById('city').textContent=`${place.name}, ${place.country}`;
    document.getElementById('temp').textContent=`${Math.round(c.temperature_2m)}°C`;
    document.getElementById('condition').textContent=condition(c.weather_code);
    document.getElementById('humidity').textContent=`${c.relative_humidity_2m}%`;
    document.getElementById('wind').textContent=Math.round(c.wind_speed_10m);
    document.getElementById('result').classList.remove('hidden');
    message.textContent='';
  }catch(e){message.textContent=e.message||'Something went wrong.';}
}
function condition(code){
  if(code===0)return'☀️ Clear sky';
  if([1,2,3].includes(code))return'⛅ Partly cloudy';
  if([45,48].includes(code))return'🌫️ Fog';
  if([51,53,55,56,57].includes(code))return'🌦️ Drizzle';
  if([61,63,65,66,67,80,81,82].includes(code))return'🌧️ Rain';
  if([71,73,75,77,85,86].includes(code))return'❄️ Snow';
  if([95,96,99].includes(code))return'⛈️ Thunderstorm';
  return'🌤️ Weather';
}
document.getElementById('cityInput').addEventListener('keydown',e=>{if(e.key==='Enter')getWeather()});