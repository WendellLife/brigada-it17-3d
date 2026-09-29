// Skeletal characters: a Mixamo-rigged base model (models/Xbot.glb) cloned per person, with motion-capture
// idle/walk/run blended by speed and procedural pose overlays for actions (carry, phone, cough, push, spray…).
// Any Mixamo-rigged GLB with clips named idle/walk/run can replace the base model without touching the game.
import * as T from './three.module.js';
import {GLTFLoader} from './addons/loaders/GLTFLoader.js';
import {clone as cloneSkeleton} from './addons/utils/SkeletonUtils.js';

export const CHARACTER_HEIGHT=1.8;
export async function loadCharacterBase(url){
 const loader=new GLTFLoader();let gltf;
 if(url.startsWith('data:')){// Embedded model (single-file builds): decode in memory, no network request involved.
  const b=atob(url.slice(url.indexOf(',')+1));const bytes=new Uint8Array(b.length);for(let i=0;i<b.length;i++)bytes[i]=b.charCodeAt(i);
  gltf=await new Promise((res,rej)=>loader.parse(bytes.buffer,'',res,rej));}
 else gltf=await loader.loadAsync(url);
 const clips={};for(const c of gltf.animations)clips[c.name.toLowerCase()]=c;
 return {scene:gltf.scene,clips};
}
const D=Math.PI/180;
// Pose overlays: per-bone Euler offsets (degrees, bone-local axes). Tuned visually on the Mixamo rig.
export const POSES={
 none:{},
 carry:{RightArm:[0,35,-10],RightForeArm:[0,75,0],LeftArm:[0,-45,15],LeftForeArm:[0,-60,0]},
 spray:{RightArm:[0,70,-10],RightForeArm:[0,30,0],LeftArm:[0,-75,10],LeftForeArm:[0,-40,0],Spine1:[8,0,0]},
 phone:{RightArm:[0,25,-15],RightForeArm:[0,135,0],Head:[0,0,10]},
 cough:{Spine1:[24,0,0],Head:[12,0,0],RightArm:[0,45,-10],RightForeArm:[0,120,0]},
 seated:{RightUpLeg:[-85,0,-6],LeftUpLeg:[-85,0,6],RightLeg:[85,0,0],LeftLeg:[85,0,0],Spine1:[6,0,0],RightArm:[0,25,-5],RightForeArm:[0,60,0],LeftArm:[0,-25,5],LeftForeArm:[0,-60,0]},
 wheel:{RightUpLeg:[-85,0,-6],LeftUpLeg:[-85,0,6],RightLeg:[85,0,0],LeftLeg:[85,0,0],RightArm:[0,15,-10],RightForeArm:[0,30,0],LeftArm:[0,-15,10],LeftForeArm:[0,-30,0]},
 type:{RightArm:[0,40,-10],RightForeArm:[0,60,0],LeftArm:[0,-40,10],LeftForeArm:[0,-60,0],Spine1:[8,0,0],Head:[10,0,0]},
 push:{RightArm:[0,60,-5],RightForeArm:[0,15,0],LeftArm:[0,-60,5],LeftForeArm:[0,-15,0],Spine1:[10,0,0]},
 reach:{RightArm:[0,80,-5],RightForeArm:[0,10,0],LeftArm:[0,-80,5],LeftForeArm:[0,-10,0],Spine1:[14,0,0]},
 wave:{RightArm:[0,30,-140],RightForeArm:[0,25,0]},
 repair:{Spine1:[26,0,0],Head:[10,0,0],RightArm:[0,55,-10],RightForeArm:[0,35,0],LeftArm:[0,-35,10],LeftForeArm:[0,-20,0]},
 inspect:{RightArm:[0,45,-10],RightForeArm:[0,70,0],LeftArm:[0,-45,10],LeftForeArm:[0,-70,0],Head:[16,0,0]},
 hose:{RightArm:[0,30,-20],RightForeArm:[0,45,0],LeftArm:[0,-15,20],LeftForeArm:[0,-15,0]},
 point:{RightArm:[0,85,0],RightForeArm:[0,5,0]},
 victim:{RightUpLeg:[-85,0,-6],LeftUpLeg:[-85,0,6],RightLeg:[85,0,0],LeftLeg:[85,0,0],Spine1:[24,0,0],Head:[12,0,0],RightArm:[0,45,-10],RightForeArm:[0,120,0],LeftArm:[0,-20,5],LeftForeArm:[0,-40,0]},
 pin:{RightArm:[0,30,-10],RightForeArm:[0,80,0],LeftArm:[0,-30,15],LeftForeArm:[0,-105,0],Spine1:[10,0,0],Head:[18,0,0]},
 aim:{RightArm:[0,55,-10],RightForeArm:[0,40,0],LeftArm:[0,-70,10],LeftForeArm:[0,-35,0],Spine1:[12,0,0],RightUpLeg:[-25,0,-4],LeftUpLeg:[-25,0,4],RightLeg:[40,0,0],LeftLeg:[40,0,0]},
 cones:{RightUpLeg:[-70,0,-8],LeftUpLeg:[-70,0,8],RightLeg:[100,0,0],LeftLeg:[100,0,0],Spine1:[30,0,0],RightArm:[0,70,-5],RightForeArm:[0,15,0],LeftArm:[0,-70,5],LeftForeArm:[0,-15,0]},
 crouch:{RightUpLeg:[-60,0,-8],LeftUpLeg:[-60,0,8],RightLeg:[95,0,0],LeftLeg:[95,0,0],Spine1:[18,0,0]}
};
const BONES=['Hips','Spine','Spine1','Spine2','Neck','Head','RightArm','RightForeArm','RightHand','LeftArm','LeftForeArm','LeftHand','RightUpLeg','RightLeg','RightFoot','LeftUpLeg','LeftLeg','LeftFoot'];
const _q=new T.Quaternion(),_e=new T.Euler();
export function createCharacter(base,opts={}){
 const {surface='#4a5560',joints='#24292e',helmet='#e8aa21',vest='#ed8b32',stripes='#e4e7d6',armband=null,scale=1}=opts;
 const model=cloneSkeleton(base.scene);model.scale.setScalar(scale);
 const bones={};model.traverse(o=>{if(o.isBone){const n=o.name.replace(/^mixamorig:?/,'');if(BONES.includes(n))bones[n]=o;}
  if(o.isSkinnedMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;const isJoints=/Joints/i.test(o.material.name);o.material=new T.MeshStandardMaterial({color:isJoints?joints:surface,roughness:isJoints?.55:.62,metalness:isJoints?.35:.05});}});
 const group=new T.Group();group.add(model);
 // Equipment attached to bones: helmet, vest with reflective stripes, optional armband.
 const gear={};model.updateMatrixWorld(true);const _s=new T.Vector3();const bs=bones.Head?bones.Head.getWorldScale(_s).x/scale:1;const inv=1/bs;const gearScale=g=>{g.scale.setScalar(inv);};
 if(helmet&&bones.Head){const g=new T.Group();bones.Head.add(g);gearScale(g);const top=bones.Head.children.find(c=>/HeadTop/.test(c.name));if(top){g.position.copy(top.position).multiplyScalar(.72);g.position.z+=.04*bs;}else g.position.set(0,.16*bs,.03*bs);const shell=new T.Mesh(new T.SphereGeometry(.125,24,12,0,Math.PI*2,0,Math.PI/2),new T.MeshStandardMaterial({color:helmet,roughness:.35,metalness:.1}));shell.scale.set(1,.9,1.08);shell.castShadow=true;g.add(shell);const brim=new T.Mesh(new T.CylinderGeometry(.145,.145,.018,24),shell.material);brim.position.y=.004;g.add(brim);const peak=new T.Mesh(new T.BoxGeometry(.11,.012,.07),shell.material);peak.position.set(0,.004,.16);g.add(peak);gear.helmet=g;}
 if(vest&&bones.Spine1){const g=new T.Group();bones.Spine1.add(g);gearScale(g);g.position.set(0,.14*bs,0);const v=new T.Mesh(new T.CylinderGeometry(.19,.205,.34,20,1,true),new T.MeshStandardMaterial({color:vest,roughness:.7,side:T.DoubleSide}));v.scale.z=.7;g.add(v);for(const y of [-.09,.07]){const s=new T.Mesh(new T.CylinderGeometry(.196,.2,.035,20,1,true),new T.MeshStandardMaterial({color:stripes,roughness:.3,emissive:stripes,emissiveIntensity:.15,side:T.DoubleSide}));s.scale.z=.7;s.position.y=y;g.add(s);}gear.vest=g;}
 if(armband&&bones.RightArm){const a=new T.Mesh(new T.CylinderGeometry(.062,.062,.07,16,1,true),new T.MeshStandardMaterial({color:armband,roughness:.6,side:T.DoubleSide}));a.scale.setScalar(inv);a.position.y=.13*bs;bones.RightArm.add(a);gear.armband=a;}
 // Animation: idle/walk/run blended by speed, in place (no root motion).
 const mixer=new T.AnimationMixer(model);const actions={};
 for(const n of ['idle','walk','run']){const c=base.clips[n];if(!c)continue;const a=mixer.clipAction(c);a.play();a.setEffectiveWeight(n==='idle'?1:0);actions[n]=a;}
 const st={pose:'none',poseW:0,prevPose:'none',speed:0,lean:0,time:Math.random()*3};
 const restQ={};
 function applyPose(name,weight){const p=POSES[name];if(!p||weight<=0)return;for(const b in p){const bone=bones[b];if(!bone)continue;const [x,y,z]=p[b];_e.set(x*D*weight,y*D*weight,z*D*weight);_q.setFromEuler(_e);bone.quaternion.multiply(_q);}}
 const api={group,model,mixer,bones,gear,actions,state:st,
  setPose(name){if(name===st.pose)return;st.prevPose=st.pose;st.pose=name;st.poseW=0;},
  // speed in m/s; the walk/run clips are retimed to match the stride to the ground.
  update(dt,speed=0,extra={}){st.speed+=(speed-st.speed)*Math.min(1,dt*8);const s=st.speed;
   const wRun=T.MathUtils.clamp((s-2.6)/1.2,0,1),wWalk=T.MathUtils.clamp(s/.6,0,1)*(1-wRun),wIdle=1-Math.max(wWalk,wRun);
   if(actions.idle)actions.idle.setEffectiveWeight(wIdle);if(actions.walk){actions.walk.setEffectiveWeight(wWalk);actions.walk.setEffectiveTimeScale(T.MathUtils.clamp(s/1.5,.6,1.8));}if(actions.run){actions.run.setEffectiveWeight(wRun);actions.run.setEffectiveTimeScale(Math.max(.8,s/3.4));}
   mixer.update(dt);st.time+=dt;
   // Pose overlay with cross-fade from the previous pose.
   st.poseW=Math.min(1,st.poseW+dt*4);if(st.poseW<1)applyPose(st.prevPose,1-st.poseW);applyPose(st.pose,st.poseW);
   if(extra.bob&&(st.pose==='cough'||st.pose==='victim')){_e.set(Math.max(0,Math.sin(st.time*5))*.22,0,0);_q.setFromEuler(_e);bones.Spine1?.quaternion.multiply(_q);}
   if(extra.sweep){_e.set(0,extra.sweep,0);_q.setFromEuler(_e);bones.Spine1?.quaternion.multiply(_q);}
   if(extra.wave){_e.set(0,Math.sin(st.time*6)*.35,0);_q.setFromEuler(_e);bones.RightForeArm?.quaternion.multiply(_q);}
   if(extra.work){const k=Math.sin(st.time*(extra.work===2?7:3))*.18;_e.set(0,k,0);_q.setFromEuler(_e);bones.RightForeArm?.quaternion.multiply(_q);_e.set(0,-k,0);_q.setFromEuler(_e);bones.LeftForeArm?.quaternion.multiply(_q);}
   // Head turns toward a point of interest (world x/z), within a comfortable range.
   if(extra.lookAt&&bones.Head){const a=Math.atan2(extra.lookAt.x-group.position.x,extra.lookAt.z-group.position.z)-group.rotation.y;const rel=Math.atan2(Math.sin(a),Math.cos(a));const yaw=T.MathUtils.clamp(rel,-1.1,1.1)*.7;_e.set(0,yaw,0);_q.setFromEuler(_e);bones.Head.quaternion.multiply(_q);}
   // Seated poses drop the pelvis so the character sits at chair height.
   const DROP={seated:-.5,victim:-.5,wheel:-.3,crouch:-.25,aim:-.12,cones:-.32};const drop=DROP[st.pose]||0;model.position.y+=((drop*st.poseW+(DROP[st.prevPose]||0)*(1-st.poseW))-model.position.y)*Math.min(1,dt*6);
   // Lean into turns and acceleration for a more natural gait.
   const targetLean=extra.turn?T.MathUtils.clamp(-extra.turn*.35,-.12,.12):0;st.lean+=(targetLean-st.lean)*Math.min(1,dt*6);model.rotation.z=st.lean;}
 };
 api.setPose(opts.pose||'none');
 return api;
}
