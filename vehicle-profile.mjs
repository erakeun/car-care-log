export function vehicleGuidance(v){
 const missing=[['type','차종'],['year','연식'],['engine','엔진'],['fuel','연료'],['transmission','변속기'],['usage','주행 환경']].filter(([key])=>!v[key]||v[key]==='미확인').map(([,label])=>label);
 return {missing,label:missing.length?'일반 참고 · 차량 정보 미확인':'제조사 적용 미확인 · 설명서 확인 필요',detail:missing.length?missing.join('·')+' 정보가 없어 일반 참고값으로 표시합니다.':`${v.type} · ${v.year}년 · ${v.engine} · ${v.fuel} · ${v.transmission} · ${v.usage}. 이 조합에 맞는 제조사 정비 기준은 아직 확인되지 않았어요.`,usageNote:v.usage==='가혹조건 가능'?'짧은 거리 반복·정체·먼지·극한 기온 등은 설명서의 가혹조건 기준을 확인하세요. 주기를 임의로 줄이거나 교체 시점을 단정하지 않습니다.':'차종만으로 고장이나 교체 시점을 단정하지 않습니다. 취급설명서의 적용 조건을 확인하세요.',verified:false};
}
export function transmissionMatches(v,name){if(v.transmission==='수동')return !name.includes('자동변속기');if(v.transmission==='자동')return !name.includes('수동변속기');if(['CVT','DCT'].includes(v.transmission))return !/(수동|자동)변속기/.test(name);return true;}
