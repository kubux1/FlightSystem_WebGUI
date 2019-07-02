import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatTable } from '@angular/material';

export interface Tourist {
  name: string;
  surname: string;
  gender: string;
  country: string;
  birthDate: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private http: HttpClient){
  }

  loadAllTourists() {
    this.http.get('http://localhost:8080/tourist/get').subscribe(data => {
      // Clear an array
      this.dataSource.length = 0;
      for (let o of data) {
        this.dataSource.push(o);
      }
      // Refresh a mat-table
      this.table.renderRows();
    })
  }

  createTourist(name, surname, gender, country, birthDate) {
    var url = "http://localhost:8080/tourist/add"
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const httpParams = new HttpParams()
      .set('name', name.value)
      .set('surname', surname.value)
      .set('gender', gender.value)
      .set('country', country.value)
      .set('birthDate', birthDate.value);

    this.http.post(url, httpParams, httpOptions).subscribe();
  }

  deleteSelectedTourist(row) {
    var url = "http://localhost:8080/tourist/delete";

    const httpParams = new HttpParams()
      .set('name', row.name)
      .set('surname', row.surname)
      .set('birthDate', row.birthDate);

    let options = { params: httpParams };

    this.http.delete(url, options).subscribe();
  }

  dataSource: Tourist[] = [];
  @ViewChild(MatTable, {static: false}) table: MatTable<Tourist>;
  displayedColumns: string[] = ['name', 'surname', 'gender', 'country','birthDate'];
}
