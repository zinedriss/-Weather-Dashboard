const weatherDescriptions = {
    "clear sky": "The sky is completely clear with no clouds.",
    "few clouds": "There are a few scattered clouds in the sky, but plenty of sunshine.",
    "scattered clouds": "The sky has some clouds scattered around, but it remains mostly sunny.",
    "broken clouds": "The sky is partly cloudy, with large patches of clouds blocking the sun.",
    "shower rain": "Expect light to moderate rain showers.",
    "rain": "It is raining, with moderate to heavy rain expected.",
    "thunderstorm": "There is a thunderstorm with lightning and heavy rain.",
    "snow": "It is snowing, and the ground may start to accumulate snow.",
    "mist": "There is a misty atmosphere with reduced visibility.",
    "fog": "Fog is covering the area, leading to very low visibility.",
    "haze": "The air is hazy, reducing visibility but no precipitation.",
    "dust": "Dust is in the air, making it difficult to see and breathe.",
    "smoke": "There is smoke in the air, which could be from a fire or pollution.",
    "overcast clouds": "The sky is completely covered with clouds, blocking all sunlight.",
    "light rain": "There is light rain falling, not heavy but steady.",
    "heavy rain": "Heavy rain is expected, with a strong downpour.",
    // Add more descriptions as needed
  };
  
  export function getLongDescription(description) {
    // Check if the description exists in the weatherDescriptions object
    if (weatherDescriptions[description]) {
      return weatherDescriptions[description];
    } else {
      return "No detailed description available for this weather condition.";
    }
  }
  