// Sanity schema definitions for blog posts and gallery items

export default {
  name: 'default',
  types: [
    {
      name: 'post',
      title: 'Blog Post',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{ type: 'author' }],
        },
        {
          name: 'mainImage',
          title: 'Main Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'category' }] }],
        },
        {
          name: 'publishedAt',
          title: 'Published At',
          type: 'datetime',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'excerpt',
          title: 'Excerpt',
          type: 'text',
          rows: 4,
        },
        {
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [
            {
              type: 'block',
            },
            {
              type: 'image',
            },
          ],
        },
      ],
      preview: {
        select: {
          title: 'title',
          author: 'author.name',
          media: 'mainImage',
        },
        prepare(selection: any) {
          const { author } = selection
          return { ...selection, subtitle: author && `by ${author}` }
        },
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'document',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      preview: {
        select: {
          title: 'name',
          media: 'image',
        },
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
      ],
    },
    {
      name: 'galleryItem',
      title: 'Gallery Item',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'category',
          title: 'Category',
          type: 'string',
          options: {
            list: [
              { title: 'Engineering', value: 'engineering' },
              { title: 'Software', value: 'software' },
              { title: 'Racing', value: 'racing' },
            ],
          },
        },
        {
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'metadata',
          title: 'Metadata',
          type: 'object',
          fields: [
            {
              name: 'fastestLap',
              title: 'Fastest Lap Time',
              type: 'string',
            },
            {
              name: 'projectType',
              title: 'Project Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Engineering', value: 'engineering' },
                  { title: 'ML Project', value: 'ml-project' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}

