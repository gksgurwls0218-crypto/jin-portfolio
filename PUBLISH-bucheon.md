# 데이터가 말하는 13편 — 부천FC 배포

파일 배치·코드 연결·타입체크·린트까지 끝났다. **빌드, 커밋, 푸시가 남았다.**
12편(안양)도 아직 커밋 전이라 두 편을 각각 커밋해서 한 번에 푸시한다.

```bash
cd ~/Desktop/전술분석\ 프로젝트/jin-portfolio
npm run build
```

빌드가 통과하면:

```bash
git add public/data-anyang.html public/data-anyang.ko.html "app/[locale]/match-analysis/data-series/anyang" PUBLISH-anyang.md
git commit -m "데이터가 말하는 12편 — 안양FC (국문·영문)"
git add public/data-bucheon.html public/data-bucheon.ko.html "app/[locale]/match-analysis/data-series/bucheon" components/DataSeriesGallery.tsx next.config.ts PUBLISH-bucheon.md
git commit -m "데이터가 말하는 13편 — 부천FC (국문·영문)"
git push origin main
```

`lib/essays.ts`, `lib/essaysContent.ko.ts`, `public/data-signature-move.ko.html`은
이 두 편과 무관한 작업이라 커밋에 넣지 않았다.

## 이미 끝난 것

| 항목 | 상태 |
| --- | --- |
| `public/data-bucheon.ko.html` | 97.6 KB (국문) |
| `public/data-bucheon.html` | 97.5 KB (영문) |
| `app/[locale]/match-analysis/data-series/bucheon/page.tsx` | `/ko`→국문, `/en`→영문 |
| `components/DataSeriesGallery.tsx` | EPISODES 13편, 목록 최상단 (2026-09-21) |
| `next.config.ts` | no-cache 헤더 2줄 |
| `npx tsc --noEmit` | 통과 |
| `npx eslint` (변경 3파일) | 통과 |

## 확인 주소

```
https://<도메인>/ko/match-analysis/data-series/bucheon
https://<도메인>/en/match-analysis/data-series/bucheon
https://<도메인>/ko/match-analysis/data-series
```
