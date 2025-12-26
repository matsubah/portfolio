# iezukuri-web 開発

## 方法1: Docker Compose（推奨）

### 全サービスをローカルで起動

bash
cd /Users/matsubah/projects/iezukuri-dev-env

#### Rancher Desktopが起動していることを確認
docker ps

#### 全サービス起動
docker compose -f docker-compose.common.yml -f docker-compose.web.yml up

#### 終了時
docker compose -f docker-compose.common.yml -f docker-compose.web.yml down

---

# 接続できない場合の対策：

## 1. コンテナ起動前にポート競合を確認：

bash
lsof -nP -iTCP:3004 | grep LISTEN


## 2. 競合するプロセスを停止してからコンテナ起動：

bash
# 競合プロセスのPIDを確認して停止
kill <PID>
docker start iezukuri-web


## ポート競合時の例

### 競合している場合：

bash
lsof -nP -iTCP:3004 | grep LISTEN
Code\x20H  1297 matsubah   33u  IPv4 0xae3e730de04976f5      0t0  TCP 127.0.0.1:3004 (LISTEN)
ssh       7451 matsubah   30u  IPv4 0x64474c36298a1893      0t0  TCP *:3004 (LISTEN)

→ VSCode (PID: 1297) とSSH (PID: 7451) がポート3004を使用中

### 競合していない場合（正常）：

bash
lsof -nP -iTCP:3004 | grep LISTEN
(何も表示されない、またはdockerプロセスのみ)


---

ダメだった時

## 解決した問題のまとめ

1. ポート3004の競合 - VSCodeとSSHプロセスがポートを占有していた
2. Dockerファイルシステムの破損 - Rancher Desktopの再起動で解決
3. 外部キー制約違反 - 3つのvisit_preferred_datetime制約をコメントアウト
4. マテリアライズドビューのエラー - external.image_searchをコメントアウト
5. 欠けているテーブル - master_image_search_categoriesとmaster_image_stylesを作成
6. 欠けているカラム - deleted_at, image_style_id, sortを追加
