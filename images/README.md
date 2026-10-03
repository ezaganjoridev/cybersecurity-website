# Stock image sources

Raster photography served from this directory comes from two sources, both of
which permit commercial use and modification:

1. **Pexels** — the [Pexels license](https://www.pexels.com/license/) permits
   use on websites and blogs, commercial use, and modification, with no
   required attribution.
2. **Wikimedia Commons**, restricted to **public domain and CC0** files only.
   Neither imposes an attribution obligation. CC BY / CC BY-SA files are
   deliberately excluded so the site carries no attribution debt.

Credits are retained here for provenance in both cases, whether or not the
licence requires them.

These images are representative only. They do not depict client systems,
client staff, actual engagements, or the specific incidents discussed in the
blog.

| Local image base | Site use | Photographer | Pexels source |
| --- | --- | --- | --- |
| `blog/pci-dss-payment-page` | PCI DSS payment-page article | Joshua Woroniecki | [Photo 5031038](https://www.pexels.com/photo/a-hand-holding-white-card-on-top-of-a-laptop-5031038/) |
| `blog/help-desk-identity-verification` | Help-desk identity article | Mikhail Nilov | [Photo 7682103](https://www.pexels.com/photo/woman-with-a-black-headset-working-on-her-laptop-7682103/) |
| `blog/soc2-evidence-window` | SOC 2 evidence article | Theo Decker | [Photo 5946222](https://www.pexels.com/photo/a-group-of-people-having-a-meeting-in-the-office-5946222/) |
| `blog/oauth-supply-chain` | OAuth supply-chain article | Brett Sayles | [Photo 4682189](https://www.pexels.com/photo/patch-cables-plugged-in-patch-panel-4682189/) |
| `blog/canadian-critical-infrastructure` | Critical-infrastructure article | Robert So | [Photo 18468536](https://www.pexels.com/photo/power-distribution-substation-18468536/) |
| `blog/ransomware-response-baseline` | Ransomware response article | Tima Miroshnichenko | [Photo 5453901](https://www.pexels.com/photo/a-people-working-together-5453901/) |
| `blog/ai-agent-permission-path` | AI-agent security article | ThisIsEngineering | [Photo 3913031](https://www.pexels.com/photo/engineers-developing-robotic-arm-3913031/) |
| `blog/telecom-data-extortion` | Telecom data-extortion article | Brett Sayles | [Photo 4508751](https://www.pexels.com/photo/server-racks-on-data-center-4508751/) |
| `blog/session-token-hijack` | Session-token security article | cottonbro studio | [Photo 5474301](https://www.pexels.com/photo/close-up-shot-of-a-laptop-5474301/) |
| `blog/edge-appliance-review` | Edge-appliance security article | cottonbro studio | [Photo 6804586](https://www.pexels.com/photo/man-connecting-computer-cables-6804586/) |
| `engagements/incident-response-fieldwork` | Incident-response service | Yan Krukau | [Photo 7698746](https://www.pexels.com/photo/employees-looking-at-the-monitor-of-a-laptop-7698746/) |
| `engagements/authorized-testing` | Authorized-testing service | TREEDEO.ST | [Photo 5385526](https://www.pexels.com/photo/hands-typing-on-a-laptop-computer-5385526/) |
| `engagements/detection-engineering` | Detection-engineering service | Kampus Production | [Photo 8204353](https://www.pexels.com/photo/woman-in-yellow-long-sleeve-shirt-looking-at-computer-data-8204353/) |
| `engagements/device-hardening` | Device-hardening service | Bulat843 | [Photo 31869847](https://www.pexels.com/photo/technician-working-on-laptop-in-workshop-31869847/) |

## Wikimedia Commons (public domain / CC0)

| Local image base | Site use | Licence | Creator | Commons source |
| --- | --- | --- | --- | --- |
| `blog/detection-rules-2026` | Detection-rules guide | Public domain | NASA/JPL-Caltech | [Watching Over the Deep Space Network](https://commons.wikimedia.org/wiki/File:Watching_Over_the_Deep_Space_Network_Before_Artemis_II_Signal_Acquisition.jpg) |
| `blog/baseline-hardening` | Baseline-hardening guide | CC0 | Free-Photos (via Pixabay) | [Home-office-336377](https://commons.wikimedia.org/wiki/File:Home-office-336377.jpg) |
| `blog/ai-security-posture` | AI security-posture guide | CC0 | Lenharth Systems | [Computer Motherboard Closeup](https://commons.wikimedia.org/wiki/File:Computer_Motherboard_Closeup.jpg) |
| `engagements/senior-led-delivery` | Engagement-process panel (home) | CC0 | Thomas Kvistholt | [Beautiful technology](https://commons.wikimedia.org/wiki/File:Beautiful_technology_(Unsplash).jpg) |

### Crop note — `blog/detection-rules-2026`

The NASA source frame includes a wall display carrying Jet Propulsion
Laboratory and Caltech branding. The published crop removes the top band of the
frame so no third-party mark is visible: the site must not imply a client
relationship or affiliation with an organisation that has none. The crop
geometry lives in the image-processing step, not here — if the image is ever
regenerated from source, re-check that no signage re-enters the frame.


## Processing

- Acquired: 2026-08-30.
- `engagements/senior-led-delivery` is encoded at a lower quality than the
  rest (JPEG 74 at 1600 px). Its dense perforated-metal detail is noise-like
  and inflates every codec; the slot renders at 390 px on desktop, well below
  where the difference is visible.
- Each source was cropped to a 16:9 composition and exported at 960 × 540 and
  1600 × 900.
- Each size is available as AVIF, WebP, and JPEG for responsive delivery and
  broad browser support.
- Alt text and visible captions describe the photograph neutrally and identify
  it as representative stock photography where context could otherwise imply
  an actual engagement.
