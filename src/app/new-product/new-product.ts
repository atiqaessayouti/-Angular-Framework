import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../services/product';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProductComponent implements OnInit {
  product: Product = { name: '', price: 0, quantity: 0, available: true };
  editMode = false;
  productId!: number;
  errorMessage = '';
  successMessage = '';

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.productId = id;
      this.productService.getProductById(id).subscribe({
        next: (data) => this.product = data,
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  saveProduct(): void {
    if (this.editMode) {
      this.productService.updateProduct(this.productId, this.product).subscribe({
        next: () => { this.successMessage = 'Produit modifie!'; setTimeout(() => this.router.navigate(['/products']), 1500); },
        error: (err) => this.errorMessage = err.message
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => { this.successMessage = 'Produit ajoute!'; setTimeout(() => this.router.navigate(['/products']), 1500); },
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  cancel(): void { this.router.navigate(['/products']); }
}
