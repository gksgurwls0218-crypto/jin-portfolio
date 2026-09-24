# 데이터가 말하는 15편 — 수원FC 배포 (K리그2 첫 편)

파일 배치·코드 연결·타입체크·린트까지 끝났다. **빌드, 커밋, 푸시가 남았다.**

작업 폴더에 월드컵 3사이클 편(wc2018-2026)과 `MatchGallery.tsx` 변경이 아직 커밋되지 않은 채 있다.
`next.config.ts` 에는 그 편의 헤더와 수원FC 헤더가 함께 들어 있어서, **수원FC 몫만 `suwonfc-headers.patch` 로 떼어 두었다.**
아래 순서대로 하면 15편만 커밋되고 다른 작업은 그대로 남는다.

```bash
cd ~/Desktop/전술분석\ 프로젝트/jin-portfolio
npm run build
```

빌드가 통과하면:

```bash
git add public/data-suwonfc.html public/data-suwonfc.ko.html "app/[locale]/match-analysis/data-series/suwonfc" components/DataSeriesGallery.tsx PUBLISH-suwonfc.md
git apply --cached suwonfc-headers.patch
git commit -m "데이터가 말하는 15편 — 수원FC (국문·영문)"
git push origin main
rm suwonfc-headers.patch
```

## 이미 끝난 것

| 항목 | 상태 |
| --- | --- |
| `public/data-suwonfc.ko.html` | 국문 「적게 닿고, 가장 자주 쏜다」 |
| `public/data-suwonfc.html` | 영문 "They Reach Less, and Shoot the Most" |
| `app/[locale]/match-analysis/data-series/suwonfc/page.tsx` | `/ko`→국문, `/en`→영문 |
| `components/DataSeriesGallery.tsx` | EPISODES 15편, 목록 최상단 (2026-09-24) |
| `next.config.ts` | no-cache 헤더 2줄 (패치로 분리) |
| `tsc --noEmit` / `eslint` | 통과 |

## 확인 주소 (push 2~3분 뒤)

```
https://jin-tactics.com/ko/match-analysis/data-series/suwonfc
https://jin-tactics.com/en/match-analysis/data-series/suwonfc
https://jin-tactics.com/ko/match-analysis/data-series
```
