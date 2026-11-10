import { HtmlBasePlugin, RenderPlugin } from "@11ty/eleventy";

const shortDate = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export default function (eleventyConfig) {
  // Rewrites root-relative URLs (/assets/...) when the site is served under a
  // sub-path, e.g. GitHub Pages at /sandwich-carer/. Set PATH_PREFIX at build time.
  eleventyConfig.addPlugin(HtmlBasePlugin);
  // Lets pages pull in editable Markdown, e.g. the About text.
  eleventyConfig.addPlugin(RenderPlugin);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets");

  // Posts live in src/posts/*.md, newest first.
  eleventyConfig.addCollection("postsNewest", (api) =>
    api.getFilteredByTag("posts").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("head", (items, n) => items.slice(0, n));
  eleventyConfig.addFilter("byCategory", (posts, key) =>
    posts.filter((p) => p.data.category === key)
  );
  // Guides are plain data (src/_data/guides.json), not collection items.
  eleventyConfig.addFilter("inCategory", (items, key) => items.filter((i) => i.category === key));
  eleventyConfig.addFilter("featured", (items) => items.filter((i) => i.featured));
  eleventyConfig.addFilter("postDate", (d) => shortDate.format(d));
  eleventyConfig.addFilter("isoDate", (d) => d.toISOString().slice(0, 10));

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
