export interface Card{ 
    id: string;
    title: string;
    isChecked: boolean;
    banner?:string;//color
    description?:string;
    startDate?: Date;
    endDate?:Date;
    checklist?: ChecklistItem[];
    attachments?: Attachment[];//archivos adjuntos
    labels?:Label[];//etiquetas
    members?:Member[];
}
export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;        // true si ya está marcado
}
export interface Attachment {
  id: string; 
  name: string;
  url: string;
}
export interface Label {
  id: string;
  text: string;
  color: string;
}

export interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}



export interface List{
    id: string;
    name: string;
    cards: Card[];//array de tarjetas
}

export interface Board{
    id: string;
    name: string;
    color: string;
    isFav:boolean;
    lists: List [];//array de listas
}