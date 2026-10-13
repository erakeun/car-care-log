# 차량별 공유 장부

사용자 승인: 로그인 없이 같은 차량 링크 방문자가 같은 정비 기록을 조회·변경합니다. 차량번호·개인 이름·연락처는 입력하지 않습니다. 원본 Google Sheet는 소유자에게만 공개합니다.

Apps Script는 소유자로 실행하는 웹앱입니다. `Code.gs`의 LEDGERS에 새 차량 시트만 명시적으로 등록하며 학교 자원은 사용하지 않습니다. `appsscript.json`은 Sheets 권한만 요청하고 Drive·Gmail 권한은 요청하지 않습니다. 이 권한은 Google 계정의 스프레드시트에 접근할 수 있으므로 실제 화면에서 소유자가 동의해야 합니다. 공개 API는 등록된 차량의 load/save만 허용합니다.

`Core.gs`는 본 앱 core.mjs 검증 로직을 Apps Script V8용으로 묶은 파일입니다. 변경 시 재생성하고 서버 시험을 실행해야 합니다. `Bridge.html`은 Google의 공식 google.script.run으로 호출하며 외부 웹은 iframe/postMessage로 연결합니다. 브리지와 부모의 origin·세션 채널을 확인합니다. 방문자 인증이나 비밀 링크 보안으로 간주하지 않습니다.

규격: appId aveo/k3/ray. load -> {revision,snapshot}. save {expectedRevision,mutationId,snapshot} -> 저장 결과 또는 {conflict:true,revision,snapshot}. 스냅샷은 아베오 schemaVersion 1 규격이며 다른 차량 앱은 이 규격 어댑터를 사용해야 합니다. 알 수 없는 appId·action은 거절합니다.

ScriptLock 안에서 기준 버전을 비교하고 새 버전을 추가합니다. 40,000자 Base64 조각 + COMMITTED 행으로 긴 JSON을 저장하며 수식 삽입을 피합니다. 같은 mutationId/같은 내용 재시도는 기존 결과를 반환합니다. 이전 버전·로그를 삭제하는 API는 없습니다. 현재 화면에서 삭제해도 이전 원본 버전은 보존됩니다. 운영자는 시트에서 기록을 복구할 수 있습니다.

shared-config.mjs에 실제 공개 exec URL과 enabled true를 넣기 전에는 기존 로컬 저장을 유지합니다. 이전 로컬 데이터는 자동 업로드하지 않습니다. JSON 복원은 내용 확인 후 새 공유 버전으로 저장합니다. API는 공개이므로 개인정보·비밀을 저장하지 않아야 합니다. Google 실행 한도나 서비스 중단 때 성공으로 표시하지 않습니다.
