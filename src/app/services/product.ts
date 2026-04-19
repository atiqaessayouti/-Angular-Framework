import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  available: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<Product[]> { return this.http.get<Product[]>(this.apiUrl); }
  getProductById(id: number): Observable<Product> { return this.http.get<Product>(`${this.apiUrl}/${id}`); }
  createProduct(p: Product): Observable<Product> { return this.http.post<Product>(this.apiUrl, p); }
  updateProduct(id: number, p: Product): Observable<Product> { return this.http.put<Product>(`${this.apiUrl}/${id}`, p); }
  deleteProduct(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  searchProducts(kw: string): Observable<Product[]> { return this.http.get<Product[]>(`${this.apiUrl}/search?keyword=${kw}`); }
}
