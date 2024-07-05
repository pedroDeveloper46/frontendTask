import { Component } from '@angular/core';
import { Task } from '../modelo/Task';
import { TaskService } from '../servico/task.service';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

    btnCadastro:boolean = true;

    tabela:boolean = true;

    task = new Task();

    tasks:Task[] = [];


    constructor(private servico:TaskService){
      
    }

    selecionar():void{
      this.servico.selecionarTasks()
      .subscribe(retorno => this.tasks = retorno)
    }

    selecionarTask(posicao:number):void{
        this.task = this.tasks[posicao];

        this.btnCadastro = false;
        this.tabela = false;
    }

    ngOnInit(){
      this.selecionar();
    }

    atualizar():void{
        this.servico.atualizar(this.task).subscribe(retorno =>{

          this.btnCadastro = true;

          this.tabela = true;

          this.selecionar();

          Swal.fire(
            'Sucesso!',
            'Tarefa Alterada com Sucesso!',
            'success'
    
          )

          this.task = new Task();

        })
    }

    fazerTarefa(id:number):void{
      this.servico.fazerTarefa(id).subscribe(retorno =>{

        console.log(id);

        Swal.fire(
          'Sucesso!',
          'Tarefa Feita com Sucesso!',
          'success'
  
        )
        this.selecionar();

        this.task = new Task();

      })
  }

    cadastrar():void{
        this.servico.cadastrar(this.task).subscribe(retorno=> { 
        
        this.selecionar(); 
      
        Swal.fire(
          'Sucesso!',
          'Tarefa Cadastrada com Sucesso',
          'success'
  
        )

        this.task = new Task();
      
      });
    }

    remover():void{
      this.servico.remover(this.task.id).subscribe(retorno =>{

        this.btnCadastro = true;

        this.tabela = true;

        this.selecionar();

        Swal.fire(
          'Sucesso!',
          'Tarefa Removida com Sucesso!',
          'success'
  
        )

        this.task = new Task();

      })
  }

  cancelar(){

    this.task = new Task();

    this.btnCadastro = true;

    this.tabela = true;


  }

    

}
