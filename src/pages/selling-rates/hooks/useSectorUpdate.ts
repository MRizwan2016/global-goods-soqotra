
export const useSectorUpdate = (setSectors: (sectors: string[]) => void) => {
  const updateSectorsByCountry = (country: string) => {
    switch(country) {
      case "Kenya":
        setSectors(["Nairobi", "Mombasa", "Kisumu", "Nakuru"]);
        break;
      case "Sri Lanka":
        setSectors(["Colombo", "Kandy", "Galle", "Jaffna"]);
        break;
      case "Eritrea":
        setSectors(["Asmara", "Keren", "Massawa"]);
        break;
      case "Sudan":
        setSectors(["Khartoum", "Port Sudan", "Omdurman"]);
        break;
      case "Saudi Arabia":
        setSectors(["Riyadh", "Jeddah", "Mecca", "Medina"]);
        break;
      case "United Arab Emirates":
        setSectors(["Dubai", "Abu Dhabi", "Sharjah", "Ajman"]);
        break;
      case "Somalia":
        setSectors(["Mogadishu", "Hargeisa", "Bosaso"]);
        break;
      case "Tunisia":
        setSectors(["Tunis", "Sfax", "Sousse"]);
        break;
      case "Philippines":
        setSectors(["Manila", "Cebu", "Davao", "Quezon City"]);
        break;
      case "Mozambique":
        setSectors(["Maputo", "Beira", "Nampula"]);
        break;
      case "Uganda":
        setSectors(["Kampala", "Entebbe", "Jinja"]);
        break;
      case "Tanzania":
        setSectors(["Dar es Salaam", "Zanzibar", "Dodoma"]);
        break;
      case "Qatar":
        setSectors([
          "Doha", "Al Rayyan", "Wakra", "Mansoora", "Al Khor", "Umm Salal", "West Bay", "Lusail"
        ]);
        break;
      case "Oman":
        setSectors([
          "Muscat", "Salalah", "Sohar", "Nizwa"
        ]);
        break;
      case "Kuwait":
        setSectors([
          "Kuwait City", "Hawalli", "Salmiya", "Farwaniya"
        ]);
        break;
      case "Bahrain":
        setSectors([
          "Manama", "Muharraq", "Riffa", "Isa Town"
        ]);
        break;
      case "Lebanon":
        setSectors([
          "Beirut", "Tripoli", "Sidon", "Zahle"
        ]);
        break;
      default:
        setSectors([]);
    }
  };

  return { updateSectorsByCountry };
};
