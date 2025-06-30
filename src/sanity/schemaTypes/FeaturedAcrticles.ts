// sanity-project/schemas/featuredArticle.js
import { defineField, defineType } from 'sanity';
// Import icons from @sanity/icons for better visual representation in Sanity Studio
import { AtomIcon, CalculatorIcon, BookOpenIcon, ZapIcon } from 'lucide-react'; 

export const featuredArticle = defineType({
  name: 'featuredArticle',
  title: 'Featured Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A short catchy phrase for the article',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'iconType', // This string will be used to select the LucideReact icon
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Atom', value: 'atom' },
          { title: 'Calculator', value: 'calculator' },
          { title: 'Book Open', value: 'bookOpen' },
          { title: 'Zap (Lightning)', value: 'zap' },
          // Add more LucideReact icon names as needed
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'colorGradient',
      title: 'Card Color Gradient (Tailwind Classes)',
      type: 'string',
      description: 'e.g., "from-cyan-500 to-blue-600", "from-purple-500 to-pink-600"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Text',
      type: 'string',
      description: 'e.g., "12 Articles", "8 Proofs"',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 0, 1, 2)',
      validation: Rule => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      iconType: 'iconType',
    },
    prepare(selection) {
      const { title, subtitle, iconType } = selection;
      // Map iconType string to the corresponding Sanity icon component for preview
      const icons = {
        atom: AtomIcon,
        calculator: CalculatorIcon,
        bookOpen: BookOpenIcon,
        zap: ZapIcon,
      };
      const IconComponent = icons[iconType as keyof typeof icons];

      return {
        title: title,
        subtitle: subtitle,
        media: IconComponent ? <IconComponent /> : undefined,
      };
    },
  },
});