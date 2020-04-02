const Helpers = use('Helpers')
const fs = require('fs')
const { renderMarkdown } = use('App/Helpers/Markdown')

class SiteController {
  async index () {
    const mdPath = Helpers.publicPath('about.md')
    const html = renderMarkdown(fs.readFileSync(mdPath, "utf8"))

    return `
      <html>
      <head>
        <title>COVID-19 by codeville api docs</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css" />
      </head>
      <body class="markdown-body">${html}</body>
      </html>`
  }
}

module.exports = SiteController
