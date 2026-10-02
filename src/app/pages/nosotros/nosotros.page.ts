import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular';
import { GeolocationService } from '../../services/geolocation';

@Component({
  standalone: true,
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  imports: [CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class NosotrosPage implements OnInit {
  distancia: number = 0;

  // Coordenadas de las oficinas (Calle Arcos de Jalón 18, Madrid)
  private oficinaLat = 40.4452;
  private oficinaLon = -3.6115;

  constructor(private geolocationService: GeolocationService) {}

  async ngOnInit() {
    try {
      // Obtenemos la posición actual del dispositivo
      const coords = await this.geolocationService.getCurrentPosition();
      
      // Calculamos la distancia usando Haversine
      const dist = this.calcularDistancia(coords.latitude, coords.longitude, this.oficinaLat, this.oficinaLon);
      
      // Guardamos la distancia redondeada a 2 decimales
      this.distancia = Math.round(dist * 100) / 100;
    } catch (error) {
      console.error('Error al obtener la geolocalización:', error);
    }
  }

  // Fórmula Haversine
  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}