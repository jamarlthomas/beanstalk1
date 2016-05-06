var mapMarkers = {};
var map;
var infowindow;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControlOptions: {
            mapTypeIds: ['map_style']
        },
        mapTypeId: 'map_style',
        center: { lat: 0, lng: 0 },
        zoom: 3,
        maxZoom: 5,
        minZoom: 0,
        disableDoubleClickZoom: true,
        streetViewControl: false,
        mapTypeControl: false
    });

    var styles = [
        {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]  // Turn off points of interest.
        }, {
            featureType: 'transit.station',
            stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
        },
        {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [
                { "color": "#0c419a" }
            ]
        },
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
            { visibility: "off" }
            ]
        },
        {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [
            { visibility: "off" }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              { "color": "#F3F3F3" }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
              { "visibility": "off" }
            ]
        },
         {
             "featureType": "administrative",
             "stylers": [
               { "visibility": "off" }
             ]
         }
    ];

    //Associate the styled map with the MapTypeId and set it to display.
    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    getLocations('/map/data.json');
}

function createMarker(point, location) {
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        title: location.title,
        icon: '/map/afton-marker.svg'
    });

    marker.setIcon(new google.maps.MarkerImage(
		'/map/afton-marker.svg',
		new google.maps.Size(15, 15),
		new google.maps.Point(0, 0),
		new google.maps.Point(8, 15),
		new google.maps.Size(15, 15)
	));

    var html = '';
    html += '<div style="max-width:300px">';
    html += '<div class="location-title"><strong style="font-size:17px;color:#0C419A">' + location.title + '</strong></div>';
    html += '<div class="area-address">' + location.image + location.content + '</div></div>';

    google.maps.event.addListener(marker, 'click', function () {
        if (infowindow) infowindow.close();
        infowindow = new google.maps.InfoWindow({ content: html });
        infowindow.open(map, marker);
    });
    return marker;
}

function getLocations(url) {

    jQuery.getJSON(url, function (data) {

        var bounds = new google.maps.LatLngBounds();

        jQuery.each(data, function () {
            var point = new google.maps.LatLng(this.latitude, this.longitude);
            var marker = createMarker(point, {
                id: this.id,
                title: this.title,
                latitude: this.latitude,
                longitude: this.longitude,
                content: this.content,
                image: this.image && this.image.length > 0 ? '<img style="float:right;margin-top:5px;margin-left:5px;max-width:100px;" src="' + this.image + '"/>' : ''
            });

            mapMarkers[this.id] = marker;
            bounds.extend(point);
        });

        var markerCluster = new MarkerClusterer(map, mapMarkers, {
            gridSize: 4, styles: [{
                url: '/map/afton-marker.svg',
                height: 15,
                width: 15,
                anchor: [15, 15],
                textColor: '#ffffff',
                textSize: 9
            }]
        });

        map.fitBounds(bounds);
    });
};