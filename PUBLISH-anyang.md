# 데이터가 말하는 12편 — 안양FC 배포

파일 배치·코드 연결·타입체크까지 끝났다. **커밋과 빌드, 푸시가 남았다.**

```bash
cd ~/Desktop/전술분석\ 프로젝트/jin-portfolio
npm run build
```

빌드가 통과하면 커밋하고 푸시한다. Vercel이 `main`에 붙어 있어 푸시하면 자동 배포된다.

```bash
git add public/data-anyang.html public/data-anyang.ko.html \
        "app/[locale]/match-analysis/data-series/anyang" \
        components/DataSeriesGallery.tsx next.config.ts PUBLISH-anyang.md
git commit -m "데이터가 말하는 12편 — 안양FC (국문·영문)"
git push origin main
```

---

## 이미 끝난 것

| 항목 | 상태 |
| --- | --- |
| `public/data-anyang.ko.html` | 106.1 KB (국문) |
| `public/data-anyang.html` | 104.6 KB (영문) |
| `app/[locale]/match-analysis/data-series/anyang/page.tsx` | `/ko`→국문, `/en`→영문 |
| `components/DataSeriesGallery.tsx` | EPISODES 12편 항목, 목록 최상단 |
| `next.config.ts` | no-cache 헤더 2줄 |
| `npx tsc --noEmit` | **통과** (에러 0) |
| `npx eslint` (변경 2파일) | **통과** |
| `npm run build` | 미실행 — 아래 참조 |

`npm run build`는 이 맥의 샌드박스 셸에서 Google Fonts를 받지 못해 실패한다
(`next/font: Failed to fetch 'Inter' from Google Fonts`). 코드 문제가 아니라 망 제한이다.
네 터미널에서는 정상으로 받아온다. Vercel에서도 마찬가지다.

---

## 푸시 전 눈으로 볼 거라면

```bash
npm run dev
```

세 곳을 연다.

```
http://localhost:3000/ko/match-analysis/data-series/anyang
http://localhost:3000/en/match-analysis/data-series/anyang
http://localhost:3000/ko/match-analysis/data-series
```

체크 포인트

- 그림 9종 — xG 대칭막대 · 국면별 골 · 8국면 연결점 · 슈팅 생산성 · 국면2 목적지 ·
  9구역 피치 2장 · 선수별 측면 터치 · 마테우스 행동별 전환 · 공격수 최장신 점그림 ·
  엘쿠라노 라운드별 출전 · 박스 수신 · 15분 구간 득실
- 우측 상단 `◐ 테마` 버튼으로 다크/라이트 전환 (보고서 자체도 다크 대응)
- 창을 좁혔을 때 피치 2장이 세로로 쌓이는지, 경기 카드 4장이 1열이 되는지
- 목록에서 12편 카드가 맨 위에 오는지(정렬 기준은 `publishedAt`, 2026-09-19)

---

## 빌드가 깨지면

Turbopack 캐시부터 지운다.

```bash
rm -rf .next && npm run build
```

iCloud가 만든 `... 2.ts` 중복 파일이 원인인 경우가 많다.

```bash
find . -name "* 2.ts" -not -path "./node_modules/*"
```

---

## 배포 후 확인

```bash
curl -sI https://<도메인>/data-anyang.ko.html | grep -i cache-control
```

`no-cache, must-revalidate` 가 나와야 한다.

---

## 본문을 고칠 때

포트폴리오의 HTML을 직접 고치지 말 것. 원본은 `안양FC/report/` 에 있다.

```bash
cd ~/Desktop/전술분석\ 프로젝트/안양FC/report
# content_ko.py 또는 content_en.py 를 고치고
python3 build.py ko && python3 build.py en
cp 안양FC_보고서_공은_어디서_멈추는가.html ../../jin-portfolio/public/data-anyang.ko.html
cp FC_Anyang_2026_Where_the_Ball_Stops.html ../../jin-portfolio/public/data-anyang.html
```

claude.ai에 올린 배포본은 별도다. 그쪽은 `build_artifact.py` 출력을 쓰며
언어 전환 링크가 들어 있어 포트폴리오용과 파일이 다르다. 혼동하지 말 것.

---

## 되돌리려면

푸시 전이면:

```bash
git reset --soft HEAD~1     # 커밋만 취소, 파일은 유지
git reset --hard HEAD~1     # 파일까지 되돌림
```

푸시 후면 되돌리는 커밋을 하나 더 올린다:

```bash
git revert <커밋해시> && git push origin main
```
