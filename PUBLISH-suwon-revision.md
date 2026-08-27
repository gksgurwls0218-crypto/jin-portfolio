# suwon-revision 배포 — 남은 작업

파일 배치 · 코드 연결 · 타입체크 · **커밋까지 끝났다.** 남은 건 두 줄이다.

```bash
cd ~/Desktop/전술분석\ 프로젝트/jin-portfolio
npm run build && git push origin main
```

Vercel이 `main`에 붙어 있어서 푸시하면 자동 배포된다.

---

## 이미 끝난 것

| 항목 | 상태 |
| --- | --- |
| `public/suwon-revision.ko.html` | 46.3 KB |
| `public/suwon-revision.html` | 46.5 KB (영문) |
| `app/[locale]/match-analysis/suwon-revision/page.tsx` | `/ko`→한국어, `/en`→영문 |
| `next.config.ts` | no-cache 헤더 2줄 |
| `components/MatchGallery.tsx` | 카드 (2026-08-27, 목록 최상단) |
| `tsconfig.json` | `_to_delete`, `tmp` 제외 추가 |
| `npx tsc --noEmit` | **통과** (에러 0) |
| 커밋 | `18371cf` — 아직 푸시 안 됨 |

`npm run build`는 마운트를 통해 돌리면 너무 느려서 로컬 터미널 몫으로 남겼다. 네 맥에서는 1분 안쪽이다.

---

## 빌드가 깨지면

Turbopack 캐시부터 지운다.

```bash
rm -rf .next && npm run build
```

iCloud가 만든 `... 2.ts` 중복 파일이 원인인 경우가 많다. 찾아서 지운다.

```bash
find . -name "* 2.ts" -not -path "./node_modules/*"
```

---

## 푸시 전 눈으로 볼 거라면

```bash
npm run dev
```

세 곳을 연다.

```
http://localhost:3000/ko/match-analysis/suwon-revision
http://localhost:3000/en/match-analysis/suwon-revision
http://localhost:3000/ko/match-analysis/matches
```

체크 포인트

- 그림 4개 — z-점수 · 두 절단면 깔때기 · 거리 분포 · 라운드 추이
- 우측 상단 `◐ 테마` 버튼으로 다크/라이트 전환
- 창을 좁혔을 때 표가 가로 스크롤 되는지
- 푸터 **데이터 출처** 문단 (영문은 *Data provenance*)
- 목록에서 카드가 맨 위에 오는지

---

## 배포 후 확인

```bash
curl -sI https://<도메인>/suwon-revision.ko.html | grep -i cache-control
```

`no-cache, must-revalidate` 가 나와야 한다. 나중에 본문을 고칠 때 옛 글이 캐시로 남는 걸 막는 설정이다.

---

## 되돌리려면

푸시 전이면:

```bash
git reset --soft HEAD~1     # 커밋만 취소, 파일은 유지
git reset --hard HEAD~1     # 파일까지 되돌림
```

푸시 후면 되돌리는 커밋을 하나 더 올린다:

```bash
git revert 18371cf && git push origin main
```

---

## 같이 처리하면 좋은 것 하나

`suwon-proposal-visuals` 페이지에 아직 `(R12 자료 없음)`이 남아 있다. 새 글에서는 휴식 라운드로 바로잡았으니, 옛 글만 맞추면 두 글이 어긋나지 않는다.

```bash
grep -n "R12 자료 없음" public/suwon-proposal-visuals*.html

sed -i '' 's/R12 자료 없음/R12는 홀수 팀 편성에 따른 수원 휴식 라운드/g' \
  public/suwon-proposal-visuals.ko.html
```

영문판은 같은 자리에 어떤 문구가 있는지 위 `grep`로 먼저 보고 맞춰 고친다.
