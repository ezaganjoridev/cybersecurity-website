import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Newspaper, ArrowRight, Clock, Pin } from 'lucide-react';
import SEO from '../components/SEO';
import EditorialImage, { editorialImageUrl } from '../components/EditorialImage';
import { posts, formatDate, sortedPosts, pinnedPosts, unpinnedPosts } from '../data/posts';

const BlogPage = () => {
  const all = sortedPosts();
  const featured = pinnedPosts();
  const rest = unpinnedPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://cloudsecurecanada.com/blog#blog',
    name: 'Cloud Secure Canada Blog',
    description:
      'Practitioner analysis of breaches, threat activity, and compliance changes affecting Canadian and North American organisations.',
    url: 'https://cloudsecurecanada.com/blog',
    publisher: { '@id': 'https://cloudsecurecanada.com/#organization' },
    inLanguage: 'en-CA',
    blogPost: all.map((p) => ({
      '@type': 'BlogPosting',
      '@id': `https://cloudsecurecanada.com/blog/${p.slug}#post`,
      headline: p.title,
      datePublished: p.date,
      dateModified: p.updated || p.date,
      url: `https://cloudsecurecanada.com/blog/${p.slug}`,
      image: `https://cloudsecurecanada.com${editorialImageUrl(p.cover)}`,
      author: { '@id': 'https://cloudsecurecanada.com/#organization' },
    })),
  };

  return (
    <div className="page-top bg-dark-900 surface-grid min-h-screen">
      <SEO
        title="Field Notes"
        description="Practitioner analysis of breaches, ransomware, identity attacks and compliance change — written for Canadian and North American security teams."
        canonical="https://cloudsecurecanada.com/blog"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'Blog', url: 'https://cloudsecurecanada.com/blog' },
        ]}
        jsonLd={blogJsonLd}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-12 text-center md:mb-14">
          <div className="chip mb-6 justify-center">
            <Newspaper className="w-4 h-4" />
            <span>Field Notes</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-[1.1]">
            Analysis from the engagements, not the headlines
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            What actually changed, what it means for your controls, and what to do about it this
            quarter. No vendor pitches, no theoretical risk.
          </p>
        </header>

        {featured.length > 0 && (
          <section className="mb-14 md:mb-16" aria-labelledby="featured-heading">
            <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-dark-700 pb-3">
              <h2 id="featured-heading" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-300">
                <Pin className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
                Start here
              </h2>
              <span className="font-mono text-xs text-gray-600">Reference guides</span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featured.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="card-glow group flex flex-col overflow-hidden border-primary-500/25"
                >
                  <Link to={`/blog/${post.slug}`} className="block" tabIndex={-1} aria-hidden="true">
                    <div className="aspect-[16/9] overflow-hidden border-b border-dark-700">
                      <EditorialImage
                        base={post.cover}
                        alt=""
                        sizes="(min-width: 768px) 33vw, 92vw"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        fetchPriority={i === 0 ? 'high' : undefined}
                        className="block h-full w-full"
                        imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-3 font-mono text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1 text-primary-400">
                        <Pin className="h-3 w-3" aria-hidden="true" />
                        Pinned
                      </span>
                      <span className="h-1 w-1 rounded-full bg-dark-700" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {post.readingTime} min
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-primary-100">
                      <Link to={`/blog/${post.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span key={t} className="border border-primary-500/20 bg-primary-500/5 px-2 py-0.5 font-mono text-[11px] text-primary-300/80">
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 transition-colors group-hover:text-primary-300">
                      Read guide
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {featured.length > 0 && (
          <h2 className="mb-6 border-b border-dark-700 pb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
            Latest analysis
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.06 }}
              className="card-glow group flex flex-col overflow-hidden"
            >
              <Link to={`/blog/${post.slug}`} className="block" tabIndex={-1} aria-hidden="true">
                <div className="aspect-[16/9] overflow-hidden border-b border-dark-700">
                  <EditorialImage
                    base={post.cover}
                    alt=""
                    sizes="(min-width: 1024px) 352px, (min-width: 768px) 46vw, 92vw"
                    loading="lazy"
                    className="block w-full h-full"
                    imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 font-mono">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="w-1 h-1 rounded-full bg-dark-700" />
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {post.readingTime} min
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-white leading-snug mb-2 transition-colors group-hover:text-primary-100">
                  <Link to={`/blog/${post.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 text-primary-300/80 border border-primary-500/20 bg-primary-500/5">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                  Read analysis
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-12">
          {posts.length} articles · <Link to="/#contact" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">Talk to a consultant</Link> about any of this.
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
