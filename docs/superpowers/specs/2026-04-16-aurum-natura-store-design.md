# Aurum Natura Store Redesign

Date: 2026-04-16
Status: Approved in conversation, written spec pending user review

## Summary

Aurum Natura will evolve from a premium static landing page into a fully structured storefront for a finca-based brand selling across Europe. The experience will remain emotionally driven and visually rich, but the site will behave like a serious store: clear catalog navigation, stronger product detail pages, a real cart flow, a polished checkout experience, and a final order handoff through WhatsApp.

The design direction is explicitly `lujo rural cinematografico`, but translated into a commerce system rather than a poster site. The homepage and brand pages will carry the strongest editorial and cinematic weight. The shopping surfaces will become more controlled, clearer, and more conversion-oriented.

The frontend must also be prepared to receive a large amount of future real media from the finca: hero videos, category banners, product galleries, documentary photography, and story-driven editorial imagery. The redesign should therefore prioritize reusable media slots and visual components so the site can scale up in richness without structural rework.

## Confirmed Product Direction

The first version of the store is prepared for the following product families:

- cajas
- huevos
- verduras
- hierbas
- plantas
- aceite
- miel
- cuadros
- visitas

This product mix must feel coherent under one brand world. The site should not read like a generic grocery catalog, nor like an art-only lifestyle brand. The common thread is curated finca-origin quality with a premium, atmospheric presentation.

## Sales Model

### Order completion

- The storefront behaves like a real e-commerce frontend
- Users browse categories and products normally
- Users add products to a cart
- Users complete a structured checkout form
- The final action sends the order through WhatsApp

### Why this matters

The user must feel they are using a serious premium online store, not a landing page that happens to open WhatsApp. WhatsApp is the operational close, not the UX identity of the site.

## Market Scope

### Geography

- Spain
- Rest of Europe

### Languages

- Spanish
- English
- French

The store should be architected as multilingual from the start. This includes navigation, category labels, product texts, system messages, cart labels, checkout content, shipping/help/legal essentials, and the final WhatsApp order message.

## Design Direction

### Chosen visual direction

The approved direction is `Cinematic Commerce`.

This means:

- Keep the emotional, dark, atmospheric finca identity
- Push the brand toward premium rural luxury
- Use strong imagery and cinematic rhythm on high-level pages
- Reduce visual noise as the user gets closer to buying
- Avoid a generic Shopify-like aesthetic
- Avoid a rustic-but-low-end craft market aesthetic

### Visual principles

1. Atmosphere first, clarity immediately after
2. Emotion must support buying, not block it
3. Editorial richness on brand surfaces, discipline on commerce surfaces
4. Large-format media should feel intentional and premium
5. The interface should feel international, not improvised

### Palette direction

- Deep warm dark backgrounds
- Tobacco, earth, charcoal, and night tones
- Gold or aged-brass highlights used selectively
- Warm parchment or ivory contrast surfaces where needed
- Very restrained green accents only when useful

### Typography direction

- Expressive serif for hero lines, section titles, editorial blocks, and brand moments
- Clear sans-serif for navigation, product data, filters, pricing, forms, and checkout

Typography must feel more distinctive than the current baseline and avoid generic visual sameness.

## Information Architecture

### Main pages

- Home
- Shop / Catalog
- Product detail
- Cart
- Checkout
- About the finca
- Contact
- Help / FAQ / Shipping
- Legal pages

### Homepage role

The homepage is no longer a short premium landing page. It becomes the storefront's cinematic front door and brand anchor.

Its job is to:

- communicate origin and desirability quickly
- establish trust for Europe-wide sales
- direct users into product discovery
- show curation and scarcity
- make the finca story visible
- prepare the customer emotionally and practically to buy

## Homepage Structure

### 1. Hero

- Full-width cinematic hero with either video or high-impact image
- Strong brand headline
- Descriptive subheading
- Primary CTA to shop
- Secondary CTA to discover the finca
- Premium composition with stronger visual depth than the current implementation

### 2. Trust bar

- Europe shipping
- limited production
- finca-origin products
- multilingual experience
- guided WhatsApp order completion

### 3. Category entry block

Large editorial category cards for:

- cajas
- frescos
- plantas
- aceite y miel
- arte
- visitas

### 4. Featured products

Product cards with:

- large image
- category
- name
- price
- useful short descriptor
- badges where relevant
- strong CTA

### 5. Editorial manifesto block

A brand block that explains why Aurum Natura is more than a food site. This section carries narrative, value, and emotional differentiation.

### 6. Visual finca story

A gallery or mosaic section that can later absorb a much larger quantity of real photography and video stills from the finca.

### 7. Seasonal or curated selection

A more commercially focused block for immediate purchase momentum.

### 8. Social proof / credibility

Prepared space for:

- testimonials
- trust messaging
- editorial mentions
- customer reassurance

### 9. Final premium CTA

A large closing section with powerful image support and direct routing into catalog or WhatsApp-driven conversion.

## Catalog Design

### Catalog role

The catalog becomes the primary buying surface. It should feel like a premium store, not a decorative gallery and not a sparse list of products.

### Catalog behavior

- category-led browsing
- clearer hierarchy and filtering
- stronger product cards
- easier scanning on desktop and mobile
- country-related or product-type-related restrictions visible early

### Suggested filters

- category
- price
- featured
- seasonal / limited
- shipping restriction
- suitable for Europe-wide shipping vs restricted items

### Product cards

Each card should be more useful and more premium than the current implementation. Cards should support:

- large image
- category label
- product name
- price
- short commercial description
- scarcity or featured badge
- restriction badge if needed
- direct add-to-cart or view-product CTA

## Product Detail Pages

### Product page role

The product page is where emotional storytelling and practical buying information meet. It must feel significantly richer and more descriptive than the current state.

### Required structure

- image and/or video gallery prepared for multiple assets
- strong above-the-fold summary
- price and quantity control
- add-to-cart action
- concise product promise
- expanded descriptive sections
- trust and logistics information
- related products

### Content blocks by default

- what it is
- what is included
- origin
- production or care details
- shipping or delivery information
- restrictions by country if relevant
- who it is for
- related recommendations

### Tone by product family

- boxes, oil, honey, art: more editorial and aspirational
- eggs, vegetables, herbs: descriptive, origin-focused, confidence-building
- plants: care + shipping + restriction clarity
- visits: experiential and trust-led

## Cart and Checkout

### Cart

The cart must feel real, useful, and premium. It should not behave like a thin staging area before WhatsApp.

Required behaviors:

- quantity adjustments
- remove items
- subtotal visibility
- shipping/restriction messaging
- notes field if needed
- visual consistency with product detail pages

### Checkout

The checkout should feel like a real premium purchase flow, even though payment is not collected online in v1.

Required fields and behavior:

- customer details
- country
- preferred language
- contact details
- notes for order
- summary of selected items
- clear next-step explanation
- final structured WhatsApp order generation

### WhatsApp handoff

The generated message must be clean and professional, containing:

- customer name
- country
- contact data
- selected products and quantities
- notes
- preferred language

The message should be easy for the finca team to process without manual cleanup.

## About the Finca

### Role

The About page is a central brand asset. It should not be a short generic "who we are" page.

### Purpose

- raise trust
- increase perceived value
- support premium pricing
- justify the product philosophy
- make the finca visually memorable

### Content direction

- origin story
- philosophy
- process
- environment
- rhythm of the finca
- why production is limited
- human side of the brand

### Media direction

The page must be prepared for:

- horizontal photography
- documentary stills
- portrait photography
- process imagery
- embedded video moments
- editorial text blocks

## Contact and Help

### Contact page

The contact page should feel like premium hospitality, not a generic support form.

Expected elements:

- primary WhatsApp contact
- email
- service framing
- shipping/help entry points
- elegant FAQ preview or reassurance blocks

### Help / shipping content

Prepare a professional support layer with:

- shipping scope
- expected fulfillment model
- product restrictions
- returns or policy guidance where applicable
- ordering clarification

## Multimedia Preparation

### Core requirement

The redesign must be structurally prepared for a large future media upgrade without redesigning layouts later.

### Media slots to support

- hero video
- hero fallback image
- category cover images
- product gallery images
- product video where useful
- editorial story sections
- finca documentary strips
- testimonial or proof visuals
- section background visuals

### Placeholder strategy

Until the user provides real media, placeholders must still look intentional and premium. The temporary system should not make the site feel unfinished.

## Technical Direction

### Recommended frontend architecture

Maintain a static modular frontend rather than adding framework complexity prematurely.

This means:

- lightweight deploy
- fast load times
- strong control over visual output
- easier future media replacement
- simpler multilingual and catalog data layer if structured well

### Data model requirements

Data should be centralized for:

- products
- categories
- pricing
- featured flags
- scarcity badges
- restrictions
- language content
- trust messages
- media references

### Component requirements

Create reusable building blocks for:

- hero
- trust bar
- category cards
- product cards
- media galleries
- editorial text-image blocks
- testimonial blocks
- FAQ items
- cart summaries
- checkout sections
- call-to-action sections

### Commerce state requirements

- real cart state in frontend
- persistence between pages
- clean summary rendering
- compatibility with multilingual labels
- compatibility with future real checkout replacement

## Motion and Interaction

### Motion goals

- cinematic depth on hero and storytelling surfaces
- restrained animation on shopping surfaces
- premium microinteractions
- no gimmicky motion that harms usability

### Priority areas for motion

- homepage hero
- category transitions
- selected editorial reveal moments
- image hovers and refined card interactions

### Low-intensity areas

- catalog filters
- cart
- checkout
- legal/help pages

### Accessibility and fallback

- respect `prefers-reduced-motion`
- graceful fallback if video fails
- no dependency on WebGL for core brand experience
- mobile interactions must remain fast and stable

## Mobile and Responsive Behavior

The redesign must be explicitly mobile-first in buying behavior, even if some visual hero moments are more dramatic on desktop.

The mobile experience must deliver:

- fast load
- clear navigation
- clean catalog scanning
- easy add-to-cart flow
- frictionless checkout fields
- readable typography
- stable media behavior

No section should rely on desktop-only composition logic to remain understandable.

## Performance Requirements

- lazy-load non-critical images
- optimize video usage and fallback
- avoid excessive runtime animation cost
- keep shopping pages calmer than editorial pages
- maintain strong perceived performance on mobile

## Error Handling and Robustness

The storefront should account for:

- missing image fallback
- video fallback
- empty cart state
- restricted product messaging
- language defaults
- malformed or incomplete product data

The interface must stay polished even when content is temporarily incomplete.

## Success Criteria

The redesign is successful when:

1. the site feels like a premium European storefront rather than a local landing page
2. the homepage communicates brand, origin, and desire immediately
3. the catalog is easier to browse and clearly more commercial
4. product pages are much more descriptive and visually richer
5. the cart and checkout feel real and trustworthy
6. the final WhatsApp handoff feels structured and professional
7. the frontend is clearly ready to absorb real photos and videos without redesign
8. the site works well in Spanish, English, and French
9. the experience is strong on mobile as well as desktop

## Non-Goals

- No online payment integration in v1
- No full admin panel in v1
- No backend inventory system in v1
- No generic marketplace scale
- No generic minimal white-label store styling

## Implementation Notes

This redesign should prioritize frontend quality and structural readiness over backend complexity. The experience must be elevated through layout, hierarchy, typography, media strategy, content richness, cart flow, and language architecture.

The final implementation should make it obvious that Aurum Natura is ready to become a serious brand storefront as soon as real media assets arrive.
