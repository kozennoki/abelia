# 最新LTSのNode.jsを使用
FROM node:22

# Claude Codeをインストール
RUN npm install -g @anthropic-ai/claude-code

# Taskをインストール
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

# serveをグローバルにインストール（静的サイト配信用）
RUN npm install -g serve

# 作業ディレクトリを設定
WORKDIR /workspace
