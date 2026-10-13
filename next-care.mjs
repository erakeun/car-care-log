import {due,todayKST} from './core.mjs';
const basics=[
 ['타이어 상태 · 공기압','점검','타이어가 차가울 때 차량 문 안쪽 라벨의 공기압과 비교하고, 마모·균열·손상을 확인하세요. km만으로 타이어 교체를 결정하지 않아요.'],
 ['엔진오일량','점검 후 필요시 보충','평지에서 취급설명서의 측정 방법대로 오일량을 확인하세요. 부족하면 내 차에 맞는 오일 규격과 보충 방법을 먼저 확인하세요. 오일량 점검은 오일 교체와 달라요.'],
 ['냉각수량','점검 후 필요시 보충','엔진이 완전히 식었을 때 보조탱크 눈금을 확인하세요. 뜨거울 때 캡을 열지 마세요. 부족하거나 반복해서 줄면 규격·누수 여부를 정비소와 확인하세요.'],
 ['워셔액 · 와이퍼 · 등화','상태 점검','워셔액 부족, 와이퍼가 잘 닦이는지, 전조등·방향지시등·브레이크등이 켜지는지 확인하세요. 보충·교체는 상태와 차량 설명서를 따르세요.']
];
export function nextCare(state,today=todayKST()){
 const checks=basics.map(([name,action,detail])=>{const item=state.items.find(i=>i.name===name&&i.kind==='점검');const record=item&&state.records.find(r=>r.id===item.baselineId);return {name,action,detail,itemId:item?.id??null,recorded:!!record,timing:item?due(state,item,today):null};});
 const scheduled=[],verify=[];
 for(const item of state.items){
  if(['수리','선택 관리'].includes(item.kind))continue;
  const timing=due(state,item,today),record=state.records.find(r=>r.id===item.baselineId),hasPeriod=item.intervalKm!==null||item.intervalMonths!==null;
  if(item.kind==='점검')continue;
  const applicabilityUnknown=/적용 미확인|특정 연식/.test(item.note);
  const card={itemId:item.id,name:item.name,timing,kind:item.kind,recorded:!!record,basis:item.confirmed&&!applicabilityUnknown?'사용자 확인 주기':'참고 주기 · 내 차 적용 미확인'};
  if(record&&hasPeriod&&item.confirmed&&!applicabilityUnknown){scheduled.push({...card,action:timing.state==='due'?'설정한 교체 시점 확인':timing.state==='soon'?'곧 교체 시점을 확인해요':'다음 교체까지 남은 거리·기간',detail:'기록과 확인한 주기로 계산한 안내입니다. 실제 부품 상태와 설명서 기준을 함께 확인하세요.'});}
  else verify.push({...card,action:!record?'이전 교체 이력부터 확인':'내 차의 교체 기준 확인',detail:!record?'마지막 교체를 몰라 0 km부터 연체로 계산하지 않아요. 영수증·정비소 내역을 찾아보거나 이번 점검부터 기록하세요.':hasPeriod?'아래 거리·기간은 참고값 계산입니다. 내 차의 연식·엔진·변속기·주행 환경에 맞는 설명서 기준을 확인한 뒤 교체 여부를 판단하세요.':'고정 교체 거리를 정하지 않았어요. 상태 점검과 설명서 기준을 확인하세요.'});
 }
 const priority=c=>c.timing.state==='due'?0:c.timing.state==='soon'?1:2;scheduled.sort((a,b)=>priority(a)-priority(b));
 return {currentKm:state.vehicle.odometer,checks,scheduled,verify};
}
