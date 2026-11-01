export const STORAGE_KEY = 'speaklab-classroom-v1';
export const freshClassroom = () => ({students:[{id:'first',name:'My practice profile',step:0,goal:'Explain my three ideas',observation:''}],active:'first',notes:{},talks:[],completed:[],session:0});
const text = v => typeof v === 'string';
const index = (v,max) => Number.isInteger(v) && v >= 0 && v < max;
export function validClassroom(d) {
 if (!d || !Array.isArray(d.students) || !d.students.length || !d.students.every(s => s && text(s.id) && s.id.length && text(s.name) && text(s.goal) && (s.observation === undefined || text(s.observation)) && index(s.step,6))) return false;
 const ids = new Set(d.students.map(s=>s.id));
 if(ids.size !== d.students.length || !ids.has(d.active)) return false;
 if(!Array.isArray(d.talks) || !d.talks.every(t => t && text(t.id) && ids.has(t.student) && index(t.level,6) && index(t.session,6) && Number.isInteger(t.attempt) && t.attempt>0 && text(t.at) && Number.isFinite(Date.parse(t.at)) && ['topic','feeling','listener','recall','feedback','support','clarity'].every(k=>text(t[k])) && typeof t.recovered==='boolean' && Array.isArray(t.notes) && t.notes.length===3 && t.notes.every(text))) return false;
 if(new Set(d.talks.map(t=>t.id)).size!==d.talks.length) return false;
 return !!d.notes && typeof d.notes==='object' && !Array.isArray(d.notes) && Object.values(d.notes).every(n=>Array.isArray(n)&&n.length===3&&n.every(text)) && Array.isArray(d.completed) && d.completed.every(v=>index(v,6)) && index(d.session,6);
}
export function classroomStats(d) {
 return {students:d.students.length, speakers:d.students.filter(s=>d.talks.some(t=>t.student===s.id)).length, awaitingStage:d.students.filter(s=>!d.talks.some(t=>t.student===s.id&&t.level>=3)).length};
}
