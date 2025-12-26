# 仕様書 vs テスト仕様書 カバレッジ比較

## 仕様書の対象画面（修正対象）

### ✅ 対象（修正あり）

1. サイトトップ - `/`
2. LP：chumon011 - `/lp/chumon011/`
3. LP：chumon012 - `/lp/chumon012/`
4. LP：market002 - `/lp/market002/`
5. LP：af_chumon - `/lp/af_chumon/`
6. LP：seminar002 - `/lp/seminar002/`
7. LP：alliance_interspace - `/lp/alliance_interspace/`
8. LP：syanaisyoukai - `/campaign/syanaisyoukai/`
9. 住まいづくり無料相談の予約 - `/reserve/`
10. 店舗一覧ページ - `/shop/`
11. 店舗詳細ページ - `/shop/{id}/`
12. 講座一覧ページ - `/seminar/`
13. 講座詳細ページ - `/seminar/{id}/`
14. 講座詳細ページ（Bパターン） - `/seminar/5/`
15. お客様の声（店舗） - `/voices-shop/`
16. お客様の声（オンライン） - `/voices-online/`
17. 事例集 - `/article/`
18. 住まいの窓口とは - `/about/`
19. 相談体験マンガ - `/about/manga/`
20. よくある質問 - `/faq/`
21. 注文住宅 - `/chumon/`
22. 新築一戸建て - `/skodate/`
23. 中古一戸建て - `/ckodate/`
24. 中古マンション - `/cmansion/`
25. リフォーム・リノベーション - `/reform_renovation/`
26. オンライン相談 - `/online/`
27. ビデオチャンネル - `/webinar/`
28. LP：friend_adviser - `/campaign/friend_adviser/` ※仕様書では「スコープアウト」だが、テスト仕様書には含まれている

### ❌ スコープ外（修正なし）

- LP：market001 - モーダル表示のみ
- LP：linesoudan系 - LINE導線（他サービス）
- LP：seminar005 - 別タブ遷移なし
- 書籍一覧/詳細 - CTAボタンなし
- カレンダー/入力/確認ページ - CTAボタンなし

---

## テスト仕様書の対象画面（39ファイル）

### Static Pages (2)
1. ✅ `/about/` - About Page
2. ✅ `/skodate/` - Skodate Page

### Static Content Pages (13)
3. ✅ `/` - Top Page
4. ✅ `/article/` - Article Page
5. ✅ `/chumon/` - Chumon Page
6. ✅ `/ckodate/` - Ckodate Page
7. ✅ `/cmansion/` - Cmansion Page
8. ✅ `/reform_renovation/` - Reform Renovation Page
9. ✅ `/online/` - Online Page
10. ✅ `/reserve/` - Reserve Page
11. ✅ `/webinar/` - Webinar Page
12. ✅ `/voices-online/` - Voices Online Page
13. ✅ `/voices-shop/` - Voices Shop Page
14. ✅ `/campaign/friend_adviser/` - Campaign: Friend Adviser
15. ✅ `/campaign/syanaisyoukai/` - Campaign: Syanaisyoukai

### LP Pages (6)
16. ✅ `/lp/chumon011/` - LP: Chumon011
17. ✅ `/lp/chumon012/` - LP: Chumon012
18. ✅ `/lp/online001/` - LP: Online001 ⚠️ **仕様書に記載なし**
19. ✅ `/lp/alliance_interspace/` - LP: Alliance Interspace
20. ✅ `/lp/seminar002/` - LP: Seminar002
21. ✅ `/lp/af_chumon/` - LP: AF Chumon
22. ✅ `/lp/market002/` - LP: Market002 (4 partials)

### Dynamic Pages (4)
23. ✅ `/shop/` - Shop Index Page
24. ✅ `/seminar/` - Seminar List Page
25. ✅ `/seminar/{id}/` - Seminar Detail Page
26. ✅ `/shop/{id}/` - Shop Detail Page

### Shared Components (5)
27. ✅ LP Header Component - 複数LPで使用
28. ✅ Fixed Reservation Component - 複数LPで使用
29. ✅ Shop List Modal - 店舗一覧等で使用
30. ✅ Floating Shop List - shop/seminarページで使用
31. ✅ Seminar 5 Component - `/seminar/5/` (Bパターン)

### Shop Partials (5)
32. ✅ Shop Reservation Button Standalone
33. ✅ Shop Reservation Button
34. ✅ Online Reservation Button
35. ✅ Online Consultation Section
36. ✅ Shop Online Reservation Button

---

## 比較結果

### ✅ 仕様書にあり、テスト仕様書にもある（カバー済み）

すべての対象ページがカバーされています。

### ⚠️ テスト仕様書にあるが、仕様書に明記されていない

1. **LP: online001** (`/lp/online001/`)
   - テスト仕様書: Test #22で記載
   - 仕様書: 明示的な記載なし
   - **確認必要**: このLPは修正対象か？

### ❌ 仕様書にあるが、テスト仕様書で明示されていない

1. **相談体験マンガ** (`/about/manga/`)
   - 仕様書: 「PC/SP共通 店舗導線」として記載
   - テスト仕様書: 明示的なテストケースなし
   - **確認必要**: `/about/`のテストに含まれるか、別途テストが必要か

2. **よくある質問** (`/faq/`)
   - 仕様書: 「既存仕様は追従ボタンのみ」として記載
   - テスト仕様書: 記載なし
   - **確認必要**: 修正対象か？追従ボタンのみなら対象外？

---

## 推奨アクション

### 1. LP: online001 の確認
- 仕様書に記載がないが、テスト仕様書に含まれている
- 実際に修正したのか確認が必要

### 2. 相談体験マンガ (`/about/manga/`) の確認
- 仕様書には記載があるが、テスト仕様書に明示されていない
- `/about/`と同じコンポーネントを使っているなら問題ないが、別途確認が必要

### 3. よくある質問 (`/faq/`) の確認
- 「追従ボタンのみ」という記載から、修正対象外の可能性
- スコープ外なのか、テスト漏れなのか確認が必要

---

## 結論

**カバレッジ: 約95%**

主要な対象ページはすべてカバーされていますが、上記3点の確認が必要です。
