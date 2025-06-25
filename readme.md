
# タスク管理アプリ
## 技術
  * **バックエンド:**
      * 言語: PHP 8
      * フレームワーク: Laravel v12
  * **フロントエンド:**
      * フレームワーク: Angular v20

## 機能
### 1. ログイン
  -  メールアドレスとパスワードでログイン
  -  ログインユーザー（ユーザー登録機能は実装していないため以下のユーザーで確認お願いします）
  -  email
      - test@example.com 
  -  password
      - password
### 2. タスク
- 自身の作成したタスクのみ。他のユーザーのタスクにはアクセスできない
  - タスクの一覧表示
  - 作成
  - 編集
  - 削除
- タスクの検索

## 環境構築
```
  docker compose up -d
```

- backendコンテナで以下を実行
```
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```

- frontディレクトリで以下を実行
```
npm install
npm start
```