


export class Note {

    constructor(public name:string, public freq:number) {

    }

}
export type NaturalNoteNames = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';   
export const A = new Note('A', 440);  

 