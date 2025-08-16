# 最新LTSのNode.jsを使用
FROM node:22

# Claude Codeをインストール
RUN npm install -g @anthropic-ai/claude-code

# Taskをインストール
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

# serveをグローバルにインストール（静的サイト配信用）
RUN npm install -g serve

# uvをインストール（Python package manager）
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.cargo/bin:$PATH"

# 作業ディレクトリを設定
WORKDIR /workspace
