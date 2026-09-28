import {canMove} from './rules.mjs';
// Fase de cada trabalhador conforme o andamento da ocorrência.
// working: rotina · victim: exposta à fumaça · alert: aguardando orientação da brigada
// waitHelp: precisa de auxílio · escort: acompanha o brigadista · phone: ligando 193
// elevator: indo para o elevador (rota inadequada) · evacuate: rota até o ponto de encontro
export function workerPhase(role,s){
 const d=id=>s.completed.includes(id);
 if(role==='victim')return d('victim')?'evacuate':'victim';
 if(role==='sector')return d('alarm')?'evacuate':'working';
 if(role==='mobility'){if(d('exit'))return 'evacuate';if(d('assist'))return 'escort';return d('alarm')?'waitHelp':'working';}
 if(role==='phone'){if(d('order'))return 'evacuate';if(d('call'))return 'phone';return d('alarm')?'alert':'working';}
 if(role==='elevator'){if(d('elevator'))return 'evacuate';if(d('order'))return 'elevator';return d('alarm')?'alert':'working';}
 if(d('order'))return 'evacuate';return d('alarm')?'alert':'working';
}
export function findRoute(start,goal,obstacles){
 const size=.4,minX=-15.2,minZ=-12.8,cols=66,rows=55;
 const key=(x,z)=>z*cols+x,point=i=>({x:minX+(i%cols)*size,z:minZ+Math.floor(i/cols)*size});
 const available=new Uint8Array(cols*rows);for(let i=0;i<available.length;i++){const p=point(i);available[i]=canMove(p.x,p.z,obstacles)?1:0;}
 const nearest=p=>{let best=-1,dist=Infinity;for(let i=0;i<available.length;i++){if(!available[i])continue;const q=point(i),d=(p.x-q.x)**2+(p.z-q.z)**2;if(d<dist){dist=d;best=i;}}return best;};
 const from=nearest(start),to=nearest(goal);if(from<0||to<0)return [];
 const previous=new Int32Array(cols*rows).fill(-1),queue=[from];previous[from]=from;
 for(let head=0;head<queue.length&&previous[to]<0;head++){const id=queue[head],x=id%cols,z=Math.floor(id/cols);for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const nx=x+dx,nz=z+dz;if(nx<0||nx>=cols||nz<0||nz>=rows)continue;const next=key(nx,nz);if(!available[next]||previous[next]>=0)continue;if(dx&&dz&&(!available[key(x+dx,z)]||!available[key(x,z+dz)]))continue;previous[next]=id;queue.push(next);}}
 if(previous[to]<0)return [];const route=[];for(let id=to;id!==from;id=previous[id])route.push(point(id));route.push(point(from));return route.reverse();
}
