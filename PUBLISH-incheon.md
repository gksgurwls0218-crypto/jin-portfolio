# 데이터가 말하는 14편 — 인천유나이티드 배포

파일 배치·코드 연결·타입체크·린트까지 끝났다. **빌드, 커밋, 푸시가 남았다.**

작업 폴더에 월드컵 3사이클 편(wc2018-2026)과 `MatchGallery.tsx` 변경이 커밋되지 않은 채 있다.
`next.config.ts` 에는 그 편의 헤더와 인천 헤더가 함께 들어 있어서, **인천 몫만 `incheon-headers.patch` 로 떼어 두었다.**
아래 순서대로 하면 14편만 커밋되고 다른 작업은 그대로 남는다.

```bash
cd ~/Desktop/전술분석\ 프로젝트/jin-portfolio
npm run build
```

빌드가 통과하면:

```bash
git add public/data-incheon.html public/data-incheon.ko.html "app/[locale]/match-analysis/data-series/incheon" components/DataSeriesGallery.tsx PUBLISH-incheon.md
git apply --cached incheon-headers.patch
git commit -m "데이터가 말하는 14편 — 인천유나이티드 (국문·영문)"
git push origin main
rm incheon-headers.patch
```

## 이미 끝난 것

| 항목 | 상태 |
| --- | --- |
| `public/data-incheon.ko.html` | 79.1 KB (국문) |
| `public/data-incheon.html` | 78.7 KB (영문) |
| `app/[locale]/match-analysis/data-series/incheon/page.tsx` | `/ko`→국문, `/en`→영문 |
| `components/DataSeriesGallery.tsx` | EPISODES 14편, 목록 최상단 (2026-09-23) |
| `next.config.ts` | no-cache 헤더 2줄 (패치로 분리) |
| `npx tsc --noEmit` / `npx eslint` | 통과 |

## 확인 주소

```
/ko/match-analysis/data-series/incheon
/en/match-analysis/data-series/incheon
/ko/match-analysis/data-series
```
