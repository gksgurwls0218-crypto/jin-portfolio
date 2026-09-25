# 데이터가 말하는 16편 — 서울 이랜드 배포 (K리그2 두 번째 편)

파일 배치·코드 연결·타입체크(소스 오류 0)·린트·**커밋까지 끝났다. 빌드 확인과 push만 남았다.**
월드컵 3사이클 편(wc2018-2026)과 `MatchGallery.tsx` 변경은 커밋하지 않고 그대로 두었다.

```bash
cd ~/Desktop/전술분석\ 프로젝트/jin-portfolio
npm run build
git push origin main
```

⚠ `npm run build`가 `.next/types/... 2.ts` 파일 때문에 타입 오류를 내면 캐시 문제다(9/23에 생긴 사본). `rm -rf .next` 후 다시 빌드한다.

| 항목 | 상태 |
| --- | --- |
| `public/data-seoule.ko.html` | 국문 「닿아도, 쏘지 못한다」 |
| `public/data-seoule.html` | 영문 "They Get In, but They Cannot Shoot" |
| `app/[locale]/match-analysis/data-series/seoule/page.tsx` | `/ko`→국문, `/en`→영문 |
| `components/DataSeriesGallery.tsx` | EPISODES 16편, 목록 최상단 (2026-09-25) |
| `next.config.ts` | no-cache 헤더 2줄 |

확인 주소: `/ko/match-analysis/data-series/seoule` · `/en/match-analysis/data-series/seoule` · `/ko/match-analysis/data-series`
