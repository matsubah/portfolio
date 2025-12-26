# CSS Layers使用時の詳細度問題と解決方法

## 問題の概要

LP統合作業中、`@layer reset`で囲まれたCSSと通常のCSSを混在させた際に、読み込み順序に関わらず表示が崩れる問題が発生しました。

## 発生した状況

**ファイル構成:**
```erb
<!-- seminar002/_index.html.erb -->
<%= stylesheet_link_tag "lp/common/lp_common" %>        <!-- @layerなし -->
<%= stylesheet_link_tag "lp/common/lp_seminar002" %>    <!-- @layer reset あり -->
```

**CSS内容:**
```css
/* lp_common.css - @layerなし */
.full-width__inner {
  max-width: 940px;
}

/* lp_seminar002.css - @layer reset あり */
@layer reset {
  .full-width__inner {
    max-width: 750px;
  }
}
```

**期待する動作:**
- 読み込み順序が後の`lp_seminar002.css`の`max-width: 750px`が適用される

**実際の動作:**
- 先に読み込まれた`lp_common.css`の`max-width: 940px`が適用される ❌

## 原因

CSS Layersの仕様により、**`@layer`内のスタイルは通常のCSSより詳細度が低い**ため、読み込み順序に関わらず通常のCSSが優先されます。

### CSS Layersの優先度ルール

```
通常のCSS（レイヤーなし） > @layer内のCSS
```

読み込み順序が後でも、`@layer`内のスタイルは通常のCSSに負けます。

## 解決方法

**両方のCSSファイルを同じレイヤーに配置する**ことで、読み込み順序による優先度制御が正常に機能します。

```css
/* lp_common.css - @layer reset を追加 */
@layer reset {
  .full-width__inner {
    max-width: 940px;
  }
}

/* lp_seminar002.css - @layer reset（変更なし） */
@layer reset {
  .full-width__inner {
    max-width: 750px;
  }
}
```

**結果:**
- ✅ 両方が同じ`@layer reset`内に配置
- ✅ 読み込み順序が後の`lp_seminar002.css`が優先される
- ✅ `max-width: 750px`が正しく適用される

## 教訓

1. **`@layer`の有無を統一する**: 同じスコープのCSSファイルでは、全て`@layer`で囲むか、全て囲まないかを統一する
2. **読み込み順序だけでは制御できない**: `@layer`を使用している場合、読み込み順序よりもレイヤーの有無が優先される
3. **既存CSSとの互換性**: 既存のCSSが`@layer`を使用している場合、新規追加するCSSも同じレイヤーに配置する必要がある

## 参考

- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [CSS Cascade Layers の優先順位](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers)

## 関連コミット

- seminar002統合: `facd4b6b`
- linesoudan系統合: `ed6b8d8a`
