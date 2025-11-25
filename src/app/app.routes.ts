import { Routes } from '@angular/router';
import { BoardCreatorComponent } from './features/boardCreator/board-creator.component';
import { BoardComponent } from './features/boardComponent/board.component';
import { boardExistsGuard } from './features/boardComponent/guards/board-exists.guard';

export const routes: Routes = [
    {path: '', component: BoardCreatorComponent},//ruta por defecto
    {path: "board/:id", component: BoardComponent, canActivate: [boardExistsGuard]},
    {path: '**', redirectTo: ''},//cualquiera ruta desconocida -> BoardCreatorComponent
];
