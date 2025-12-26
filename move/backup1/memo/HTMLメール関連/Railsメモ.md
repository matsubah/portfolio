【Rails】rails db: から始まるコマンドまとめ #Ruby - Qiita
https://qiita.com/PDC-Kurashinak/items/25e9a985503cd068c0b1

## Amazon Qによる要約

### 基本的なコマンド
• rails db:create - データベース作成
• rails db:drop - データベース削除
• rails db:migrate - マイグレーション実行(最新状態に更新)
• rails db:rollback - マイグレーションを1つ戻す
• rails db:migrate:status - マイグレーション状態の確認

### データ投入系
• rails db:seed - seeds.rbから初期データを投入
• rails db:fixtures:load - テスト用フィクスチャデータをロード

### スキーマ管理
• rails db:schema:load - schema.rbからスキーマをロード
• rails db:schema:dump - 現在のスキーマをschema.rbに出力
• rails db:structure:dump / load - structure.sqlでの構造管理

### 便利な一括コマンド
• rails db:setup - 作成+スキーマロード+初期値投入 (create + load + seed)
• rails db:reset - 削除+再作成+スキーマロード+初期値投入 (drop + create + load + seed)
• rails db:prepare - DB存在チェックして適切な処理を実行 (setup / migrate)
※データベースが存在しない場合は、rails db:setupと同様の動作、存在する場合にはrails db:migrateと同様の動作がされます

### その他
• rails db:version - スキーマバージョン表示
• rails db:console - DBコンソールを開く
• rails db:environment:set - 環境設定
• rails db:test:prepare - テストDBを開発DBのスキーマに合わせる
• rails db:test:load
