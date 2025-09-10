# artner

## 아키텍처/경계(요약)
- app/: 프레젠테이션(라우팅·RSC 데이터 바인딩·캐시 태그·Server Actions/Route Handlers). 비즈니스 규칙 금지
- slices/: 수직 슬라이스(라이트: ui+queries.ts, 헤비: +application/infra). 슬라이스 간 직접 참조 금지
- hooks/: 공용 클라이언트 훅만(useMediaQuery/useDebounce/useSocket 등). 도메인 훅 금지
- lib/: 프레임워크 저의존 유틸/스키마/로깅. 도메인 규칙·구체 API 타입 금지
- server/: 장기연결/워커 등 별도 런타임(HTTP BFF는 app/api/*)
- tests/: e2e/unit/contract 분리. Playwright는 src/tests/e2e
- ui/: 도메인 무지 디자인 시스템(shadcn + Radix + Tailwind + tokens)

## 다음 단계(실서비스 연동 시)
- BFF 내부의 fetch로 실제 API 연동 및 타임아웃/폴백 비율 설정
- 소켓 채널 확장: 좌석 잠금/해제, 매칭 수락 브로드캐스트
- CloudFront/브라우저 캐시 키 정책, 에러 UX 가이드 문서화