/*global google*/

var React = require('react');
var createReactClass = require('create-react-class');

var INITIAL_LOCATION = {
  address: 'Via Federico Brassi 1, Milano',
  position: {
    latitude: 45.513806,
    longitude: 9.125250
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 14;

var PIAZZA_DUOMO = {
  latitude: 29.532804,
  longitude: -55.491477
};

var PIAZZALE_LORETO = {
  latitude: 45.486216,
  longitude: 9.216384
};

var PIAZZALE_MACIACCHINI = {
  latitude: 45.497607,
  longitude: 9.185750
};

var Geocode = createReactClass({  
  getInitialState: function () {
    return {
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address
    };
  },

  geocodeAddress: function (address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: INITIAL_LOCATION.latitude,
        lng: INITIAL_LOCATION.longitude
      });

      this.marker.setPosition({
        lat: INITIAL_LOCATION.latitude,
        lng: INITIAL_LOCATION.longitude
      });

    }.bind(this));
  },

  handleFormSubmit: function (submitEvent) {
    submitEvent.preventDefault();

    var address = this.searchInputElement.value;

    this.geocodeAddress(address);
  },

  componentDidMount: function () {
    var mapElement = this.mapElement;
    
    this.map = new google.maps.Map(mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

  

    this.geocoder = new google.maps.Geocoder();
  },

  setSearchInputElementReference: function (inputReference) {
    this.searchInputElement = inputReference;
  },

  setMapElementReference: function (mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    return (
      

        <div className="geomap">
         
          <div className="col-sm-12">

            <form className="form-inline" onSubmit={this.handleFormSubmit}>
                <p>Inserisci l'indirizzo</p>
                <div className="col-md-8">

                  <div className="form-group">
                    <label className="sr-only" htmlFor="address">Address</label>
                    <input type="text" className="form-control input-lg" id="address" placeholder="Via Grassi, Milano" ref={this.setSearchInputElementReference} required />
                  </div>

                </div>
                <div className="col-md-4">

                  <button type="submit" className="btn btn-default btn-lg">
                    Mia Posizione
                  </button>

                </div>
             
            </form>

         
        </div>
       
          <div className="col-sm-12">

            {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}

            <div className="map" ref={this.setMapElementReference}></div>
            
          </div>
       
     </div>
    );
  }
});

module.exports = Geocode;
