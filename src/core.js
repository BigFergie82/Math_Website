export const OPS = { addition: {symbol:'+',name:'Addition'}, subtraction:{symbol:'−',name:'Subtraction'}, multiplication:{symbol:'×',name:'Multiplication'}, division:{symbol:'÷',name:'Division'} };
export const LEVELS=['Beginner','Easy','Intermediate','Advanced'];
export const DEFAULTS={operations:Object.keys(OPS),difficulty:2,length:10,sound:false,animation:true,explanations:true,encouragement:true,mastery:3};
export const KEY='math-garden-v1';
export const fresh=()=>({version:1,settings:structuredClone(DEFAULTS),attempts:[],sessions:[],mistakes:[],active:null});
const int=(min,max,rng)=>min+Math.floor(rng()*(max-min+1));
export function signature(q){return [q.operation,q.difficulty,q.a,q.b].join(':');}
export function question(operation,difficulty,rng=Math.random){
 if(!OPS[operation]||![1,2,3,4].includes(difficulty))throw new Error('Invalid question settings');
 let a,b,answer;
 const max=[0,10,50,100,1000][difficulty];
 if(operation==='addition'||operation==='subtraction'){
  a=int(0,max,rng);b=int(0,max,rng);
  if(operation==='subtraction'&&difficulty<4&&a<b)[a,b]=[b,a];
  answer=operation==='addition'?a+b:a-b;
 }else if(operation==='multiplication'){
  if(difficulty<3){a=int(0,difficulty===1?5:10,rng);b=int(0,difficulty===1?5:10,rng);}
  else{a=difficulty===3&&rng()<.5?int(0,9,rng):int(10,99,rng);b=difficulty===3?int(0,9,rng):(rng()<.5?int(0,9,rng):int(10,99,rng));}
  answer=a*b;
 }else{
  b=int(1,[0,5,10,12,99][difficulty],rng);
  answer=int(0,[0,10,12,12,99][difficulty],rng);a=b*answer;
 }
 return withChoices({operation,difficulty,a,b,answer},rng);
}
export function withChoices(q,rng=Math.random){
 const {operation,difficulty,a,b,answer}=q;
 const choices=new Set([answer]);const step=Math.max(1,Math.floor(Math.abs(answer)*.08));
 const candidates=operation==='multiplication'?[answer-a,answer+a,answer-b,a+b]:operation==='division'?[answer-1,answer+1,a-b]:operation==='addition'?[answer-1,answer+1,Math.abs(a-b)]:[answer-1,answer+1,a+b];
 for(const v of candidates){if(choices.size===4)break;if(Number.isInteger(v)&&(v>=0||(operation==='subtraction'&&difficulty===4)))choices.add(v);}
 // A bounded loop remains safe even with a constant random source.
 for(let i=0;choices.size<4&&i<30;i++){
  const v=answer+int(-3,3,rng)*step;
  if(v>=0||(operation==='subtraction'&&difficulty===4))choices.add(v);
 }
 for(let offset=1;choices.size<4;offset++)choices.add(answer+offset);
 const options=[...choices];for(let i=options.length-1;i>0;i--){const j=int(0,i,rng);[options[i],options[j]]=[options[j],options[i]];}
 return {...q,choices:options};
}
export function validQuestion(q){
 if(!q||!OPS[q.operation]||![1,2,3,4].includes(q.difficulty)||![q.a,q.b,q.answer].every(Number.isInteger)||q.a<0||q.b<0)return false;
 const {a,b,answer,operation:op,difficulty:d}=q;const max=[0,10,50,100,1000][d];
 if(op==='addition')return a<=max&&b<=max&&answer===a+b;
 if(op==='subtraction')return a<=max&&b<=max&&answer===a-b&&(d===4||answer>=0);
 if(op==='multiplication')return answer===a*b&&(d<3?a<=[0,5,10][d]&&b<=[0,5,10][d]:d===3?(a<=9&&b<=99)||(b<=9&&a<=99):a<=99&&b<=99&&(a>=10||b>=10));
 return b>0&&b<=[0,5,10,12,99][d]&&answer>=0&&answer===a/b&&(d!==3||a<=144);
}
export function similarQuestion(pattern,operations,rng=Math.random){
 const {a,b,answer,operation:op,difficulty}=pattern;
 const candidates=[];
 const add=(operation,x,y)=>{
  const value=operation==='addition'?x+y:operation==='subtraction'?x-y:operation==='multiplication'?x*y:x/y;
  const q={operation,difficulty,a:x,b:y,answer:value,patternId:pattern.id};
  if(operations.includes(operation)&&validQuestion(q)&&signature(q)!==signature(pattern))candidates.push(q);
 };
 if(op==='addition'||op==='multiplication')add(op,b,a);
 for(const delta of [-2,-1,1,2]){add(op,a+delta,b);add(op,a,b+delta);}
 if(op==='addition'){add('subtraction',answer,a);add('subtraction',answer,b);}
 if(op==='subtraction'){add('addition',answer,b);add('addition',b,answer);}
 if(op==='multiplication'){add('division',answer,a);add('division',answer,b);}
 if(op==='division'){
  add('multiplication',answer,b);add('multiplication',b,answer);
  for(const delta of [-1,1])add(op,b*(answer+delta),b);
 }
 if(!candidates.length)throw new Error('No valid related question');
 return withChoices(candidates[int(0,candidates.length-1,rng)],rng);
}
export function priority(m,now=Date.now()){
 const days=Math.max(0,(now-Date.parse(m.lastMiss))/86400000)||0;
 return Math.max(.1,(m.misses+1)/(m.successes+1)/(1+days/7));
}
export function nextQuestion(config,mistakes,rng=Math.random,previous=null){
 const pool=mistakes.filter(m=>!m.mastered&&config.operations.includes(m.operation));
 const weights=pool.map(m=>priority(m));let ticket=rng()*weights.reduce((a,b)=>a+b,0);
 const pattern=config.mode==='review'&&pool.length?pool.find((m,i)=>(ticket-=weights[i])<=0)||pool.at(-1):null;
 if(pattern){
  let related;
  for(let i=0;i<20;i++){related=similarQuestion(pattern,config.operations,rng);if(signature(related)!==previous)return related;}
  return related;
 }
 const op=pattern?pattern.operation:config.operations[int(0,config.operations.length-1,rng)];
 let q;
 for(let tries=0;tries<40;tries++){
  q=question(op,pattern?pattern.difficulty:config.difficulty,rng);
  if(signature(q)!==previous&&(!pattern||signature(q)!==pattern.id))break;
 }
 // Review targets the same operation and level; exclude the exact missed problem.
 if(pattern&&signature(q)===pattern.id){
  q=question(op,pattern.difficulty,()=>.43);
  if(signature(q)===pattern.id)q=question(op,pattern.difficulty,()=>.71);
 }
 return {...q,...(pattern?{patternId:pattern.id}:{})};
}
export function stats(attempts){
 const correct=attempts.filter(a=>a.correct).length;
 return {attempted:attempts.length,correct,incorrect:attempts.length-correct,accuracy:attempts.length?Math.round(correct/attempts.length*100):0};
}
export function record(state,q,correct,selected=null,now=new Date().toISOString()){
 if(!state.active||state.active.recorded||!state.active.flipped||selected===null||!q.choices.includes(selected))return false;
 const attempt={...q,id:`${state.active.id}-${state.active.count}`,sessionId:state.active.id,correct,selected,at:now};
 state.attempts.push(attempt);state.active.count++;state.active.recorded=true;
 let pattern=state.mistakes.find(m=>m.id===(q.patternId||signature(q)));
 if(!correct){
  if(!pattern){pattern={...q,id:signature(q),misses:0,successes:0,mastered:false};state.mistakes.push(pattern);}
  pattern.misses++;pattern.successes=0;pattern.mastered=false;pattern.lastMiss=now;
 }else if(q.patternId&&pattern){pattern.successes++;pattern.mastered=pattern.successes>=state.settings.mastery;}
 return true;
}
export function finish(state,now=new Date().toISOString()){
 if(!state.active)return null;
 const session={id:state.active.id,config:state.active.config,started:state.active.started,ended:now,...stats(state.attempts.filter(a=>a.sessionId===state.active.id))};
 state.sessions.push(session);state.active=null;return session;
}
export function load(storage){
 try{
  const raw=storage.getItem(KEY);if(!raw)return {state:fresh(),warning:''};
  const data=JSON.parse(raw);
  if(data.version!==1||!Array.isArray(data.attempts)||!Array.isArray(data.sessions)||!Array.isArray(data.mistakes))throw new Error('Invalid data');
  const base=fresh();base.settings={...DEFAULTS,...data.settings};
  if(!Array.isArray(base.settings.operations)||!base.settings.operations.length||base.settings.operations.some(o=>!OPS[o]))base.settings.operations=[...DEFAULTS.operations];
  if(![1,2,3,4].includes(base.settings.difficulty))base.settings.difficulty=2;
  if(![5,10,20,'continuous'].includes(base.settings.length))base.settings.length=10;
  if(!Number.isInteger(base.settings.mastery)||base.settings.mastery<1||base.settings.mastery>10)base.settings.mastery=3;
  for(const key of ['sound','animation','explanations','encouragement'])if(typeof base.settings[key]!=='boolean')base.settings[key]=DEFAULTS[key];
  const validQ=q=>q&&OPS[q.operation]&&[1,2,3,4].includes(q.difficulty)&&[q.a,q.b,q.answer].every(Number.isFinite);
  base.attempts=data.attempts.filter(a=>validQ(a)&&typeof a.correct==='boolean'&&typeof a.sessionId==='string');
  base.sessions=data.sessions.filter(s=>s&&typeof s.id==='string'&&typeof s.started==='string'&&Number.isFinite(s.attempted));
  base.mistakes=data.mistakes.filter(m=>validQ(m)&&typeof m.id==='string'&&Number.isFinite(m.successes)&&Number.isFinite(m.misses));
  if(data.active&&validQ(data.active.q)&&Array.isArray(data.active.q.choices)&&Array.isArray(data.active.config?.operations)&&data.active.config.operations.length&&data.active.config.operations.every(o=>OPS[o])&&[1,2,3,4].includes(data.active.config.difficulty)&&[5,10,20,'continuous'].includes(data.active.config.length)&&Number.isFinite(data.active.count))base.active=data.active;
  return {state:base,warning:''};
 }catch{return {state:fresh(),warning:'Saved progress could not be read. This session will still work. Existing stored data has not been erased.'};}
}
export function save(storage,state){try{storage.setItem(KEY,JSON.stringify(state));return '';}catch{return 'Your browser could not save progress. Keep this page open or export your progress in Settings.';}}
