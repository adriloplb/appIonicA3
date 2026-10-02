import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  imports: [CommonModule, IonContent, IonGrid, IonRow, IonCol]
})
export class ProductosPage implements OnInit {
  products: any = [];

  constructor(private productService: ProductsService) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }
}


