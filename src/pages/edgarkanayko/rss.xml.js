import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const kanayko = await getCollection("edgarkanayko");
  return rss({
    stylesheet: "/rss/rss.xsl",
    title: "stoicopa",
    description: "My personal hamster wheel.",
    site: context.site,
    items: kanayko.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/edgarkanayko/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    })),
    customData: `<language>en-us</language>`,
  });
}
