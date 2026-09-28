import assert from 'node:assert/strict';
import {objectives,initialState,answer,interact,indexOf} from './dist/rules.mjs';
for(const o of objectives.filter(o=>o.choices)){
 assert.equal(o.choices.filter(c=>c.correct).length,1,`${o.id}: exatamente uma resposta correta`);
 assert.ok(o.choices.length>=3,`${o.id}: ao menos três opções`);
 for(const c of o.choices){assert.ok(c.label&&c.feedback,`${o.id}/${c.id}: texto e retorno`);
  const s={...initialState(),step:indexOf(o.id)};const n=answer(s,c.id);
  if(c.correct)assert.equal(n.step,s.step+1);else{assert.equal(n.step,s.step);assert.equal(n.errors,1);assert.equal(n.feedback,c.feedback);}}
 assert.equal(interact({...initialState(),step:indexOf(o.id)},o.id).step,indexOf(o.id),'Decisão não é pulada com AÇÃO');
}
assert.equal(answer(initialState(),'full').step,0,'Resposta fora da etapa é ignorada');
for(const o of objectives)assert.ok(o.ref&&o.tip&&o.description,`${o.id}: referência, dica e descrição`);
console.log('PASS: cada decisão tem uma resposta correta, retorno didático e referência à IT 17');
