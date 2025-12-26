# JavaScript統合作業フロー

**作成日**: 2025-12-25  
**前提**: CSS統合作業完了（29ページ、2025-12-24完了）  
**参考**: `/Documents/CSS統合作業記録_整理版.md`

---

## 📊 プロジェクト概要

### 目的
- dcms_media/js依存の排除
- Stimulus化によるモダンなJavaScript実装
- jQuery依存の段階的削除
- メンテナンス性・パフォーマンスの向上

### 対象範囲
- **ページ数**: 55ページ
- **Vendor数**: 12種類
- **共通JSファイル**: 4ファイル（home_common.js, common.js, common2.js, lp_common.js）

---

## 🔍 現状調査結果（2025-12-25完了）

### Vendor使用状況

| Vendor | 使用ページ数 | 使用率 | 削除可否 | 備考 |
|--------|-------------|--------|---------|------|
| fitie.js / ofi.min.js | 23 | 100% | ✅ 可能 | IE11対応、共通JSで自動実行 |
| picturefill.min.js | 6 | 26% | ✅ 可能 | モダンブラウザで不要 |
| jquery.matchHeight-min.js | 23 | 100% | ⚠️ 要検討 | CSS Grid/Flexboxで代替可能、共通JSで自動実行 |
| jquery.cookie.js | 23 | 100% | ⚠️ 要検討 | js-cookieで代替可能 |
| jquery.rwdImageMaps.min.js | 23 | 100% | ⚠️ 要検討 | Stimulus化可能、共通JSで自動実行 |
| swiper.js | 2 | 9% | ⚠️ 要検討 | 使用箇所少ない |
| lity.min.js | 23 | 100% | ❌ 困難 | 使用頻度高、Stimulus化必要 |
| jquery.fancybox.min.js | 23 | 100% | ❌ 困難 | 使用頻度高、Stimulus化必要 |
| slick.min.js | 23 | 100% | ❌ 困難 | 使用頻度高（27箇所） |
| jquery.tablesorter.min.js | 23 | 100% | ❌ 困難 | Stimulus化必要 |
| lazysizes.min.js | 1 | 4% | ⚠️ 要検討 | loading="lazy"で代替可能 |
| jquery-3.5.1.min.js | 23 | 100% | ❌ 最後 | 全vendorのStimulus化後に削除 |

### 主な発見
- **共通JSで自動実行されるvendor**: fitie.js, jquery.matchHeight, jquery.rwdImageMaps
- **最も使用頻度が高いvendor**: lity.min.js（93%）、slick.min.js（27箇所）
- **削除可能なvendor**: fitie.js, ofi.min.js, picturefill.min.js（IE11サポート終了後）

---

## 🎯 Stimulus化の優先順位

### フェーズ1: IE11対応polyfillの削除（工数: 0.5日）

| Vendor | 理由 | 実装難易度 | 影響範囲 |
|--------|------|-----------|---------|
| fitie.js / ofi.min.js | IE11サポート終了により不要 | ★☆☆ 簡単 | 23ページ |
| picturefill.min.js | モダンブラウザで不要 | ★☆☆ 簡単 | 6ページ |

**作業内容**:
- 共通JSファイルから`objectFitImages()`呼び出しを削除
- HTMLから`<script>`タグを削除
- 表示確認（IE11以外のブラウザで問題ないことを確認）

### フェーズ2: 使用頻度が低いvendorのStimulus化（工数: 2-3日）

| Vendor | 使用箇所 | 実装難易度 | 代替方法 |
|--------|---------|-----------|---------|
| swiper.js | 2箇所 | ★★☆ 中程度 | Stimulus controller化 |
| lazysizes.min.js | 1箇所 | ★☆☆ 簡単 | `loading="lazy"`属性 |
| jquery.cookie.js | 6箇所 | ★☆☆ 簡単 | js-cookieライブラリ |

**作業内容**:
- Stimulus controllerの作成
- HTML要素への`data-controller`属性追加
- 旧vendorの削除
- 表示・動作確認

### フェーズ3: jQuery依存の段階的削除（工数: 3-5日）

| Vendor | 使用箇所 | 実装難易度 | 代替方法 |
|--------|---------|-----------|---------|
| jquery.matchHeight-min.js | 23ページ | ★★☆ 中程度 | CSS Grid/Flexbox または Stimulus |
| jquery.rwdImageMaps.min.js | 23ページ | ★★☆ 中程度 | Stimulus controller化 |
| jquery.tablesorter.min.js | 23ページ | ★★☆ 中程度 | Stimulus controller化 |

**作業内容**:
- CSS Grid/Flexboxでの高さ揃え実装（matchHeight）
- Stimulus controllerの作成（rwdImageMaps, tablesorter）
- jQuery依存コードのVanilla JS書き換え
- 表示・動作確認

### フェーズ4: 使用頻度が高いvendorのStimulus化（工数: 5-7日）

| Vendor | 使用箇所 | 実装難易度 | 代替方法 |
|--------|---------|-----------|---------|
| lity.min.js | 23ページ（57箇所） | ★★★ 複雑 | Stimulus controller化 |
| jquery.fancybox.min.js | 23ページ（3箇所） | ★★★ 複雑 | Stimulus controller化 |
| slick.min.js | 23ページ（27箇所） | ★★★ 複雑 | Stimulus controller化 |

**作業内容**:
- 複雑なStimulus controllerの作成
- 既存の動作を完全に再現
- 全ページでの動作確認
- パフォーマンス検証

### フェーズ5: jQuery本体の削除（工数: 2-3日）

**前提条件**: 全vendorのStimulus化完了

**作業内容**:
- 共通JSファイル内のjQuery依存コードをVanilla JSに書き換え
- `jquery-3.5.1.min.js`の削除
- 全ページでの動作確認
- パフォーマンス測定

---

## 📅 スケジュール（工数見積もり）

### 全体工数: 13-19日

| フェーズ | 工数 | 期間（週） |
|---------|------|-----------|
| フェーズ1: IE11対応polyfill削除 | 0.5日 | 0.1週 |
| フェーズ2: 使用頻度が低いvendor | 2-3日 | 0.5週 |
| フェーズ3: jQuery依存の段階的削除 | 3-5日 | 1週 |
| フェーズ4: 使用頻度が高いvendor | 5-7日 | 1.5週 |
| フェーズ5: jQuery本体の削除 | 2-3日 | 0.5週 |
| **合計** | **13-19日** | **3-4週** |

### マイルストーン

- **Week 1**: フェーズ1-2完了（IE11対応polyfill削除 + 使用頻度が低いvendor）
- **Week 2**: フェーズ3完了（jQuery依存の段階的削除）
- **Week 3-4**: フェーズ4完了（使用頻度が高いvendor）
- **Week 4**: フェーズ5完了（jQuery本体の削除）

---

## 🎓 Stimulus化実装パターン

### パターン1: 単純なイベントハンドラ（lazysizes → loading="lazy"）

**Before**:
```html
<img class="lazyload" data-src="/path/to/image.jpg">
<script src="/dcms_media/js/lazysizes.min.js"></script>
```

**After**:
```html
<img src="/path/to/image.jpg" loading="lazy">
```

**工数**: 0.5日（全ページ検索・置換）

### パターン2: Cookie操作（jquery.cookie → js-cookie）

**Before**:
```javascript
$.cookie('key', 'value', { expires: 7 });
var value = $.cookie('key');
```

**After**:
```javascript
import Cookies from 'js-cookie';
Cookies.set('key', 'value', { expires: 7 });
var value = Cookies.get('key');
```

**工数**: 1日（6箇所の書き換え + テスト）

### パターン3: 高さ揃え（jquery.matchHeight → CSS Grid/Flexbox）

**Before**:
```javascript
$('.card').matchHeight();
```

**After（CSS）**:
```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
}
```

**工数**: 2-3日（全ページのレイアウト確認 + CSS調整）

### パターン4: モーダル・ライトボックス（lity → Stimulus controller）

**Before**:
```html
<a href="/path/to/image.jpg" data-lity>画像を見る</a>
<script src="/dcms_media/js/lity.min.js"></script>
```

**After**:
```html
<a href="/path/to/image.jpg"
   data-controller="lightbox"
   data-action="click->lightbox#open">画像を見る</a>
```

**Stimulus Controller**:
```javascript
// app/javascript/controllers/lightbox_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  open(event) {
    event.preventDefault()
    const url = event.currentTarget.href
    // モーダル表示ロジック
  }
}
```

**工数**: 3-5日（controller作成 + 57箇所の動作確認）

### パターン5: カルーセル（slick → Stimulus controller）

**Before**:
```javascript
$('.slider').slick({
  dots: true,
  infinite: true,
  speed: 300
});
```

**After**:
```html
<div data-controller="carousel"
     data-carousel-dots-value="true"
     data-carousel-infinite-value="true">
  <!-- スライド要素 -->
</div>
```

**Stimulus Controller**:
```javascript
// app/javascript/controllers/carousel_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    dots: Boolean,
    infinite: Boolean
  }

  connect() {
    // カルーセル初期化ロジック
  }
}
```

**工数**: 3-5日（controller作成 + 27箇所の動作確認）

---

## 📋 作業フロー（詳細）

### ステップ1: パイロット実装（1ページで試行）

**目的**: 実装パターンの確立、工数の精緻化

**対象ページ**: 使用vendorが少ないページ（例: webinar）

**作業内容**:
1. IE11対応polyfillの削除
2. lity.min.jsのStimulus化
3. 表示・動作確認
4. 実装パターンのドキュメント化

**工数**: 1-2日

### ステップ2: フェーズ1実装（IE11対応polyfill削除）

**対象**: fitie.js, ofi.min.js, picturefill.min.js

**作業手順**:
1. 共通JSファイルから`objectFitImages()`削除
2. HTMLから`<script>`タグ削除
3. 表示確認（全ページ）
4. コミット

**チェックリスト**:
- [ ] home_common.jsから`objectFitImages()`削除
- [ ] common2.jsから`objectFitImages()`削除
- [ ] 全HTMLファイルから`<script src="fitie.js">`削除
- [ ] 全HTMLファイルから`<script src="picturefill.min.js">`削除
- [ ] 表示確認（Chrome, Firefox, Safari）
- [ ] コミット・プッシュ

### ステップ3: フェーズ2実装（使用頻度が低いvendor）

**対象**: swiper.js, lazysizes.min.js, jquery.cookie.js

**作業手順（swiper.js）**:
1. Stimulus controller作成（`carousel_controller.js`）
2. 使用箇所（2箇所）のHTML修正
3. 動作確認
4. `swiper.js`削除
5. コミット

**作業手順（lazysizes.min.js）**:
1. `<img class="lazyload" data-src="...">`を検索
2. `<img src="..." loading="lazy">`に置換
3. `lazysizes.min.js`削除
4. 表示確認
5. コミット

**作業手順（jquery.cookie.js）**:
1. `js-cookie`ライブラリをインストール
2. `$.cookie()`を`Cookies.get/set()`に置換（6箇所）
3. 動作確認
4. `jquery.cookie.js`削除
5. コミット

### ステップ4: フェーズ3実装（jQuery依存の段階的削除）

**対象**: jquery.matchHeight, jquery.rwdImageMaps, jquery.tablesorter

**作業手順（jquery.matchHeight）**:
1. CSS Grid/Flexboxでの実装を検討
2. 各ページのレイアウトを確認
3. CSS修正
4. 共通JSから`.matchHeight()`削除
5. 表示確認（全ページ）
6. `jquery.matchHeight-min.js`削除
7. コミット

**作業手順（jquery.rwdImageMaps）**:
1. Stimulus controller作成（`responsive_image_map_controller.js`）
2. `<map>`要素に`data-controller`追加
3. 共通JSから`.rwdImageMaps()`削除
4. 動作確認
5. `jquery.rwdImageMaps.min.js`削除
6. コミット

**作業手順（jquery.tablesorter）**:
1. Stimulus controller作成（`table_sorter_controller.js`）
2. `<table>`要素に`data-controller`追加
3. 動作確認
4. `jquery.tablesorter.min.js`削除
5. コミット

### ステップ5: フェーズ4実装（使用頻度が高いvendor）

**対象**: lity.min.js, jquery.fancybox, slick.min.js

**作業手順（lity.min.js）**:
1. Stimulus controller作成（`lightbox_controller.js`）
2. 使用箇所（57箇所）のHTML修正
3. 動作確認（全ページ）
4. `lity.min.js`削除
5. コミット

**作業手順（jquery.fancybox）**:
1. `lightbox_controller.js`に統合
2. 使用箇所（3箇所）のHTML修正
3. 動作確認
4. `jquery.fancybox.min.js`削除
5. コミット

**作業手順（slick.min.js）**:
1. Stimulus controller作成（`carousel_controller.js`に統合）
2. 使用箇所（27箇所）のHTML修正
3. 動作確認（全ページ）
4. `slick.min.js`削除
5. コミット

### ステップ6: フェーズ5実装（jQuery本体の削除）

**前提条件**: 全vendorのStimulus化完了

**作業手順**:
1. 共通JSファイル内のjQuery依存コードを検索
2. Vanilla JSに書き換え
3. 動作確認（全ページ）
4. `jquery-3.5.1.min.js`削除
5. パフォーマンス測定
6. コミット

**jQuery → Vanilla JS書き換えパターン**:
```javascript
// Before
$('.element').addClass('active');
$('.element').on('click', function() { ... });

// After
document.querySelector('.element').classList.add('active');
document.querySelector('.element').addEventListener('click', (e) => { ... });
```

---

## 🔧 重要な注意点

### 1. 共通JSファイルでの自動実行

以下のvendorは共通JSファイル内で自動実行されるため、HTML内に直接的な記述がない場合がある：

- `fitie.js` / `ofi.min.js`: `objectFitImages()`
- `jquery.matchHeight-min.js`: `$('.matchHeight').matchHeight()`
- `jquery.rwdImageMaps.min.js`: `$('img[usemap]').rwdImageMaps()`

**対応**: 共通JSファイルを必ず確認し、自動実行コードを削除する。

### 2. CSS統合との違い

| 項目 | CSS統合 | JavaScript統合 |
|------|---------|---------------|
| 読み込み順序 | 重要（後勝ち） | 超重要（依存関係あり） |
| グローバル変数 | なし | あり（競合リスク） |
| 動作確認 | 表示のみ | 表示 + インタラクション |
| ロールバック | 容易 | やや困難 |

### 3. Stimulus化のメリット

- **モダンな実装**: ES6+、モジュール化
- **保守性向上**: コントローラー単位で管理
- **テスト容易**: 単体テストが書きやすい
- **パフォーマンス**: 必要な機能のみ読み込み

### 4. jQuery削除のリスク

- **既存コードへの影響**: 共通JSファイル内のjQuery依存コードが多数存在
- **サードパーティライブラリ**: jQuery依存のライブラリが他にもある可能性
- **段階的な削除が必須**: 一度に削除すると影響範囲が大きすぎる

---

## 📚 参考ドキュメント

- `/Documents/Vendor系JS使用状況調査.md` - Vendor詳細調査
- `/Documents/CSS統合作業記録_整理版.md` - CSS統合パターン
- `/Documents/JavaScript統合作業記録.md` - 作業記録
- [Stimulus Handbook](https://stimulus.hotwired.dev/) - 公式ドキュメント
- [You Might Not Need jQuery](https://youmightnotneedjquery.com/) - jQuery → Vanilla JS変換

---

**次のステップ**: パイロット実装（1ページで試行）

## 💡 Stimulus実装パターン詳細

### 1. Lightbox Controller（lity.min.js / jquery.fancybox代替）

**実装難易度**: ★★★ 複雑  
**工数**: 3-5日  
**影響範囲**: 23ページ（60箇所）

#### 機能要件
- 画像・動画・iframeのモーダル表示
- キーボード操作（ESC: 閉じる、矢印: 前後移動）
- スワイプ操作（SP）
- 背景クリックで閉じる
- アニメーション

#### 実装例

**HTML**:
```html
<!-- Before -->
<a href="/path/to/image.jpg" data-lity>画像を見る</a>
<a href="https://youtube.com/watch?v=xxx" data-fancybox>動画を見る</a>

<!-- After -->
<a href="/path/to/image.jpg"
   data-controller="lightbox"
   data-action="click->lightbox#open"
   data-lightbox-type-value="image">画像を見る</a>

<a href="https://youtube.com/watch?v=xxx"
   data-controller="lightbox"
   data-action="click->lightbox#open"
   data-lightbox-type-value="video">動画を見る</a>
```

**Stimulus Controller**:
```javascript
// app/javascript/controllers/lightbox_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    type: String // "image", "video", "iframe"
  }

  connect() {
    this.boundClose = this.close.bind(this)
  }

  open(event) {
    event.preventDefault()
    const url = event.currentTarget.href

    // モーダル要素を作成
    this.modal = this.createModal(url, this.typeValue)
    document.body.appendChild(this.modal)

    // イベントリスナー追加
    this.modal.addEventListener('click', this.boundClose)
    document.addEventListener('keydown', this.handleKeydown.bind(this))

    // アニメーション
    requestAnimationFrame(() => {
      this.modal.classList.add('active')
    })
  }

  close(event) {
    if (event.target === this.modal || event.target.classList.contains('close-btn')) {
      this.modal.classList.remove('active')
      setTimeout(() => {
        this.modal.remove()
        document.removeEventListener('keydown', this.handleKeydown)
      }, 300)
    }
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.close({ target: this.modal })
    }
  }

  createModal(url, type) {
    const modal = document.createElement('div')
    modal.className = 'lightbox-modal'

    let content = ''
    if (type === 'image') {
      content = `<img src="${url}" alt="">`
    } else if (type === 'video') {
      const videoId = this.extractVideoId(url)
      content = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`
    }

    modal.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        ${content}
        <button class="close-btn">×</button>
      </div>
    `

    return modal
  }

  extractVideoId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match ? match[1] : ''
  }
}
```

**CSS**:
```css
/* app/assets/stylesheets/components/lightbox.css */
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s;
}

.lightbox-modal.active {
  opacity: 1;
}

.lightbox-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  margin: 5% auto;
  z-index: 1;
}

.lightbox-content img,
.lightbox-content iframe {
  max-width: 100%;
  max-height: 80vh;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
}
```

#### テストケース
- [ ] 画像モーダルが開く
- [ ] 動画モーダルが開く
- [ ] ESCキーで閉じる
- [ ] 背景クリックで閉じる
- [ ] 閉じるボタンで閉じる
- [ ] アニメーションが動作する
- [ ] SP版でスワイプ操作が動作する

---

### 2. Carousel Controller（slick.min.js / swiper.js代替）

**実装難易度**: ★★★ 複雑  
**工数**: 3-5日  
**影響範囲**: 23ページ（29箇所）

#### 機能要件
- 自動再生
- ドット・矢印ナビゲーション
- レスポンシブ対応
- スワイプ操作
- 無限ループ

#### 実装例

**HTML**:
```html
<!-- Before -->
<div class="slider">
  <div><img src="slide1.jpg"></div>
  <div><img src="slide2.jpg"></div>
  <div><img src="slide3.jpg"></div>
</div>
<script>
  $('.slider').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000
  });
</script>

<!-- After -->
<div data-controller="carousel"
     data-carousel-dots-value="true"
     data-carousel-infinite-value="true"
     data-carousel-autoplay-value="true"
     data-carousel-autoplay-speed-value="3000">
  <div class="carousel-track">
    <div class="carousel-slide"><img src="slide1.jpg"></div>
    <div class="carousel-slide"><img src="slide2.jpg"></div>
    <div class="carousel-slide"><img src="slide3.jpg"></div>
  </div>
  <button data-action="click->carousel#prev" class="carousel-prev">‹</button>
  <button data-action="click->carousel#next" class="carousel-next">›</button>
  <div data-carousel-target="dots" class="carousel-dots"></div>
</div>
```

**Stimulus Controller**:
```javascript
// app/javascript/controllers/carousel_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dots"]
  static values = {
    dots: Boolean,
    infinite: Boolean,
    autoplay: Boolean,
    autoplaySpeed: { type: Number, default: 3000 }
  }

  connect() {
    this.currentIndex = 0
    this.slides = this.element.querySelectorAll('.carousel-slide')
    this.totalSlides = this.slides.length

    if (this.dotsValue) {
      this.createDots()
    }

    if (this.autoplayValue) {
      this.startAutoplay()
    }

    this.showSlide(0)
  }

  disconnect() {
    this.stopAutoplay()
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides
    this.showSlide(this.currentIndex)
    this.resetAutoplay()
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides
    this.showSlide(this.currentIndex)
    this.resetAutoplay()
  }

  goToSlide(index) {
    this.currentIndex = index
    this.showSlide(index)
    this.resetAutoplay()
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none'
    })

    if (this.dotsValue) {
      this.updateDots(index)
    }
  }

  createDots() {
    const dotsContainer = this.dotsTarget
    dotsContainer.innerHTML = ''

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button')
      dot.className = 'carousel-dot'
      dot.dataset.action = 'click->carousel#goToSlide'
      dot.dataset.index = i
      dot.addEventListener('click', () => this.goToSlide(i))
      dotsContainer.appendChild(dot)
    }
  }

  updateDots(activeIndex) {
    const dots = this.dotsTarget.querySelectorAll('.carousel-dot')
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex)
    })
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next()
    }, this.autoplaySpeedValue)
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
    }
  }

  resetAutoplay() {
    if (this.autoplayValue) {
      this.stopAutoplay()
      this.startAutoplay()
    }
  }
}
```

**CSS**:
```css
/* app/assets/stylesheets/components/carousel.css */
[data-controller="carousel"] {
  position: relative;
  overflow: hidden;
}

.carousel-track {
  position: relative;
}

.carousel-slide {
  display: none;
}

.carousel-slide.active {
  display: block;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 10;
}

.carousel-prev {
  left: 10px;
}

.carousel-next {
  right: 10px;
}

.carousel-dots {
  text-align: center;
  padding: 10px 0;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  border: none;
  margin: 0 5px;
  cursor: pointer;
}

.carousel-dot.active {
  background: #333;
}
```

#### テストケース
- [ ] スライドが切り替わる
- [ ] 矢印ボタンで前後移動
- [ ] ドットで任意のスライドに移動
- [ ] 自動再生が動作する
- [ ] 無限ループが動作する
- [ ] SP版でスワイプ操作が動作する

---

### 3. Responsive Image Map Controller（jquery.rwdImageMaps代替）

**実装難易度**: ★★☆ 中程度  
**工数**: 1-2日  
**影響範囲**: 23ページ

#### 機能要件
- 画像サイズに応じてクリッカブルエリアを調整
- ウィンドウリサイズ対応

#### 実装例

**HTML**:
```html
<!-- Before -->
<img src="map.jpg" usemap="#image-map">
<map name="image-map">
  <area shape="rect" coords="100,100,200,200" href="/link1">
  <area shape="rect" coords="300,100,400,200" href="/link2">
</map>
<script>
  $('img[usemap]').rwdImageMaps();
</script>

<!-- After -->
<img src="map.jpg" usemap="#image-map"
     data-controller="responsive-image-map"
     data-responsive-image-map-original-width-value="800"
     data-responsive-image-map-original-height-value="600">
<map name="image-map">
  <area shape="rect" coords="100,100,200,200" href="/link1">
  <area shape="rect" coords="300,100,400,200" href="/link2">
</map>
```

**Stimulus Controller**:
```javascript
// app/javascript/controllers/responsive_image_map_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    originalWidth: Number,
    originalHeight: Number
  }

  connect() {
    this.map = document.querySelector(`map[name="${this.element.useMap.slice(1)}"]`)
    this.areas = this.map.querySelectorAll('area')

    // 元の座標を保存
    this.originalCoords = Array.from(this.areas).map(area =>
      area.coords.split(',').map(Number)
    )

    // 初期調整
    this.resize()

    // リサイズイベント
    this.boundResize = this.resize.bind(this)
    window.addEventListener('resize', this.boundResize)
  }

  disconnect() {
    window.removeEventListener('resize', this.boundResize)
  }

  resize() {
    const currentWidth = this.element.offsetWidth
    const currentHeight = this.element.offsetHeight

    const widthRatio = currentWidth / this.originalWidthValue
    const heightRatio = currentHeight / this.originalHeightValue

    this.areas.forEach((area, index) => {
      const coords = this.originalCoords[index]
      const newCoords = coords.map((coord, i) => {
        return i % 2 === 0
          ? Math.round(coord * widthRatio)  // x座標
          : Math.round(coord * heightRatio) // y座標
      })
      area.coords = newCoords.join(',')
    })
  }
}
```

#### テストケース
- [ ] 画像サイズ変更時にクリッカブルエリアが調整される
- [ ] ウィンドウリサイズ時に正しく動作する
- [ ] PC版・SP版両方で正しく動作する

---

### 4. Table Sorter Controller（jquery.tablesorter代替）

**実装難易度**: ★★☆ 中程度  
**工数**: 1-2日  
**影響範囲**: 23ページ

#### 機能要件
- テーブルのソート機能
- 昇順・降順の切り替え
- 数値・文字列の自動判定

#### 実装例

**HTML**:
```html
<!-- Before -->
<table class="tablesorter">
  <thead>
    <tr>
      <th>名前</th>
      <th>年齢</th>
      <th>都道府県</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>田中</td><td>30</td><td>東京</td></tr>
    <tr><td>佐藤</td><td>25</td><td>大阪</td></tr>
  </tbody>
</table>
<script>
  $('.tablesorter').tablesorter();
</script>

<!-- After -->
<table data-controller="table-sorter">
  <thead>
    <tr>
      <th data-action="click->table-sorter#sort" data-column="0">名前</th>
      <th data-action="click->table-sorter#sort" data-column="1">年齢</th>
      <th data-action="click->table-sorter#sort" data-column="2">都道府県</th>
    </tr>
  </thead>
  <tbody data-table-sorter-target="tbody">
    <tr><td>田中</td><td>30</td><td>東京</td></tr>
    <tr><td>佐藤</td><td>25</td><td>大阪</td></tr>
  </tbody>
</table>
```

**Stimulus Controller**:
```javascript
// app/javascript/controllers/table_sorter_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tbody"]

  connect() {
    this.sortOrder = {} // { columnIndex: 'asc' | 'desc' }
  }

  sort(event) {
    const th = event.currentTarget
    const columnIndex = parseInt(th.dataset.column)

    // ソート順序を切り替え
    const currentOrder = this.sortOrder[columnIndex] || 'asc'
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc'
    this.sortOrder[columnIndex] = newOrder

    // 行を取得
    const rows = Array.from(this.tbodyTarget.querySelectorAll('tr'))

    // ソート
    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent.trim()
      const bValue = b.cells[columnIndex].textContent.trim()

      // 数値判定
      const aNum = parseFloat(aValue)
      const bNum = parseFloat(bValue)

      let comparison = 0
      if (!isNaN(aNum) && !isNaN(bNum)) {
        comparison = aNum - bNum
      } else {
        comparison = aValue.localeCompare(bValue, 'ja')
      }

      return newOrder === 'asc' ? comparison : -comparison
    })

    // テーブルを更新
    rows.forEach(row => this.tbodyTarget.appendChild(row))

    // ソートインジケーターを更新
    this.updateSortIndicator(th, newOrder)
  }

  updateSortIndicator(th, order) {
    // 全てのthからインジケーターを削除
    this.element.querySelectorAll('th').forEach(header => {
      header.classList.remove('sort-asc', 'sort-desc')
    })

    // 現在のthにインジケーターを追加
    th.classList.add(`sort-${order}`)
  }
}
```

**CSS**:
```css
/* app/assets/stylesheets/components/table_sorter.css */
[data-controller="table-sorter"] th {
  cursor: pointer;
  user-select: none;
}

[data-controller="table-sorter"] th:hover {
  background: #f0f0f0;
}

[data-controller="table-sorter"] th.sort-asc::after {
  content: " ▲";
}

[data-controller="table-sorter"] th.sort-desc::after {
  content: " ▼";
}
```

#### テストケース
- [ ] ヘッダークリックでソートされる
- [ ] 昇順・降順が切り替わる
- [ ] 数値が正しくソートされる
- [ ] 文字列が正しくソートされる（日本語対応）

---

## 📋 チェックリスト

### フェーズ1: IE11対応polyfill削除

**作業前**:
- [ ] 対象ファイルのバックアップ
- [ ] ブランチ作成（`feature/remove-ie11-polyfills`）

**作業中**:
- [ ] home_common.jsから`objectFitImages()`削除
- [ ] common2.jsから`objectFitImages()`削除
- [ ] 全HTMLファイルから`<script src="fitie.js">`削除
- [ ] 全HTMLファイルから`<script src="ofi.min.js">`削除
- [ ] 全HTMLファイルから`<script src="picturefill.min.js">`削除

**作業後**:
- [ ] 表示確認（Chrome, Firefox, Safari）
- [ ] 表示確認（PC版・SP版）
- [ ] コミット・プッシュ
- [ ] プルリクエスト作成

### フェーズ2: 使用頻度が低いvendor

**swiper.js**:
- [ ] Stimulus controller作成（`carousel_controller.js`）
- [ ] 使用箇所（2箇所）のHTML修正
- [ ] 動作確認
- [ ] `swiper.js`削除
- [ ] コミット

**lazysizes.min.js**:
- [ ] `<img class="lazyload" data-src="...">`を検索
- [ ] `<img src="..." loading="lazy">`に置換
- [ ] `lazysizes.min.js`削除
- [ ] 表示確認
- [ ] コミット

**jquery.cookie.js**:
- [ ] `js-cookie`ライブラリをインストール
- [ ] `$.cookie()`を`Cookies.get/set()`に置換（6箇所）
- [ ] 動作確認
- [ ] `jquery.cookie.js`削除
- [ ] コミット

### フェーズ3: jQuery依存の段階的削除

**jquery.matchHeight**:
- [ ] CSS Grid/Flexboxでの実装を検討
- [ ] 各ページのレイアウトを確認
- [ ] CSS修正
- [ ] 共通JSから`.matchHeight()`削除
- [ ] 表示確認（全ページ）
- [ ] `jquery.matchHeight-min.js`削除
- [ ] コミット

**jquery.rwdImageMaps**:
- [ ] Stimulus controller作成（`responsive_image_map_controller.js`）
- [ ] `<map>`要素に`data-controller`追加
- [ ] 共通JSから`.rwdImageMaps()`削除
- [ ] 動作確認
- [ ] `jquery.rwdImageMaps.min.js`削除
- [ ] コミット

**jquery.tablesorter**:
- [ ] Stimulus controller作成（`table_sorter_controller.js`）
- [ ] `<table>`要素に`data-controller`追加
- [ ] 動作確認
- [ ] `jquery.tablesorter.min.js`削除
- [ ] コミット

### フェーズ4: 使用頻度が高いvendor

**lity.min.js**:
- [ ] Stimulus controller作成（`lightbox_controller.js`）
- [ ] 使用箇所（57箇所）のHTML修正
- [ ] 動作確認（全ページ）
- [ ] `lity.min.js`削除
- [ ] コミット

**jquery.fancybox**:
- [ ] `lightbox_controller.js`に統合
- [ ] 使用箇所（3箇所）のHTML修正
- [ ] 動作確認
- [ ] `jquery.fancybox.min.js`削除
- [ ] コミット

**slick.min.js**:
- [ ] Stimulus controller作成（`carousel_controller.js`に統合）
- [ ] 使用箇所（27箇所）のHTML修正
- [ ] 動作確認（全ページ）
- [ ] `slick.min.js`削除
- [ ] コミット

### フェーズ5: jQuery本体の削除

**作業前**:
- [ ] 全vendorのStimulus化完了を確認
- [ ] ブランチ作成（`feature/remove-jquery`）

**作業中**:
- [ ] 共通JSファイル内のjQuery依存コードを検索
- [ ] Vanilla JSに書き換え
- [ ] 動作確認（全ページ）
- [ ] `jquery-3.5.1.min.js`削除

**作業後**:
- [ ] パフォーマンス測定（Before/After）
- [ ] 全ページでの動作確認
- [ ] コミット・プッシュ
- [ ] プルリクエスト作成

---

## 📊 期待される効果

### パフォーマンス

| 項目 | Before | After | 改善率 |
|------|--------|-------|--------|
| JSファイル数 | 12-15ファイル/ページ | 2-3ファイル/ページ | 80%削減 |
| JSファイルサイズ | 約300KB | 約100KB | 67%削減 |
| 初回読み込み時間 | 約2秒 | 約1秒 | 50%短縮 |

### メンテナンス性

- **モジュール化**: Stimulus controllerで機能ごとに分離
- **テスト容易**: 単体テストが書きやすい
- **可読性向上**: ES6+のモダンな構文
- **依存関係の明確化**: importで依存関係が明確

### 開発体験

- **ホットリロード**: 開発時の変更が即座に反映
- **TypeScript対応**: 型安全な開発が可能
- **デバッグ容易**: ブラウザ開発者ツールでのデバッグが容易

---

**次のステップ**: パイロット実装（1ページで試行）を開始してください。
