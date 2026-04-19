import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductService } from '../services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  keyword: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void { this.loadProducts(); }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => this.errorMessage = err.message
    });
  }

  searchProducts(): void {
    if (!this.keyword.trim()) { this.loadProducts(); return; }
    this.productService.searchProducts(this.keyword).subscribe({
      next: (data) => this.products = data,
      error: (err) => this.errorMessage = err.message
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  editProduct(id: number): void { this.router.navigate(['/edit-product', id]); }
  newProduct(): void { this.router.navigate(['/new-product']); }
}
