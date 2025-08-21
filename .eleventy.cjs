/**
 * Eleventy Configuration - Mentoria Seja Livre
 * Basic configuration for development
 */

module.exports = function(eleventyConfig) {
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Ignore directories
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("*.md");
  
  // Configure directories
  return {
    dir: {
      input: "src",
      includes: "_includes", 
      data: "_data",
      output: "_site"
    },
    pathPrefix: "/",
    templateFormats: ["njk", "html"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};