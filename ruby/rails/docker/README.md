## Rails 開発用 Docker 環境

以下のような感じで rails new できます

```bash
$ make init
$ docker run --rm -v $(pwd):/app:cached -t myrailsapp bundle exec rails new myapp
```

その後以下のように必要に応じて Webpacker 入れたりテンプレートファイルをコピーしてあげてください

```bash
$ cp Makefile Dockerfile docker-compose.yml .rubocop.yml myapp
$ cd myapp
$ docker run --rm -v $(pwd):/app:cached -t myrailsapp bundle exec rails webpacker:install
```

作成したディレクトリでコンテナ立ち上げると Rails サーバが立ち上がります
あとは MySQL 入れるなり Nginx 入れるなりお好きにカスタマイズして見てね

```bash
$ make up
```

## system テストの実行

Dockerfile には system テスト時に必要な chromium-driver が入っていますがデフォルトでは sandbox モードなので
`test/application_system_test_case.rb` を以下のように書きかえてください

```ruby
require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400] do |options|
    options.add_argument('--no-sandbox')
  end
end
```
