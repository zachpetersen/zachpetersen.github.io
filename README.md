# e53 Cyberspace Blog Homepage Thing

Based on Deno and Lume.

## Getting Started

1. Make sure you have [Deno installed](https://deno.land/#installation).
2. Clone this Repository
   `git clone https://github.com/lumeland/base-blog.git my-blog-name`
3. Edit `_data/site.yml`. Specifically have a look at `_config.js` to see if you
   want to configure any option differently. See the
   [Lume documentation site](https://lume.land/).
4. Run Lume with `deno task serve`.

### Implementation Notes

- `about.md` shows how to add a content page.
- `posts/` has the blog posts but really they can live in any directory. The
  `posts/_data.yml` file adds the value for `type` and `layout` fields to all
  posts.
- The `menu` field adds any page to the top level site navigation. For example,
  this is in use on `index.njk` and `about.md`. You can configure the order with
  `menu.order` and the text with `menu.title`.
- `css` files are processed with `postcss` plugin. The imported styles are in
  `_includes/css`
- `img` folder is copied as is, (keeping the same directory structure).
- The blog post feed template is in `feed.xml.njk` and `feed.tmpl.js`.
- This example uses four layouts stored in `_includes/layouts/`:
  - `base.njk`: the top level HTML structure
  - `home.njk`: the home page template (wrapped into `base.njk`)
  - `post.njk`: the blog post template (wrapped into `base.njk`)
  - `tag.njk`: the tag page template (wrapped into `base.njk`)
- `_includes/templates/postlist.njk` is a Nunjucks a reusable template used to
  display a list of all the posts. `index.njk` has an example of how to use it.
- `admin/` has the [NetlifyCMS](https://www.netlifycms.org/) configuration so
  you can edit or create new posts using a friendly CMS.

## Deployment

### GitHub Pages

- [Get your own Lume blog on Github Pages](https://github.com/lumeland/base-blog/generate)
- Open the file `.github/workflows/build.yml` and edit the `--location` option
  with the url of the site, for example
  `--location=https://username.github.io/repo/`
- Enable Github Pages and select the branch `gh-pages` as source.
- [See a live demo](https://lumeland.github.io/base-blog/)
