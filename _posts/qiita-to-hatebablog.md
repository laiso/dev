---
title: 'Qiitaからはてなブログに記事を一括インポートする'
coverImage: https://i.imgur.com/ha0ETUm.jpg
ogImage:
  url: https://i.imgur.com/ha0ETUm.jpg
---

## 手順
1. [tenntenn/qiitaexporter](https://github.com/tenntenn/qiitaexporter) でQiitaの記事のmarkdownソースをダウンロードする
2. [x\-motemen/blogsync](https://github.com/x-motemen/blogsync) ではてなブログにpostする

## Qiitaの記事のmarkdownソースをダウンロードする

Qiitaの記事はURL末尾を `.md` にすることでmarkdown形式のテキストを返すAPIがあるため簡単なスクレイピングツールで手元にダウンロードしてこられます。

今回はtemplateを注入を利用してblogsync書式にするのがやりやすいためqiitaexporterを使いました(Qiita API v2を使って記事を取得してきます)。

Qiita記事をダウンロードするツールは他にもいくつか候補があります(例: [qiita\_export\_all](https://github.com/yumetodo/qiita_export_all))ので、必要に応じて代替策を講じてください。

qiitaexporterには画像ファイルをダウンロードして自分でホストできるようにimgタグを自動で書き換える機能があるのですが、はてなブログへの画像アップロードを実現するのが大変そうだったので、今回はタグの書き換えを無視するオプションを自分で追加しました。

```bash
git clone https://github.com/laiso/qiitaexporter.git
cd qiitaexporter/
go build
```

あとは [qiitaexporter](https://github.com/tenntenn/qiitaexporter) のREADMEに従いmarkdownファイルをダウンロードしてください。

書き出されるmarkdownファイルの形式を `blogsync.template` というファイルに定義します

```yaml
# blogsync.template
---
Title: {{.Title}}
Date: {{.Date}}T00:00:00+09:00
---

**この記事は[Qiita]({{.URL}})の記事をエクスポートしたものです。内容が古くなっている可能性があります。**

{{.Body}}
```

```bash

export QIITA=XXX
./qiitaexporter -imgignore -template blogsync.template
ls posts/
```

※前述のとうり`-imgignore` オプションはフォークで追加したものです

## はてなブログにpostする

[blogsync](https://github.com/x-motemen/blogsync#%E3%82%A8%E3%83%B3%E3%83%88%E3%83%AA%E3%82%92%E6%8A%95%E7%A8%BF%E3%81%99%E3%82%8Bblogsync-post) にはファイルを指定してはてなブログへ記事を投稿する機能があります。これを使いQiitaからダウンロードしたmarkdownファイルを指定して一括投稿します。

blogsync自体のセットアップはREADMEに従ってください。はてなブログの編集モードはあらかじめMarkdownモードに設定しておきます。

```bash
export BLOGURL=XXX.hatenadiary.jp
find posts -name "*.md" | xargs -I $ sh -c "blogsync post ${BLOGURL} < $"
```

一括投稿する前に `blogsync post ${BLOGURL} < posts/SOME.md` で1記事だけ試してみるとよいです。

## 免責事項
- 移行後も記事内の画像URLはQiitaのサーバー(Amazon S3)を参照しています
- blogsyncで大量にブログ記事を投稿するとロールバックがたいへん(新規記事として投稿される)なので検証環境を作ることをおすすめします
