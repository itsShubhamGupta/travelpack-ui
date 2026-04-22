import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackingService {
private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // 📦 GET ALL PACKAGES
  getPackages(params?: any): Observable<any> {

    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<any>(`${this.baseUrl}/packages`, { params: httpParams });
  }

  // 📄 GET PACKAGE BY ID
  getPackageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/package/${id}`);
  }

  // 🔍 FILTER (OPTIONAL)
  getByFilter(location?: string, minPrice?: number, maxPrice?: number) {

    let params = new HttpParams();

    if (location) params = params.set('location', location);
    if (minPrice) params = params.set('minPrice', minPrice);
    if (maxPrice) params = params.set('maxPrice', maxPrice);

    return this.http.get<any>(`${this.baseUrl}/packages`, { params });
  }

  // 🧑‍💼 ADMIN - ADD PACKAGE
  addPackage(data: FormData) {
    return this.http.post(`${this.baseUrl}/admin/package`, data);
  }

  // 🧑‍💼 ADMIN - UPDATE PACKAGE
  updatePackage(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // 🧑‍💼 ADMIN - DELETE PACKAGE
  deletePackage(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // 🖼️ IMAGE UPLOAD
  uploadImage(file: File) {

    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${environment.apiUrl}/admin/package/upload-image`, formData);
  }
}
