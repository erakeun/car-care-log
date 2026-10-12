# 차곡 · 내 차 정비수첩

한국어 모바일 중심의 독립 정적 자동차 관리 앱입니다. 실제 차량 정보나 과거 정비 이력을 미리 넣지 않습니다. 로그인, 서버 DB, 분석, 비용 기능이 없습니다.

## 기능

- 기본 관리표: 쉬운 작업 설명과 참고 주기. 일반 점검 참고와 아베오 제조사 공통표를 분리합니다.
- 차량 이름·누적 km·연료·차종 입력. 연료·차종은 메모용이며 주기를 자동 변경하지 않습니다.
- 점검/교체/수리 항목, 자유 작업명, 날짜·당시 km·메모, 선택적 반복 주기.
- 이력 수정, 확인 후 삭제, 명시적인 계산 기준 기록 선택. 다른 종류/항목의 이력이 교체 기준을 초기화하지 않습니다.
- 거리·기간 중 먼저 도래, KST 날짜, 월말·윤년 처리. 누락된 날짜·거리는 추정하지 않습니다.
- JSON 백업·스키마 검증·검토 후 복원, CSV 내보내기. 잘못된 파일·저장 실패 시 현재 데이터 보존.
- 초기 실제 기록과 분리된 메모리 전용 샘플 모드.

기록은 `localStorage` 키 `car-care-log:v1`에 저장됩니다. 다른 기기와 자동 동기화되지 않으며 브라우저 데이터 삭제 시 사라집니다. JSON 백업을 보관하세요. GitHub Pages는 정적 파일을 제공하며, 앱의 기록을 받지 않습니다. 앱에는 fetch/XHR/WebSocket/beacon이나 외부 리소스가 없고 CSP `connect-src 'none'`을 사용합니다. 같은 GitHub Pages origin에 호스팅되는 다른 앱은 브라우저 보안 모델상 저장공간을 공유할 수 있으므로 별도의 암호화 저장소는 아닙니다.

## 실행·검증

Node.js 24 권장 (Mac Node.js 22.23.2에서도 테스트 통과):

```sh
npm ci --ignore-scripts
npm test
npm start
```

미리보기: http://127.0.0.1:4173 (ES modules이므로 파일 더블클릭 대신 HTTP 서버 사용).

DOM 테스트는 jsdom을 사용하며 실제 CSS 레이아웃이나 터치 브라우저 검증을 대체하지 않습니다. 전체 검증 결과와 제약은 [VERIFICATION.md](VERIFICATION.md)를 참고하세요.

## GitHub Pages 배포

저장소: [erakeun/car-care-log](https://github.com/erakeun/car-care-log)

사이트 주소: https://erakeun.github.io/car-care-log/

Settings → Pages → Source를 GitHub Actions로 설정합니다. `main`에 반영하면 포함된 workflow가 전체 테스트를 실행한 뒤 공개 앱 파일 7개만 배포합니다. 테스트·문서·개인 백업 파일은 Pages artifact에 포함하지 않습니다.

## 참고 기준

- [AAA 시간별 자동차 관리표](https://www.aaa.com/autorepair/articles/time-stamped-car-maintenance-checklist): 월별 타이어·액량 점검, 연간 브레이크 점검, 필터 참고. 오일 8,000 km/6개월은 AAA의 일반 설명을 바탕으로 만든 반올림 참고 예시이며 모든 차에 공통인 제조사 의무 기준이 아닙니다.
- [쉐보레 소모품 교환주기](https://www.chevrolet.co.kr/parts/consumable-replacement-cycle): 별도 아베오 참고표. 연식·엔진·변속기 적용 범위가 확인되지 않아 특정 2014 아베오 전용표로 단정하지 않습니다. 사용자가 표에서 설정을 열고 저장하기 전에는 적용되지 않습니다.

- [쉐보레 일반 정비 FAQ](https://www.chevrolet.co.kr/faq/product-maintenance): 아베오 참고 설정의 엔진오일 15,000 km/12개월에 사용하는 일반 안내. 특정 연식 맞춤 기준은 아닙니다.
- [불스원 일반 제품군](https://blog.bullsone.com/3100), [70000](https://blog.bullsone.com/3357?category=643455), [딥클린](https://www.bullsonemall.com/store/product.detail.oz?cataIdx=60000165&pdtIdx=7994): 제품 선택 시에만 3,000~5,000 km 원문 범위와 5,000 km 참고 알림. [에브리샷](https://blog.bullsone.com/339188?category=643455)은 매 주유 시 제품 안내로 km 계산을 하지 않습니다. 제품 변경 시 같은 주입 이력을 유지합니다. 자동차 제조사의 적합성 승인을 의미하지 않습니다.

취급설명서와 가혹조건 기준이 우선합니다. 상태에 따라 바꾸는 타이어·브레이크 패드 등에 보편적인 교체 거리를 강제하지 않습니다. 첨가제는 선택 관리이며 미선택 때 알림을 만들지 않고, 주입 지연이나 위험으로 판정하지 않습니다.
