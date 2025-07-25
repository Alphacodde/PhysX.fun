export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text' },
    { name: 'body', type: 'blockContent' },
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'mainImage', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', type: 'datetime' }
  ]
};
