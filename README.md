# Discord Bot with TypeScript Template

## Overview

- ESLint
- Prettier
- Jest
- dotenv

## Quick Start

### Clone Repository

```bash
$ git clone git@github.com:KusumotoKoki/discord-bot-with-typescript-template.git
```

### Get Discord Bot Token

- [Discord Developer Potal](https://discord.com/developers/applications)へ行き，「New Application」
    - ここでは，BotでなくApplicationの名前をつける（後から変更可能）
- `Bot` タブへ
	- Build-A-Bot
		- `Bot` のアイコンや名前を設定できる
		- `Reset Token` してそれをコピーし、メモしておく
			- Google Authenticator 要るかも
	- Authorization Flow
		- Public Bot: とりあえずオフ
		- Requires OAuth2 Code Grant: とりあえずオフ
	- Privileged Gateway Intents
		- Presence Intent: ON
		- Server Member Intent: ON
		- Message Content Intent: ON
- `OAuth2` タブへ
	- OAuth2 URL Generator
		- Scopes（App ができること？）
			- とりあえず `bot`
		- Bot permissions
			- とりあえず `Administrator`
	- 下の Generated URL へ飛んで、サーバーへ導入

### Botを起動する

```bash
$ npm run build
$ npm run start
```

## Customization

### Basic

- `src/` 以下にコードを書いていく
- `.env` に環境変数を追加したら，`src/types/env.d.ts` に環境変数の型を追加する
- `$ npm i <package>` や `$ npm i <package> --save-dev` でパッケージを追加

### Change Version of Node.js

- `$ nvm ls-remote` でインストール可能なバージョンを確認
- `$ nvm install <version>` でインストール
- `.nvmrc` に，使いたいバージョンを書く
- `$ nvm use` で，バージョンを変更
- `$ rm -rf node_modules package-lock.json`, `npm install` で依存関係を更新

## Deploy

### Glitch

- 次のリンクを踏んで、Discord.js v14 対応の Glitch のテンプレートを作ろう
	- https://glitch.com/edit/#!/remix/discord-js-v14-template-glitch/
- `.env` の `DISCORD_BOT_TOKEN` に先ほどメモしたトークンを入れる
	- この時点で、bot を導入したサーバーの適当なチャンネルで `hello.` とメッセージを送れば、bot が反応してくれるようになったはず！
- `package.json`は，
	- `dependencies`の部分のみ，TypeScriptプロジェクトの方の`package.json`のものと同じにする（上のAdd Packageボタンから追加すること）
	- ただし，`@types/node`は不要
	- ターミナルでの`npm install`や，`packagejson`を直接書き換えるのは「ダメ！」
		- [Glitchを使う上での注意点](https://scrapbox.io/discordjs-japan/Glitch%E3%82%92%E4%BD%BF%E3%81%86%E4%B8%8A%E3%81%A7%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)
    - Node.jsのバージョン依存関係の絶妙なバランスが壊れる危険性を孕んでおり，注意が必要
        - GlitchがNode.jsのv16までしか対応してないのがわるわる
- server.jsと、code.jsを、先ほど生成したコードで置き換える
- エラーが起きている場合は、左下の「STATUS」が😡になる
- 「Share」をクリックして「Live Site」の URL をコピーし、以下の GAS を作成する

```js
// How to use
// - Set Glitch's "Live Site" URL
// - send() once manually using above button "実行"
//     - you need to authorize this project
// - Next, go to Trigger Tab
// - create send() trigger to execute every 5 minutes
// - you don't have to deploy this GAS

function send(){
	const URL = "コピーしたURL"
	response = UrlFetchApp.fetch(URL, {
		'Content-Type': 'application/json; charset=utf-8',
		'method': 'post',
		'payload': {
			'type': 'wake'
		},
		'muteHttpExceptions': true
	});
}
```

- GAS のトリガーを作成して、5 分おきに `send` を実行する
	- Connect to an external service の許可を与える必要がある

## Render.com

- Web Serviceとして新規作成し，このリポジトリをSource Codeとして選択
- Build Command: `$ npm install`
- Start Command: `$ npm run start`
- Environment Variables: `.env`の`DISCORD_BOT_TOKEN`と`PORT`を設定
	- PORT関連の設定について: https://docs.render.com/web-services#port-binding
