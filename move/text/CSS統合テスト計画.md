# CSS統合作業 テスト計画書

## 概要

ローカル環境と本番環境で画面表示を比較し、CSS統合作業が正しく完了していることを確認する。

## テスト対象ページ（27ページ）

### 1. Article/Campaign (3ページ)
- `app/views/static_contents/pages/article/_index.html.erb` → `/article`
- `app/views/static_contents/pages/campaign/friend_adviser/_index.html.erb` → `/campaign/friend_adviser`
- `app/views/static_contents/pages/campaign/syanaisyoukai/_index.html.erb` → `/campaign/syanaisyoukai`

### 2. LP (10ページ)
- `app/views/lp_pages/seminar005.html.erb` → `/lp/seminar005`
- `app/views/static_contents/pages/lp/alliance_interspace/_index.html.erb` → `/lp/alliance_interspace`
- `app/views/static_contents/pages/lp/chumon011/_index.html.erb` → `/lp/chumon011`
- `app/views/static_contents/pages/lp/chumon012/_index.html.erb` → `/lp/chumon012`
- `app/views/static_contents/pages/lp/linesoudan/_index.html.erb` → `/lp/linesoudan`
- `app/views/static_contents/pages/lp/linesoudan001/_index.html.erb` → `/lp/linesoudan001`
- `app/views/static_contents/pages/lp/linesoudan002/_index.html.erb` → `/lp/linesoudan002`
- `app/views/static_contents/pages/lp/market001/_index.html.erb` → `/lp/market001`
- `app/views/static_contents/pages/lp/online001/_index.html.erb` → `/lp/online001`
- `app/views/static_contents/pages/lp/seminar002/_index.html.erb` → `/lp/seminar002`

### 3. Market (4ページ)
- `app/views/static_contents/pages/chumon/_index.html.erb` → `/chumon`
- `app/views/static_contents/pages/ckodate/_index.html.erb` → `/ckodate`
- `app/views/static_contents/pages/cmansion/_index.html.erb` → `/cmansion`
- `app/views/static_contents/pages/reform_renovation/_index.html.erb` → `/reform_renovation`

### 4. その他 (10ページ)
- `app/views/static_contents/pages/online/_index.html.erb` → `/online`
- `app/views/static_contents/pages/reserve/_index.html.erb` → `/reserve`
- `app/views/static_pages/thanks.html.erb` → `/thanks`
- `app/views/static_contents/pages/_index.html.erb` → `/` (TOP)
- `app/views/static_contents/pages/voices-online/_index.html.erb` → `/voices-online`
- `app/views/static_contents/pages/voices-shop/_index.html.erb` → `/voices-shop`
- `app/views/static_contents/pages/webinar/_index.html.erb` → `/webinar`
- `app/views/books/index.html.erb` → `/book`
- `app/views/static_pages/skodate.html.erb` → `/skodate`
- `app/views/static_pages/about.html.erb` → `/about`

## テスト環境

### ローカル環境
- URL: `http://localhost:3000`
- ブラウザ: Chrome
- 画面サイズ:
  - PC: 1280px幅
  - SP: 375px幅

### 本番環境
- URL: `https://counter.homes.co.jp`
- ブラウザ: Chrome
- 画面サイズ:
  - PC: 1280px幅
  - SP: 375px幅

## テスト手順

### 事前準備

1. **必要なツールのインストール**
   ```bash
   # Playwrightのインストール（推奨）
   npm install -g playwright
   npx playwright install chromium
   
   # または Puppeteerのインストール
   npm install -g puppeteer
   ```

2. **ローカル環境の起動**
   ```bash
   cd /Users/matsubah/projects/madoguchi-web
   rails server
   ```

3. **テスト用ディレクトリの作成**
   ```bash
   mkdir -p ~/Documents/CSS統合テスト結果
   cd ~/Documents/CSS統合テスト結果
   ```

### テスト実施手順

#### ステップ1: スクリーンショット取得

各ページについて以下を実施：

1. **PC版スクリーンショット取得**
   - ローカル環境: `localhost_3000_{page_name}_PC.png`
   - 本番環境: `production_{page_name}_PC.png`

2. **SP版スクリーンショット取得**
   - ローカル環境: `localhost_3000_{page_name}_SP.png`
   - 本番環境: `production_{page_name}_SP.png`

#### ステップ2: 画像圧縮

Bedrockの制限内に収めるため、画像を圧縮：

```bash
# PC版（1280px幅に圧縮）
sips -Z 1280 localhost_3000_{page_name}_PC.png --out localhost_3000_{page_name}_PC_small.png
sips -Z 1280 production_{page_name}_PC.png --out production_{page_name}_PC_small.png

# SP版（800px幅に圧縮）
sips -Z 800 localhost_3000_{page_name}_SP.png --out localhost_3000_{page_name}_SP_small.png
sips -Z 800 production_{page_name}_SP.png --out production_{page_name}_SP_small.png
```

#### ステップ3: 画像比較

Kiroを使用して画像を比較：

```
> 以下の2つの画像を比較して、表示の差異がないか確認してください：
> - localhost_3000_{page_name}_PC_small.png
> - production_{page_name}_PC_small.png
```

#### ステップ4: 結果記録

比較結果をCSVファイルに記録：

| ページ名 | PC版結果 | SP版結果 | 差異内容 | ステータス |
|---------|---------|---------|---------|----------|
| article | ✅ 一致 | ✅ 一致 | なし | PASS |
| ... | ... | ... | ... | ... |

## 自動化スクリプト（推奨）

### Playwright使用例

```javascript
// screenshot-test.js
const { chromium } = require('playwright');
const fs = require('fs');

const pages = [
  { name: 'article', path: '/article' },
  { name: 'campaign_friend_adviser', path: '/campaign/friend_adviser' },
  // ... 他のページ
];

const environments = [
  { name: 'localhost', url: 'http://localhost:3000' },
  { name: 'production', url: 'https://counter.homes.co.jp' }
];

const viewports = [
  { name: 'PC', width: 1280, height: 1024 },
  { name: 'SP', width: 375, height: 812 }
];

(async () => {
  const browser = await chromium.launch();
  
  for (const env of environments) {
    for (const page of pages) {
      for (const viewport of viewports) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height }
        });
        
        const browserPage = await context.newPage();
        await browserPage.goto(`${env.url}${page.path}`);
        
        // ページの読み込み完了を待つ
        await browserPage.waitForLoadState('networkidle');
        
        // スクリーンショット取得
        const filename = `${env.name}_${page.name}_${viewport.name}.png`;
        await browserPage.screenshot({ 
          path: filename, 
          fullPage: true 
        });
        
        console.log(`✓ ${filename}`);
        
        await context.close();
      }
    }
  }
  
  await browser.close();
})();
```

### 実行方法

```bash
cd ~/Documents/CSS統合テスト結果
node screenshot-test.js
```

## 判定基準

### PASS条件
- ローカル環境と本番環境で視覚的な差異がない
- レイアウトが崩れていない
- 画像・アイコンが正しく表示されている
- ボタン・リンクの位置が一致している

### FAIL条件
- レイアウトの崩れ
- 要素の非表示・欠落
- 位置ずれ
- スタイルの不一致

## 結果の保存

### CSV形式でのエクスポート

```csv
ページ名,URL,PC版ローカル,PC版本番,SP版ローカル,SP版本番,差異,ステータス
article,/article,✅,✅,✅,✅,なし,PASS
campaign_friend_adviser,/campaign/friend_adviser,✅,✅,✅,✅,なし,PASS
...
```

### Google Sheetsへのインポート

1. CSVファイルを作成
2. Google Sheetsを開く
3. 「ファイル」→「インポート」→「アップロード」
4. CSVファイルを選択してインポート
5. スクリーンショット画像を手動で貼り付け

## トラブルシューティング

### スクリーンショットが取得できない場合

```bash
# Chromeのバージョン確認
google-chrome --version

# Playwrightのブラウザ再インストール
npx playwright install --force chromium
```

### 画像圧縮が失敗する場合

```bash
# sipsの代わりにImageMagickを使用
brew install imagemagick
convert input.png -resize 1280x output.png
```

### メモリ不足の場合

- フルページスクリーンショットではなく、ビューポート内のみを取得
- 画像形式をJPEGに変更（PNGより軽量）

## 完了条件

- [ ] 全27ページのスクリーンショット取得完了（PC/SP × ローカル/本番 = 108枚）
- [ ] 全ページの画像比較完了
- [ ] 結果CSVファイル作成完了
- [ ] 差異があるページの修正完了
- [ ] 再テスト実施（差異があった場合）
- [ ] 最終レポート作成完了

## 備考

- テスト実施日時: 2025-12-18
- テスト実施者: matsubah
- 対象ブランチ: CSS統合作業完了後のブランチ
- 前提条件: dcms_media/css依存の完全排除が完了していること
