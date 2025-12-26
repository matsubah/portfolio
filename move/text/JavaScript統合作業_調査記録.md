# JavaScript統合作業 - 調査記録

**作成日**: 2025-12-24  
**前提**: CSS統合作業完了（29ページ）

---

## 📊 現状調査

### dcms_media/js ディレクトリ構造

```
app/assets/javascripts/dcms_media/js/
├── jquery-3.5.1.min.js          # jQuery本体
├── jquery.min.self-*.js         # jQuery（別バージョン）
├── jquery.fancybox.min.js       # Fancybox（モーダル）
├── slick/slick.min.js           # Slickスライダー
├── swiper.js                    # Swiperスライダー
├── jquery.tablesorter.min.js   # テーブルソート
├── jquery.matchHeight-min.js   # 高さ揃え
├── jquery.cookie.js             # Cookie操作
├── jquery.rwdImageMaps.min.js  # レスポンシブイメージマップ
├── ofi.min.js                   # Object-fit polyfill
├── picturefill.min.js           # Picture要素 polyfill
├── fitie.js                     # IE対応
├── lazysizes.min.js             # 遅延読み込み
├── lity.min.js                  # Lityモーダル
├── TweenMax.min.self-*.js       # アニメーション
├── smooth-scroll.min.self-*.js # スムーススクロール
├── home_common.js               # サイト共通JS
├── common.js                    # 共通JS
├── common2.js                   # 共通JS2
├── lp_common.js                 # LP共通JS
├── news.js                      # ニュース
├── voices_select.js             # 口コミ選択
├── shop_modal.self-*.js         # 店舗モーダル
├── footer_sp.js                 # SPフッター
├── lp_footer_sp_chumon012.js   # LP固有フッター
├── lp_date_jduge.js             # 日付判定
├── add_url_param.self-*.js      # URLパラメータ追加
├── pc_lp_modal.self-*.js        # PCモーダル
├── page.self-*.js               # ページ固有
├── matchMedia.self-*.js         # メディアクエリ
├── fade.self-*.js               # フェード
├── lity.self-*.js               # Lity
├── tealium_events.self-*.js     # Tealiumイベント
├── pubsub.self-*.js             # Pub/Sub
└── parameters.js                # パラメータ
```

### JS読み込みパターン（CSS統合済み29ページ）

#### 共通パターン（ほぼ全ページ）
```erb
<script src="<%= javascript_path 'dcms_media/js/ofi.min.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/jquery-3.5.1.min.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/jquery.fancybox.min.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/slick/slick.min.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/jquery.tablesorter.min.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/jquery.matchHeight-min.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/jquery.cookie.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/picturefill.min.js' %>" async></script>
<script src="<%= javascript_path 'dcms_media/js/fitie.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/jquery.rwdImageMaps.min.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/swiper.js' %>"></script>
<script src="<%= javascript_path 'dcms_media/js/lity.min.js' %>"></script>
```

#### 使用ページ数
- **55ファイル**でdcms_media/js参照を確認
- **879箇所**のjavascript_path参照

---

## 🎯 CSS統合との類似点・相違点

### 類似点
1. **dcms_mediaディレクトリからの移行**
   - CSS: `app/assets/stylesheets/dcms_media/css/` → `app/assets/stylesheets/common/`
   - JS: `app/assets/javascripts/dcms_media/js/` → `app/assets/javascripts/common/`

2. **共通ファイルの統合**
   - CSS: common.css, vendor.css
   - JS: vendor.js（jQuery, プラグイン）, common.js（サイト共通）

3. **ページ固有ファイルの分離**
   - CSS: pages/, lp/common/
   - JS: pages/, lp/

4. **段階的な移行**
   - CSS: 29ページを順次統合
   - JS: 同様のアプローチ

### 相違点

| 項目 | CSS | JS |
|------|-----|-----|
| **ファイル数** | 少ない（数十ファイル） | 多い（35+ファイル） |
| **依存関係** | 少ない | 強い（jQuery依存、読み込み順序重要） |
| **inline化** | あり（11ページ） | なし |
| **ベンダーライブラリ** | 少ない | 多い（jQuery, Slick, Swiper等） |
| **読み込み方法** | stylesheet_link_tag | javascript_path（script src） |
| **バンドル** | Propshaft | Propshaft |

---

## 📋 統合戦略（CSS統合パターンを踏襲）

### 1. ベンダーライブラリの整理

**vendor.js として統合:**
```javascript
// jQuery本体
jquery-3.5.1.min.js

// jQueryプラグイン
jquery.fancybox.min.js
jquery.tablesorter.min.js
jquery.matchHeight-min.js
jquery.cookie.js
jquery.rwdImageMaps.min.js

// スライダー
slick/slick.min.js
swiper.js

// モーダル
lity.min.js

// Polyfill
ofi.min.js
picturefill.min.js
fitie.js

// その他
lazysizes.min.js
TweenMax.min.self-*.js
smooth-scroll.min.self-*.js
```

### 2. 共通JSの統合

**common.js として統合:**
```javascript
// サイト共通機能
home_common.js
common.js
common2.js

// ユーティリティ
add_url_param.self-*.js
parameters.js
matchMedia.self-*.js
fade.self-*.js
pubsub.self-*.js
tealium_events.self-*.js
```

### 3. ページ固有JSの分離

**pages/ ディレクトリ:**
```
app/assets/javascripts/pages/
├── lp_common.js          # LP共通
├── news.js               # ニュース
├── voices_select.js      # 口コミ
├── shop_modal.js         # 店舗モーダル
├── footer_sp.js          # SPフッター
└── lp/
    ├── lp_date_jduge.js
    ├── lp_footer_sp_chumon012.js
    ├── pc_lp_modal.js
    └── page.js
```

---

## 🔧 統合手順（CSS統合パターンを適用）

### フェーズ1: 準備（調査・計画）

1. **依存関係の調査**
   ```bash
   # jQuery依存の確認
   grep -r "jQuery\|\\$" app/assets/javascripts/dcms_media/js/*.js
   
   # 読み込み順序の確認
   grep -A 20 "javascript_path" app/views/static_contents/pages/*/_index.html.erb
   ```

2. **使用状況の確認**
   ```bash
   # 各JSファイルの使用ページ数
   for js in app/assets/javascripts/dcms_media/js/*.js; do
     echo "$(basename $js): $(grep -r "$(basename $js)" app/views --include="*.erb" | wc -l) pages"
   done
   ```

3. **ファイルサイズの確認**
   ```bash
   du -sh app/assets/javascripts/dcms_media/js/
   ```

### フェーズ2: ベンダーライブラリの統合

1. **vendor.js の作成**
   ```bash
   # ベンダーライブラリを統合
   cat app/assets/javascripts/dcms_media/js/jquery-3.5.1.min.js \
       app/assets/javascripts/dcms_media/js/jquery.fancybox.min.js \
       app/assets/javascripts/dcms_media/js/slick/slick.min.js \
       > app/assets/javascripts/vendor.js
   ```

2. **読み込み順序の確認**
   - jQuery本体 → jQueryプラグイン → その他

3. **テスト**
   - ローカル環境で動作確認
   - コンソールエラーの確認

### フェーズ3: 共通JSの統合

1. **common.js の作成**
   ```bash
   # 共通JSを統合
   cat app/assets/javascripts/dcms_media/js/home_common.js \
       app/assets/javascripts/dcms_media/js/common.js \
       > app/assets/javascripts/common.js
   ```

2. **重複コードの削除**
   - 同じ関数定義がないか確認
   - 競合する変数名がないか確認

### フェーズ4: ビューファイルの更新

1. **パスの変更**
   ```erb
   # 変更前
   <script src="<%= javascript_path 'dcms_media/js/jquery-3.5.1.min.js' %>"></script>
   
   # 変更後
   <%= javascript_include_tag "vendor" %>
   <%= javascript_include_tag "common" %>
   ```

2. **読み込み数の削減**
   - 12-15ファイル → 2-3ファイル（80%削減目標）

### フェーズ5: 検証

1. **動作確認**
   - 全ページでJavaScriptエラーがないか確認
   - スライダー、モーダル等の動作確認
   - イベントハンドラの動作確認

2. **パフォーマンス確認**
   - ファイルサイズの削減
   - 読み込み時間の改善

---

## ⚠️ 注意点（CSSとの違い）

### 1. 読み込み順序が重要
```javascript
// ❌ 間違い: jQueryプラグインがjQuery本体より先
<script src="jquery.fancybox.min.js"></script>
<script src="jquery-3.5.1.min.js"></script>

// ✅ 正しい: jQuery本体が先
<script src="jquery-3.5.1.min.js"></script>
<script src="jquery.fancybox.min.js"></script>
```

### 2. グローバル変数の競合
```javascript
// 複数のファイルで同じ変数名を使っていないか確認
var modalOpen = false;  // common.jsで定義
var modalOpen = true;   // lp_common.jsで再定義 → 競合
```

### 3. DOMContentLoaded のタイミング
```javascript
// 統合後、実行タイミングが変わる可能性
$(document).ready(function() {
  // 初期化処理
});
```

### 4. async/defer 属性
```erb
# 非同期読み込みの扱い
<script src="<%= javascript_path 'picturefill.min.js' %>" async></script>
<script src="<%= javascript_path 'common/scroll.js' %>" defer></script>
```

---

## 📊 期待される効果

### ファイル数削減
- **統合前**: 12-15ファイル/ページ
- **統合後**: 2-3ファイル/ページ
- **削減率**: 80%

### メンテナンス性向上
- dcms_media依存の排除
- 共通コードの一元管理
- 重複コードの削減

### パフォーマンス向上
- HTTPリクエスト数削減
- ファイルサイズ削減（重複排除）
- キャッシュ効率向上

---

## 📝 次のステップ

### 優先度: 高
1. [ ] 依存関係の詳細調査
2. [ ] vendor.js の作成と動作確認
3. [ ] 1ページでのパイロット統合

### 優先度: 中
4. [ ] common.js の作成
5. [ ] 全ページへの展開
6. [ ] dcms_media/js ディレクトリの削除

### 優先度: 低
7. [ ] 未使用JSの削除
8. [ ] コードの最適化

---

## 📚 参考: CSS統合で学んだこと

1. **段階的な移行**: 一度に全てを変更せず、1ページずつ確認
2. **バックアップの重要性**: 旧ファイルはコメントアウトで残す
3. **検証の徹底**: 自動テスト + 手動テスト
4. **ドキュメント化**: 作業記録を残す

---

**作成者メモ**: CSS統合の成功パターンをJSにも適用。ただし、JSは依存関係と読み込み順序に特に注意が必要。
