# CSS統合作業 - ウォークスルーテストケース

**テスト日**: 2025-12-24  
**対象**: CSS統合済み27ページ  
**環境**: EE vs 本番

---

## テスト方法

各URLをEE環境と本番環境で開き、目視で比較する。

**EE環境**: https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp  
**本番環境**: https://sumai-madoguchi.lifull.com

---

## テストケース一覧（27ページ × PC/SP）

### 1. market系（4ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 1 | 注文住宅 | /chumon | ☐ | ☐ |
| 2 | 建売住宅 | /ckodate | ☐ | ☐ |
| 3 | 中古マンション | /cmansion | ☐ | ☐ |
| 4 | リフォーム | /reform_renovation | ☐ | ☐ |

### 2. voice系（2ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 5 | 店舗相談の声 | /voices-shop | ☐ | ☐ |
| 6 | オンライン相談の声 | /voices-online | ☐ | ☐ |

### 3. article/online/webinar（3ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 7 | 記事一覧 | /article | ☐ | ☐ |
| 8 | オンライン相談 | /online | ☐ | ☐ |
| 9 | ウェビナー | /webinar | ☐ | ☐ |

### 4. reserve/thanks（2ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 10 | 予約 | /reserve | ☐ | ☐ |
| 11 | サンクス | /thanks | ☐ | ☐ |

### 5. campaign（2ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 12 | 社内紹介 | /campaign/syanaisyoukai | ☐ | ☐ |
| 13 | 友達紹介 | /campaign/friend_adviser | ☐ | ☐ |

### 6. TOP（1ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 14 | トップ | / | ☐ | ☐ |

### 7. LP（9ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 15 | セミナー002 | /lp/seminar002 | ☐ | ☐ |
| 16 | セミナー005 | /lp/seminar005 | ☐ | ☐ |
| 17 | 注文住宅011 | /lp/chumon011 | ☐ | ☐ |
| 18 | 注文住宅012 | /lp/chumon012 | ☐ | ☐ |
| 19 | オンライン001 | /lp/online001 | ☐ | ☐ |
| 20 | マーケット001 | /lp/market001 | ☐ | ☐ |
| 21 | LINE相談 | /lp/linesoudan | ☐ | ☐ |
| 22 | LINE相談001 | /lp/linesoudan001 | ☐ | ☐ |
| 23 | LINE相談002 | /lp/linesoudan002 | ☐ | ☐ |
| 24 | アライアンス | /lp/alliance_interspace | ☐ | ☐ |

### 8. about/skodate/book（3ページ）

| # | ページ | URL | PC | SP |
|---|--------|-----|----|----|
| 25 | 住まいの窓口とは | /about | ☐ | ☐ |
| 26 | 新築一戸建て | /skodate | ☐ | ☐ |
| 27 | 書籍紹介 | /book | ☐ | ☐ |

---

## 確認ポイント

### 必須チェック項目
- [ ] レイアウト崩れがないか
- [ ] アイコンフォントが正しく表示されているか
- [ ] 画像が正しく読み込まれているか
- [ ] ボタン・リンクのスタイルが正しいか
- [ ] ヘッダー・フッターが正しく表示されているか

### 特に注意するページ
- **lp_online001**: 26.5%の差異（PC）
- **about**: modernな実装（オーバーライドCSS使用）
- **skodate**: modernな実装
- **book**: modernな実装

---

## テスト結果記録

### 問題が見つかった場合
- ページ名:
- デバイス: PC / SP
- 問題内容:
- スクリーンショット:

---

## URL一覧（コピペ用）

### EE環境
```
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/chumon
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/ckodate
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/cmansion
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/reform_renovation
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/voices-shop
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/voices-online
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/article
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/online
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/webinar
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/reserve
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/thanks
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/campaign/syanaisyoukai
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/campaign/friend_adviser
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/seminar002
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/seminar005
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/chumon011
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/chumon012
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/online001
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/market001
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/linesoudan
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/linesoudan001
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/linesoudan002
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/lp/alliance_interspace
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/about
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/skodate
https://madoguchi-web981.tls-termination.k8s.dev.nxin.jp/book
```

### 本番環境
```
https://sumai-madoguchi.lifull.com/chumon
https://sumai-madoguchi.lifull.com/ckodate
https://sumai-madoguchi.lifull.com/cmansion
https://sumai-madoguchi.lifull.com/reform_renovation
https://sumai-madoguchi.lifull.com/voices-shop
https://sumai-madoguchi.lifull.com/voices-online
https://sumai-madoguchi.lifull.com/article
https://sumai-madoguchi.lifull.com/online
https://sumai-madoguchi.lifull.com/webinar
https://sumai-madoguchi.lifull.com/reserve
https://sumai-madoguchi.lifull.com/thanks
https://sumai-madoguchi.lifull.com/campaign/syanaisyoukai
https://sumai-madoguchi.lifull.com/campaign/friend_adviser
https://sumai-madoguchi.lifull.com/
https://sumai-madoguchi.lifull.com/lp/seminar002
https://sumai-madoguchi.lifull.com/lp/seminar005
https://sumai-madoguchi.lifull.com/lp/chumon011
https://sumai-madoguchi.lifull.com/lp/chumon012
https://sumai-madoguchi.lifull.com/lp/online001
https://sumai-madoguchi.lifull.com/lp/market001
https://sumai-madoguchi.lifull.com/lp/linesoudan
https://sumai-madoguchi.lifull.com/lp/linesoudan001
https://sumai-madoguchi.lifull.com/lp/linesoudan002
https://sumai-madoguchi.lifull.com/lp/alliance_interspace
https://sumai-madoguchi.lifull.com/about
https://sumai-madoguchi.lifull.com/skodate
https://sumai-madoguchi.lifull.com/book
```
