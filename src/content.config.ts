import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sourceRef = z.object({
  outlet: z.string(),
  url: z.string().url().or(z.literal('')),
  author: z.string().optional()
});

const keyFact = z.object({
  fact: z.string(),
  source: z.string(),
  url: z.string().url(),
  outlet: z.string(),
  year: z.string()
});

const story = z
  .object({
    name: z.string(),
    age: z.number().optional(),
    age_at_conviction: z.number().optional(),
    country: z.string().optional(),
    year: z.number().optional(),
    tag: z.string(),
    story: z.string(),
    ruling: z.string().optional(),
    current_status: z.string().optional(),
    un_quote: z.string().optional(),
    victim_quote: z.string().optional(),
    lawsuit: z.string().optional(),
    petition: z.string().optional(),
    tweet_example: z.string().optional(),
    irony: z.string().optional(),
    purpose: z.string().optional(),
    key_insight: z.string().optional(),
    led_indicator_failure: z.string().optional(),
    expert_warning: z.string().optional(),
    punchline: z.string().optional(),
    victims: z
      .array(
        z.object({ name: z.string(), age: z.number().optional(), story: z.string() })
      )
      .optional(),
    removal_guide: z.object({ title: z.string(), url: z.string().url() }).optional(),
    sources: z.array(sourceRef)
  })
  .passthrough();

const chapter = z.object({
  id: z.string(),
  number: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  thesis: z.string(),
  punchline: z.string(),
  key_facts: z.array(keyFact).optional(),
  internal_documents: z
    .object({
      title: z.string(),
      context: z.string(),
      findings: z.array(z.string()),
      sources: z.array(sourceRef)
    })
    .optional(),
  stories: z.array(story).optional(),
  context_data: z
    .object({
      stat: z.string(),
      operations: z.string(),
      anonymous_quote: z.string()
    })
    .optional(),
  headline_breach: z
    .object({
      title: z.string(),
      scale: z.string(),
      data_exposed: z.array(z.string()),
      outrage: z.string(),
      why_phone_numbers_matter: z.string(),
      free_distribution: z.string(),
      sources: z.array(sourceRef)
    })
    .optional(),
  breach_timeline: z
    .array(
      z.object({
        year: z.number(),
        event: z.string(),
        scale: z.string(),
        detail: z.string()
      })
    )
    .optional(),
  sources_timeline: z.array(sourceRef).optional(),
  self_check: z
    .object({
      title: z.string(),
      tool_name: z.string(),
      url: z.string().url(),
      description: z.string()
    })
    .optional(),
  chain: z
    .object({
      title: z.string(),
      intro: z.string(),
      links: z.array(
        z
          .object({
            step: z.number(),
            title: z.string(),
            description: z.string(),
            source_quote: z.string().optional(),
            source: z.string().optional(),
            url: z.string().url().optional()
          })
          .passthrough()
      )
    })
    .optional(),
  palantir_business_model: z
    .object({
      title: z.string(),
      key_point: z.string(),
      data_sources: z.array(
        z
          .object({
            type: z.string(),
            description: z.string(),
            source: z.string().optional(),
            url: z.string().url().optional()
          })
          .passthrough()
      ),
      feedback_loop: z.object({
        title: z.string(),
        description: z.string(),
        translation: z.string(),
        source: z.string(),
        url: z.string().url()
      })
    })
    .optional(),
  gaza_systems: z
    .object({
      title: z.string(),
      intro: z.string(),
      systems: z.array(
        z
          .object({
            name: z.string(),
            function: z.string(),
            scale: z.string().optional(),
            error_rate: z.string().optional(),
            human_oversight: z.string().optional(),
            officer_quote: z.string().optional(),
            purpose: z.string().optional(),
            result: z.string().optional(),
            officer_quote_about_civilians: z.string().optional()
          })
          .passthrough()
      ),
      casualties_context: z.string(),
      sources: z.array(sourceRef)
    })
    .optional(),
  palantir_quotes: z
    .object({
      title: z.string(),
      intro: z.string(),
      quotes: z.array(
        z.object({
          quote: z.string(),
          context: z.string(),
          source: z.string(),
          url: z.string().url()
        })
      )
    })
    .optional()
});

const siteSchema = z.object({
  campaign: z.object({
    name: z.string(),
    tagline: z.string(),
    subtitle: z.string(),
    language: z.string(),
    tone: z.string(),
    thesis: z.string(),
    call_to_action_primary: z.string(),
    call_to_action_secondary: z.string()
  }),
  hero: z.object({
    kicker: z.string(),
    headline: z.string(),
    subheadline: z.string(),
    lead: z.string(),
    scroll_hint: z.string()
  }),
  chapters: z.array(chapter),
  interactive_tool: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    intro: z.string(),
    global_average_minutes_per_day: z.number(),
    average_source: sourceRef,
    input: z.object({
      label: z.string(),
      type: z.string(),
      min: z.number(),
      max: z.number(),
      step: z.number(),
      default: z.number(),
      unit: z.string()
    }),
    calculations: z.record(z.string(), z.string()),
    comparisons: z.object({
      title: z.string(),
      intro: z.string(),
      items: z.array(
        z.object({
          activity: z.string(),
          average_duration_hours: z.number(),
          icon: z.string(),
          description: z.string()
        })
      )
    }),
    verdict_thresholds: z.array(
      z.object({
        max_hours: z.number(),
        message: z.string(),
        tone: z.string()
      })
    ),
    share_format: z.object({ title: z.string(), template: z.string() })
  }),
  manifesto: z.object({
    title: z.string(),
    subtitle: z.string(),
    items: z.array(z.object({ n: z.number(), text: z.string() }))
  }),
  actions: z.object({
    title: z.string(),
    subtitle: z.string(),
    tiers: z.array(
      z
        .object({
          level: z.string(),
          duration: z.string(),
          items: z.array(z.string()),
          removal_guide_link: z.string().url().optional()
        })
        .passthrough()
    )
  }),
  alternatives: z.object({
    title: z.string(),
    subtitle: z.string(),
    categories: z.array(
      z.object({
        category: z.string(),
        options: z.array(
          z.object({
            name: z.string(),
            url: z.string().url().or(z.literal('')).optional(),
            description: z.string()
          })
        )
      })
    )
  }),
  ui: z.object({
    skip_to_content: z.string(),
    table_of_contents: z.string(),
    language_label: z.string(),
    auto_detect: z.string(),
    translation_disclaimer: z.string(),
    sources_label: z.string(),
    show_sources: z.string(),
    hide_sources: z.string(),
    calculator: z.object({
      result_hours_year: z.string(),
      result_days_year: z.string(),
      result_decade_days: z.string(),
      result_lifetime: z.string(),
      share_button: z.string(),
      copied: z.string(),
      axis_hours: z.string(),
      vs_global_average: z.string()
    }),
    chapter_label: z.string(),
    read_more: z.string(),
    to_top: z.string()
  }),
  footer: z.object({
    tagline: z.string(),
    license: z.string(),
    contact_placeholder: z.string(),
    credits: z.string(),
    last_updated: z.string()
  })
});

export type SiteContent = z.infer<typeof siteSchema>;

export const collections = {
  site: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/site' }),
    schema: siteSchema
  })
};
