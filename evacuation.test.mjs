import assert from 'node:assert/strict';
import {workerPhase,findRoute} from './dist/evacuation.mjs';
import {initialState,objectives,canMove} from './dist/rules.mjs';
const upTo=id=>({...initialState(),completed:objectives.slice(0,objectives.findIndex(o=>o.id===id)+1).map(o=>o.id)});
const s0=initialState();
assert.equal(workerPhase('sector',s0),'working');assert.equal(workerPhase('sector',upTo('alarm')),'evacuate','Setor sinistrado sai com o alarme');
assert.equal(workerPhase('victim',s0),'victim');assert.equal(workerPhase('victim',upTo('victim')),'evacuate');
assert.equal(workerPhase('other',upTo('alarm')),'alert');assert.equal(workerPhase('other',upTo('order')),'evacuate','Demais setores saem na ordem de abandono');
assert.equal(workerPhase('phone',upTo('call')),'phone');assert.equal(workerPhase('phone',upTo('order')),'evacuate');
assert.equal(workerPhase('elevator',upTo('order')),'elevator','Bruno tenta o elevador');assert.equal(workerPhase('elevator',upTo('elevator')),'evacuate');
assert.equal(workerPhase('mobility',upTo('order')),'waitHelp');assert.equal(workerPhase('mobility',upTo('assist')),'escort');assert.equal(workerPhase('mobility',upTo('elevator')),'escort');assert.equal(workerPhase('mobility',upTo('exit')),'evacuate','Eva segue sozinha ao ponto de encontro depois da saída');
// Paredes do setor: só se atravessa pela porta; porta fechada bloqueia.
assert.equal(canMove(2.6,5,[]),false);assert.equal(canMove(6,.4,[]),false);assert.equal(canMove(2.6,2,[]),true);
const out=findRoute({x:8.8,z:3.1},{x:-7.6,z:-7.35},[]);assert.ok(out.length,'Rota do setor até a saída');
assert.ok(out.some(p=>Math.abs(p.x-2.6)<.5&&p.z>1.3&&p.z<2.7),'Passa pela porta do setor');
assert.ok(out.some(p=>p.z<-6&&p.z>-7&&p.x<-6.5&&p.x>-8.7),'Passa pela saída de emergência');
assert.deepEqual(findRoute({x:8.8,z:3.1},{x:-2,z:-2},[{x:2.6,z:2,w:.3,d:1.6}]),[],'Porta fechada confina o setor');
console.log('PASS: reação de cada trabalhador, abandono parcial e total, rotas pela porta do setor e confinamento');
