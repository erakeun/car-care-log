// Private deployment configuration. Add only the three newly created vehicle sheets.
var LEDGERS = {aveo: 'REPLACE_AVEO_SHEET_ID'};
var ALLOWED_ORIGINS = ['https://erakeun.github.io', 'http://127.0.0.1:4173'];
function doGet(e) {
 var appId=e.parameter.appId, origin=e.parameter.parentOrigin, channel=e.parameter.channel;
 if(!Object.prototype.hasOwnProperty.call(LEDGERS,appId)||ALLOWED_ORIGINS.indexOf(origin)<0||!/^[a-zA-Z0-9-]{20,80}$/.test(channel||''))return HtmlService.createHtmlOutput('Invalid vehicle link');
 var html=HtmlService.createTemplateFromFile('Bridge');
 html.config=JSON.stringify({appId:appId,origin:origin,channel:channel}).replace(/</g,'\\u003c');
 return html.evaluate().setTitle('차량 공유 장부 연결').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function ledgerRpc(request) {
 if(!request||!Object.prototype.hasOwnProperty.call(LEDGERS,request.appId)||['load','save'].indexOf(request.action)<0)throw Error('Invalid operation');
 var lock=LockService.getScriptLock();lock.waitLock(20000);
 try {
  var sheet=SpreadsheetApp.openById(LEDGERS[request.appId]).getSheetByName('변경 로그');
  var rows=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,7).getValues():[];
  var commits=rows.filter(function(r){return r[6]==='COMMITTED';});
  var last=commits.length?commits[commits.length-1]:null;
  var revision=last?Number(last[0]):0;
  function snapshot_(entry){
   if(!entry)return null;
   var pieces=rows.filter(function(r){return r[0]===entry[0]&&r[2]===entry[2]&&r[6]==='CHUNK';});
   if(pieces.length!==Number(entry[4]))throw Error('Incomplete saved version');
   return JSON.parse(Utilities.newBlob(Utilities.base64Decode(pieces.map(function(r){return r[5];}).join(''))).getDataAsString('UTF-8'));
  }
  if(request.action==='load')return {revision:revision,snapshotJson:JSON.stringify(snapshot_(last))};
  if(!/^[a-zA-Z0-9-]{20,80}$/.test(request.mutationId||'')||!Number.isSafeInteger(request.expectedRevision))throw Error('Invalid save request');
  var payload=JSON.stringify(CareCore.validate(request.snapshotJson?JSON.parse(request.snapshotJson):request.snapshot));
  if(payload.length>3000000)throw Error('Snapshot too large');
  var repeated=commits.find(function(r){return r[2]===request.mutationId;});
  if(repeated){if(JSON.stringify(snapshot_(repeated))!==payload)throw Error('Mutation ID reused');return {revision:Number(repeated[0]),snapshotJson:JSON.stringify(snapshot_(repeated))};}
  if(request.expectedRevision!==revision)return {conflict:true,revision:revision,snapshotJson:JSON.stringify(snapshot_(last))};
  var encoded=Utilities.base64Encode(payload,Utilities.Charset.UTF_8),chunks=[];
  for(var i=0;i<encoded.length;i+=40000)chunks.push(encoded.slice(i,i+40000));
  var now=new Date().toISOString(),next=revision+1;
  var added=chunks.map(function(c){return [next,now,request.mutationId,revision,chunks.length,c,'CHUNK'];});
  added.push([next,now,request.mutationId,revision,chunks.length,'','COMMITTED']);
  sheet.getRange(sheet.getLastRow()+1,1,added.length,7).setValues(added);
  SpreadsheetApp.flush();
  return {revision:next,snapshotJson:payload};
 } finally {lock.releaseLock();}
}
