
function airline_init_pre() {
  prop.airline = {};
  prop.airline.airlines = {};
}

function airline_init() {
  // Civil Airlines
  airline_load("UAL");
  airline_load("BAW");
  airline_load("AAL");
  airline_load("AWE");
  airline_load("CESSNA");
  airline_load("ACA");

  airline_load("KLM");
  airline_load("KLC");
  airline_load("DAL");
  airline_load("AIRTAXI");
  airline_load("LIGHTGA");
  airline_load("FASTGA");
  airline_load("SAS");
  airline_load("NAX");
  airline_load("EIN");
  airline_load("RYR");

  // South American
  airline_load("ONE");
  airline_load("GLO");
  airline_load("TAM");
  airline_load("AVA");
  airline_load("AZU");
  airline_load("EMBRAER");

  // Russian
  airline_load("AFL");
  airline_load("MOV");
  airline_load("RLU");
  airline_load("SBI");
  airline_load("SVR");
  airline_load("TYA");
  airline_load("ASA");
  airline_load("SWA");

  // Cargo Airlines
  airline_load("FDX");
  airline_load("UPS");
  airline_load("CWC");
  
  // Military Air Forces
  airline_load("RFF");
  airline_load("FAB");
  airline_load("USAF");
  
    // Internationals to South America
  airline_load("SA-AEA");
  airline_load("SA-AFR");
  airline_load("SA-AMX");
  airline_load("SA-AVA");
  airline_load("SA-AZA");
  airline_load("SA-BAW");
  airline_load("SA-CCA");
  airline_load("SA-DLH");
  airline_load("SA-IBE");
  airline_load("SA-KAL");
  airline_load("SA-KLM");
  airline_load("SA-LAN");
  airline_load("SA-UAE");
  airline_load("SA-UAL");
  
  airline_load("DLH");
  
  airline_load("THY");

}

function airline_load(icao) {
  icao = icao.toLowerCase();
  new Content({
    type: "json",
    url: "assets/airlines/"+icao+".json",
    payload: icao.toLowerCase(),
    callback: function(status, data, payload) {
      if(status == "ok") {
        prop.airline.airlines[payload] = data;
      }
    }
  });
}

function airline_get(icao) {
  icao = icao.toLowerCase();
  return prop.airline.airlines[icao];
}

function airline_get_aircraft(icao, fleet) {
  var airline     = airline_get(icao);

  if (fleet) {
    try {
      return choose_weight(airline.fleets[fleet.toLowerCase()]);
    }
    catch (e) {
      console.log("Unable to find fleet " + fleet + " for airline " + icao);
      throw e;
    }
  }
  else {
    try {
      return choose_weight(airline.fleets['default']);
    }
    catch (e) {
      return choose_weight(airline.aircraft);
    }
  }
}

function airline_ready() {
  for(var i in prop.airline.airlines) {
    var airline = prop.airline.airlines[i];
    if (airline.aircraft) {
      for(var j=0;j<airline.aircraft.length;j++) {
        if(!(airline.aircraft[j][0].toLowerCase() in prop.aircraft.models)) {
          console.warn("Airline "+i.toUpperCase()+" uses nonexistent aircraft "+airline.aircraft[j][0]+", expect errors");
        }
      }
    }
    if (airline.fleets) {
      for (var f in airline.fleets) {
        for(var j=0;j<airline.fleets[f].length;j++) {
          if(!(airline.fleets[f][j][0].toLowerCase() in prop.aircraft.models)) {
            console.warn("Airline "+i.toUpperCase()
                         +" uses nonexistent aircraft "+airline.fleets[f][j][0]
                         +", expect errors");
          }
        }
      }
    }
  }
}
