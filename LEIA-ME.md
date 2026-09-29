# IT 17 — Brigada de incêndio

Fase 3D da série de jogos educativos, no mesmo padrão do jogo **NR 23 — Alerta de incêndio**. Usa a mesma estrutura de arquivos, interface, controles, marcadores e personagens.

O jogador é o brigadista de plantão. Há fumaça no setor de embalagem. Ele identifica a ocorrência, aciona o alarme, delega a ligação ao 193, retira uma vítima, classifica o incêndio e escolhe o extintor. Depois corta a energia e combate o princípio de incêndio. Quando o fogo se propaga, abandona o combate e dá a ordem de abandono. Em seguida conduz uma colega em cadeira de rodas, fecha a porta corta-fogo, impede um colega de usar o elevador e leva todos ao ponto de encontro. Por fim, faz a contagem e isola o prédio. A viatura chega pela via lateral e três bombeiros descem da cabine. O comandante vai ao portão receber as informações, e os outros dois retiram a mangueira do compartimento. Depois do relato, eles abrem passagem no isolamento e entram pela saída de emergência, estendendo a mangueira. Em seguida abrem a porta do setor e apagam o fogo com água. Por fim, o comandante libera o retorno e o jogador investiga a causa com eles.

As regras seguem a **IT 17/2025 do CBPMESP**. A comparação com a versão 2019 está em `IT17-COMPARATIVO.md`.

## Abrir no computador

1. Extraia a pasta.
2. No Windows, execute `INICIAR.cmd`. É preciso ter Node.js 18 ou superior, ou Python 3.
3. Abra **http://127.0.0.1:8765** no navegador.

Alternativas: `npm start` (ou `node server.mjs`), ou `python -m http.server 8765 --bind 127.0.0.1 --directory dist`. Não abra `dist/index.html` com duplo clique, porque os módulos precisam ser servidos por HTTP.

## Controles

- WASD ou setas: mover (W para cima na tela, D para a direita). Shift: correr.
- Câmera em terceira pessoa, a 45°, logo atrás e acima do brigadista. Paredes e objetos entre a câmera e você (ou o destino) ficam transparentes. Na chegada da viatura e no combate, a câmera se afasta e acompanha os bombeiros.
- E ou botão AÇÃO: interagir no destino. Em sete etapas, a ação abre uma decisão.
- Durante a chegada da viatura e o combate dos bombeiros, a câmera acompanha a cena e o jogador aguarda.
- **Guia:** fichas dos extintores. **IT 17:** procedimentos básicos de emergência.
- **Evacuar sem combater:** disponível até a ordem de abandono. Mantém alerta, 193 e vítima e pula o combate.
- Losango verde: você. Losango azul e círculo: destino, centralizado no objeto ou na pessoa com quem você deve interagir. Nas pessoas, o círculo acompanha quem se move.

## Sequência (21 etapas)

Investigar a fumaça → alarme → 193 → vítima → classificar → extintor → energia → combate → propagação → ordem de abandono → auxiliar a Eva → fechar a porta → elevador → rota → ponto de encontro → contagem → isolamento → receber os bombeiros → combate dos bombeiros → liberação → investigação.

## Personagens

| Nome | Função | Comportamento |
|---|---|---|
| Ana | Operação (setor sinistrado) | Sai assim que o alarme toca |
| Carla | Qualidade | Vítima: tosse perto da fumaça até ser retirada |
| Eva | Planejamento (cadeirante) | Aguarda orientação do brigadista e, depois dela, segue sozinha pela rota até o ponto de encontro |
| Fábio | Recepção | Liga para o 193 e sai na ordem de abandono |
| Diego | Manutenção | Aguarda orientação e sai na ordem de abandono |
| Bruno | Logística | Tenta usar o elevador até ser orientado |

## Gráficos

- Botão **Gráficos** no topo: Baixa, Média ou Alta. O jogo escolhe Média no computador e Baixa no celular e lembra a escolha. Se o jogo ficar lento, a qualidade baixa sozinha uma vez.
- **Média/Alta:** brilho (bloom) no fogo, giroflex e luminárias, reflexos de ambiente em metais e sombras suaves que acompanham o jogador. **Baixa:** sem pós-processamento e sem sombras, para PCs fracos.
- Texturas geradas no próprio código (concreto, chapas, papelão, grama, asfalto): o download não aumenta.
- Fogo com chamas brilhantes e faíscas, fumaça volumosa, jatos de água e CO₂ em partículas.
- Luminárias no teto, luzes de emergência que acendem com o alarme, porta-paletes e entorno com gramado.
- Personagens com esqueleto e animações de captura de movimento (parado, andando, correndo), misturadas conforme a velocidade. Ações como segurar o extintor, descarregar, telefonar, tossir, digitar, empurrar, acenar e puxar a mangueira são poses aplicadas sobre a animação. Capacete, colete refletivo e braçadeira são presos aos ossos.
- O modelo base é `dist/models/Xbot.glb` (personagem Mixamo distribuído com os exemplos do Three.js). Qualquer personagem com esqueleto Mixamo e clipes `idle`, `walk` e `run` pode substituí-lo sem mudar o jogo.

## Arquivos

- `dist/rules.mjs`: etapas, decisões, extintores e colisões. Para reaproveitar a estrutura em outra fase, comece por aqui.
- `dist/evacuation.mjs`: reação de cada trabalhador (`workerPhase`) e cálculo de rotas.
- `dist/game.mjs`: cenário 3D, personagens, efeitos e interface.
- `dist/index.html` e `dist/style.css`: interface. O CSS é o do NR 23, com acréscimos no final.
- `dist/three.module.js`: Three.js 0.170.0, incluída localmente.
- `dist/graphics.mjs`: qualidade gráfica, pós-processamento, texturas e partículas.
- `dist/characters.mjs`: personagens com esqueleto, mistura de animações e poses de ação.
- `dist/models/Xbot.glb`: modelo base dos personagens (2,9 MB).
- `dist/addons/`: módulos oficiais do Three.js 0.170.0 (pós-processamento e ambiente), mesma licença MIT.
- `*.test.mjs` e `test.mjs`: testes.
- `IT17-COMPARATIVO.md` e `SAFETY-NOTES.md`: base normativa e decisões didáticas.

## Testar

`npm test` verifica a ordem das 21 etapas e as decisões (uma correta, com retorno didático). Também cobre os pré-requisitos (energia antes do combate, contagem com 6/6) e os agentes aceitos na classe C. Por fim, confere a evacuação sem combate, a reação dos trabalhadores, as rotas pela porta do setor, o confinamento e o acesso a todos os destinos.

## Publicar

Publique o conteúdo de `dist/` em qualquer hospedagem estática, servindo `.mjs` como JavaScript. Não há banco de dados nem chaves.
