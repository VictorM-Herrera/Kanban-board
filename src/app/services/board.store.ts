import { computed, effect, Injectable, signal } from "@angular/core";
import { Board, Card, List } from "../models/kanban.model";

function arrayMoveImmutable<T>(arr: T[], from: number, to: number): T[] {
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

@Injectable({providedIn: 'root'})
export class BoardStore{
    private nextBoardId:number = 0;
    private nextListId:number = 0;
    private nextCardId:number = 0;
    

    private readonly boards = signal<Board[]>([]); //especifico el tipo de datos que maneja el array
    readonly boardList = this.boards.asReadonly();//basicamente es para no exponer boards, a .set

    
    readonly hasAnyFav = computed(()=> (this.boards() ?? []).some(item => item?.isFav))
    readonly totalBoards = computed(()=> this.boards().length); //basicamente computed es una especia de effect, que se actualiza cada que un signal dentro cambia su valor. 
    //justo en este caso cada que actualizo boards, me retorna el .length actualizadp
    constructor() {
    // cargar si existe
    const loaded = this.loadFromStorage();
    if (loaded) {
      this.boards.set(loaded.data);
      this.nextBoardId = loaded.counters.nextBoardId ?? 0;
      this.nextListId  = loaded.counters.nextListId  ?? 0;
      this.nextCardId  = loaded.counters.nextCardId  ?? 0;
    }

    // persistir ante cualquier cambio
    effect(() => {
      // leer para disparar el efecto
      const data = this.boards();
      this.saveToStorage({
        data,
        counters: {
          nextBoardId: this.nextBoardId,
          nextListId:  this.nextListId,
          nextCardId:  this.nextCardId
        }
      });
    });
  }
    

    // guardar en local:
    private STORAGE_KEY = 'kanban_data_v1';

    private loadFromStorage():
    | { data: Board[]; counters: { nextBoardId: number; nextListId: number; nextCardId: number } }
    | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  private saveToStorage(payload: any) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }

    //Aca van los metodos que quiero como añadir tablero, añadir lista, añadir card
    addNewBoard(name:string, color:string){
        const newBoard : Board = {
            id: `board-${this.nextBoardId++}`,
            name,
            color,
            isFav:false,
            lists:[]
        } 
        this.boards.update(prev => [...prev, newBoard]);
    }

    addNewList(boardId:string, name:string){
        const newList:List = {
            id:  `list-${this.nextListId++}`,
            name,
            cards:[]
        }
        this.boards.update(prev => prev.map(board => board.id === boardId ? {
            ...board, lists: [...board.lists, newList]
        } : board));
    }

    addNewCard(boardId:string, listId:string, title:string){
        const newCard:Card = {
            id: `card-${this.nextCardId++}`,
            title,
            isChecked: false,
            //aca irian los demas valores, cuando los tenga creados
        }
        this.boards.update(prev => prev.map(board => board.id === boardId ? {
            ...board, lists: board.lists.map(list => list.id === listId ? { ...list, cards: [...list.cards, newCard]}: list)
        } : board));
    }
    addBoardToFav(boardId:string){
        this.boards.update(prev => prev.map(board => board.id === boardId ? {...board, isFav: !board.isFav } : board)); //!board.isFav transforma al booleano en su opuesto
    }
    checkCard(boardId:string,  listId:string, cardId:string){
        this.boards.update(prev => prev.map(board => board.id === boardId ? {...board, lists: board.lists.map(list => list.id === listId ? {...list, cards: list.cards.map(card => card.id===cardId?{...card, isChecked: !card.isChecked}:card)
        } : list)} : board));
    }
    deleteAllBoards(){
        this.boards.set([]);
    }

    //reorderLists(boardId, prevIndex, currIndex)
    reorderLists(boardId: string, previousIndex: number, currentIndex: number) {
    this.boards.update(prev =>
      prev.map(b => {
        if (b.id !== boardId) return b;
        return {
          ...b,
          lists: arrayMoveImmutable(b.lists, previousIndex, currentIndex)
        };
      })
    );
  }
    //reorderCards(boardId, listId, prevIndex, currIndex)
    reorderCards(boardId: string, listId: string, previousIndex: number, currentIndex: number) {
    this.boards.update(prev =>
      prev.map(b => {
        if (b.id !== boardId) return b;
        return {
          ...b,
          lists: b.lists.map(l => {
            if (l.id !== listId) return l;
            return {
              ...l,
              cards: arrayMoveImmutable(l.cards, previousIndex, currentIndex)
            };
          })
        };
      })
    );
  }
    //moveCard(boardId, fromListId, toListId, fromIndex, toIndex)
    moveCard(boardId: string, fromListId: string, toListId: string, fromIndex: number, toIndex: number) {
    this.boards.update(prev =>
      prev.map(b => {
        if (b.id !== boardId) return b;

        const from = b.lists.find(l => l.id === fromListId)!;
        const to   = b.lists.find(l => l.id === toListId)!;
        const card = from.cards[fromIndex];

        const newFromCards = from.cards.slice();
        newFromCards.splice(fromIndex, 1);

        const newToCards = to.cards.slice();
        newToCards.splice(toIndex, 0, card);

        return {
          ...b,
          lists: b.lists.map(l => {
            if (l.id === fromListId) return { ...l, cards: newFromCards };
            if (l.id === toListId)   return { ...l, cards: newToCards };
            return l;
          })
        };
      })
    );
  }
/**
 * [board1{},board2{},board3{}]
 * board1{nombre,lists[List1{},List2{}, newList ]}
 */

}