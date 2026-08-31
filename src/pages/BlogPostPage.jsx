import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import EditorialImage, { editorialImageUrl } from '../components/EditorialImage';
import PostDiagram from '../components/PostDiagram';
import CodeBlock from '../components/CodeBlock';
import DetectionRule from '../components/DetectionRule';
import { getPost, getNeighbours, formatDate } from '../data/posts';
import { getPostDiagram } from '../data/postDiagrams';

/** Renders trusted inline <b> markup from the post body without dangerouslySetInnerHTML. */
const Inline = ({ text }) => (
  <>
    {text.split(/(<b>.*?<\/b>)/g).map((part, i) =>
      part.startsWith('<b>')
        ? <strong key={i} className="text-white font-semibold">{part.slice(3, -4)}</strong>
        : <React.Fragment key={i}>{part}</React.Fragment>
    )}
  </>
);

const Block = ({ block }) => {
  switch (block.t) {
    case 'h2':
      return <h2 className="text-xl md:text-2xl font-bold text-white mt-10 mb-3 leading-snug">{block.c}</h2>;
    case 'ul':
      return (
        <ul className="my-5 space-y-2.5 pl-1">
          {block.c.map((li, i) => (
            <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 bg-primary-500 shrink-0" aria-hidden="true" />
              <span><Inline text={li} /></span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="my-5 space-y-2.5">
          {block.c.map((li, i) => (
            <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
              <span className="font-mono text-xs text-primary-400 mt-1 shrink-0 w-5">{String(i + 1).padStart(2, '0')}</span>
              <span><Inline text={li} /></span>
            </li>
          ))}
        </ol>
      );
    case 'h3':
      return <h3 className="text-base md:text-lg font-semibold text-gray-100 mt-7 mb-2 leading-snug">{block.c}</h3>;
    case 'code':
      return <CodeBlock code={block.c} label={block.label} className="my-6" />;
    case 'detect':
      return <DetectionRule rule={block.c} />;
    case 'table':
      // Wide tables scroll inside their own container so the article column
      // never forces horizontal scroll on the page body.
      return (
        <div className="my-7 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="border-b border-dark-600 px-3 py-2 text-left font-semibold text-gray-200 align-bottom">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="align-top">
                  {row.map((cell, c) => (
                    <td key={c} className="border-b border-dark-800 px-3 py-2.5 text-gray-400 leading-relaxed">
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'note':
      return (
        <aside className="my-7 border-l-2 border-primary-500 bg-primary-500/5 px-5 py-4">
          <p className="text-sm text-gray-300 leading-relaxed m-0"><Inline text={block.c} /></p>
        </aside>
      );
    default:
      return <p className="text-gray-300 leading-relaxed my-4"><Inline text={block.c} /></p>;
  }
};

/**
 * Post titles carry the brand only when the pair still fits the ~60-char SERP
 * and tab budget. A long headline is distinctive enough on its own, and a
 * truncated brand ("... · Cloud Secure Can") reads worse than none.
 */
const BRAND_SUFFIX = ' · Cloud Secure Canada';
const TITLE_BUDGET = 60;

export const postTitle = (title) => {
  if (title.length + BRAND_SUFFIX.length <= TITLE_BUDGET) return `${title}${BRAND_SUFFIX}`;
  return title.length <= TITLE_BUDGET ? title : `${title.slice(0, TITLE_BUDGET - 1).trimEnd()}…`;
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  // Unknown slug: render an explicit not-found state. A silent redirect to the
  // index reads as a soft 404 to crawlers, and leaves the reader with no idea
  // what happened. Marked noindex so these URLs never enter the index.
  if (!post) {
    return (
      <div className="page-top bg-dark-900 surface-grid min-h-screen">
        <SEO
          title="Article Not Found"
          description="This article does not exist or has been moved."
          canonical="https://cloudsecurecanada.com/blog"
          noindex
        />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="font-mono text-sm text-primary-400 mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            That article doesn&apos;t exist
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The link may be out of date, or the address may have a typo. Everything we&apos;ve
            published is on the index.
          </p>
          <Link to="/blog" className="btn-cta text-sm">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Browse all articles
          </Link>
        </div>
      </div>
    );
  }

  const { newer, older } = getNeighbours(slug);
  const diagram = getPostDiagram(slug);
  const url = `https://cloudsecurecanada.com/blog/${post.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    url,
    image: `https://cloudsecurecanada.com${editorialImageUrl(post.cover)}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@id': 'https://cloudsecurecanada.com/#organization' },
    publisher: { '@id': 'https://cloudsecurecanada.com/#organization' },
    keywords: post.tags.join(', '),
    articleSection: post.tags[0],
    inLanguage: 'en-CA',
    isPartOf: { '@id': 'https://cloudsecurecanada.com/blog#blog' },
  };

  return (
    <div className="page-top bg-dark-900 surface-grid min-h-screen">
      <SEO
        rawTitle={postTitle(post.title)}
        description={post.excerpt.length <= 154 ? post.excerpt : `${post.excerpt.slice(0, 151)}...`}
        canonical={url}
        type="article"
        image={`https://cloudsecurecanada.com${editorialImageUrl(post.cover)}`}
        imageAlt={post.coverAlt}
        imageWidth={1600}
        imageHeight={900}
        imageType="image/jpeg"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'Blog', url: 'https://cloudsecurecanada.com/blog' },
          { name: post.title, url },
        ]}
        jsonLd={articleJsonLd}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          All articles
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((t) => (
              <span key={t} className="text-[11px] font-mono px-2 py-0.5 text-primary-300/80 border border-primary-500/20 bg-primary-500/5">
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-[2.6rem] font-bold text-white leading-[1.13] mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-5">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-mono pb-6 border-b border-dark-700">
            <time dateTime={post.date}>Published {formatDate(post.date)}</time>
            {post.updated && (
              <>
                <span className="w-1 h-1 rounded-full bg-dark-700" />
                <time dateTime={post.updated}>Updated {formatDate(post.updated)}</time>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-dark-700" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="border border-dark-700 bg-dark-800/70 mb-10 overflow-hidden"
        >
          <EditorialImage
            base={post.cover}
            alt={post.coverAlt}
            sizes="(min-width: 768px) 768px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="block aspect-[16/9]"
            imageClassName="w-full h-full object-cover"
          />
        </motion.figure>

        <PostDiagram diagram={diagram} />

        <div className="text-[16.5px]">
          {post.body.map((block, i) => <Block key={i} block={block} />)}
        </div>

        {/* Every external figure in a post is attributed to a primary source so
            a reader can check the claim rather than take our word for it. */}
        {post.sources?.length > 0 && (
          <section className="mt-12 border-t border-dark-700 pt-8" aria-labelledby="sources-heading">
            <h2 id="sources-heading" className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              References
            </h2>
            <ol className="space-y-2.5">
              {post.sources.map((src, i) => (
                <li key={src.url} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 w-5 shrink-0 font-mono text-xs text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-gray-400">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                    >
                      {src.title}
                      <ExternalLink className="ml-1 inline-block h-3 w-3 align-baseline" aria-hidden="true" />
                    </a>
                    <span className="text-gray-600"> — {src.publisher}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Posts comment on named vendors, breaches, and legislation. This keeps
            the "general information, not advice, accurate as of publication"
            qualifier on the page itself rather than only in the footer. */}
        <aside className="mt-10 border-l-2 border-dark-700 pl-4 text-xs text-gray-500 leading-relaxed">
          General information on security practice, accurate as of publication and not
          updated as events develop. Not legal, regulatory, or audit advice. Commentary on
          named organisations, vendors, and legislation reflects publicly reported
          information; claims made by threat actors are reported as claims and are
          unverified. See the{' '}
          <Link
            to="/privacy"
            className="text-gray-400 hover:text-primary-400 underline underline-offset-2 transition-colors"
          >
            full disclaimer
          </Link>
          .
        </aside>

        {/* Conversion block: every article ends with one specific next step. */}
        <div className="mt-12 border border-primary-500/30 bg-primary-500/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Want this assessed in your environment?</h2>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">
            A 30-minute call is usually enough to tell you whether this is a real exposure for you
            or noise you can deprioritise. Senior consultant, no sales engineer.
          </p>
          <Link to="/#contact" className="btn-cta text-sm" data-cta="blog-post-footer">
            Book a call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <nav className="mt-12 pt-8 border-t border-dark-700 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="More articles">
          {older ? (
            <Link to={`/blog/${older.slug}`} className="group card-glow p-4">
              <span className="block text-xs font-mono text-gray-500 mb-1.5">← Earlier</span>
              <span className="block text-sm font-semibold text-gray-200 group-hover:text-primary-200 transition-colors leading-snug">{older.title}</span>
            </Link>
          ) : <div />}
          {newer && (
            <Link to={`/blog/${newer.slug}`} className="group card-glow p-4 sm:text-right">
              <span className="block text-xs font-mono text-gray-500 mb-1.5">Later →</span>
              <span className="block text-sm font-semibold text-gray-200 group-hover:text-primary-200 transition-colors leading-snug">{newer.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
};

export default BlogPostPage;
