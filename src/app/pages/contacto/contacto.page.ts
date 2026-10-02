import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonTextarea, IonButton } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  standalone: true,
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput, IonTextarea, IonButton]
})
export class ContactoPage {
  correo = '';
  mensaje = '';
  enviado = false;

  async enviar() {
    // Aquí es exactamente donde debes meter el bloque de código:
    await Preferences.set({
      key: 'ultimoMensaje',
      value: JSON.stringify({
        correo: this.correo,
        mensaje: this.mensaje
      })
    });

    this.enviado = true;
    console.log('Mensaje guardado localmente en Capacitor Preferences');
  }
}


