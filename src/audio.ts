import { Note, A } from "./note";

enum MaqamMode {
    Western, Arabic, Turkish 
}

const noteBuilder = (mode:MaqamMode) => {

    let char = 65 // A 
    const needFlat = ['B','E'];   
    const needSharp =  ['F', 'G', 'C']; 
    const retv:string[] = [];
    const insert =  (letter:string) => {
        retv.push(letter);
        if (mode == MaqamMode.Arabic) {
            retv.push(letter + 'q');
        }
    } 
    // Turkish commas dont play nicely with others, need to be handled differently
    if (mode == MaqamMode.Turkish) {
        while (char < 72) {
            const name = String.fromCharCode(char); 
            const limit = ['B', 'E'].includes(name)? 4 : 9 
            retv.push(name);
            for (let i = 1 ; i < limit ; i++)
            {
                retv.push(name + i);
            }
            char++;
        }
        retv.push('A_5');
        console.log(retv);
        return retv; 
    } 

    while ( char < 72 ) {
        const name = String.fromCharCode(char);      
        if (needFlat.includes(name)) {
            insert(name + 'b');
        }
        insert(name);
        if (needSharp.includes(name)) {
            insert(name + '#');
        }
        char++;
    }
    retv.push('A5');
    return retv;
}   

const buildFreqs = (mode:MaqamMode, baseNote:Note = A  )  => {
  const interval12 = Math.pow(2,1/12);  
  const interval24 = Math.pow(2,1/24);
  const interval53 = Math.pow(2,1/53);
  let interval:number = null;
  switch(mode) {
      case MaqamMode.Arabic: interval = interval24; break;    
      case MaqamMode.Turkish: interval = interval53; break;
      case MaqamMode.Western: interval = interval12; break;
  }
  const retv:{[key:string]:number} = {};
  const currentNoteFreq = baseNote.freq;  
  const notes = noteBuilder(mode);
  notes.forEach((note,ind) => {
      retv[note] = currentNoteFreq * (Math.pow(interval, ind)) ;  
  })
  console.log(retv);
  return retv;
} 

const arabicFreqs   = buildFreqs(MaqamMode.Arabic);
export const westernFreqs:{[key:string]:number} = buildFreqs(MaqamMode.Western);
const turkishFreqs  = buildFreqs(MaqamMode.Turkish); 
const arabic  = document.querySelector('div#buttons div#arabic') as HTMLDivElement;
const western = document.querySelector('div#buttons div#western') as HTMLDivElement;
const turkish = document.querySelector('div#buttons div#turkish') as HTMLDivElement;
const attachToButtons = (freqs: {[key:string]:number} , targetDiv:HTMLDivElement) => {
    Object.keys(freqs).forEach(key => {
        const button = document.createElement('button');
        button.id = key; 
        button.textContent = key; 
        button.classList.add('note');
        button.addEventListener('click', (it) => {
            const button:HTMLButtonElement = it.target as HTMLButtonElement;
            const id = button.id; 
            const oscillator = context.createOscillator(); 
            const envelope = context.createGain();
            const decayRate = 1.5;
            console.log(freqs[id]);
            oscillator.frequency.value = freqs[id]; 
            oscillator.type = 'triangle'; 
            envelope.gain.value = 1;
            oscillator.connect(envelope);
            envelope.connect(context.destination);
            oscillator.start(context.currentTime);
            envelope.gain.exponentialRampToValueAtTime(0.001, context.currentTime + decayRate);
            setTimeout(() => oscillator.stop(context.currentTime), decayRate * 1000);
        })
        targetDiv.appendChild(button);
    })
} 
// attachToButtons(arabicFreqs, arabic);
// attachToButtons(westernFreqs, western);
// attachToButtons(turkishFreqs, turkish);



const context = new AudioContext();

document.querySelectorAll('button.note').forEach((el)=> {
el.addEventListener('click', (it) => {

});
});
