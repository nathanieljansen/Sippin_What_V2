let zip = "";

let map, infoWindow;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.7392,
      lng: -104.9903
    },
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&sensor=true&key=AIzaSyA6bL6UJOG73Si1xEJg19r_BJOKMLIFnjM",
        type: "GET",
      }).then((resultsBack) => {
        console.log(resultsBack);
        // console.log('did it work ???', resultsBack.results[5].address_components[0].long_name);
        // zip = resultsBack.results[5].address_components[0].long_name;
        zip = resultsBack.results.find((result) => {
          return result.address_components.find(({
            types
          }) => types.includes('postal_code'))
        })

        if (!zip) {
          zip = 'DEFAULT';
        } else {
          zip = zip.address_components.find(({
            types
          }) => types.includes('postal_code')).long_name;
        }

        localStorage.setItem("zip", zip);
        console.log(zip);
      })

      infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: 2000,
        type: ['liquor_store']
      }, callback);
      map.setCenter(pos);
    }, () => {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  const placeLoc = place.geometry.location;
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', () => {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);

}

function createList(place) {
  const placeLoc = place.geometry.location;
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  const newDiv = $("<p>");
  newDiv.html(place.name + "<br>" + place.vicinity);

  $("#name").append(newDiv);
  // console.log(place);
};

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
      createList(results[i]);
    }
  }
}