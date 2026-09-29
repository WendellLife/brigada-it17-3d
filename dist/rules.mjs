// Regras da fase "Brigada de Incêndio" (IT 17/2025 CBPMESP), no mesmo padrão do jogo NR 23.
// Cada objetivo corresponde a uma ação prevista nos procedimentos básicos (item 4.6) e
// complementares (item 4.8) da IT 17/2025. Objetivos com "choices" são decisões em diálogo.
export const team = 6;
export const objectives = [
 {id:'smoke',ax:5.4,az:4.2,r:3,ref:'4.6.1',title:'Investigue a fumaça',description:'Vá até a porta do setor de embalagem e identifique a ocorrência.',tip:'Fumaça saindo do setor. Aproxime-se com cautela, sem entrar na fumaça.',x:3.6,z:2},
 {id:'alarm',ax:.4,az:3.72,r:1.25,ref:'4.6.1',title:'Acione o alarme',description:'Use o acionador manual na coluna vermelha do corredor, em frente ao setor.',tip:'Alerta: identificada a emergência, qualquer pessoa pode alertar os ocupantes e a brigada.',x:.4,z:4.35},
 {id:'call',who:'Fábio',ref:'4.6.2',title:'Acione o 193',description:'Peça ao Fábio, na recepção, que ligue para o Corpo de Bombeiros.',tip:'Delegue a ligação: enquanto você atua, outra pessoa chama o 193 e informa o que está acontecendo.',x:-7.2,z:3.35,
  choices:[
   {id:'full',correct:true,label:'“Fábio, ligue 193: fumaça e fogo no motor da esteira do setor de embalagem. Informe o endereço e que podemos ter vítima.”',feedback:'Apoio externo acionado com local, tipo de ocorrência e possibilidade de vítima.'},
   {id:'wait',label:'“Fábio, espere eu confirmar se é grave. Se o fogo crescer, eu mesmo ligo para o 193 depois.”',feedback:'Não atrase o apoio externo. A brigada analisa a situação e aciona o Corpo de Bombeiros assim que necessário.'},
   {id:'boss',label:'“Fábio, ligue primeiro para o gerente e peça autorização para chamar os bombeiros.”',feedback:'O acionamento do 193 não depende de autorização. Avisar a gestão não substitui o apoio externo.'}
  ]},
 {id:'victim',who:'Carla',ref:'4.6.3',title:'Verifique vítimas',description:'Carla está sentada perto da fumaça, tossindo. Avalie e decida.',tip:'Antes de combater, verifique se há pessoas expostas. Retire-as do risco e encaminhe-as para local seguro.',x:7.4,z:2.3,
  choices:[
   {id:'remove',correct:true,label:'Ela está consciente e respira. Retirar da fumaça, encaminhar à saída e informar a brigada.',feedback:'Carla foi afastada da fumaça e segue pela rota até o local seguro.'},
   {id:'water',label:'Dar um copo de água e deixá-la descansar no setor.',feedback:'Ela continua exposta à fumaça. Primeiro afaste a vítima do risco.'},
   {id:'ignore',label:'Ignorar e combater o fogo primeiro.',feedback:'A vida vem antes do patrimônio. Verifique e retire as vítimas antes do combate.'}
  ]},
 {id:'classify',ax:5.4,az:4.2,r:1.9,ref:'Conteúdo',title:'Classifique o incêndio',description:'Observe o que está queimando no motor da esteira.',tip:'Motor elétrico ligado, ainda energizado: identifique a classe antes de escolher o extintor.',x:5.4,z:3,
  choices:[
   {id:'A',label:'Classe A — sólidos comuns que deixam brasas.',feedback:'As caixas próximas são classe A, mas o foco está no motor energizado.'},
   {id:'B',label:'Classe B — líquidos e gases inflamáveis.',feedback:'Não há líquido inflamável queimando neste foco.'},
   {id:'C',correct:true,label:'Classe C — equipamento elétrico energizado.',feedback:'Classe C: motor elétrico energizado. Água está descartada.'},
   {id:'K',label:'Classe K — óleos e gorduras de cozinha.',feedback:'Classe K é típica de cozinhas industriais, não deste motor.'}
  ]},
 {id:'equipment',ax:-3.65,az:-5.9,r:1.8,ref:'Conteúdo',title:'Escolha o extintor',description:'Na estação, escolha o agente adequado para classe C.',tip:'Para equipamento energizado use agente não condutor: CO₂ ou pó ABC. Nunca água.',x:-3.65,z:-4.65},
 {id:'power',ax:1.9,az:-5.5,r:1.6,ref:'4.6.4',title:'Corte a energia',description:'Desligue o setor de embalagem no quadro geral, longe do fogo.',tip:'Corte de energia: quando possível ou necessário. Use o comando remoto, nunca o painel em chamas.',x:1.9,z:-4.5},
 {id:'fire',ax:5.4,az:4.2,r:1.9,ref:'4.6.8',title:'Combata o princípio',description:'Leve o extintor ao motor e descarregue na base do foco.',tip:'Combata apenas o princípio de incêndio, com a saída às suas costas e sem entrar na fumaça.',x:5.4,z:3,fire:'C'},
 {id:'spread',ax:5.4,az:4.2,r:1.9,ref:'4.6.2',title:'Reavalie a situação',description:'O fogo passou para as caixas de papelão. Decida o próximo passo.',tip:'Análise contínua: se o fogo cresce, a fumaça aumenta ou o extintor acaba, abandone o combate.',x:5.4,z:3,
  choices:[
   {id:'leave',correct:true,label:'Abandonar o combate e iniciar o abandono de área.',feedback:'Decisão correta: o incêndio deixou de ser um princípio. A brigada passa a proteger as pessoas.'},
   {id:'another',label:'Buscar outro extintor e continuar combatendo.',feedback:'O fogo se propagou e a fumaça aumentou. Insistir no combate coloca você em risco.'},
   {id:'open',label:'Abrir as portas e janelas para ventilar o setor.',feedback:'Ventilar alimenta o fogo com oxigênio e espalha a fumaça. Mantenha as portas fechadas.'}
  ]},
 {id:'order',ax:4.6,az:.9,r:1.6,ref:'4.8.3',title:'Dê a ordem de abandono',description:'Use a central de alarme e som na parede do fundo do setor, perto da porta.',tip:'Ordem de abandono: priorize o local sinistrado, os setores próximos e as áreas de maior risco.',x:4.6,z:1.95},
 {id:'assist',who:'Eva',ref:'Conteúdo',title:'Auxilie a Eva',description:'Eva usa cadeira de rodas. Oriente-a sobre a rota acessível até o ponto de encontro.',tip:'Pessoas com mobilidade reduzida: aborde, explique a situação e a rota e confirme que ela consegue seguir, conforme o plano de emergência.',x:4,z:5.9},
 {id:'door',ax:2.6,az:2,r:1.9,ref:'4.6.6',title:'Feche a porta do setor',description:'Depois que a Eva passar, feche a porta pelo lado do corredor para conter fogo e fumaça.',tip:'Confinamento: portas fechadas retardam a propagação do fogo e da fumaça. Não tranque.',x:1.1,z:2.2},
 {id:'elevator',who:'Bruno',ref:'4.8.3',title:'Impeça o uso do elevador',description:'Bruno está indo para o elevador. Oriente-o para a rota de fuga.',tip:'Em incêndio, nunca use o elevador. Siga a rota sinalizada até a saída de emergência.',x:-.6,z:-3.8},
 {id:'exit',ax:-7.6,az:-6.2,r:1.7,ref:'4.6.5',title:'Conduza pela rota',description:'Siga as setas do piso até a saída de emergência.',tip:'Caminhe sem correr, confira se ninguém ficou para trás e não volte para buscar objetos.',x:-7.6,z:-4.8},
 {id:'meeting',ax:-7.6,az:-10.5,r:1.8,ref:'4.6.5',title:'Vá ao ponto de encontro',description:'Atravesse a porta e siga até a placa no pátio externo.',tip:'Abandono de área: leve as pessoas a local seguro, a no mínimo 100 m do sinistro no mundo real.',x:-7.6,z:-10.15},
 {id:'headcount',ax:-4.4,az:-9,r:1.3,ref:'4.8.4',title:'Faça a contagem',description:'Use a prancheta de controle e confira toda a equipe.',tip:'Conte todos antes de informar o Corpo de Bombeiros. Ninguém retorna ao prédio para buscar pessoas.',x:-5.1,z:-9},
 {id:'isolate',ax:-6.1,az:-8.1,r:1.4,ref:'4.6.7',title:'Isole o prédio',description:'No pátio, pegue o kit de isolamento ao lado da saída e feche a passagem com cones e fita.',tip:'Isolamento: impeça o acesso de pessoas não autorizadas à área sinistrada.',x:-6.9,z:-8.1},
 {id:'report',who:'commander',ref:'4.5',title:'Receba os bombeiros',description:'Vá até o comandante no portão do pátio e passe as informações.',tip:'Recepção do Corpo de Bombeiros: local exato, o que queima, riscos, ações feitas e situação das pessoas.',x:-9.5,z:-9.1,
  choices:[
   {id:'complete',correct:true,label:'“Fogo no motor da esteira, no setor de embalagem, já nas caixas de papelão. Energia do setor cortada e porta fechada. 6 de 6 pessoas contadas; Carla inalou fumaça e está conosco.”',feedback:'Informação completa: localização, riscos, ações tomadas e situação das vítimas.'},
   {id:'vague',label:'“Tem fogo em algum lugar lá no fundo do galpão. Acho que todo mundo saiu, mas não conferi. Podem entrar pela porta dos fundos.”',feedback:'Informe a localização exata e confirme a contagem. Nunca oriente a entrada por um acesso que você não conhece.'},
   {id:'ok',label:'“Foi só um pouco de fumaça no motor da esteira e já apagamos quase tudo com os extintores. Ninguém se feriu, podem ficar tranquilos.”',feedback:'Nunca minimize a ocorrência: o fogo ainda está ativo e a Carla inalou fumaça. Informe tudo o que sabe.'}
  ]},
 {id:'firefight',ref:'4.6.8',title:'Acompanhe o combate',description:'Os bombeiros entram pela saída de emergência e combatem o incêndio.',tip:'Extinção: a partir daqui o combate é do Corpo de Bombeiros. A brigada permanece no ponto de encontro e apoia com informações.',x:-7.6,z:-10.15,auto:true},
 {id:'release',who:'commander',ref:'4.6.8',title:'Aguarde a liberação',description:'O comandante informa que o fogo foi extinto. Decida o que fazer com a equipe.',tip:'Restabelecer a normalidade: o retorno só acontece com a liberação do Corpo de Bombeiros.',x:-9.5,z:-9.1,
  choices:[
   {id:'wait',correct:true,label:'Manter todos no ponto de encontro até o comandante liberar o retorno, após a ventilação e a vistoria do setor.',feedback:'Retorno liberado pelo comandante. O isolamento foi retirado e o setor foi ventilado.'},
   {id:'back',label:'Avisar a equipe que o fogo apagou e mandar todos voltarem ao trabalho imediatamente.',feedback:'Fogo apagado não significa local seguro: ainda há fumaça, calor e risco de reignição. Aguarde a liberação.'},
   {id:'items',label:'Liberar só quem precisa buscar bolsas e celulares, enquanto os bombeiros ventilam o setor.',feedback:'Ninguém retorna para buscar objetos antes da liberação do Corpo de Bombeiros.'}
  ]},
 {id:'investigate',ax:5.4,az:4.2,r:1.9,ref:'4.6.9',title:'Investigue a causa',description:'Com o bombeiro, examine o motor da esteira e registre a causa provável.',tip:'Investigação: levante causas e consequências e proponha medidas para evitar que se repita.',x:5.4,z:3,
  choices:[
   {id:'cause',correct:true,label:'Pó de papelão acumulado no motor e limpeza atrasada. Registrar em relatório e propor limpeza e manutenção preventiva periódicas.',feedback:'Causa registrada com medidas corretivas. A investigação serve para prevenir, não para culpar.'},
   {id:'blame',label:'A Carla estava perto do motor, então a culpa é dela. Registrar uma advertência e encerrar o caso.',feedback:'A investigação procura causas e medidas corretivas, não culpados. Estar perto não é causa.'},
   {id:'skip',label:'Não é preciso investigar: o fogo já foi apagado e ninguém se feriu gravemente.',feedback:'Sem investigação, a mesma falha volta a acontecer. Levante as causas e proponha correções.'}
  ]}
];
export const indexOf = id => objectives.findIndex(o => o.id === id);
export const equipment = {id:'equipment-station',ax:-3.65,az:-5.9,r:1.8,title:'Escolha o extintor',description:'Retorne à estação e escolha outro agente.',tip:'Leia o rótulo: classe C exige agente não condutor.',x:-3.65,z:-4.65};
export const agents = {
 water:{name:'Água pressurizada',detail:'Classe A • sólidos com brasas',classes:['A'],agent:'Água',examples:'Papel, madeira, tecidos e papelão.',mechanism:'Resfriamento.',restriction:'Não usar em equipamento energizado, líquidos inflamáveis ou óleo de cozinha.',inspection:'Conferir lacre, mangueira, validade da inspeção e indicador de pressão.',color:'#64c9ff'},
 abc:{name:'Pó químico ABC',detail:'Classes A, B e C',classes:['A','B','C'],agent:'Pó químico multipropósito',examples:'Sólidos, líquidos inflamáveis e equipamentos elétricos.',mechanism:'Interrupção da reação em cadeia; proteção superficial em sólidos.',restriction:'Deixa resíduos e reduz a visibilidade. Não substitui classe K em óleo de cozinha.',inspection:'Conferir lacre, mangueira, inspeção e pressão na faixa indicada.',color:'#ffcf52'},
 co2:{name:'Dióxido de carbono • CO₂',detail:'Classes B e C • não condutor',classes:['B','C'],agent:'Dióxido de carbono',examples:'Líquidos inflamáveis e equipamentos elétricos.',mechanism:'Abafamento, sem deixar resíduos.',restriction:'Pouco eficaz em brasas. Risco de asfixia em locais confinados; não segure no difusor.',inspection:'Conferir lacre, difusor e inspeção. A carga é verificada por pesagem.',color:'#ccdbe7'},
 k:{name:'Agente classe K',detail:'Óleos e gorduras de cozinha',classes:['K'],agent:'Solução química úmida',examples:'Óleos e gorduras em equipamentos de cozinha.',mechanism:'Resfriamento e camada protetora por saponificação.',restriction:'Uso específico em cozinhas. Não é o agente para equipamento elétrico.',inspection:'Conferir lacre, mangueira, inspeção e instruções do fabricante.',color:'#6de9a8'}
};
export const accepted = {C:['co2','abc']};
export const initialState = () => ({step:0,held:null,power:true,door:'open',fire:'small',fireClass:null,feedback:'',errors:0,completed:[],evacuating:false,finished:false});
export const done = (s,id) => s.completed.includes(id);
export function currentTarget(s){const o=objectives[s.step];return o?.fire&&!s.held?{...equipment,tip:`Destino: ${o.title}. Volte à estação e escolha um agente para classe C.`}:o;}
function advance(s,next,id){
 next.completed=[...s.completed,id];next.step=s.step+1;
 if(s.evacuating&&id==='victim')next.step=indexOf('order');
 next.finished=next.step===objectives.length;
 return next;
}
export function selectExtinguisher(s,agent){
 const o=objectives[s.step];if(!agents[agent]||!(o?.id==='equipment'||o?.fire))return s;
 const next={...s,held:agent,feedback:`${agents[agent].name} selecionado. Leve-o até o foco indicado.`};
 return o.id==='equipment'?advance(s,next,'equipment'):next;
}
export function answer(s,choiceId){
 const o=objectives[s.step];const c=o?.choices?.find(x=>x.id===choiceId);if(!c)return s;
 if(!c.correct)return {...s,errors:s.errors+1,feedback:c.feedback};
 const next={...s,feedback:c.feedback};
 if(o.id==='classify')next.fireClass=choiceId;
 return advance(s,next,o.id);
}
export function requestEvacuation(s){
 if(s.evacuating||s.step>=indexOf('order'))return s;
 const next={...s,evacuating:true,held:null,feedback:'Evacuação sem combate escolhida. Proteja as pessoas e deixe o fogo para o Corpo de Bombeiros.'};
 if(s.step>indexOf('victim'))next.step=indexOf('order');
 return next;
}
// ctx.present: pessoas da equipe já no ponto de encontro (calculado pelo cenário).
export function interact(s,id,ctx={}){
 const o=objectives[s.step];if(!o||o.id!==id)return s;
 if(o.choices)return {...s,feedback:'Escolha uma das opções.'};
 if(o.id==='equipment')return {...s,feedback:'Escolha um extintor na estação.'};
 const next={...s,feedback:''};
 if(o.fire){
  if(!s.held)return {...s,feedback:'Busque um extintor na estação.'};
  if(s.power)return {...s,feedback:'Corte a energia do setor pelo quadro geral antes de combater.'};
  if(!accepted[o.fire].includes(s.held))return {...s,held:null,errors:s.errors+1,feedback:'Água conduz eletricidade: não use em equipamento elétrico. Volte à estação e escolha CO₂ ou pó ABC.'};
  next.held=null;next.fire='spread';next.feedback='Descarga concluída no motor, mas as chamas atingiram as caixas de papelão.';
 }
 if(id==='smoke')next.feedback='Princípio de incêndio no motor da esteira. Alerte as pessoas.';
 if(id==='alarm')next.feedback='Alarme acionado. O setor de embalagem inicia o abandono.';
 if(id==='power'){next.power=false;next.feedback='Energia do setor de embalagem cortada pelo comando remoto.';}
 if(id==='order'){next.fire='spread';next.feedback='Ordem de abandono total anunciada. Todos seguem para a saída.';}
 if(id==='assist')next.feedback='Você orientou a Eva sobre a rota. Ela segue sozinha até o ponto de encontro.';
 if(id==='door'){next.door='closed';next.feedback='Porta fechada. Fogo e fumaça contidos no setor.';}
 if(id==='elevator')next.feedback='Bruno foi orientado e segue pela rota de fuga.';
 if(id==='exit')next.feedback='Saída de emergência alcançada.';
 if(id==='meeting')next.feedback='Você chegou ao ponto de encontro.';
 if(id==='headcount'){const n=ctx.present??0;if(n<team)return {...s,feedback:`Contagem: ${n}/${team}. Aguarde a chegada de todos antes de confirmar.`};next.feedback=`Contagem confirmada: ${team}/${team} pessoas no ponto de encontro.`;}
 if(id==='isolate')next.feedback='Área isolada. Ninguém retorna ao prédio.';
 if(id==='firefight'){if(!ctx.fireOut)return {...s,feedback:'Aguarde no ponto de encontro: os bombeiros estão combatendo o incêndio.'};next.fire='out';next.feedback='Os bombeiros extinguiram o incêndio.';}
 return advance(s,next,id);
}
export function canMove(x,z,obstacles){
 const inside=x>-10.7&&x<10.7&&z>-6.6&&z<8.2;const outside=x>-11.1&&x<-3.3&&z>-13.1&&z<=-6.6;
 // Via lateral de acesso dos bombeiros, ligada ao pátio pelo portão da cerca.
 const road=x>-15.4&&x<=-11.3&&z>-13.1&&z<9;const gate=x>-11.45&&x<=-11.05&&z>-9.9&&z<-8.3;
 const backWall=z>-6.85&&z<-5.75&&(x<-8.45||x>-6.75);
 const sectorSide=Math.abs(x-2.6)<.42&&z>.2&&!(z>1.32&&z<2.68);
 const sectorBack=x>2.18&&Math.abs(z-.4)<.42;
 return (inside||outside||road||gate)&&!backWall&&!sectorSide&&!sectorBack&&!obstacles.some(o=>Math.abs(x-o.x)<o.w/2+.32&&Math.abs(z-o.z)<o.d/2+.32);
}
// Texto do relato completo ao Corpo de Bombeiros, coerente com o que o jogador fez.
export function reportSummary(s){
 const parts=['“Fogo no motor da esteira, no setor de embalagem'+(s.fire==='spread'?', já nas caixas de papelão':'')+'.'];
 parts.push(s.power?'Energia do setor ainda ligada.':'Energia do setor cortada.');
 if(s.door==='closed')parts.push('Porta do setor fechada.');
 parts.push(`${team} de ${team} pessoas contadas; Carla inalou fumaça e está conosco.”`);
 return parts.join(' ');
}
