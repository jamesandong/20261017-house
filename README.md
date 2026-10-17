# 양의조 프로필

Hono 기반 Worker이며 JoripSpace로 배포합니다.

- `index.html`: 프로필 내용과 화면 스타일
- `src/app.mjs`: Hono 라우팅과 응답 보안 헤더
- `build.mjs`: HTML과 Hono 의존성을 `dist/worker.mjs` 하나로 번들링

이 디렉터리에서 실행합니다.

```sh
npm ci
npm run build
npm test
```

프로젝트 루트에서 설치된 JoripSpace CLI로 `dist/worker.mjs`를 배포합니다. 인증 정보는 프로젝트 루트의 `.env.joripspace`에만 유지하며 소스에 포함하지 않습니다.
