export function AboutSection() {
  return (
    <div className="container mx-auto px-4 py-16 border-b border-border">
      {/* Aboutセクション */}
      <div className="mb-2 flex flex-row items-center">
        <h2 className="text-3xl font-bold text-foreground mr-4">About</h2>
        <div className="font-light">- 浩然之気について -</div>
      </div>

      <div className="border border-secondary mb-8"></div>

      <div className="max-w-6xl mx-auto">
        <div className="space-y-12 my-20">
          <div className="space-y-6">
            <h3 className="text-center text-2xl font-semibold text-foreground my-10">
              「浩然之気」とは
            </h3>
            <div className="text-muted-foreground leading-relaxed space-y-4 text-lg">
              <p>
                「浩然之気」（こうぜんのき）は、中国古典『孟子』に由来する言葉で、
                「天地に満ちる正しく雄大な気」を意味します。
              </p>
              <p>
                孟子は「私は浩然の気を養っている」と述べ、
                この気は正義と道理によって育まれ、
                継続的な修養によって培われるとしました。
              </p>
              <p className="text-base text-muted">出典：『孟子』公孫丑章句上</p>
            </div>
          </div>

          <div className="border-t border-border/30 pt-12">
            <div className="space-y-6">
              <h3 className="text-center text-2xl font-semibold text-foreground my-10">
                このブログについて
              </h3>
              <div className="text-muted-foreground leading-relaxed space-y-4 text-lg">
                <p>
                  <span className="font-bold">
                    「道徳的に正しく、おおらかで、自分らしく生きる」
                  </span>
                  ということが &ldquo;浩然之気を養う&rdquo; ことだと解釈しています。
                </p>
                <p>
                  私はこの言葉が好きで、このような人間でありたいと思い、
                  <span className="font-bold"> &ldquo;然&rdquo; -zen- </span>
                  という名前で活動しています。
                </p>
                <p>
                  webエンジニア然の「浩然之気」を養う日々の記録。趣味、日常、仕事。何事に対しても緩く、それでいて少しストイックに生きる過程を綴ります。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="aspect-video overflow-hidden rounded-lg shadow-md">
          <img
            src="/kozennoki.jpg"
            alt="浩然之気"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="my-10">
          <div className="text-center">
            <p className="text-sm text-muted leading-relaxed">
              継続的な学習と正しい道理を重んじ、雄大な気概を持って日々を過ごす
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
