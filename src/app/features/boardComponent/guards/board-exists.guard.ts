import { inject } from "@angular/core";
import {CanActivateFn, Router } from "@angular/router";
import { BoardStore } from "../../../services/board.store";

export const boardExistsGuard: CanActivateFn = (route) =>
{
    const id = route.paramMap.get('id');
    const store = inject(BoardStore);
    const router = inject(Router);
    const exists = !!store.boardList().find(b => b.id === id);

    return exists || router.createUrlTree(['/']);
}