## Rails 開発用 Docker 環境

以下のような感じで rails new できます

```bash
$ make init
$ docker run --rm -v $(pwd):/app:cached -t myrailsapp bundle exec rails new myapp
```

その後以下のように Webpacker 入れたりテンプレートファイルをコピーしてあげてください

```bash
$ cp Makefile Dockerfile docker-compose.yml myapp
$ cd myapp
$ docker run --rm -v $(pwd):/app:cached -t myrailsapp bundle exec rails webpacker:install
```
