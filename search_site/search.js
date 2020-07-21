const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function search(query) {

  const { body } = await client.search({
    index: 'books',
    body: {
      query: {
        multi_match: {
          query: query,
          type: "phrase_prefix",
          fields: ["authors.name", "title^4","bookshelves^3", "subjects^2"]
        },
      }
    }
  })


  return body.hits.hits
}

module.exports = search
