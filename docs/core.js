export const normalize=s=>String(s).toLowerCase().replace(/[’']/g,'').replace(/[^\p{L}\p{M}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
export const matches=(s,answers)=>answers.some(a=>normalize(s)===normalize(a));
export function reviewWord(old,correct,now=Date.now()){const level=correct?Math.min((old?.level||0)+1,4):0;return {level,due:now+(correct?[1,3,7,14][level-1]*86400000:600000),mistakes:(old?.mistakes||0)+(correct?0:1)};}
export function grade(items,answers){const results=items.map((q,i)=>({question:q.question,category:q.category||'Listening',answer:answers[i]||'',expected:q.answers[0],ok:matches(answers[i]||'',q.answers)}));const groups={};results.forEach(r=>{groups[r.category]??={wrong:0,total:0};groups[r.category].total++;groups[r.category].wrong+=!r.ok;});return {score:Math.round(results.filter(r=>r.ok).length/results.length*100),results,weaknesses:Object.entries(groups).filter(([,v])=>v.wrong).sort((a,b)=>b[1].wrong/b[1].total-a[1].wrong/a[1].total).slice(0,3).map(([k])=>k)};}
export function dailyQuestions(day,vocab){const a=vocab[(day-1)%vocab.length],b=vocab[(day+5)%vocab.length];const stages=[
[['I ___ a student.',['am']],['She ___ my friend.',['is']],['He ___ (work) here.',['works']],['___ you speak English?',['do']]],
[['She ___ cooking now.',['is']],['They are ___ (wait) for a bus.',['waiting']],['Meet me ___ Monday.',['on']],['I would ___ a tea, please.',['like']]],
[['Yesterday I ___ (go) to the library.',['went']],['Did you ___ (eat) lunch?',['eat']],['I ___ going to study tonight.',['am']],['She will ___ (call) later.',['call']]],
[['She can ___ (speak) English.',['speak']],['This bag is cheaper ___ that one.',['than']],['You ___ rest. (Give advice.)',['should']],['I feel like ___ (walk).',['walking']]]];const g=stages[Math.min(3,Math.floor((day-1)/7))];return [
{question:`Write the English word/phrase for: ${a.bn}`,answers:[a.word.replace('…','').replace('?','')],category:'Vocabulary',wordId:a.id},
{question:`Write the English word/phrase for: ${b.bn}`,answers:[b.word.replace('…','').replace('?','')],category:'Vocabulary',wordId:b.id},
...g.map(([question,answers])=>({question,answers,category:'Grammar'})),
{question:'Read: “Mina works at a café. Her shift starts at nine. She takes the bus.” Where does Mina work?',answers:['at a cafe','a cafe','cafe','at a café','a café','café'],category:'Reading'},
{question:'From the same text: How does Mina travel to work?',answers:['by bus','bus','she takes the bus'],category:'Reading'},
{question:day<15?'Arrange: student / am / I / a':'Arrange: yesterday / I / home / stayed / at',answers:[day<15?'I am a student':'I stayed at home yesterday','Yesterday I stayed at home'].slice(0,day<15?1:2),category:'Sentences'},
{question:day<22?'Arrange: you / help / can / me':'Arrange: to / I / used / early / am / getting / up',answers:[day<22?'Can you help me':'I am used to getting up early'],category:'Sentences'}];}
