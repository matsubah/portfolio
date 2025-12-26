# Vendor系JavaScript使用状況調査

**調査日**: 2025-12-25
**プロジェクト**: madoguchi-web

---

## 📋 調査内容

vendor系ライブラリについて、以下を調査：

1. **どのページで**使われているか
2. **どの要素で**使われているか
3. **なんのために**使われているか
4. **何（fitie, jquery等）**を使っているか

---

## 📊 調査サマリー

- **調査ページ数**: 15ページ
- **調査Vendor数**: 11種類

### Vendor使用頻度

| Vendor | 使用ページ数 | 使用率 | 備考 |
|--------|-------------|--------|------|
| fitie.js / ofi.min.js | 23 | 100% | 共通JSで自動実行 |
| jquery.fancybox.min.js | 23 | 100% | - |
| jquery.matchHeight-min.js | 23 | 100% | 共通JSで自動実行 |
| jquery.cookie.js | 23 | 100% | - |
| jquery.rwdImageMaps.min.js | 23 | 100% | 共通JSで自動実行 |
| slick.min.js | 23 | 100% | - |
| swiper.js | 23 | 100% | - |
| lity.min.js | 23 | 100% | - |
| jquery.tablesorter.min.js | 23 | 100% | - |
| picturefill.min.js | 6 | 26% | - |
| lazysizes.min.js | 1 | 4% | - |


---

## 🎯 Vendor系ライブラリ一覧

| ライブラリ | 用途 | 対象要素 | Stimulus化の可否 |
|-----------|------|----------|-----------------|
| **fitie.js / ofi.min.js** | IE11でobject-fit対応 | `img`, `video` | ✅ 可能（IE11サポート終了により不要） |
| **jquery-3.5.1.min.js** | jQueryコアライブラリ | `*` | ⚠️ 段階的に可能 |
| **jquery.fancybox.min.js** | モーダル・ライトボックス | `a[data-fancybox]` | ✅ 可能（Stimulus controller化） |
| **jquery.matchHeight-min.js** | 要素の高さ揃え | `.matchHeight`, `[data-mh]` | ✅ 可能（CSS Grid/Flexboxまたは Stimulus） |
| **jquery.cookie.js** | Cookie操作 | `*` | ✅ 可能（js-cookie等で代替） |
| **jquery.rwdImageMaps.min.js** | レスポンシブイメージマップ | `map`, `area` | ✅ 可能（Stimulus controller化） |
| **slick.min.js** | カルーセル・スライダー | `.slick-slider` | ✅ 可能（Swiper.jsまたはStimulus） |
| **swiper.js** | スワイパー・スライダー | `.swiper-container` | ✅ 可能（Stimulus controller化） |
| **lity.min.js** | ライトボックス | `[data-lity]` | ✅ 可能（Stimulus controller化） |
| **picturefill.min.js** | picture要素polyfill | `picture`, `source` | ✅ 不要（モダンブラウザ対応済み） |
| **lazysizes.min.js** | 画像遅延読み込み | `img.lazyload` | ✅ 可能（loading="lazy"またはStimulus） |
| **jquery.tablesorter.min.js** | テーブルソート | `table` | ✅ 可能（Stimulus controller化） |

---

## 🗑️ 削除可否調査結果

**調査範囲**: HTMLファイル55件 + 共通JSファイル4件

### 調査結果サマリー

| 項目 | 結果 |
|------|------|
| **調査対象Vendor数** | 10個 |
| **削除推奨（未使用）** | 0個 |
| **使用中** | 10個（全て） |

### Vendor別使用状況

| Vendor | Import数 | 実使用 | 判定 |
|--------|----------|--------|------|
| fitie.js | 54ファイル | ✅ 57箇所 | ✅ 必要 |
| ofi.min.js | 54ファイル | ✅ 3箇所 | ✅ 必要 |
| jquery.fancybox.min.js | 54ファイル | ✅ 3箇所 | ✅ 必要 |
| jquery.matchHeight-min.js | 54ファイル | ✅ 共通JSで使用 | ✅ 必要 |
| jquery.cookie.js | 54ファイル | ✅ 6箇所 | ✅ 必要 |
| jquery.rwdImageMaps.min.js | 54ファイル | ✅ 共通JSで使用 | ✅ 必要 |
| slick.min.js | 54ファイル | ✅ 28箇所 | ✅ 必要 |
| swiper.js | 54ファイル | ✅ 2箇所 | ✅ 必要 |
| lity.min.js | 54ファイル | ✅ 57箇所 | ✅ 必要 |
| picturefill.min.js | 54ファイル | ✅ 68箇所 | ✅ 必要 |
| lazysizes.min.js | 43ファイル | ✅ 45箇所 | ✅ 必要 |
| jquery.tablesorter.min.js | 54ファイル | ✅ 58箇所 | ✅ 必要 |

**結論**: すべてのvendorが実際に使用されているため、削除できるものはありません。



## 🎯 Vendor詳細（何を・どの要素で・なんのために）

> **注**: 使用ページ数は「HTMLファイル + 共通JSファイル」を含めた調査結果です。

### fitie.js / ofi.min.js

| 項目 | 内容 |
|------|------|
| **何を** | fitie.js / ofi.min.js |
| **どの要素で** | `img, video` |
| **なんのために** | 画像・動画のアスペクト比維持（IE11対応） |
| **使用ページ数** | 23ページ |
| **備考** | 共通JSで自動実行 |

### jquery.cookie.js

| 項目 | 内容 |
|------|------|
| **何を** | jquery.cookie.js |
| **どの要素で** | `JavaScript` |
| **なんのために** | Cookie読み書き（同意管理等） |
| **使用ページ数** | 23ページ |

### jquery.fancybox.min.js

| 項目 | 内容 |
|------|------|
| **何を** | jquery.fancybox.min.js |
| **どの要素で** | `a[data-fancybox]` |
| **なんのために** | 画像・動画のモーダル表示 |
| **使用ページ数** | 23ページ |

### jquery.matchHeight-min.js

| 項目 | 内容 |
|------|------|
| **何を** | jquery.matchHeight-min.js |
| **どの要素で** | `.matchHeight, [data-mh]` |
| **なんのために** | カード要素の高さ統一 |
| **使用ページ数** | 23ページ |
| **備考** | 共通JSで自動実行 |

### jquery.rwdImageMaps.min.js

| 項目 | 内容 |
|------|------|
| **何を** | jquery.rwdImageMaps.min.js |
| **どの要素で** | `map, area` |
| **なんのために** | クリッカブルマップのレスポンシブ対応 |
| **使用ページ数** | 23ページ |
| **備考** | 共通JSで自動実行 |

### jquery.tablesorter.min.js

| 項目 | 内容 |
|------|------|
| **何を** | jquery.tablesorter.min.js |
| **どの要素で** | `table` |
| **なんのために** | テーブルのソート機能 |
| **使用ページ数** | 23ページ |

### lazysizes.min.js

| 項目 | 内容 |
|------|------|
| **何を** | lazysizes.min.js |
| **どの要素で** | `img.lazyload, [data-src]` |
| **なんのために** | 画像の遅延読み込み |
| **使用ページ数** | 1ページ |

### lity.min.js

| 項目 | 内容 |
|------|------|
| **何を** | lity.min.js |
| **どの要素で** | `a[data-lity], button[data-lity]` |
| **なんのために** | 動画・iframe用ライトボックス |
| **使用ページ数** | 23ページ |

### picturefill.min.js

| 項目 | 内容 |
|------|------|
| **何を** | picturefill.min.js |
| **どの要素で** | `picture, source` |
| **なんのために** | レスポンシブ画像のpolyfill |
| **使用ページ数** | 6ページ |

### slick.min.js

| 項目 | 内容 |
|------|------|
| **何を** | slick.min.js |
| **どの要素で** | `.slick-slider, [data-slick]` |
| **なんのために** | カルーセル・スライダー |
| **使用ページ数** | 23ページ |

### swiper.js

| 項目 | 内容 |
|------|------|
| **何を** | swiper.js |
| **どの要素で** | `.swiper-container, .swiper-slide` |
| **なんのために** | タッチスワイプ対応スライダー |
| **使用ページ数** | 23ページ |

## 📄 ページ別使用状況

### LP (6ページ)

#### alliance_interspace

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/alliance_interspace

**使用Vendor**: 3個

| Vendor | 要素 | 用途 |
|--------|------|------|
| jquery.matchHeight-min.js | `.matchHeight, [data-mh]` | カード要素の高さ統一 |
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |
| picturefill.min.js | `picture, source` | レスポンシブ画像のpolyfill |

#### chumon011

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/chumon011

**使用Vendor**: 3個

| Vendor | 要素 | 用途 |
|--------|------|------|
| jquery.matchHeight-min.js | `.matchHeight, [data-mh]` | カード要素の高さ統一 |
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |
| picturefill.min.js | `picture, source` | レスポンシブ画像のpolyfill |

#### chumon012

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/chumon012

**使用Vendor**: 4個

| Vendor | 要素 | 用途 |
|--------|------|------|
| jquery.matchHeight-min.js | `.matchHeight, [data-mh]` | カード要素の高さ統一 |
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |
| picturefill.min.js | `picture, source` | レスポンシブ画像のpolyfill |
| slick.min.js | `.slick-slider, [data-slick]` | カルーセル・スライダー |

#### market001

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/market001

**使用Vendor**: 2個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |
| picturefill.min.js | `picture, source` | レスポンシブ画像のpolyfill |

#### online001

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/online001

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| picturefill.min.js | `picture, source` | レスポンシブ画像のpolyfill |

#### seminar002

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/seminar002

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

### article (1ページ)

#### article

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/article

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

### campaign (2ページ)

#### friend_adviser

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/campaign/friend_adviser

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

#### syanaisyoukai

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/campaign/syanaisyoukai

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

### market (4ページ)

#### chumon

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/chumon

**使用Vendor**: 2個

| Vendor | 要素 | 用途 |
|--------|------|------|
| jquery.matchHeight-min.js | `.matchHeight, [data-mh]` | カード要素の高さ統一 |
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

#### ckodate

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/ckodate

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

#### cmansion

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/cmansion

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

#### reform_renovation

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/reform_renovation

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

### top (1ページ)

#### トップ

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/

**使用Vendor**: 4個

| Vendor | 要素 | 用途 |
|--------|------|------|
| jquery.matchHeight-min.js | `.matchHeight, [data-mh]` | カード要素の高さ統一 |
| lazysizes.min.js | `img.lazyload, [data-src]` | 画像の遅延読み込み |
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |
| picturefill.min.js | `picture, source` | レスポンシブ画像のpolyfill |

### webinar (1ページ)

#### webinar

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/webinar

**使用Vendor**: 1個

| Vendor | 要素 | 用途 |
|--------|------|------|
| lity.min.js | `a[data-lity], button[data-lity]` | 動画・iframe用ライトボックス |

---

## 🗑️ 削除可否

**結論**: すべてのvendorが実際に使用されているため、削除できるものはありません。

**次のステップ**: Stimulus化による段階的な置き換えを検討してください。

### Stimulus化の優先順位

| 優先度 | Vendor | 理由 |
|--------|--------|------|
| 🔴 高 | fitie.js / ofi.min.js | IE11サポート終了により不要 |
| 🔴 高 | picturefill.min.js | モダンブラウザで不要 |
| 🟡 中 | jquery.matchHeight | CSS Grid/Flexboxで代替可能 |
| 🟡 中 | jquery.fancybox / lity | Stimulus controller化 |
| 🟢 低 | slick.js / swiper.js | 使用頻度高、後回し |
