import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../modelo/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  endpoint = 'task/';

  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  selecionarTasks() {
      return this.http.get<Task[]>(`${this.url}/${this.endpoint}`);
  }

  cadastrar(task:Task){
    return this.http.post(`${this.url}/${this.endpoint}cadastrar`, task);
  }

  atualizar(task:Task){
    return this.http.put(`${this.url}/${this.endpoint}atualizar`, task);
  }

  remover(id:number){
    return this.http.delete(`${this.url}/${this.endpoint}deletar/`+ id);
  }

  fazerTarefa(id:number){
    return this.http.put(`${this.url}/${this.endpoint}fazerTarefa/`, id);
  }
}
