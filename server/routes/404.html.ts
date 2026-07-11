export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Ahmed Hindy</title></head><body><main style="max-width:44rem;margin:12vh auto;padding:2rem;font-family:system-ui,sans-serif"><p>404</p><h1>That page does not exist.</h1><p>Try the portfolio or browse the blog.</p><p><a href="/">Portfolio</a> · <a href="/blog/">Blog</a></p></main></body></html>`
})
