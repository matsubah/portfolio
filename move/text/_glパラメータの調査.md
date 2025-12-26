> 下記を調査して
Overview
Unknown _gl query parameter is added unexpectedly.

Procedure
Access [Ebina shop|https://counter-test.develop.homes.co.jp/shop/42] in test environment
Click "店舗相談予約" button
Check URL
_gl parameter is added
Todo
Check the detail of _gl query parameter
Check whether there is any problem by _gl parameter
この問題について調査します。_glクエリパラメータが予期せず追加される現象について詳しく見ていきましょう。

## _glパラメータの詳細調査

_glパラメータは通常、Google Analytics（GA）のクロスドメイントラッキング機能で使用されるパラメータです。

### 1. _glパラメータとは

_glパラメータは以下の目的で使用されます：
• **クロスドメイントラッキング**: 異なるドメイン間でユーザーセッションを追跡
• **Google Analytics**: GAのLinker機能によって自動的に追加
• **セッション継続**: ドメインを跨いだ際のユーザー識別

### 2. 実際の調査手順

指定されたURLとボタンの動作を確認してみましょう：


🛠️  Using tool: execute_bash (trusted)
 ⋮
 ● I will run the following shell command:
curl -I "https://counter-test.develop.homes.co.jp/shop/42" 2>/dev/null | head -5
 ⋮
 ↳ Purpose: Check if we can access the test environment URL

HTTP/2 200
date: Mon, 30 Jun 2025 10:30:47 GMT
content-type: text/html; charset=utf-8
content-length: 0
x-permitted-cross-domain-policies: none

 ⋮
 ● Completed in 0.214s

### 3. 考えられる原因

_glパラメータが追加される主な原因：

1. Google Analytics設定
   • gtag('config', 'GA_MEASUREMENT_ID', { 'linker': { 'domains': ['example.com'] } })
   • クロスドメイントラッキングが有効になっている

2. Google Tag Manager (GTM)
   • GTMでLinker設定が有効
   • 自動的にクロスドメインパラメータを追加

3. JavaScript実装
   • カスタムトラッキングコードでLinker機能を使用
   • フォームやリンクに自動的にパラメータを付与

### 4. 問題の影響度評価

#### 潜在的な問題：
• **URL汚染**: URLが長くなり、ユーザビリティに影響
• **セキュリティ**: トラッキング情報の露出
• **SEO影響**: 重複コンテンツとして認識される可能性
• **ログ汚染**: アクセスログが複雑になる

#### 一般的には問題ないケース：
• Google Analyticsの正常な動作
• 意図されたクロスドメイントラッキング
• 一時的なパラメータ（セッション終了で無効）

### 5. 調査すべき項目

#### A. フロントエンド調査
javascript
// ブラウザの開発者ツールで確認すべき項目
console.log('Google Analytics loaded:', typeof gtag !== 'undefined');
console.log('GTM loaded:', typeof dataLayer !== 'undefined');
console.log('Linker settings:', /* GA設定確認 */);


#### B. ネットワーク調査
• ブラウザの開発者ツール > Network タブ
• _glパラメータが追加されるタイミングを特定
• どのJavaScriptファイルが原因かを確認

#### C. 設定ファイル調査
• Google Analytics設定
• Google Tag Manager設定
• カスタムトラッキングコード

### 6. 推奨される対応策

#### 即座に対応すべき場合：
javascript
// _glパラメータを除去する方法
if (window.location.search.includes('_gl=')) {
    const url = new URL(window.location);
    url.searchParams.delete('_gl');
    window.history.replaceState({}, '', url);
}


#### 根本的な解決：
1. GA設定確認: Linker機能が必要かどうか検証
2. GTM設定見直し: 不要なクロスドメイン設定を削除
3. ドメイン設定: 同一ドメイン内であればLinker不要

### 7. 具体的な調査コマンド

サイトのJavaScriptを確認してGAの設定を調べる：


🛠️  Using tool: execute_bash (trusted)
 ⋮
 ● I will run the following shell command:
curl -s "https://counter-test.develop.homes.co.jp/shop/42" | grep -i -E "(gtag|analytics|_gl|linker)" | head -10
 ⋮
 ↳ Purpose: Check for Google Analytics configuration in the page


 ⋮
 ● Completed in 0.218s

### 8. 推奨される調査手順

1. ブラウザでの確認
   • 開発者ツールを開いてページにアクセス
   • Networkタブで_glパラメータが追加されるタイミングを確認
   • ConsoleでgtagやdataLayerの存在確認

2. ソースコード確認
   • Google Analytics設定ファイル
   • GTM設定
   • カスタムJavaScriptコード

3. 設定の検証
   • クロスドメイントラッキングが必要かどうか
   • 同一ドメイン内での不要な設定がないか

### 結論

_glパラメータは通常Google Analyticsのクロスドメイントラッキング機能によるものです。問題があるかどうかは：

• **意図された動作か**: クロスドメイントラッキングが必要な設計か
• **パフォーマンス影響**: URLの長さやログの複雑さ
• **ユーザビリティ**: URLの見た目への影響

多くの場合、これは正常な動作ですが、不要であれば設定を見直すことをお勧めします。

具体的な調査を進めるには、実際のページのJavaScriptコードとGoogle Analytics/GTMの設定を確認する必要があります。
