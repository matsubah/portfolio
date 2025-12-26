# iezukuri-web 開発環境セットアップまとめ

## 前提条件

• Node.js 16.x (miseで管理)
• Rancher Desktop (Docker代替)
• Netskope (VPN/プロキシ)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 方法1: Docker Compose（推奨）

### 全サービスをローカルで起動

bash
cd /Users/matsubah/projects/iezukuri-dev-env

# Rancher Desktopが起動していることを確認
docker ps

# 全サービス起動
docker compose -f docker-compose.common.yml -f docker-compose.web.yml up


アクセス先: http://localhost:3004/iezukuri/

含まれるサービス:
• iezukuri-web (3004, 3005ポート)
• iezukuri-web-api (3002ポート)
• iezukuri-db (PostgreSQL)
• iezukuri-hasura
• Redis, Mailhog

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 方法2: Dev Container（VS Code）

### 起動方法

1. VS Codeで /Users/matsubah/projects/iezukuri-dev-env を開く
2. Cmd+Shift+P → Dev Containers: Reopen in Container
3. コンテナ内で:
  bash
   cd /workspaces/iezukuri-dev-env/iezukuri-web
   npm run local


アクセス先: http://localhost:3004/iezukuri/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 方法3: ホストマシンで直接実行

### 前提
• Node 16が必要
• ローカルAPIサーバーが起動している必要あり

bash
cd /Users/matsubah/projects/iezukuri-dev-env/iezukuri-web

# Node 16を使用
mise exec node@16 -- npm install

# .envファイルを設定（ローカルAPI用）
cat > .env << 'EOF'
NODE_ENV=development
LOG_LEVEL=debug
HOST_SERVER=localhost
PORT_SERVER=3005
PORT_CLIENT=3004
API_SCHEME=http
API_HOST=localhost
API_PORT=3002
GRAPHQL_URL=http://localhost:3002/v1/graphql
SESSION_SECRET=__TBD__
ENV=development
TEALIUM_ACCOUNT=lifull
TEALIUM_ENVIRONMENT=dev
TEALIUM_PROFILE=web
HASURA_ROLE=web
IMAGE_FILE_PATH=https://iezukuri-image-dev-upload.s3-ap-northeast-1.amazonaws.com
IMAGE_SERVER_HOST=image-test.homes.co.jp
IMAGE_SERVER_PATH=/smallimg/image.php
IMAGE_SERVER_SCHEME=https
PRIVATE_TRACE_COOKIE_NAME=c_test_private_trace_uid
BP_PAGE=https://iezukuri-business.homes.jp/lists/lifull-service/lifull-service-00004
EOF

# 起動
mise exec node@16 -- npm run local


アクセス先: http://localhost:3004/iezukuri/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## トラブルシューティング

### Rancher Desktopのエラー（I/O error）

Lima VMが破損している場合：

bash
# Rancher Desktopを終了
killall "Rancher Desktop" 2>/dev/null

# Lima VMをリセット
rm -rf ~/.lima/0

# 再起動
open -a "Rancher Desktop"


起動完了まで5-10分待つ。

### webpack-dev-serverのallowedHostsエラー

/Users/matsubah/projects/iezukuri-dev-env/iezukuri-web/webpack.config.js:

javascript
allowedHosts: "all",


### 外部APIサーバー接続エラー

Docker環境では、Netskopeを経由した外部API（iezukuri-web-api.k8s.dev.nxin.jp）への接続が困難です。

解決策: ローカルで全サービスを起動する（方法1を使用）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 重要な修正内容

1. webpack.config.js: allowedHosts: "all" に変更
2. .env: ローカルAPI用に設定（API_HOST=localhost, API_PORT=3002）
3. Node.js: バージョン16を使用（mise exec node@16）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 環境変数の違い

### ローカルAPI用
API_HOST=localhost
API_PORT=3002
GRAPHQL_URL=http://localhost:3002/v1/graphql


### 外部API用（非推奨 - Docker環境では動作しない）
API_HOST=iezukuri-web-api.k8s.dev.nxin.jp
# API_PORT は削除
GRAPHQL_URL=http://iezukuri-web-api.k8s.dev.nxin.jp/v1/graphql
