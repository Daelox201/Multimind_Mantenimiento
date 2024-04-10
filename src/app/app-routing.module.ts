import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginestComponent } from './components/creacion_roles/loginest/loginest.component';

import { PruebaComponent } from './components/Navs_Tipos/prueba/prueba.component';
import { AdminComponent } from './components/creacion_roles/admin/admin.component';


import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LogestudianteComponent } from './components/Logins_Roles_Inicio/logestudiante/logestudiante.component';
import { NewmaestroComponent } from './components/creacion_roles/newmaestro/newmaestro.component';
import { LogearmaestroComponent } from './components/Logins_Roles_Inicio/logearmaestro/logearmaestro.component';
import { NewdirectivoComponent } from './components/creacion_roles/newdirectivo/newdirectivo.component';
import { LogeardirectivoComponent } from './components/Logins_Roles_Inicio/logeardirectivo/logeardirectivo.component';
import { ListaestComponent } from './components/lista_roles/listaest/listaest.component';
import { AdmonComponent } from './components/Pantallas_Princiaples_Roles/admon/admon.component';
import { PrincipaldirectorComponent } from './components/Pantallas_Princiaples_Roles/principaldirector/principaldirector.component';
import { PrincipaldocenteComponent } from './components/Pantallas_Princiaples_Roles/principaldocente/principaldocente.component';

import { ListadocenteComponent } from './components/lista_roles/listadocente/listadocente.component';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { PrincipalestudianteComponent } from './components/Pantallas_Princiaples_Roles/principalestudiante/principalestudiante.component';
import { ListadirectivosComponent } from './components/lista_roles/listadirectivos/listadirectivos.component';
import { NavinicioComponent } from './components/Navs_Tipos/navinicio/navinicio.component';
import { PreguntasComponent } from './components/Tests_Inteligencias_Multiples/preguntas/preguntas.component';
import { ResultadosComponent } from './components/Tests_Inteligencias_Multiples/resultados/resultados.component';
import { InteligenciasComponent } from './components/inteligencias/inteligencias.component';
import { ModificaralumnoComponent } from './components/modificar_roles/modificaralumno/modificaralumno.component';
import { ModificarmaestroComponent } from './components/modificar_roles/modificarmaestro/modificarmaestro.component';
import { ModificardirectivoComponent } from './components/modificar_roles/modificardirectivo/modificardirectivo.component';
import { MatematicaComponent } from './components/inteligencias/matematica/matematica.component';
import { VerbalComponent } from './components/inteligencias/verbal/verbal.component';
import { EspacialComponent } from './components/inteligencias/espacial/espacial.component';
import { CorporalComponent } from './components/inteligencias/corporal/corporal.component';
import { MusicalComponent } from './components/inteligencias/musical/musical.component';
import { IntraComponent } from './components/inteligencias/intra/intra.component';
import { InterComponent } from './components/inteligencias/inter/inter.component';
import { SudokuComponent } from './components/Todos_Juegos/sudoku/sudoku.component';
import { SnakeComponent } from './components/Todos_Juegos/snake/snake.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { ActverbalComponent } from './components/actualizar/tablalecturas/actverbal/actverbal.component';
import { TablalecturasComponent } from './components/actualizar/tablalecturas/tablalecturas.component';
import { ModificarlecturaComponent } from './components/actualizar/tablalecturas/modificarlectura/modificarlectura.component';
import { LectoraComponent } from './components/Todos_Juegos/lectora/lectora.component';
import { PuzzleComponent } from './components/Todos_Juegos/puzzle/puzzle.component';
import { PianoComponent } from './components/Todos_Juegos/piano/piano.component';
import { AdivinaComponent } from './components/Todos_Juegos/adivina/adivina.component';

import { PalabraComponent } from './components/Todos_Juegos/palabra/palabra.component';
import { MemoramaComponent } from './components/Todos_Juegos/memorama/memorama.component';
import { MoverComponent } from './components/Todos_Juegos/mover/mover.component';
import { TablayoutubeComponent } from './components/actualizar/tablayoutube/tablayoutube.component';
import { RegistrovideoComponent } from './components/actualizar/tablayoutube/registrovideo/registrovideo.component';
import { BaileComponent } from './components/Todos_Juegos/baile/baile.component';
import { TablapreguComponent } from './components/actualizar/tablapregu/tablapregu.component';
import { RegistropreguComponent } from './components/actualizar/tablapregu/registropregu/registropregu.component';
import { PreguntadosComponent } from './components/Todos_Juegos/preguntados/preguntados.component';
import { ModificarpreguComponent } from './components/actualizar/tablapregu/modificarpregu/modificarpregu.component';
import { ModificarVideoComponent } from './components/actualizar/tablayoutube/modificar-video/modificar-video.component';
import { MenuIntrapersonalComponent } from './components/actualizar_Menus_inteligencias/menu-intrapersonal/menu-intrapersonal.component';
import { MenuInterpersonalComponent } from './components/actualizar_Menus_inteligencias/menu-interpersonal/menu-interpersonal.component';
import { TablaPalabrasComponent } from './components/actualizar/tabla-palabras/tabla-palabras.component';
import { ResgistroPalabrasComponent } from './components/actualizar/tabla-palabras/resgistro-palabras/resgistro-palabras.component';
import { ActualizarPalabrasComponent } from './components/actualizar/tabla-palabras/actualizar-palabras/actualizar-palabras.component';
import { MenuCorporalComponent } from './components/actualizar_Menus_inteligencias/menu-corporal/menu-corporal.component';
import { MenuVerbalComponent } from './components/actualizar_Menus_inteligencias/menu-verbal/menu-verbal.component';
import { DiarioComponent } from './components/Todos_Juegos/diario/diario.component';
import { CreacionDiarioComponent } from './components/Todos_Juegos/diario/creacion-diario/creacion-diario.component';
import { TablaKaraokeComponent } from './components/actualizar/tabla-karaoke/tabla-karaoke.component';
import { MenuMusicalComponent } from './components/actualizar_Menus_inteligencias/menu-musical/menu-musical.component';
import { RegistroCancionComponent } from './components/actualizar/tabla-karaoke/registro-cancion/registro-cancion.component';
import { ModificarCancionComponent } from './components/actualizar/tabla-karaoke/modificar-cancion/modificar-cancion.component';
import { KaraokeComponent } from './components/Todos_Juegos/karaoke/karaoke.component';
import { TablaAdivinanzaComponent } from './components/actualizar/tabla-adivinanza/tabla-adivinanza.component';
import { RegistroAdivinanzaComponent } from './components/actualizar/tabla-adivinanza/registro-adivinanza/registro-adivinanza.component';
import { ModificarAdivinanzaComponent } from './components/actualizar/tabla-adivinanza/modificar-adivinanza/modificar-adivinanza.component';
import { AdivinanzaComponent } from './components/Todos_Juegos/adivinanza/adivinanza.component';


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
//JUEGOSSSSSSSSSSSSSSSSSS-------------------------------------
  {path: 'sudo', component: SudokuComponent},
  {path: 'snake/:id', component: SnakeComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'comprensionLectora/:id', component: LectoraComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'puzzle/:id', component: PuzzleComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'piano/:id', component: PianoComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'adivina/:id', component: AdivinaComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'palabra/:id', component: PalabraComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'memorama/:id', component: MemoramaComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'baile/:id', component: BaileComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'preguntados/:id', component: PreguntadosComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'Diario/:id', component: DiarioComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'newDiario/:id', component: CreacionDiarioComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'karaoke/:id', component: KaraokeComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'adivinanza/:id', component: AdivinanzaComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'mover', component: MoverComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},//prueba



  

  {path: 'actualizar/:id', component: ActualizarComponent ,canActivate: [AuthGuard],  children:[
    {path: '', component: PruebaComponent}//pantalla principal directivo
  ]},

  //Pantallas principales de  estudiantes, docentes, directivos y admins-------------------------------------
  {path: 'principalDirector/:id', component: PrincipaldirectorComponent ,canActivate: [AuthGuard],  children:[
    {path: '', component: PruebaComponent}//pantalla principal directivo
  ]},
  {path: 'principalDocente/:id', component: PrincipaldocenteComponent, children:[
    {path: '', component: PruebaComponent}//pantalla principal Docente
  ], canActivate: [AuthGuard]},
  {path: 'principalAdmin/:id', component: AdmonComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'principalEstudiante/:id', component: PrincipalestudianteComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},






   //Pantallas de las preguntas de los estudiantes------------------------------------------------------- 
  {path: 'preguntas/:id', component: PreguntasComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'resultados/:id', component: ResultadosComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},


  {path: 'fortalecimiento/:id', component: InteligenciasComponent ,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},//Habilidades blandas------------------------------------------------------------------------
  {path: 'LogicoMatematico/:id', component: MatematicaComponent ,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'LogicoVerbal/:id', component: VerbalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'Espacial/:id', component: EspacialComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'Corporal/:id', component: CorporalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'Musical/:id', component: MusicalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'Intra/:id', component: IntraComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},
  {path: 'Inter/:id', component: InterComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//pantalla principal Admin
  ]},


  //Registros de  estudiantes, docentes, directivos y admins----------------------------------------------
  {path: 'admin/:id', component: AdminComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//Registro Admin
  ]},
  {path: 'CrearMaestro/:id', component: NewmaestroComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//Registro Docente
  ]},
  {path: 'crearDirectivo/:id', component: NewdirectivoComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//Registro Directivo
  ]},
  {path: 'loginest/:id', component: LoginestComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//Registrar Estudiante
  ]},



  //MOdificar Alumnos
  {path: 'ModificarAlumno/:id', component: ModificaralumnoComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'ModificarDocente/:id', component: ModificarmaestroComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'ModificarDirectivo/:id', component: ModificardirectivoComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'ModificarLectura/:id', component: ModificarlecturaComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
 


  //Actualizacion de contenido de las inteligencias multiples------------------------------------------------
  {path: 'ActVerbal/:id', component: ActverbalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'RegistroVideo/:id', component: RegistrovideoComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]}, 
  {path: 'ModificarVideo/:id', component: ModificarVideoComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'RegistroPregunta/:id', component: RegistropreguComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'ModificarPregunta/:id', component: ModificarpreguComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'RegistroPlabara/:id', component: ResgistroPalabrasComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'ModificarPalabra/:id', component: ActualizarPalabrasComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'RegistroCancion/:id', component: RegistroCancionComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'ModificarCancion/:id', component: ModificarCancionComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'RegistroAdivinanza/:id', component: RegistroAdivinanzaComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'ModificarAdivinanza/:id', component: ModificarAdivinanzaComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},



  //MENUS DE LAS ACTUALIZAZCIONES DE LAS INTELIGENCIAS 
  {path: 'MenuIntrapersonal/:id', component: MenuIntrapersonalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'MenuInterpersonal/:id', component: MenuInterpersonalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'MenuKinestesica/:id', component: MenuCorporalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'MenuVerbal/:id', component: MenuVerbalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'MenuMusical/:id', component: MenuMusicalComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},




  //logear estudiantes, docentes, directivos y admins----------------------------------------------------
  {path: 'logDirectivo', component: LogeardirectivoComponent, children:[
    {path: '', component: NavinicioComponent}//logeo de Directivo
  ]},
  {path: 'logMaestro', component: LogearmaestroComponent, children:[
    {path: '', component: NavinicioComponent}//logeo de maestro
  ]},
  {path: 'logestudiante', component: LogestudianteComponent, children:[
    {path: '', component: NavinicioComponent}//logeo de estudiante
  ]},

  {path: 'recuperar', component: RecuperarComponent ,  children:[
    {path: '', component: NavinicioComponent}//pantalla principal directivo
  ]},

    //listas de los estudiantes, docentes, directivos y admins-------------------------------------------
  {path: 'lista/:id', component: ListaestComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los estudiantes
  ]},
  {path: 'listaDocente/:id', component: ListadocenteComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
    {path: 'listaDirectivo/:id', component: ListadirectivosComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'listaLecturas/:id', component: TablalecturasComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//lista de los docentes
  ]},
  {path: 'tablaKinestesica/:id', component: TablayoutubeComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'tablaPreguntas/:id', component: TablapreguComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'tablaPalabra/:id', component: TablaPalabrasComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'tablaKaraoke/:id', component: TablaKaraokeComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},
  {path: 'tablaAdivinanza/:id', component: TablaAdivinanzaComponent,canActivate: [AuthGuard], children:[
    {path: '', component: PruebaComponent}//logeo de Directivo
  ]},


  {path: '**', redirectTo: 'inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }