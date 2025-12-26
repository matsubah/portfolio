# madoguchi-web Dev Container 起動エラー解決ログ

**日時**: 2025-08-27  
**プロジェクト**: madoguchi-web  
**環境**: macOS + Rancher Desktop + VS Code Dev Containers

## 発生したエラー

### 1. netskopeフィーチャーアクセスエラー
```
Could not resolve Feature manifest for 'ghcr.io/lifull-growth/devcontainer-features/netskope:1'.
Feature 'ghcr.io/lifull-growth/devcontainer-features/netskope:1' could not be processed.
```

### 2. docker-credential-osxkeychainエラー
```
error getting credentials - err: exec: "docker-credential-osxkeychain": executable file not found in $PATH
```

### 3. PostgreSQL接続エラー（以前から）
```
connection to server at "::1", port 5432 failed: Connection refused
connection to server at "127.0.0.1", port 5432 failed: Connection refused
```

## 解決手順

### 1. GitHub Container Registryログイン
```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u matsubah --password-stdin
```
**結果**: Login Succeeded

### 2. netskopeフィーチャーの無効化
**ファイル**: `.devcontainer/devcontainer.json`

**変更前**:
```json
"features": {
  "ghcr.io/lifull-growth/devcontainer-features/netskope:1": {},
  "ghcr.io/devcontainers/features/github-cli:1": {},
  "ghcr.io/rails/devcontainer/features/activestorage": {},
  "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
  "ghcr.io/rails/devcontainer/features/postgres-client": {}
},

"overrideFeatureInstallOrder": [
  "ghcr.io/lifull-growth/devcontainer-features/netskope:1"
],
```

**変更後**:
```json
"features": {
  // "ghcr.io/lifull-growth/devcontainer-features/netskope:1": {},
  "ghcr.io/devcontainers/features/github-cli:1": {},
  "ghcr.io/rails/devcontainer/features/activestorage": {},
  "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
  "ghcr.io/rails/devcontainer/features/postgres-client": {}
},

// "overrideFeatureInstallOrder": [
//   "ghcr.io/lifull-growth/devcontainer-features/netskope:1"
// ],
```

### 3. PostgreSQL接続設定修正
**ファイル**: `config/database.yml`

**変更前**:
```yaml
development:
  primary:
    <<: *postgres_base
    host: localhost
    port: 5432
    database: madoguchi_web_db
    username: postgres
    password: postgres
    sslmode: disable
```

**変更後**:
```yaml
development:
  primary:
    <<: *postgres_base
    host: <%= ENV.fetch("DB_HOST", "localhost") %>
    port: 5432
    database: madoguchi_web_db
    username: postgres
    password: postgres
    sslmode: disable
```

### 4. docker-credential-osxkeychain問題の解決

#### 4.1 docker-credential-helperの確認
```bash
brew install docker-credential-helper
which docker-credential-osxkeychain
# /opt/homebrew/bin/docker-credential-osxkeychain
```

#### 4.2 シンボリックリンクの作成
```bash
sudo ln -sf /opt/homebrew/bin/docker-credential-osxkeychain /usr/local/bin/docker-credential-osxkeychain
```

#### 4.3 Docker設定の一時的修正
**ファイル**: `~/.docker/config.json`

**一時的に変更**:
```json
{
  "auths": {
    "ghcr.io": {},
    "https://index.docker.io/v1/": {}
  },
  "currentContext": "rancher-desktop"
}
```

**元の設定**:
```json
{
  "auths": {
    "ghcr.io": {},
    "https://index.docker.io/v1/": {}
  },
  "credsStore": "osxkeychain",
  "currentContext": "rancher-desktop"
}
```

#### 4.4 Rancher Desktopの再起動
```bash
killall "Rancher Desktop" && sleep 3 && open "/Applications/Rancher Desktop.app"
```

## 確認済み事項

### Docker Composeでの動作確認
```bash
cd /Users/matsubah/projects/madoguchi-web
docker compose -f .devcontainer/compose.yaml ps
```
**結果**: PostgreSQL、Selenium、Rails-appコンテナが正常起動

### PostgreSQL接続確認
```bash
docker compose -f .devcontainer/compose.yaml exec rails-app env | grep DB_HOST
```
**結果**: `DB_HOST=postgres` (正常)

## 残存課題

### Ruby環境のセットアップ
- Dev Container内でRubyが未インストール状態
- postCreateCommandが実行されていない
- 手動でのrbenvインストールはSSL証明書エラーで失敗

## 推奨解決策

1. **VS Code Dev Container機能の使用**
   - コマンドパレット → "Dev Containers: Rebuild Container"
   - postCreateCommandが自動実行され、Ruby環境が正しくセットアップされる

2. **修正内容の確認**
   - ✅ netskopeフィーチャー無効化
   - ✅ GitHub Container Registryログイン
   - ✅ docker-credential-osxkeychain問題解決
   - ✅ PostgreSQL接続設定修正
   - ✅ Docker設定修正

## 関連ファイル

- `.devcontainer/devcontainer.json` - Dev Container設定
- `.devcontainer/compose.yaml` - Docker Compose設定
- `config/database.yml` - データベース設定
- `~/.docker/config.json` - Docker認証設定
- `create_admin.rb` - 管理者ユーザー作成スクリプト

## 次回の作業

1. VS Code Dev Containerでの正常起動確認
2. `bin/rails db:create` の実行
3. 管理者ユーザーの作成（`ruby create_admin.rb`）
4. EE環境でのユーザー管理（kubectl接続設定後）

## 参考情報

- Dev Container Features: https://containers.dev/features
- Docker Credential Helpers: https://docs.docker.com/engine/reference/commandline/login/#credential-helpers
- Rancher Desktop: https://rancherdesktop.io/
