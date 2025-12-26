# CSS統合作業記録（整理版）

**最終更新: 2025-12-19**

## 📊 進捗サマリー

### ✅ 作業完了: 29ページ（2025-12-19完了）

| カテゴリ | ページ数 | 詳細 |
|---------|---------|------|
| market | 4 | chumon, ckodate, cmansion, reform_renovation |
| voice | 2 | voices-shop, voices-online |
| article/online/webinar | 3 | article, online, webinar |
| reserve | 1 | reserve |
| campaign | 2 | syanaisyoukai, friend_adviser |
| TOP | 1 | トップページ |
| error | 3 | 404, 500, 400 |
| LP | 9 | seminar002/005, chumon011/012, online001, alliance_interspace, linesoudan×3, market001 |
| about | 1 | 住まいの窓口とは |
| skodate | 1 | 新築一戸建て |
| books | 2 | 書籍紹介一覧、共通ヘッダー |

### 主な成果

- ✅ **dcms_media/css依存の完全排除**: 29ページ
- ✅ **inline CSS外部ファイル化**: 11ページ（699行削減）
- ✅ **CSS読み込み数削減**: 平均30-40%削減
- ✅ **統合パターンの確立**: 再利用可能な手順を確立

### 🔍 対象外ページ（確認済み・2025-12-19）

#### book詳細ページ（31ページ）
- **場所**: `app/views/static_contents/pages/book/*/`
- **理由**: migrate済み、近々削除予定
- **確認**: dcms_media/css使用中だが、削除予定のため対象外

#### その他のページ
- **lp_pages**: af_chumon, market002 → 既に統合済み
- **static_pages**: about_manga, faq, thanks → 既に統合済み

#### 確認コマンド結果（2025-12-19）
```bash
# dcms_media/css使用中のファイル数（book詳細除く）
find app/views -name "*.html.erb" | while read file; do
  if grep "^[^#]*stylesheet_path 'dcms_media/css" "$file" 2>/dev/null | grep -v "<%#" | grep -q .; then
    echo "$file"
  fi
done | grep -v "static_contents/pages/book/" | wc -l
# 結果: 0ファイル
```

**結論**: 全てのページでdcms_media/css依存を排除完了 🎉

---

## 🎯 統合パターン（確立済み）

### 基本手順

1. **現状調査**
   - CSS読み込み数とファイルサイズを確認
   - 統合済みCSSの有無を確認
   - 使用クラスを確認

2. **フォント定義の除外**
   ```bash
   tail -n +N dcms_media/css/file.css > common/file.css
   # N = フォント定義の終了行 + 1
   ```

3. **@layer resetの追加**（必要に応じて）
   ```css
   @layer reset{
     /* 統合したCSS */
   }
   ```

4. **ビューファイルの更新**
   - dcms_media/css → common/ または pages/ に変更
   - 旧CSSをコメントアウト（履歴保持）

5. **表示確認**
   - ローカル環境で確認
   - 本番環境と比較（スクリーンショット）

---

## 📁 ファイル構成

### 共通CSS（全ページで使用）

```
app/assets/stylesheets/
├── common.css                          # サイト共通（home_common_2, custom, all_notApplicableConsult統合済み）
├── vendor.css                          # ベンダー系（slick, fancybox, swiper, lity）
└── common/
    ├── font.css                        # フォント定義
    ├── home_header_footer_common.css   # ヘッダー・フッター
    ├── utility.css                     # ユーティリティクラス
    └── site_recommendLink.css          # おすすめ記事リンク
```

### ページ固有CSS

```
app/assets/stylesheets/
├── pages/
│   ├── market/
│   │   └── market_page_common.css      # market 4ページ共通
│   ├── campaign/
│   │   ├── friend_adviser_custom.css
│   │   └── syanaisyoukai_custom.css
│   └── top.css                         # TOPページ固有
├── common/
│   ├── home_voice_common.css           # voice 2ページ
│   ├── home_article_common.css         # article
│   ├── home_online_common.css          # online
│   ├── home_webinar_common.css         # webinar
│   ├── home_reserve_common.css         # reserve
│   ├── home_campaign_common.css        # campaign共通
│   ├── home_news_common.css            # books
│   └── home_seminar_common.css         # books
├── lp/common/
│   ├── lp_common.css                   # LP共通
│   ├── lp_modal.css                    # モーダル（4ページ）
│   ├── lp_new007_ver2.css              # alliance_interspace
│   ├── lp_new007_ver3.css              # chumon011/012
│   ├── lp_footer_sp.css                # フッター（SP）
│   └── [各LP固有CSS]
├── about/
│   └── home_about_common.css
├── skodate/
│   ├── site_recommendLink.css
│   └── common_overrides.css            # modernな実装用
├── books/
│   └── common_overrides.css            # modernな実装用
└── errors/
    └── error_common.css
```

---

## 🔧 重要なトラブルシューティング

### 1. CSS Layers詳細度問題

**問題**: `@layer reset`内のスタイルが通常のCSSに負ける

**解決**: 両方のCSSを同じレイヤーに配置
```css
/* lp_common.css */
@layer reset{
  /* 既存の内容 */
}
```

### 2. アイコンフォントが表示されない

**原因**: `@font-face`定義の欠落

**確認コマンド**:
```bash
grep -A 5 "font-family.*icon" file.css
sed -n 'XXXp' file.css | xxd  # contentの16進数確認
```

**解決**: アイコンフォント定義を必ず含める
```css
@font-face {
    font-family: "icon";
    src: url(/dcms_media/css/fonts/icon.eot);
    /* ... */
}
```

### 3. modernな実装との競合

**問題**: aboutページ、skodateページ、booksページで表示崩れ

**原因**: 
- modernなHTML構造（`<div><img>`）
- common.cssの古い実装（::after疑似要素）

**解決**: ページ専用のオーバーライドCSS
```css
/* common_overrides.css */
.site-pagetop a::after {
    display: none !important;
}

.site-pagetop a > div {
    /* modernな実装のスタイル */
}
```

### 4. inline CSS抽出時のHTMLタグ混入

**問題**: `</style>`タグとその後の`<link>`タグまで抽出

**防止策**:
```bash
# </style>の前の行まで抽出（</style>自体は含めない）
sed -n '51,598p' file.html.erb > extracted.css  # 599行目が</style>

# HTMLタグ混入確認
grep -E "<|>" extracted.css
```

### 5. @charset配置エラー

**問題**: `@charset`がファイルの途中に配置されてパースエラー

**解決**: 必ず先頭行に配置
```bash
{
  echo '@charset "UTF-8";'
  echo ''
  cat content.css
} > merged.css
```

---

## 📋 チェックリスト

### CSS統合時

**統合前:**
- [ ] 統合対象のCSSファイルをリストアップ
- [ ] フォント定義の範囲を特定（1-N行）
- [ ] アイコンフォント定義の有無を確認
- [ ] 他ページでの使用状況を確認

**統合中:**
- [ ] フォント定義を除外（ただしアイコンフォントは含める）
- [ ] `@charset`を先頭行に配置
- [ ] `@layer reset`の必要性を判断
- [ ] 重複セレクタをチェック

**統合後:**
- [ ] ビューファイルから旧CSSを削除/コメントアウト
- [ ] CSS読み込み数を確認（削減されているか）
- [ ] ブラウザ開発者ツールでCSSファイル読み込みを確認
- [ ] 表示確認（ローカル環境）
- [ ] 表示確認（本番環境と比較）

### inline CSS外部ファイル化時

**抽出前:**
- [ ] `<style>`タグの開始行と終了行を正確に特定
- [ ] 誤ったタグ（`<script type="text/css">`）がないか確認

**抽出時:**
- [ ] `</style>`タグ自体は含めない
- [ ] ERBタグを静的パスに変換（Propshaft使用時）

**抽出後:**
- [ ] 先頭10行を目視確認
- [ ] HTMLタグ混入確認: `grep -E "<|>" extracted.css`
- [ ] 重要なセレクタが含まれているか確認
- [ ] `@font-face`定義の有無を確認

---

## 🎓 重要な学び

### 1. アイコンフォントの扱い

- **Google Fontsの`@import`**: 除外してOK（外部読み込み）
- **アイコンフォント定義**: 必ず含める
- **ブランドフォント**: 他で定義済みなら除外可

### 2. CSS読み込み順序

```erb
<%# 正しい順序 %>
<%= stylesheet_link_tag "common" %>           <!-- 基本スタイル -->
<%= stylesheet_link_tag "vendor" %>           <!-- ベンダー系 -->
<%= stylesheet_link_tag "common/utility" %>   <!-- ユーティリティ -->
<%= stylesheet_link_tag "pages/xxx" %>        <!-- ページ固有（最後） -->
```

### 3. modernな実装への対応

aboutページ、skodateページ、booksページは新しいHTML構造を使用しているため、専用のオーバーライドCSSが必要。

**将来の対応**: 他のページもmodernな実装に移行したら、オーバーライドCSSを削除して共通CSSに統合。

### 4. ERBコメントの書き方

```erb
# 正しい
<%# <%= stylesheet_link_tag "file.css" - コメント %>

# 間違い（%>が二重になる）
<%# <%= stylesheet_link_tag "file.css" %> - コメント %>
```

### 5. 共通CSSファイルの影響範囲

`home_market_common.css`のように複数ページで共有されているCSSは、修正時に全ページへの影響を考慮する。

---

## 📝 次のステップ

### 優先度: 高
- [ ] 残存ページの洗い出し
- [ ] 他のLPページの統合

### 優先度: 中
- [ ] 他のmarketページのmodernな実装への移行
- [ ] オーバーライドCSSの統合（移行完了後）

### 優先度: 低
- [ ] dcms_media/cssディレクトリの削除検討
- [ ] 未使用CSSの削除

---

## 📚 参考情報

### 確認コマンド集

```bash
# CSS読み込み数確認
grep -c "stylesheet" file.html.erb

# セレクタ数確認
grep -c "^\.class-name" file.css

# アイコンフォント定義確認
grep -A 5 "font-family.*icon" file.css

# HTMLタグ混入確認
grep -E "<|>" file.css

# @charset確認
head -1 file.css | grep -q "@charset" && echo "OK" || echo "NG"

# 画像圧縮（スクリーンショット比較用）
sips -Z 1280 input_PC.png --out output_PC_small.png
sips -Z 800 input_SP.png --out output_SP_small.png
```

### Git操作

```bash
# 変更ファイル確認
git status --short

# 対象ファイルのみステージング
git add app/views/xxx/_index.html.erb

# ステージング確認
git diff --cached --name-only

# コミット
git commit -m "message"
```

---

## 📞 関連ドキュメント

- `/Users/matsubah/Documents/統合作業のまとめ.md` - プロジェクト全体のマスタードキュメント
- `/Users/matsubah/projects/madoguchi-web/css_consolidation_market_pages.md` - 作業記録
- `/Users/matsubah/projects/madoguchi-web/docs/common_assets_consolidation.md` - 共通CSS統合戦略


---

## セクション 38: CSS読み込み順序とロゴ表示の修正（2025-12-19）

### 作業日時
2025-12-19 15:00-15:45

### 発見された問題

#### 1. パンくずの「＞」位置が下がっている
- **原因**: `top: .7em;` が固定値だった
- **修正**: `top: 50%;` に変更（垂直中央配置）

#### 2. コメントアウト内に`%>`が残っている
- **原因**: ERBコメント内の`<%= ... %>`の`%>`が残っていた
- **影響**: コメントアウトされたCSSが一部表示されてしまう
- **修正**: 23ファイルで`%>`を削除

#### 3. パンくずのpadding/overflow-xが適用されない
- **原因**: CSS読み込み順序が本番環境と異なる
- **本番**: home_header_footer_common.css → home_common_2.css（後勝ち）
- **ローカル**: common.css（home_common_2統合済み）→ home_header_footer_common.css（後勝ち）
- **結果**: `.breadcrumb { padding: 10px 20px; overflow-x: auto; }` が適用されない

#### 4. ロゴ画像が全ページで非表示
- **原因**: `.site-header #gnavi_logo img { display: none }` が全ページに適用
- **本番**: `.toppage .site-header #gnavi_logo img { display: none }` （TOPページのみ）
- **結果**: TOPページ以外でもロゴが非表示になる

### 修正内容

#### 1. パンくずの「＞」位置修正

**ファイル**: `app/assets/stylesheets/common.css`

```css
/* 修正前 */
.breadcrumb ol li + li::after {
  top: .7em;
}

/* 修正後 */
.breadcrumb ol li + li::after {
  top: 50%;
}
```

#### 2. コメントアウト内の`%>`削除

**対象**: 23ファイル

```bash
find app/views -name "*.html.erb" -type f -exec sed -i '' -E 's/(<%#.*stylesheet_path.*dcms_media\/css[^>]*) %>/\1/g' {} \;
```

**修正例**:
```erb
# 修正前
<%# <link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css' %>">

# 修正後
<%# <link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css'">
```

#### 3. CSS読み込み順序の修正

**対象**: marketページ4ページ（chumon, ckodate, cmansion, reform_renovation）

**修正前**:
```erb
<%= stylesheet_link_tag "common", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "common/home_header_footer_common", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "common/site_recommendLink", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "common/utility", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "pages/market/market_page_common", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "vendor", "data-turbo-track": "reload" %>
```

**修正後**:
```erb
<%= stylesheet_link_tag "common/home_header_footer_common", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "common/site_recommendLink", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "common/utility", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "vendor", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "common", "data-turbo-track": "reload" %>
<%= stylesheet_link_tag "pages/market/market_page_common", "data-turbo-track": "reload" %>
```

**効果**:
- `common.css`を最後に読み込むことで、`.breadcrumb { padding: 10px 20px; overflow-x: auto; }` が優先される
- 本番環境と同じCSS優先順位になる

#### 4. ロゴ画像表示の修正

**ファイル**: `app/assets/stylesheets/common.css`

**修正前**:
```css
.site-header #gnavi_logo img {
  display: none
}
```
→ 全ページでロゴ非表示

**修正後**:
```css
.toppage .site-header #gnavi_logo img {
  display: none
}

.toppage .site-header.-scrolled #gnavi_logo img {
  display: block
}
```
→ TOPページのみロゴ非表示（スクロール時は表示）

**追加修正**: `app/assets/stylesheets/books/common_overrides.css`
- 不要になった`display: block !important`を削除

### 影響範囲

- **パンくず修正**: 全ページ
- **コメントアウト修正**: 23ファイル
- **CSS読み込み順序**: marketページ4ページ
- **ロゴ表示**: 全ページ（TOPページ以外でロゴが表示されるように）

### 検証

- ✅ chumonページ: パンくずのpadding/overflow-x正常、ロゴ表示
- ✅ TOPページ: ロゴ非表示（スクロール時は表示）
- ✅ コメントアウトされたCSSが表示されない

### 重要な学び

#### CSS読み込み順序の重要性

同じ詳細度のセレクタは、**後に読み込まれたCSSが優先**される。本番環境とローカル環境で読み込み順序が異なると、スタイルの適用結果が変わる。

**対策**:
- 本番環境のCSS読み込み順序を確認
- 統合時に同じ順序を維持する
- 特に`common.css`のような大きなファイルは、読み込み位置に注意

#### セレクタの詳細度

`.site-header #gnavi_logo img` と `.toppage .site-header #gnavi_logo img` では、後者の方が詳細度が高い（クラスが1つ多い）。

**詳細度**:
- `.site-header #gnavi_logo img`: (0,1,1,1) = ID1個 + クラス1個 + 要素1個
- `.toppage .site-header #gnavi_logo img`: (0,1,2,1) = ID1個 + クラス2個 + 要素1個

**教訓**:
- 全ページに適用したくない場合は、ページ固有のクラス（`.toppage`等）を追加
- 本番環境のセレクタを正確に再現する

### ステータス

✅ **完了** - CSS読み込み順序とロゴ表示の修正完了（検証済み）


---

## セクション 39: コメントアウト形式の統一とfriend_adviser修正（2025-12-19）

### 作業日時
2025-12-19 15:50-16:06

### 背景

ERBコメント`<%# ... %>`で囲むと、内側の`<%= ... %>`が正しく表示されず、比較検証がしづらい問題が発覚。campaign/friend_adviserで既にHTMLコメント`<!-- -->`形式を採用していたため、全ファイルを統一することに。

### 実施内容

#### 1. ERBコメント → HTMLコメントへの変更（22ファイル）

**対象**: 旧dcms_media CSS部分のコメントアウト

**変更前**（ERBコメント）:
```erb
<%# 旧dcms_media CSS（統合済み・コメントアウト） %>
<%# <link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css'"> %>
```
→ 内側の`<%= ... %>`が消えてしまう

**変更後**（HTMLコメント）:
```erb
<%# 旧dcms_media CSS（統合済み・コメントアウト） %>
<!--
<link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css' %>">
-->
```
→ ERBタグが保持され、HTMLコメントを外せばすぐ使える

**修正ファイル**: 22ファイル
- market系: chumon, ckodate, cmansion, reform_renovation
- voice系: voices-shop, voices-online
- article系: article, online, webinar
- その他: reserve, TOP, syanaisyoukai
- LP: seminar002, seminar005, chumon011, chumon012, linesoudan×3, online001, market001, alliance_interspace

#### 2. HTMLコメント内のlinkタグ修正

**問題1**: `%>`が欠けている
```html
<link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css'">
```

**問題2**: バックスラッシュ`\`が入っている
```html
<link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css'\">
```

**修正後**:
```html
<link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css' %>">
```

**修正コマンド**:
```bash
# %>を追加
sed -i '' 's|stylesheet_path '"'"'dcms_media/css/\([^'"'"']*\)'"'"'">|stylesheet_path '"'"'dcms_media/css/\1'"'"' %>">|g'

# バックスラッシュを削除
sed -i '' -E 's|stylesheet_path ('"'"'dcms_media/css/[^'"'"']*'"'"')\\"|stylesheet_path \1 %>"|g'
```

#### 3. campaign/friend_adviserの.self-*.css部分の修正

**問題**: 27個の.self-*.cssがERBコメントで囲まれており、末尾の`%>`が二重になって表示される

**変更前**:
```erb
<%# <link rel="stylesheet" media="screen" href="<%= stylesheet_path 'dcms_media/css/ui_btn.self-...css' %>">
```
→ 末尾の`%>`が表示されてしまう

**変更後**:
```html
<!--
<link rel="stylesheet" media="screen" href="<%= stylesheet_path 'dcms_media/css/ui_btn.self-...css' %>">
-->
```

#### 4. campaign/friend_adviserのCSS読み込み順序修正

**問題**: PC版「ご紹介の流れ」が崩れる

**原因**:
- introducerflow.cssが.self-*.cssとしてコメントアウトされていた
- friend_adviser_custom.cssに統合されているが、読み込み順序が早すぎた
- 本番環境では.self-*.cssが最後に読み込まれる

**修正前**:
```erb
1. common.css
2. home_header_footer_common.css
3. home_campaign_common.css
4. utility.css
5. friend_adviser_custom.css ← 早すぎる
6. vendor.css
```

**修正後**:
```erb
1. home_header_footer_common.css
2. utility.css
3. vendor.css
4. common.css
5. home_campaign_common.css
6. friend_adviser_custom.css ← 最後（本番環境と同じ）
```

### メリット

1. **ERBタグが保持される**: `<%= ... %>`が消えない
2. **可読性向上**: コメントアウトされたコードが読みやすい
3. **比較検証しやすい**: 本番環境との比較時に元のコードが確認できる
4. **ロールバックが容易**: HTMLコメントを外すだけで元に戻せる

### 影響範囲

- コメント形式変更: 22ファイル
- linkタグ修正: 全ファイル
- friend_adviser修正: 1ファイル（.self-*.css + CSS読み込み順序）

### 検証

- ✅ コメントアウトされたCSSが正しく非表示
- ✅ HTMLコメントを外せばすぐ使える状態
- ✅ friend_adviser「ご紹介の流れ」正常表示

### ステータス

✅ **完了** - コメントアウト形式の統一とfriend_adviser修正完了


---

## セクション 40: friend_adviser「ご紹介の流れ」崩れ修正（2025-12-19）

### 作業日時
2025-12-19 16:14-17:16

### 問題
PC版（1024px）で「ご紹介の流れ」が崩れる
- 矢印が下向き（SP版スタイル）になる
- 点線が横向き（SP版スタイル）になる

### 原因調査

#### 1. 初期仮説: CSS読み込み順序
- friend_adviser_custom.cssが読み込まれていない？
→ **否定**: 読み込まれていることを確認

#### 2. 重複定義の発見
friend_adviser_custom.css内に`.mod-introducerflow .flowwrap:not(:last-of-type)`の定義が**2箇所**存在：

**489行目付近（SP版のみ）**:
```css
.mod-introducerflow .flowwrap:not(:last-of-type) {
    margin-right: 0;
    padding: 0 0 3rem
}

.mod-introducerflow .flowwrap:not(:last-of-type):before {
    top: auto;
    right: calc(50% - 14px);
    bottom: -30px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg)
}
```
- メディアクエリなし
- SP版の値のみ
- PC版でも適用されてしまう

**964行目付近（PC版 + SP版）**:
```css
.mod-introducerflow .flowwrap:not(:last-of-type) {
    position: relative;
    padding-right: 4rem;
    margin-right: 4rem
}

@media screen and (max-width:768px) {
    .mod-introducerflow .flowwrap:not(:last-of-type) {
        margin-right: 0;
        padding: 0 0 3rem
    }
}

.mod-introducerflow .flowwrap:not(:last-of-type):before {
    display: block;
    content: "";
    position: absolute;
    top: calc(50% - 27px);
    right: -14px;
    width: 28px;
    height: 54px;
    background: url(...) no-repeat;
    background-size: contain;
    z-index: 1
}

@media screen and (max-width:768px) {
    .mod-introducerflow .flowwrap:not(:last-of-type):before {
        top: auto;
        right: calc(50% - 14px);
        bottom: -30px;
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg)
    }
}
```

#### 3. 対応1: 489行目をコメントアウト
```css
/* 重複定義のためコメントアウト（964行目に正しい定義あり） - 2025-12-19
.mod-introducerflow .flowwrap:not(:last-of-type) {
    ...
}
*/
```
→ **効果なし**: Propshaftのキャッシュ問題

#### 4. 対応2: HTMLコメント → ERBコメント（条件分岐）
ビューファイルの旧dcms_media CSS読み込みが実際に実行されていた：
```erb
<!-- 
<link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/...' %>">
-->
```
→ ERBが先に処理され、CSSが読み込まれる

**修正**:
```erb
<% if false %>
  <link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/...' %>">
<% end %>
```
→ **完全に無効化**

#### 5. 根本原因: CSS定義の順序
friend_adviser_custom.css内で、introducerflow.selfから統合した部分の**配置順序**が問題：

**問題のある順序**:
1. 489行目: SP版スタイル（メディアクエリなし）
2. 964行目: PC版 + SP版スタイル（メディアクエリあり）

→ 489行目のSP版スタイルが964行目のPC版スタイルを上書き

**正しい順序**:
1. PC版 + SP版スタイル（メディアクエリあり）を先に配置
2. 重複するSP版スタイルは削除またはコメントアウト

### 解決方法
friend_adviser_custom.css内で、introducerflow.selfから持ってきた部分を**下（後）**に移動

### 学び
1. **CSS統合時の定義順序が重要**
   - 同じセレクタの定義は後勝ち
   - メディアクエリなしの定義が後にあると、全画面幅で適用される

2. **HTMLコメントではERBタグを無効化できない**
   - `<!-- <%= ... %> -->` → ERBが先に処理される
   - `<% if false %> ... <% end %>` → 完全に無効化

3. **Propshaftのキャッシュ**
   - ファイル内容変更後もハッシュが変わらない場合がある
   - ブラウザのハードリフレッシュが必要

### 影響範囲
- friend_adviserページのみ

### ステータス
✅ **完了** - PC版・SP版両方で正しく表示


---

## セクション 41: HTMLコメント→ERB条件分岐への統一（2025-12-19）

### 作業日時
2025-12-19 16:47-17:35

### 背景
friend_adviserページで発覚した問題：
- HTMLコメント`<!-- -->`内のERBタグ`<%= %>`は**ERBが先に処理される**
- 結果、コメントアウトしたはずのCSSが実際に読み込まれる
- 全ページで同じ問題が発生する可能性

### 問題のあるコメント形式

#### パターン1: HTMLコメント（ERBタグが実行される）
```erb
<!--
<link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css' %>">
-->
```
→ ERBが先に処理され、CSSが読み込まれる

#### パターン2: ERBコメント（内部のERBタグが二重になる）
```erb
<%# <link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css' %> %>
```
→ 末尾の`%>`が表示される、または構文エラー

#### パターン3: 不完全なlinkタグ
```erb
<!--
<link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css' - common/utilityに置き換え
-->
```
→ `%>`が欠けている、説明文が混在

### 解決方法：ERB条件分岐

```erb
<%# 旧dcms_media CSS（統合済み・無効化） - 2025-12-19 %>
<%# 統合先: 各ページのカスタムCSS %>
<%# 元のコードを保持（本番環境との比較・検証用） %>
<% if false %>
  <link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/utility.css' %>">
  <link rel="stylesheet" href="<%= stylesheet_path 'dcms_media/css/swiper.css' %>">
<% end %>
```

**メリット**:
- 完全に無効化される（ERBが実行されない）
- 元のコードが正確に保持される
- 本番環境との比較・検証が容易
- ロールバックが簡単（`if false`を`if true`に変更）

### 対象ファイル（合計21ファイル）

#### 通常ページ（11ファイル）
1. article
2. chumon
3. ckodate
4. cmansion
5. online
6. reform_renovation
7. reserve
8. voices-online
9. voices-shop
10. webinar
11. TOP (pages/_index.html.erb)

#### LPページ（9ファイル）
1. seminar002
2. chumon011
3. chumon012
4. online001
5. market001
6. linesoudan
7. linesoudan001
8. linesoudan002
9. alliance_interspace

#### キャンペーンページ（2ファイル）
1. friend_adviser
2. syanaisyoukai

### 作業手順

#### 1. 通常ページ（Pythonスクリプトで一括変換）
```python
# HTMLコメント内のstylesheet_pathを検出
# ERB条件分岐に変換
# コメント説明を追加
```

#### 2. LPページ（不完全なlinkタグを修正）
```bash
# %>を追加
sed -i '' -E "s|(stylesheet_path 'dcms_media/css/[^']+')$|\1 %>'>|g"

# クォートを修正
sed -i '' "s| %>'>| %>\">|g"
```

#### 3. ERBコメント形式のページ（個別対応）
- linesoudan系（3ファイル）
- syanaisyoukai
- article

### 修正内容の詳細

#### 通常ページ
- HTMLコメント → ERB条件分岐
- 統合先情報を追加
- 元のコードを保持

#### LPページ
- 不完全なlinkタグを修正（`%>`追加）
- 説明文を削除
- クォートを統一（`">`）

#### ERBコメント形式
- `<%# <link ... %>` → `<% if false %> <link ... > <% end %>`
- 二重ERBタグを解消
- 正しいlinkタグ形式に修正

### トラブルシューティング

#### 問題1: linesoudan系でlinkタグが空
**原因**: 元々linkタグがなかった（既に統合済み）
**対応**: そのまま（問題なし）

#### 問題2: articleで`% %>`になる
**原因**: 正規表現の誤マッチ
**対応**: `sed 's| % %>">| %>">|g'`で修正

#### 問題3: TOPページにHTMLコメントが残る
**原因**: 複数のコメントブロックが存在
**対応**: 不要なHTMLコメントを削除

### 検証

```bash
# HTMLコメント内のstylesheet_pathを検索
grep -r "<!--.*stylesheet_path.*dcms_media" app/views/static_contents/pages --include="*.html.erb"
# 結果: 0件

# ERBコメント内のlinkタグを検索
grep -r "<%# <link.*stylesheet_path.*dcms_media" app/views/static_contents/pages --include="*.html.erb"
# 結果: 0件

# % %>の残存確認
grep -r " % %>" app/views/static_contents/pages --include="*.html.erb"
# 結果: 0件
```

### 学び

1. **HTMLコメントではERBタグを無効化できない**
   - ERBの処理順序: ERB → HTML
   - HTMLコメントはERB処理後に適用される

2. **ERBコメントは内部のERBタグと競合する**
   - `<%# <%= ... %> %>`は構文エラー
   - 末尾の`%>`が外に出る

3. **ERB条件分岐が最適解**
   - `<% if false %>`は完全に無効化
   - 元のコードを正確に保持
   - 可読性が高い

4. **一括変換時の注意点**
   - linkタグの形式が統一されていない
   - 説明文が混在している場合がある
   - 正規表現での一括処理後、個別確認が必要

### 影響範囲
- 全21ページ
- CSS読み込みに影響なし（完全に無効化）
- 表示に影響なし

### ステータス
✅ **完了** - 全ページでコメントアウト形式を統一
