# Vendor系JavaScript詳細調査（HTML単位）

**調査日**: 2025-12-25  
**プロジェクト**: madoguchi-web  
**調査対象**: 55 HTMLファイル

---

## 📊 調査目的

vendor系ライブラリについて、以下を調査：
- **どのページで**使われているか
- **どの要素で**使われているか  
- **なんのために**使われているか
- **何（fitie, jquery等）**を使っているか

---

## 🎯 Vendor系ライブラリ一覧

| ライブラリ | 用途 | 対象要素 | Stimulus化の可否 |
|-----------|------|----------|-----------------|
| **fitie.js** | IE11でobject-fit対応 | `img`, `video` | ✅ 可能（IntersectionObserver等で代替） |
| **ofi.min.js** | object-fit-images（IE11） | `img` | ✅ 可能（同上） |
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

---

## 📋 ページ別詳細調査

### 優先度の考え方

1. **高優先度**: URL確認済み（✓マーク）のページ
2. **中優先度**: inline JSがあるページ
3. **低優先度**: パーシャルファイル（`_`始まり）

---


## 📁 カテゴリ: LP (9ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/alliance_interspace/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/alliance_interspace

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 15箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 9箇所 | ✅ |
| `picturefill.min.js` | picture polyfill | 2箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/chumon011/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/chumon011

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 15箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 7箇所 | ✅ |
| `picturefill.min.js` | picture polyfill | 2箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/chumon012/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/chumon012

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 7箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 11箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 10箇所 | ✅ |
| `picturefill.min.js` | picture polyfill | 2箇所 | ✅ |
| `slick.min.js` | カルーセル | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/linesoudan/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/linesoudan

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 4箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/linesoudan001/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/linesoudan001

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 4箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/linesoudan002/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/linesoudan002

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 4箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/market001/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/market001

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 5箇所 | ✅ |
| `picturefill.min.js` | picture polyfill | 2箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/online001/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/online001

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 4箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `picturefill.min.js` | picture polyfill | 2箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/lp/seminar002/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/seminar002

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 13箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 7箇所 | ✅ |

---


## 📁 カテゴリ: article (1ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/article/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/article

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 1箇所 | ✅ |

---


## 📁 カテゴリ: campaign (2ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/campaign/friend_adviser/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/campaign/friend_adviser

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 4箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 3箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/campaign/syanaisyoukai/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/campaign/syanaisyoukai

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 4箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 3箇所 | ✅ |

---


## 📁 カテゴリ: lp (1ファイル)

### seminar005.html.erb

**パス**: `app/views/lp_pages/seminar005.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/lp/seminar005

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `jquery-3.5.1.min.js` | jQueryコア | 3箇所 | ⚠️ |

---


## 📁 カテゴリ: market (4ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/chumon/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/chumon

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 5箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 2箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/ckodate/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/ckodate

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 2箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/cmansion/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/cmansion

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 2箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/reform_renovation/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/reform_renovation

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 2箇所 | ✅ |

---


## 📁 カテゴリ: online (1ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/online/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/online

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---


## 📁 カテゴリ: reserve (1ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/reserve/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/reserve

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---


## 📁 カテゴリ: top (1ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 2箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lazysizes.min.js` | 画像遅延読み込み | 2箇所 | ✅ |
| `lity.min.js` | ライトボックス | 1箇所 | ✅ |
| `picturefill.min.js` | picture polyfill | 4箇所 | ✅ |

---


## 📁 カテゴリ: voice (2ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/voices-online/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/voices-online

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/voices-shop/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/voices-shop

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---


## 📁 カテゴリ: webinar (1ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/webinar/_index.html.erb`

**URL**: https://madoguchi-web.tls-termination.k8s.dev.nxin.jp/webinar

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |
| `lity.min.js` | ライトボックス | 1箇所 | ✅ |

---


## 📁 カテゴリ: 未分類 (32ファイル)

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/chumonjuutakutaizen/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/education_town_syutoken/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/home_purchase/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/ieno_kaikata/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/iewokaubekimachi/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/juutaku_seikai_2025-26/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/machierabi/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/myhomelovewalker2024/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/myhomelovewalker_syutoken/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/myhometaizen_2022/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/myhometaizen_2023/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/myhometaizen_2024-25/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/myhometaizen_2025-26/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/sonshinai/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/sumai_2022-23/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/sumaierabinoseikai/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/sumainookanetaizen/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_custom_house_2021-22/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_custom_house_2022-23/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_custom_house_2023-24/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_custom_house_2025-26/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_ikkodate/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_ikkodate_2023/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_ikkodate_2024-2025/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_ikkodate_2025-2026/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_mansion/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/wakaruhon_reform-renovation/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/walker_4/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/walker_8/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/watashi_iewokaemasuka/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---

### _index.html.erb

**パス**: `app/views/static_contents/pages/book/yumewokanaeru_chumon/_index.html.erb`

**Inline JS**: あり

**使用Vendor**:

| Vendor | 用途 | 検出数 | Stimulus化 |
|--------|------|--------|------------|
| `fitie.js` | IE11 object-fit対応 | 1箇所 | ✅ |
| `jquery-3.5.1.min.js` | jQueryコア | 1箇所 | ⚠️ |
| `jquery.fancybox.min.js` | モーダル | 1箇所 | ✅ |
| `jquery.matchHeight-min.js` | 高さ揃え | 1箇所 | ✅ |
| `jquery.rwdImageMaps.min.js` | レスポンシブマップ | 1箇所 | ✅ |

---


## 📊 調査サマリー

- **調査完了ファイル数**: 55
- **カテゴリ数**: 11

### Vendor使用頻度

| Vendor | 使用ファイル数 | 使用率 |
|--------|---------------|--------|
| `fitie.js` | 54 | 98.2% |
| `jquery-3.5.1.min.js` | 54 | 98.2% |
| `jquery.fancybox.min.js` | 54 | 98.2% |
| `jquery.matchHeight-min.js` | 54 | 98.2% |
| `jquery.rwdImageMaps.min.js` | 54 | 98.2% |
| `lity.min.js` | 14 | 25.5% |
| `picturefill.min.js` | 6 | 10.9% |
| `slick.min.js` | 1 | 1.8% |
| `lazysizes.min.js` | 1 | 1.8% |

---


### fitie.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `img, video` |
| **用途** | IE11でobject-fit CSSプロパティをサポート（画像のアスペクト比維持） |
| **使用状況** | object-fit:  |
| **検出数** | 0箇所 |

### jquery.fancybox.min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `a[data-fancybox]` |
| **用途** | 画像・動画・iframeをモーダルで表示（ギャラリー機能付き） |
| **使用状況** | data-fancybox属性: 0種類のグループ |
| **検出数** | 0箇所 |

### jquery.matchHeight-min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `.matchHeight, [data-mh], カスタムセレクタ` |
| **用途** | カード・ボックス要素の高さを揃える（レスポンシブ対応） |
| **使用状況** | .matchHeight()呼び出し: 0箇所, data-mh: 5箇所 |
| **検出数** | 5箇所 |

### jquery.rwdImageMaps.min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `map, area` |
| **用途** | クリッカブルマップ（イメージマップ）のレスポンシブ対応 |
| **使用状況** | 0個のmap要素, 0個のarea要素 |
| **検出数** | 0箇所 |

### slick.min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `.slick-slider, [data-slick]` |
| **用途** | カルーセル・スライダー（自動再生、ドット、矢印ナビゲーション） |
| **使用状況** | .slick()初期化: 0箇所, data-slick: 0箇所 |
| **検出数** | 0箇所 |

### swiper.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `.swiper-container, .swiper-slide` |
| **用途** | タッチスワイプ対応スライダー（モバイルフレンドリー） |
| **使用状況** | new Swiper初期化: 0箇所, コンテナ: 0個 |
| **検出数** | 0箇所 |

### lity.min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `a[data-lity], button[data-lity]` |
| **用途** | 軽量ライトボックス（YouTube、Vimeo、Google Maps対応） |
| **使用状況** | data-lity属性: 6箇所 |
| **検出数** | 6箇所 |

### lazysizes.min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `img.lazyload, [data-src]` |
| **用途** | 画像の遅延読み込み（初期表示の高速化、帯域節約） |
| **使用状況** | lazyloadクラス: 2個, data-src: 0個 |
| **検出数** | 2箇所 |

### picturefill.min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `picture, source[srcset]` |
| **用途** | レスポンシブ画像のpolyfill（デバイスに最適な画像を配信） |
| **使用状況** | picture要素: 2個, srcset属性: 2個 |
| **検出数** | 2箇所 |

### jquery.cookie.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `JavaScript（DOM操作なし）` |
| **用途** | Cookie読み書き（ユーザー設定、同意管理、セッション管理） |
| **使用状況** | Cookie操作: 0種類のCookie |
| **検出数** | 0箇所 |

### jquery-3.5.1.min.js

| 項目 | 内容 |
|------|------|
| **対象要素** | `*（全要素）` |
| **用途** | DOM操作、イベント処理、Ajax通信、アニメーション |
| **使用状況** | セレクタ: 3, イベント: 3, Ajax: 0, アニメーション: 1 |
| **検出数** | 7箇所 |


## 🔬 Vendor詳細調査結果（要素・用途・実装詳細）

**調査範囲**: HTMLファイル + 共通JSファイル + inline JavaScript

---

### fitie.js / ofi.min.js

**対象要素**: `img, video`

**用途**: IE11でobject-fit CSSプロパティをサポート（画像のアスペクト比維持）

**使用例**:
- CSSで object-fit: cover/contain を指定した画像・動画要素
- メインビジュアル、サムネイル画像、動画プレーヤー

**コード例**:
```javascript
objectFitImages(); // IE11で自動的にpolyfill適用
```

---

### jquery.fancybox.min.js

**対象要素**: `a[data-fancybox], button[data-fancybox]`

**用途**: 画像・動画・iframeをモーダルで表示（ギャラリー機能、ズーム、スライドショー）

**使用例**:
- 画像ギャラリー（data-fancybox="gallery"でグループ化）
- YouTube/Vimeo動画の埋め込み再生
- 施工事例の写真表示

**コード例**:
```javascript
<a href="image.jpg" data-fancybox="gallery">画像</a>
```

---

### jquery.matchHeight-min.js

**対象要素**: `.matchHeight, [data-mh], カスタムセレクタ`

**用途**: カード・ボックス要素の高さを揃える（レスポンシブ対応、ブレークポイント対応）

**使用例**:
- カード型レイアウトの高さ統一
- 店舗一覧、記事一覧のカード
- data-mh="group-name"で同じグループの要素を揃える

**コード例**:
```javascript
$('.card').matchHeight(); // または <div data-mh="cards">
```

---

### jquery.rwdImageMaps.min.js

**対象要素**: `map, area`

**用途**: クリッカブルマップ（イメージマップ）のレスポンシブ対応

**使用例**:
- 地図上の店舗位置クリック
- 間取り図の部屋クリック
- インフォグラフィックのホットスポット

**コード例**:
```javascript
$('img[usemap]').rwdImageMaps(); // 画像リサイズ時にarea座標を自動調整
```

---

### slick.min.js

**対象要素**: `.slick-slider, [data-slick]`

**用途**: カルーセル・スライダー（自動再生、ドット、矢印、レスポンシブ設定）

**使用例**:
- トップページのメインビジュアルスライダー
- お客様の声のカルーセル
- 施工事例のスライドショー

**コード例**:
```javascript
$('.slider').slick({autoplay: true, dots: true});
```

---

### swiper.js

**対象要素**: `.swiper-container, .swiper-slide`

**用途**: タッチスワイプ対応スライダー（モバイルフレンドリー、パフォーマンス最適化）

**使用例**:
- スマホでのスワイプ操作
- サムネイル付きスライダー
- バーティカルスライダー

**コード例**:
```javascript
new Swiper(".swiper-container", {pagination: true});
```

---

### lity.min.js

**対象要素**: `a[data-lity], button[data-lity]`

**用途**: 軽量ライトボックス（YouTube、Vimeo、Google Maps、iframe対応）

**使用例**:
- YouTube動画のモーダル再生
- Google Mapsの拡大表示
- iframe埋め込みコンテンツ

**コード例**:
```javascript
<a href="https://youtube.com/..." data-lity>動画を見る</a>
```

---

### lazysizes.min.js

**対象要素**: `img.lazyload, iframe.lazyload, [data-src]`

**用途**: 画像・iframeの遅延読み込み（初期表示高速化、帯域節約、SEO改善）

**使用例**:
- ファーストビュー外の画像を遅延読み込み
- data-src属性に画像URLを指定
- スクロールで表示領域に入ったら自動読み込み

**コード例**:
```javascript
<img data-src="image.jpg" class="lazyload" />
```

---

### picturefill.min.js

**対象要素**: `picture, source[srcset]`

**用途**: レスポンシブ画像のpolyfill（デバイスに最適な画像を配信、IE11対応）

**使用例**:
- スマホ/タブレット/PCで異なる画像を配信
- Retina対応（高解像度ディスプレイ）
- WebP形式の画像フォールバック

**コード例**:
```javascript
<picture><source srcset="sp.jpg" media="(max-width:768px)"><img src="pc.jpg"></picture>
```

---

### jquery.cookie.js

**対象要素**: `JavaScript（DOM操作なし）`

**用途**: Cookie読み書き（ユーザー設定保存、同意管理、セッション管理、A/Bテスト）

**使用例**:
- Cookie同意バナーの表示制御
- ユーザー設定の保存（表示モード等）
- A/Bテストのバリアント記録

**コード例**:
```javascript
$.cookie('consent', 'true', {expires: 365}); // 1年間保存
```

---

### jquery-3.5.1.min.js

**対象要素**: `*（全要素）`

**用途**: DOM操作、イベント処理、Ajax通信、アニメーション、ユーティリティ関数

**使用例**:
- クリックイベント: $(".btn").on("click", ...)
- クラス操作: $(".menu").toggleClass("open")
- Ajax通信: $.ajax({url: "/api/..."})
- アニメーション: $(".modal").fadeIn()
- 要素検索: $(".parent").find(".child")
- 高さ取得: $(".header").height()

**コード例**:
```javascript
$(document).ready(function() { /* 初期化処理 */ });
```

---


## 🗑️ Vendor削除可否調査

## 📊 調査サマリー

- **調査対象Vendor数**: 10
- **削除推奨（未使用）**: 0個
- **使用中**: 10個

| Vendor | Import数 | 使用状況 | 判定 |
|--------|----------|----------|------|
| fitie.js | 54 | ✅ 使用中 | ✅ 必要 |
| jquery.cookie.js | 54 | ✅ 使用中 | ✅ 必要 |
| jquery.fancybox.min.js | 54 | ✅ 使用中 | ✅ 必要 |
| jquery.tablesorter.min.js | 54 | ✅ 使用中 | ✅ 必要 |
| lazysizes.min.js | 43 | ✅ 使用中 | ✅ 必要 |
| lity.min.js | 54 | ✅ 使用中 | ✅ 必要 |
| ofi.min.js | 54 | ✅ 使用中 | ✅ 必要 |
| picturefill.min.js | 54 | ✅ 使用中 | ✅ 必要 |
| slick.min.js | 54 | ✅ 使用中 | ✅ 必要 |
| swiper.js | 54 | ✅ 使用中 | ✅ 必要 |

---

## ✅ 結果

**すべてのvendorが使用されています。削除推奨のものはありません。**

---

## 📋 使用中のVendor詳細

### fitie.js

- **用途**: IE11 object-fit対応
- **Import数**: 54ファイル
- **検出数**: 57箇所
- **検出パターン**:
  - `fitie`: 54箇所
  - `objectFitImages`: 3箇所

### jquery.cookie.js

- **用途**: Cookie操作
- **Import数**: 54ファイル
- **検出数**: 6箇所
- **検出パターン**:
  - `\$\.cookie\(`: 6箇所

### jquery.fancybox.min.js

- **用途**: モーダル・ライトボックス
- **Import数**: 54ファイル
- **検出数**: 3箇所
- **検出パターン**:
  - `\.fancybox\(`: 3箇所

### jquery.tablesorter.min.js

- **用途**: テーブルソート
- **Import数**: 54ファイル
- **検出数**: 58箇所
- **検出パターン**:
  - `\.tablesorter\(`: 2箇所
  - `tablesorter`: 56箇所

### lazysizes.min.js

- **用途**: 画像遅延読み込み
- **Import数**: 43ファイル
- **検出数**: 45箇所
- **検出パターン**:
  - `class=["\'][^"\']*lazyload`: 2箇所
  - `lazysizes`: 43箇所

### lity.min.js

- **用途**: ライトボックス
- **Import数**: 54ファイル
- **検出数**: 57箇所
- **検出パターン**:
  - `data-lity`: 57箇所

### ofi.min.js

- **用途**: object-fit-images（fitie.jsと同じ）
- **Import数**: 54ファイル
- **検出数**: 3箇所
- **検出パターン**:
  - `objectFitImages`: 3箇所

### picturefill.min.js

- **用途**: picture要素polyfill
- **Import数**: 54ファイル
- **検出数**: 68箇所
- **検出パターン**:
  - `<picture`: 7箇所
  - `srcset=`: 7箇所
  - `picturefill`: 54箇所

### slick.min.js

- **用途**: カルーセル
- **Import数**: 54ファイル
- **検出数**: 28箇所
- **検出パターン**:
  - `\.slick\(`: 27箇所
  - `slick-slider`: 1箇所

### swiper.js

- **用途**: スワイパー
- **Import数**: 54ファイル
- **検出数**: 2箇所
- **検出パターン**:
  - `new Swiper`: 2箇所

---

## 🎯 結論

すべてのvendorが実際に使用されているため、削除できるものはありません。

**次のステップ**: Stimulus化による段階的な置き換えを検討してください。

## 🎯 次のアクション

1. **jQuery依存の調査**: 各ページでjQueryがどの機能で使われているか詳細調査
2. **Stimulus化の優先順位決定**: 使用頻度とビジネス影響度から判断
3. **パイロット実装**: 1ページを選んでStimulus化を試行
4. **段階的移行計画**: カテゴリ別に移行スケジュールを策定


### jquery-3.5.1.min.js

**対象要素**: `*（全要素）`

**用途**:
- クラス追加

**検出例**: 0箇所

---

### jquery.matchHeight-min.js

**対象要素**: `.matchHeight, [data-mh]`

**用途**:
- カード・ボックス要素の高さ統一

**検出例**: 1箇所

```html
<div class="link-box__ttl hidden__sp" data-mh="link-box" style="padding-left: 0;margin-bottom: 0;pad...
```

---

### lazysizes.min.js

**対象要素**: `img.lazyload, [data-src]`

**用途**:
- 画像の遅延読み込み（初期表示高速化）

**検出例**: 2箇所

```html
class="top-about__worries lazyload
class="top-live__info lazyload
```

---

### lity.min.js

**対象要素**: `a[data-lity]`

**用途**:
- 軽量ライトボックス（動画・iframe対応）

**検出例**: 3箇所

```html
data-lity
data-lity
```

---

### picturefill.min.js

**対象要素**: `picture, source`

**用途**:
- レスポンシブ画像のpolyfill（IE11対応）

**検出例**: 2箇所

```html
<picture
<source media="(max-width:768px)" srcset
```

---

