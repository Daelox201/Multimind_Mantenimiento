import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginestComponent } from './components/creacion_roles/loginest/loginest.component';
import { ListaestComponent } from './components/lista_roles/listaest/listaest.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PruebaComponent } from './components/Navs_Tipos/prueba/prueba.component';
import { AdminComponent } from './components/creacion_roles/admin/admin.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule} from '@angular/fire/compat';
import { FirestoreModule} from '@angular/fire/firestore';
import { LogestudianteComponent } from './components/Logins_Roles_Inicio/logestudiante/logestudiante.component';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { NewmaestroComponent } from './components/creacion_roles/newmaestro/newmaestro.component';
import { LogearmaestroComponent } from './components/Logins_Roles_Inicio/logearmaestro/logearmaestro.component';
import { LogeardirectivoComponent } from './components/Logins_Roles_Inicio/logeardirectivo/logeardirectivo.component';
import { NewdirectivoComponent } from './components/creacion_roles/newdirectivo/newdirectivo.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdmonComponent } from './components/Pantallas_Princiaples_Roles/admon/admon.component';
import { PrincipaldirectorComponent } from './components/Pantallas_Princiaples_Roles/principaldirector/principaldirector.component';
import { PrincipaldocenteComponent } from './components/Pantallas_Princiaples_Roles/principaldocente/principaldocente.component';
import { ListadocenteComponent } from './components/lista_roles/listadocente/listadocente.component';
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
import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { MenuInterpersonalComponent } from './components/actualizar_Menus_inteligencias/menu-interpersonal/menu-interpersonal.component';
import { MenuIntrapersonalComponent } from './components/actualizar_Menus_inteligencias/menu-intrapersonal/menu-intrapersonal.component';
import { TablaPalabrasComponent } from './components/actualizar/tabla-palabras/tabla-palabras.component';
import { ResgistroPalabrasComponent } from './components/actualizar/tabla-palabras/resgistro-palabras/resgistro-palabras.component';
import { ActualizarPalabrasComponent } from './components/actualizar/tabla-palabras/actualizar-palabras/actualizar-palabras.component';
import { MenuCorporalComponent } from './components/actualizar_Menus_inteligencias/menu-corporal/menu-corporal.component';
import { MenuVerbalComponent } from './components/actualizar_Menus_inteligencias/menu-verbal/menu-verbal.component';
import { DiarioComponent } from './components/Todos_Juegos/diario/diario.component';
import { CreacionDiarioComponent } from './components/Todos_Juegos/diario/creacion-diario/creacion-diario.component';
import { KaraokeComponent } from './components/Todos_Juegos/karaoke/karaoke.component';
import { TablaKaraokeComponent } from './components/actualizar/tabla-karaoke/tabla-karaoke.component';
import { MenuMusicalComponent } from './components/actualizar_Menus_inteligencias/menu-musical/menu-musical.component';
import { RegistroCancionComponent } from './components/actualizar/tabla-karaoke/registro-cancion/registro-cancion.component';
import { ModificarCancionComponent } from './components/actualizar/tabla-karaoke/modificar-cancion/modificar-cancion.component';
import { TablaAdivinanzaComponent } from './components/actualizar/tabla-adivinanza/tabla-adivinanza.component';
import { RegistroAdivinanzaComponent } from './components/actualizar/tabla-adivinanza/registro-adivinanza/registro-adivinanza.component';
import { ModificarAdivinanzaComponent } from './components/actualizar/tabla-adivinanza/modificar-adivinanza/modificar-adivinanza.component';
import { AdivinanzaComponent } from './components/Todos_Juegos/adivinanza/adivinanza.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginestComponent,
    ListaestComponent,
    
    PrincipaldirectorComponent,
    PruebaComponent,
    AdminComponent,

    LogestudianteComponent,
    NewmaestroComponent,
    LogearmaestroComponent,
    LogeardirectivoComponent,
    NewdirectivoComponent,
    AdmonComponent,
    PrincipaldocenteComponent,


    ListadocenteComponent,
    PrincipalestudianteComponent,
    ListadirectivosComponent,
    NavinicioComponent,
    PreguntasComponent,
    ResultadosComponent,
     InteligenciasComponent,
     ModificaralumnoComponent,
     ModificarmaestroComponent,
     ModificardirectivoComponent,
     MatematicaComponent,
     VerbalComponent,
     EspacialComponent,
     CorporalComponent,
     MusicalComponent,
     IntraComponent,
     InterComponent,
     SudokuComponent,
     SnakeComponent,
     ActualizarComponent,
     RecuperarComponent,
     ActverbalComponent,
     TablalecturasComponent,
     ModificarlecturaComponent,
     LectoraComponent,
     PuzzleComponent,
     PianoComponent,
     AdivinaComponent,
     PalabraComponent,
     MemoramaComponent,
     MoverComponent,
     TablayoutubeComponent,
     RegistrovideoComponent,
     BaileComponent,
     TablapreguComponent,
     RegistropreguComponent,
     PreguntadosComponent,
     ModificarpreguComponent,
     ModificarVideoComponent,
     MenuInterpersonalComponent,
     MenuIntrapersonalComponent,
     TablaPalabrasComponent,
     ResgistroPalabrasComponent,
     ActualizarPalabrasComponent,
     MenuCorporalComponent,
     MenuVerbalComponent,
     DiarioComponent,
     CreacionDiarioComponent,
     KaraokeComponent,
     TablaKaraokeComponent,
     MenuMusicalComponent,
     RegistroCancionComponent,
     ModificarCancionComponent,
     TablaAdivinanzaComponent,
     RegistroAdivinanzaComponent,
     ModificarAdivinanzaComponent,
     AdivinanzaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
    provideFirestore(() => getFirestore()),
    FirestoreModule,
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService,ApiService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
