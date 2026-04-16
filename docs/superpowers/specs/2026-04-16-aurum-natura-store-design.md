# Aurum Natura Store Design

Date: 2026-04-16
Status: Approved in conversation, pending final written-spec review

## Summary

Aurum Natura will evolve from a premium static landing into a real multilingual online store with a warm luxury visual language, a medium-size curated catalog, a fully functional cart, and a serious checkout flow that sends structured orders to WhatsApp instead of taking payment online for now.

The store will preserve the brand's cinematic finca atmosphere while becoming a usable e-commerce experience. The homepage carries the strongest emotional and 3D visual weight. The catalog, product pages, cart, and checkout become progressively clearer and more conversion-oriented. The frontend and data model must be prepared so that the final WhatsApp confirmation step can later be replaced by a real payment provider without redesigning the site.

## Business Direction

### Positioning

- Premium accessible, not mass market
- Premium rural lifestyle brand, not only food
- Europe-facing brand
- Main languages in v1: Spanish, English, French

### Real product base that must remain credible

- Boxes and curated packs
- Eggs
- Vegetables
- Herbs
- Pots and potted plants
- Tree cuttings / saplings
- Framed art / cuadros

### Sales model for v1

- The site behaves like a real store
- The cart and checkout are real and complete
- Final confirmation sends the order to WhatsApp
- Architecture must remain payment-ready for future online checkout

## Goals

1. Replace the current landing-first structure with a modular e-commerce storefront
2. Keep the emotional, premium, dark-gold finca mood from the existing brand reference
3. Expand the current small offering into a curated medium-size catalog of roughly 28 to 32 products
4. Support Spanish, English, and French from the first version
5. Support Europe-wide shopping flows while marking plant and cutting products as country-restricted
6. Build the UI and data layer so real checkout can be added later with minimal front-end change

## Non-Goals

- No live online payment in v1
- No admin panel in v1
- No complex stock synchronization or ERP integration in v1
- No marketplace-style mega catalog
- No generic Shopify-looking UI

## Audience

Primary audience:

- Customers in Europe looking for premium but approachable finca-origin products
- Buyers attracted by food provenance, gifting, home atmosphere, decor, and botanical objects

Secondary audience:

- Customers who may discover the brand through lifestyle aesthetics first and then buy boxes, fresh goods, or decor

## Experience Principles

1. Atmosphere first, clarity immediately after
2. Premium presentation without luxury intimidation
3. Curated assortment over catalog sprawl
4. Motion should support storytelling and perceived value, not distract from shopping
5. Cart and checkout must feel reliable, not improvised

## Information Architecture

### Main pages

- Home
- Catalog
- Product detail
- Cart
- Checkout
- Brand / About
- Help / FAQ / Shipping
- Contact
- Legal pages

### Homepage structure

- Cinematic hero with strong brand scene and direct shopping CTA
- Trust strip: Europe shipping, limited production, WhatsApp ordering, multilingual support
- Featured categories
- Product highlights
- Brand story / finca origin block
- Lifestyle and decor editorial block
- Featured boxes and seasonal selections
- Final CTA into catalog or cart

### Catalog behavior

- Category-driven browsing
- Filtering by category, subcategory, price, availability, country restriction, and featured status
- Product cards emphasize image quality, category, price, badges, and direct add-to-cart actions

### Product detail behavior

- Large visual gallery
- Strong above-the-fold summary
- Clear price, quantity, variants if needed, and shipping restriction messaging
- Longer editorial description below
- Care, shipping, or origin blocks depending on product type
- Recommended related products

### Cart and checkout behavior

- Quick cart drawer
- Full cart page
- Structured checkout page with customer details, language, destination country, notes, and order summary
- Final action generates a WhatsApp order message

## Catalog Design

### Catalog scale

Target approximately 28 to 32 references in v1

### Product families

#### Boxes and Packs

- Existing Aurum boxes remain
- Additional curated packs and gift bundles
- Subscription can be visible as future-ready, but not active as paid recurring checkout in v1

#### Fresh Finca Goods

- Eggs
- Vegetable selections
- Herb bundles
- Seasonal fresh combinations

#### Living Botanical

- Pots
- Mediterranean plants or character plants
- Tree cuttings or young saplings

#### Art and Decor

- Framed botanical pieces
- Decorative objects
- Small curated home pieces connected to the Aurum Natura world

#### Seasonal / Limited

- Rotating or highlighted selections tied to scarcity and curation

### Commercial logic

- Boxes are the brand anchor
- Fresh goods make the brand believable and recurrent
- Living botanical products expand the lifestyle identity
- Art and decor raise perceived value and average order value
- Seasonal curation strengthens collection behavior without fake urgency

### Restrictions

- Plants and cuttings must display a country-based restriction notice
- Restriction messaging appears on cards, product page, cart, and checkout summary when applicable

## Visual Direction

### Approved visual direction

Approved style direction is the equivalent of "Option B": warm luxury commerce.

This means:

- Keep the dark, cinematic, gold-toned finca atmosphere
- Increase shopping clarity versus the current landing
- Preserve emotional impact without turning the site into a purely editorial poster

### Palette

- Dark warm base
- Aged gold accents
- Toasted ivory / parchment-like light surfaces for selected UI contrast
- Very restrained botanical green accents only where useful

### Typography

- Expressive serif for brand, section headers, hero lines, and editorial emphasis
- Clean sans-serif for product data, forms, cart, filters, and all commerce interactions

### Image system

- Strong coordinated image family across hero, category visuals, and product cards
- Images should feel consistent, curated, and intentionally art-directed
- Product visuals for different product families must still feel like one brand world

### Motion and 3D

3D is required, but must be purposeful.

#### Where 3D/motion should be strongest

- Hero section
- Highlight sections on home
- Select featured product storytelling blocks

#### Where motion should become calmer

- Catalog grid
- Product page purchase controls
- Cart
- Checkout

#### Target motion language

- Scroll-led cinematic depth
- Layered parallax
- Atmospheric particles only if subtle
- Card tilt and depth hover effects
- Smooth scene transitions between major sections

#### Hard constraints

- Must provide non-WebGL or reduced fallback behavior
- Must respect `prefers-reduced-motion`
- Must not tank mobile usability or performance

## Multilingual Strategy

### Languages

- Spanish
- English
- French

### v1 localization scope

- Header and navigation
- Category names
- Product cards
- Product pages
- Cart
- Checkout
- Shipping/help/legal essentials

### Localization behavior

- The store uses structured language content, not runtime machine translation
- The checkout-to-WhatsApp output uses the active user language
- The store architecture should allow future SEO-oriented localized routes and metadata

## Data Model

The storefront must be data-driven rather than hardcoded page-by-page.

Each product should support:

- `id`
- `slug`
- `category`
- `subcategory`
- `type`
- `price`
- `compare_price` if useful
- `currency`
- `stock`
- `featured`
- `badges`
- `images`
- `attributes`
- `restricted_countries`
- translated content for `es`, `en`, `fr`
- short summary
- long description
- care/shipping/origin blocks as applicable

This model must support:

- Filtering
- Product recommendation logic
- Cart summaries
- WhatsApp message generation
- Future replacement of WhatsApp checkout with payment checkout

## Checkout-to-WhatsApp Flow

### Customer flow

1. Customer adds products to cart
2. Customer reviews cart
3. Customer completes a real checkout form
4. Store generates a structured WhatsApp message
5. Customer confirms order through WhatsApp

### Checkout fields

- Name
- Email if needed
- Phone if useful
- Country
- City / region
- Preferred language
- Order notes

### WhatsApp message payload

- Order reference
- Customer details
- Product list
- Quantities
- Variants if any
- Destination country
- Restriction warnings if any
- Subtotal estimate
- Free-text notes

### Future-readiness requirement

The final submit action must be decoupled from UI rendering so it can later be replaced by:

- Stripe Checkout
- other hosted checkout
- custom backend order creation

without redesigning cart, order summary, or form structure.

## Research and Deliverables

The design should incorporate the user's requested `website intelligence` approach, adapted to the current tool availability.

That means the project should include:

- `research/01-client-brand.md`
- `research/02-competitor-analysis.md`
- `research/03-build-brief.md`
- `research/04-quality-audit.md`

The implementation should treat the current site as the starting brand source and produce a build brief informed by real competitive patterns rather than arbitrary styling choices.

## SEO and Discoverability

The store must be structurally ready for SEO from the start:

- unique page titles
- unique meta descriptions
- logical H1/H2/H3 hierarchy
- alt text strategy for product and category imagery
- schema markup for organization and product-level content where appropriate
- multilingual metadata readiness
- robots.txt and sitemap generation

## Accessibility and Performance

### Accessibility

- Keyboard-accessible navigation
- Visible focus states
- WCAG AA contrast target
- Motion reduction support
- Semantic HTML structure

### Performance

- Lazy-loaded imagery where appropriate
- No render-blocking heavy visual assets beyond necessity
- 3D and motion must degrade gracefully
- Mobile responsiveness is mandatory, not secondary
- Target a storefront that still feels premium on low-power devices

## Risks

### Main risk

Overweighting the cinematic layer could make the store feel slow or unclear.

### Mitigation

- Strongest visual expression on home and featured sections only
- Cleaner layout on catalog and checkout
- Data and shopping behavior stay independent from motion layer

### Secondary risk

An expanded invented assortment could feel fake if it breaks the real product base.

### Mitigation

- Expansion must stay adjacent to the real categories already approved
- Product families should feel curated, not randomly broadened

## Success Criteria

The design is successful if:

- The site feels recognizably Aurum Natura, but more commercially usable
- A visitor can browse categories, add products, and complete a believable checkout
- The final order message to WhatsApp is structured and professional
- The store supports Spanish, English, and French in all purchase-critical areas
- Plant/cutting restrictions are visible and handled clearly
- The codebase is ready for future online payments without a front-end rewrite

## Implementation Boundary

No implementation work should start until this written spec is reviewed and accepted.
