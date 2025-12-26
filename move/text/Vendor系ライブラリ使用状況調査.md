# Vendor系ライブラリ使用状況調査
**調査日**: 2025-12-25
**プロジェクト**: madoguchi-web

## 📊 調査サマリー

### Vendor系ライブラリ一覧

| ライブラリ | 用途 | 対象要素 |
|-----------|------|----------|
| fitie.js | IE11でobject-fit CSSプロパティのpolyfill | img, video |
| ofi.min.js | object-fit-imagesライブラリ（IE11対応） | img |
| jquery-3.5.1.min.js | jQueryコアライブラリ | * |
| jquery.fancybox.min.js | モーダル・ライトボックス表示 | a[data-fancybox], .fancybox |
| jquery.matchHeight-min.js | 要素の高さを揃える | .matchHeight, [data-mh] |
| jquery.cookie.js | Cookie操作 | * |
| jquery.rwdImageMaps.min.js | レスポンシブ対応のイメージマップ | map, area |
| slick.min.js | カルーセル・スライダー | .slick-slider, [data-slick] |
| swiper.js | スワイパー・スライダー | .swiper-container, .swiper |
| lity.min.js | ライトボックス | [data-lity] |
| picturefill.min.js | picture要素のpolyfill（レスポンシブ画像） | picture, source |
| lazysizes.min.js | 画像の遅延読み込み | img.lazyload, [data-src] |

---

## 📄 app/views/static_contents/pages/_index.html.erb

### fitie.js

**用途**: IE11でobject-fit CSSプロパティのpolyfill

**対象要素**: `img`, `video`

**検出パターン**:
- `fitie`

### jquery-3.5.1.min.js

**用途**: jQueryコアライブラリ

**対象要素**: `*`

**検出パターン**:
- `$(`

### jquery.fancybox.min.js

**用途**: モーダル・ライトボックス表示

**対象要素**: `a[data-fancybox]`, `.fancybox`

**検出パターン**:
- `fancybox`

### jquery.matchHeight-min.js

**用途**: 要素の高さを揃える

**対象要素**: `.matchHeight`, `[data-mh]`

**検出パターン**:
- `matchHeight`
- `data-mh`

### jquery.rwdImageMaps.min.js

**用途**: レスポンシブ対応のイメージマップ

**対象要素**: `map`, `area`

**検出パターン**:
- `rwdImageMaps`

### lity.min.js

**用途**: ライトボックス

**対象要素**: `[data-lity]`

**検出パターン**:
- `lity`
- `data-lity`

### picturefill.min.js

**用途**: picture要素のpolyfill（レスポンシブ画像）

**対象要素**: `picture`, `source`

**検出パターン**:
- `picturefill`
- `<picture`
- `<source`

### lazysizes.min.js

**用途**: 画像の遅延読み込み

**対象要素**: `img.lazyload`, `[data-src]`

**検出パターン**:
- `lazyload`
- `lazysizes`

---

## 📄 app/views/static_contents/pages/online/_index.html.erb

### fitie.js

**用途**: IE11でobject-fit CSSプロパティのpolyfill

**対象要素**: `img`, `video`

**検出パターン**:
- `fitie`

### jquery-3.5.1.min.js

**用途**: jQueryコアライブラリ

**対象要素**: `*`

**検出パターン**:
- `$(`

### jquery.fancybox.min.js

**用途**: モーダル・ライトボックス表示

**対象要素**: `a[data-fancybox]`, `.fancybox`

**検出パターン**:
- `fancybox`

### jquery.matchHeight-min.js

**用途**: 要素の高さを揃える

**対象要素**: `.matchHeight`, `[data-mh]`

**検出パターン**:
- `matchHeight`

### jquery.rwdImageMaps.min.js

**用途**: レスポンシブ対応のイメージマップ

**対象要素**: `map`, `area`

**検出パターン**:
- `rwdImageMaps`

### lity.min.js

**用途**: ライトボックス

**対象要素**: `[data-lity]`

**検出パターン**:
- `lity`

### picturefill.min.js

**用途**: picture要素のpolyfill（レスポンシブ画像）

**対象要素**: `picture`, `source`

**検出パターン**:
- `picturefill`

### lazysizes.min.js

**用途**: 画像の遅延読み込み

**対象要素**: `img.lazyload`, `[data-src]`

**検出パターン**:
- `lazysizes`

---

## 📄 app/views/static_contents/pages/chumon/_index.html.erb

### fitie.js

**用途**: IE11でobject-fit CSSプロパティのpolyfill

**対象要素**: `img`, `video`

**検出パターン**:
- `fitie`

### jquery-3.5.1.min.js

**用途**: jQueryコアライブラリ

**対象要素**: `*`

**検出パターン**:
- `$(`

### jquery.fancybox.min.js

**用途**: モーダル・ライトボックス表示

**対象要素**: `a[data-fancybox]`, `.fancybox`

**検出パターン**:
- `fancybox`

### jquery.matchHeight-min.js

**用途**: 要素の高さを揃える

**対象要素**: `.matchHeight`, `[data-mh]`

**検出パターン**:
- `matchHeight`
- `data-mh`

### jquery.rwdImageMaps.min.js

**用途**: レスポンシブ対応のイメージマップ

**対象要素**: `map`, `area`

**検出パターン**:
- `rwdImageMaps`

### lity.min.js

**用途**: ライトボックス

**対象要素**: `[data-lity]`

**検出パターン**:
- `lity`
- `data-lity`

### picturefill.min.js

**用途**: picture要素のpolyfill（レスポンシブ画像）

**対象要素**: `picture`, `source`

**検出パターン**:
- `picturefill`

### lazysizes.min.js

**用途**: 画像の遅延読み込み

**対象要素**: `img.lazyload`, `[data-src]`

**検出パターン**:
- `lazysizes`

---

