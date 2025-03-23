import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  loading = false;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  mapZoom = 12;
  mapCenter!: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
    center: { lat: 10.8231, lng: 106.6297 },
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };


  @Output() locationSelected = new EventEmitter<any>();
  constructor(private toastr: ToastrService) { }

  ngOnInit(){
    this.getCurrentLocation();
  }
  saveLocation() {
    this.locationSelected.emit(this.mapCenter.toJSON());
  }

  markerClicked(event: google.maps.MapMouseEvent) {
    let latLng = (event.latLng?.toJSON());
    this.loadMap(latLng);
  }

  loadMap(latLng: any){
    this.mapCenter = new google.maps.LatLng(latLng);
    this.map.panTo(latLng);
    this.markerOptions = {
      draggable: false,
      animation: google.maps.Animation.DROP,
    };
  }
  
  getCurrentLocation() {
    this.loading = true;
  
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.loading = false;
  
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        this.mapCenter = new google.maps.LatLng(point);
        this.map.panTo(point);
  
        this.markerOptions = {
          draggable: false,
          animation: google.maps.Animation.DROP,
        };
      },
      (error) => {
        this.loading = false;
  
        if (error.PERMISSION_DENIED) {
          this.toastr.error("Couldn't get your location", 'Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          this.toastr.error(
            "Couldn't get your location",
            'Position unavailable'
          );
        } else if (error.TIMEOUT) {
          this.toastr.error("Couldn't get your location", 'Timed out');
        } else {
          this.toastr.error(error.message, `Error: ${error.code}`);
        }
      },
      { enableHighAccuracy: true }
    );
  }
}
