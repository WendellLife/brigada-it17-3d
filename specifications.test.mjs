import assert from 'node:assert/strict';
import {agents,accepted,objectives,canMove} from './dist/rules.mjs';
import {findRoute} from './dist/evacuation.mjs';
for(const a of Object.values(agents)){assert.ok(a.agent);assert.ok(a.classes.length);assert.ok(a.mechanism);assert.ok(a.restriction);assert.ok(a.inspection);}
assert.deepEqual(agents.co2.classes,['B','C']);assert.deepEqual(agents.water.classes,['A']);
for(const id of accepted.C)assert.ok(agents[id].classes.includes('C'),'Agentes aceitos cobrem classe C');
// Cada destino pode ser alcançado a partir do início, respeitando os obstáculos principais do cenário.
const obstacles=[{x:.4,z:3.55,w:.64,d:.8},{x:-7.2,z:4.3,w:1.8,d:.7},{x:-.6,z:-5.7,w:2.15,d:.6},{x:1.9,z:-5.7,w:1.65,d:.8},{x:8,z:4.2,w:4,d:1.1},{x:5.4,z:4.2,w:1,d:1},{x:5.4,z:5.6,w:1.2,d:1},{x:4,z:7.4,w:1.4,d:.6},{x:9.3,z:7.7,w:2.4,d:.6},{x:-4.1,z:3.85,w:1.9,d:1.8},{x:7.5,z:-3.3,w:1.4,d:.7},{x:4.6,z:.8,w:.9,d:.4},{x:-6.1,z:-8.1,w:.5,d:.5},{x:-10.1,z:1.5,w:.8,d:3},{x:-4.4,z:-9,w:.4,d:.4},{x:-13.9,z:-7.6,w:2.1,d:4.8}];
for(const o of objectives){assert.ok(canMove(o.x,o.z,obstacles),`${o.id}: destino livre`);const r=findRoute({x:-2.5,z:-1},o,obstacles);assert.ok(r.length,`${o.id}: alcançável`);const end=r.at(-1);assert.ok(Math.hypot(end.x-o.x,end.z-o.z)<1.45,`${o.id}: dentro do raio de interação`);}
// Portão: o pátio se liga à via lateral dos bombeiros só pelo portão.
assert.equal(canMove(-11.2,-9.1,[]),true);assert.equal(canMove(-11.2,-11.5,[]),false);assert.equal(canMove(-11.2,2,[]),false,'Lateral do galpão fechada');
const ffRoute=findRoute({x:-12.4,z:-8.3},{x:4.2,z:3.1},[]);assert.ok(ffRoute.some(p=>p.x<-11&&p.x>-11.5),'Bombeiros entram pelo portão');assert.ok(ffRoute.some(p=>p.z<-6&&p.z>-7&&p.x<-6.5&&p.x>-8.7),'e pela saída de emergência');
// Cada círculo azul fica no objeto do problema e o ponto de parada está dentro do alcance, do lado certo.
for(const o of objectives.filter(o=>o.ax!==undefined)){const d=Math.hypot(o.x-o.ax,o.z-o.az);assert.ok(d<=o.r-.1,`${o.id}: ponto de parada dentro do círculo (${d.toFixed(2)} ≤ ${o.r})`);}
const iso=objectives.find(o=>o.id==='isolate'),door=objectives.find(o=>o.id==='door');assert.ok(iso.z<-7.35&&iso.az<-7.35,'Isolamento pelo pátio');assert.ok(door.x<2.25,'Porta fechada pelo corredor');
console.log('PASS: círculos centralizados no alvo e alcançáveis; fichas dos extintores e todos os 21 destinos acessíveis');
