import catSkincare from '../assets/cat_skincare.png';
import catMakeup from '../assets/cat_makeup.png';
import catHaircare from '../assets/cat_haircare.png';
import catFragrance from '../assets/cat_fragrance.png';
import catBodycare from '../assets/cat_bodycare.png';
import catAccessories from '../assets/cat_accessories.png';
import lineup from '../assets/brand_medicube.png';
import shelf from '../assets/brand_cosrx.png';
import blooms from '../assets/brand_anua.png';
import { productArt } from './productArt';

/* Concern categories (Acne Care, Hairfall, ...) share a family's copy and photography. */
const FAMILY = {
  'Skin Care': 'skin', 'Acne Care': 'skin', 'Anti Aging': 'skin', 'Combination Skin': 'skin', 'Dull Skin': 'skin',
  'Oil Control': 'skin', 'Sensitive Skin': 'skin', 'Skin Dryness': 'skin', 'Spot Treatment': 'skin',
  'Makeup': 'makeup', 'Hair Care': 'hair', 'Hairfall': 'hair', 'Dandruff': 'hair',
  'Fragrance': 'fragrance', 'Body Care': 'body', 'Accessories': 'accessories',
};

const FAMILIES = {
  skin: {
    noun: 'skincare', eyebrow: 'Skincare',
    images: [
      { src: catSkincare, label: 'In your routine', note: 'Applied after cleansing, in under a minute.' },
      { src: lineup, label: 'On the shelf', note: 'Frosted glass and gold detailing that looks right on any vanity.' },
      { src: shelf, label: 'Morning light', note: 'Sits neatly beside the rest of your routine.' },
      { src: blooms, label: 'Gift-ready', note: 'Arrives in protective packaging. Add a gift note at checkout.' },
    ],
    bullets: ['Gentle formula, suitable for everyday use', 'Absorbs quickly with no sticky finish', 'Dermatologist tested and non-comedogenic'],
    features: [
      { icon: 'Droplets', feature: 'Deep, lasting hydration', benefit: 'Keeps skin plump and comfortable from morning to night, even in air-conditioned rooms.' },
      { icon: 'Sparkles', feature: 'Visible radiance', benefit: 'Helps even out dullness so skin looks fresher and more luminous within a few weeks.' },
      { icon: 'Leaf', feature: 'Soothing botanicals', benefit: 'Calms the look of redness and the tight feeling that comes with humid summers.' },
      { icon: 'FlaskConical', feature: 'Barrier-supporting formula', benefit: 'Strengthens skin\'s natural defences so it copes better with heat, pollution and stress.' },
      { icon: 'ShieldCheck', feature: 'Fragrance-free, non-comedogenic', benefit: 'Suitable for oily, combination and sensitive skin, and will not clog pores.' },
      { icon: 'Timer', feature: 'Lightweight texture', benefit: 'Layers easily under moisturizer, sunscreen and makeup in a fast morning routine.' },
    ],
    steps: [
      { title: 'Cleanse first', text: 'Start with a clean, slightly damp face for the best absorption.' },
      { title: 'Apply a small amount', text: 'Press into face and neck with your palms. Avoid the eye area and do not rub.' },
      { title: 'Seal and protect', text: 'Follow with moisturizer. In the daytime, finish with SPF 30 or higher.' },
    ],
    specs: [['Skin type', 'All, including sensitive'], ['Use', 'Morning and night'], ['Free from', 'Fragrance, parabens, alcohol'], ['Tested', 'Dermatologist tested'], ['Shelf life', '12 months after opening']],
    reviews: [
      { name: 'Nusrat Jahan', place: 'Dhanmondi, Dhaka', tag: 'Combination skin', title: 'My skin stopped feeling tight by noon', text: 'I work in an air-conditioned office all day and my cheeks used to feel dry by lunch. After three weeks my makeup sits better and I stopped carrying a face mist. It did not break me out, which is rare for me.' },
      { name: 'Tanvir Ahmed', place: 'Agrabad, Chattogram', tag: 'Oily skin', title: 'Not sticky at all', text: 'I was worried it would feel heavy in this weather. It is light and disappears quickly. My skin looks calmer after a month. Ordered a second one for my sister.' },
      { name: 'Farzana Rahman', place: 'Sylhet', tag: 'Sensitive skin', title: 'Gentle, no redness', text: 'Most products make my face red within minutes. This one did not. I did a patch test as advised and now use it daily. The packaging was very secure too.' },
      { name: 'Mehedi Hasan', place: 'Mirpur, Dhaka', tag: 'Normal skin', title: 'Good results, arrived next day', text: 'Skin looks fresher and more even. Delivery was next day inside Dhaka and I paid cash on delivery. Exactly as described on the page.' },
      { name: 'Shirin Akter', place: 'Rajshahi', tag: 'Dry skin', title: 'Authentic, batch code intact', text: 'I was nervous about buying skincare online, so I checked the batch code with the brand and it matched. Layers well under my night cream and the dry patches have mostly gone.' },
      { name: 'Rafiq Islam', place: 'Khulna', tag: 'Combination skin', title: 'Bought it for my wife, now we share', text: 'She noticed her skin looked brighter after two weeks, so I started using it too. No stinging after shaving. Support answered my WhatsApp question within ten minutes.' },
    ],
    faqs: [
      { q: 'Is it suitable for sensitive or acne-prone skin?', a: 'The formula is fragrance-free, alcohol-free and non-comedogenic. As with any new skincare product, we recommend a patch test behind your ear or on your inner arm for 24 hours before first use.' },
      { q: 'How do I use it, and how long does it last?', a: 'Apply a small amount to clean, slightly damp skin, morning and night, before moisturizer. With twice-daily use it typically lasts 6 to 8 weeks.' },
      { q: 'When will I see results?', a: 'Most people feel the difference in hydration within a week. Changes in tone and texture usually take 4 to 6 weeks of consistent use. Results vary from person to person.' },
      { q: 'Can I use it with vitamin C, retinol or sunscreen?', a: 'Yes. Apply it after toner and before moisturizer. It pairs well with vitamin C in the morning and retinol at night, and layers comfortably under sunscreen.' },
    ],
  },
  makeup: {
    noun: 'makeup', eyebrow: 'Makeup',
    images: [
      { src: catMakeup, label: 'On the vanity', note: 'Blends effortlessly for an everyday polished look.' },
      { src: catMakeup, label: 'Close-up', note: 'Rich pigment with a smooth, even finish.', scale: 1.9, origin: '70% 40%' },
      { src: catMakeup, label: 'Your kit', note: 'Compact enough for your bag, premium enough for your vanity.', scale: 1.8, origin: '15% 75%' },
    ],
    bullets: ['Rich, buildable colour that blends easily', 'Comfortable all-day wear in Dhaka humidity', 'Cruelty-free and skin-friendly formula'],
    features: [
      { icon: 'Sparkles', feature: 'High-payoff pigment', benefit: 'One swipe gives true colour, so you use less product and it lasts longer.' },
      { icon: 'Timer', feature: 'Long-wear formula', benefit: 'Stays put from morning through evening without creasing, fading or needing constant touch-ups.' },
      { icon: 'Droplets', feature: 'Comfortable, non-drying feel', benefit: 'Conditioning ingredients keep lips and skin comfortable instead of tight or flaky.' },
      { icon: 'Leaf', feature: 'Skin-friendly ingredients', benefit: 'Free from parabens and harsh fragrance, which makes it kinder on sensitive skin.' },
      { icon: 'FlaskConical', feature: 'Blendable, buildable texture', benefit: 'Go sheer for daytime or layer up for a bolder evening look.' },
      { icon: 'ShieldCheck', feature: 'Travel-ready packaging', benefit: 'Sturdy, compact and spill-proof, so it is safe in your handbag.' },
    ],
    steps: [
      { title: 'Prep your skin', text: 'Cleanse and moisturize first so the product glides on evenly.' },
      { title: 'Apply and blend', text: 'Start with a small amount and blend outward with a brush, sponge or fingertips.' },
      { title: 'Build and set', text: 'Layer for more intensity, then set with powder or a setting spray for all-day wear.' },
    ],
    specs: [['Finish', 'Smooth, natural'], ['Wear time', 'Up to 8 hours'], ['Free from', 'Parabens, harsh fragrance'], ['Testing', 'Cruelty-free'], ['Shelf life', '24 months unopened']],
    reviews: [
      { name: 'Tasnim Chowdhury', place: 'Uttara, Dhaka', tag: 'Daily wear', title: 'Lasted through a whole wedding day', text: 'I wore this from 10 AM to well past midnight and it barely faded. The colour looks exactly like the photos on the page, which is not always true online.' },
      { name: 'Afia Sultana', place: 'Chattogram', tag: 'Sensitive skin', title: 'No irritation at all', text: 'My skin reacts to a lot of makeup but not this. It feels light and blends easily. Packaging was very neat and nothing was broken.' },
      { name: 'Sadia Islam', place: 'Gulshan, Dhaka', tag: 'Makeup artist', title: 'Easy to work with', text: 'I use this on clients. It blends cleanly and builds without getting cakey. I have already ordered a second one for my kit.' },
      { name: 'Mim Akter', place: 'Rajshahi', tag: 'Student', title: 'Great value for the quality', text: 'I did not expect this quality at this price. Delivery took 4 days to Rajshahi and the courier called before arriving.' },
      { name: 'Priya Das', place: 'Sylhet', tag: 'Daily wear', title: 'Humidity-proof', text: 'It survives the Sylhet humidity better than my previous one. No melting, no creasing. I will buy again.' },
      { name: 'Lamia Hossain', place: 'Khulna', tag: 'Gift buyer', title: 'Perfect gift', text: 'Bought it for my sister\'s birthday. It arrived well packed and she loved the shade. Cash on delivery made it easy.' },
    ],
    faqs: [
      { q: 'How do I choose the right shade?', a: 'Compare the shade name and swatch on the product page with a product you already own. If you are unsure, message our support team on WhatsApp with a photo in natural light and we will help.' },
      { q: 'Will it last in hot and humid weather?', a: 'The long-wear formula is designed to resist fading and creasing. For extra staying power, prep skin with primer and set with powder or spray.' },
      { q: 'Is it safe for sensitive skin?', a: 'It is free from parabens and heavy fragrance. If you have a known allergy, check the ingredients on the pack and patch test before first use.' },
      { q: 'Can I return it if the shade is not right?', a: 'Unopened products can be returned within 7 days of delivery. Opened makeup cannot be returned for hygiene reasons unless it is faulty or damaged.' },
    ],
  },
  hair: {
    noun: 'hair care', eyebrow: 'Hair Care',
    images: [
      { src: catHaircare, label: 'In your routine', note: 'Part of a simple wash-day or styling routine.' },
      { src: catHaircare, label: 'Close-up', note: 'Smooth, glossy hair without heaviness.', scale: 1.7, origin: '60% 30%' },
      { src: catHaircare, label: 'Ready to use', note: 'Compact packaging that stands neatly on your shelf.', scale: 1.9, origin: '48% 60%' },
    ],
    bullets: ['Visibly smoother, shinier hair', 'Lightweight, never greasy or heavy', 'Suitable for colour-treated hair'],
    features: [
      { icon: 'Droplets', feature: 'Deep moisture', benefit: 'Replenishes dry, heat-styled and sun-exposed hair so it feels soft rather than brittle.' },
      { icon: 'Sparkles', feature: 'Shine and smoothness', benefit: 'Smooths the surface of each strand, which reduces frizz and adds a healthy-looking gloss.' },
      { icon: 'ShieldCheck', feature: 'Protects against damage', benefit: 'Helps guard against breakage from brushing, heat tools and humidity.' },
      { icon: 'Leaf', feature: 'Nourishing plant oils', benefit: 'Natural oils feed the lengths and ends without leaving a residue.' },
      { icon: 'FlaskConical', feature: 'Scalp-friendly formula', benefit: 'Gentle on the scalp, so it will not trigger itchiness or flaking.' },
      { icon: 'Timer', feature: 'Fast, easy to use', benefit: 'Takes just a couple of minutes, so it fits into a busy morning.' },
    ],
    steps: [
      { title: 'Start with clean hair', text: 'Shampoo and gently towel-dry so hair is damp, not dripping.' },
      { title: 'Apply mid-lengths to ends', text: 'Use a small amount and work it through with your fingers or a wide-tooth comb. Keep clear of the roots.' },
      { title: 'Style as usual', text: 'Leave in or rinse as directed on the pack, then dry and style as usual.' },
    ],
    specs: [['Hair type', 'All, including colour-treated'], ['Use', '2 to 3 times a week'], ['Free from', 'Parabens, harsh sulfates'], ['Finish', 'Smooth and glossy'], ['Shelf life', '24 months unopened']],
    reviews: [
      { name: 'Rima Akter', place: 'Mohammadpur, Dhaka', tag: 'Dry, frizzy hair', title: 'Frizz is finally under control', text: 'My hair gets frizzy in the monsoon. After three washes it feels softer and stays smoother all day. It does not weigh my hair down.' },
      { name: 'Nabila Karim', place: 'Chattogram', tag: 'Coloured hair', title: 'Great for coloured hair', text: 'My colour has not faded and my ends look healthier. The smell is light and pleasant, not overpowering.' },
      { name: 'Shahana Parvin', place: 'Bogura', tag: 'Fine hair', title: 'Not greasy', text: 'I have fine hair and most products leave it flat. This one adds shine without the heaviness. Delivery took 3 days.' },
      { name: 'Imran Hossain', place: 'Sylhet', tag: 'Daily use', title: 'Noticeable in two weeks', text: 'My wife bought this and I tried it too. Hair feels thicker and less rough. Will reorder.' },
      { name: 'Jannat Ferdous', place: 'Uttara, Dhaka', tag: 'Wavy hair', title: 'Brings out my waves', text: 'Curls and waves look defined without being crunchy. The packaging is sturdy and no leaks on arrival.' },
      { name: 'Tahmina Sultana', place: 'Khulna', tag: 'Heat styling', title: 'Saves my hair from the straightener', text: 'I use heat tools twice a week and my hair used to feel straw-like. It feels much better now.' },
    ],
    faqs: [
      { q: 'Is it suitable for coloured or chemically treated hair?', a: 'Yes. The formula is gentle and free from harsh sulfates, so it is suitable for coloured and treated hair.' },
      { q: 'How often should I use it?', a: 'Two to three times a week is ideal for most hair types. Use less often if your hair is fine or oily.' },
      { q: 'Will it make my hair greasy?', a: 'No. Keep application to mid-lengths and ends and use a pea-to-coin-sized amount for the best results.' },
      { q: 'Can I use it on my scalp?', a: 'Follow the directions on the pack. If the product is not intended for scalp use, keep it a couple of centimetres away from the roots.' },
    ],
  },
  fragrance: {
    noun: 'fragrance', eyebrow: 'Fragrance',
    images: [
      { src: catFragrance, label: 'The ritual', note: 'A signature scent applied to pulse points.' },
      { src: catFragrance, label: 'Close-up', note: 'Elegant glass bottle with a refined finish.', scale: 1.9, origin: '65% 40%' },
      { src: catFragrance, label: 'Gift-ready', note: 'Arrives in a protective box, ready for gifting.', scale: 1.6, origin: '20% 70%' },
    ],
    bullets: ['Long-lasting scent that evolves through the day', 'Refined notes that suit day and evening', 'Elegant bottle, gift-ready packaging'],
    features: [
      { icon: 'Sparkles', feature: 'Layered scent profile', benefit: 'Opens bright, settles into a warm heart and finishes soft, so it stays interesting all day.' },
      { icon: 'Timer', feature: 'Long-lasting wear', benefit: 'Holds on skin for 6 to 8 hours, so you do not need to keep reapplying.' },
      { icon: 'Droplets', feature: 'Fine-mist sprayer', benefit: 'Even, controlled application, so every spritz goes where you want it.' },
      { icon: 'Leaf', feature: 'Quality ingredients', benefit: 'Balanced, refined notes that avoid the harsh alcohol smell of cheaper scents.' },
      { icon: 'ShieldCheck', feature: '100% authentic', benefit: 'Sourced from authorized distributors, so you receive the genuine scent every time.' },
      { icon: 'FlaskConical', feature: 'Gift-ready packaging', benefit: 'Arrives protected and presentable, ready to give without extra wrapping.' },
    ],
    steps: [
      { title: 'Apply to pulse points', text: 'Spray on the wrists, neck and behind the ears where warmth helps the scent develop.' },
      { title: 'Hold at a distance', text: 'Keep the bottle 15 to 20 cm from skin. Do not rub the wrists together.' },
      { title: 'Store carefully', text: 'Keep away from sunlight and heat to preserve the fragrance for longer.' },
    ],
    specs: [['Type', 'Eau de parfum'], ['Longevity', '6 to 8 hours'], ['Best for', 'Day and evening'], ['Authenticity', 'Genuine, batch coded'], ['Shelf life', '36 months']],
    reviews: [
      { name: 'Anika Rahman', place: 'Banani, Dhaka', tag: 'Daily wear', title: 'Compliments every time I wear it', text: 'The scent is elegant and not too sweet. It lasted about seven hours for me, even in the heat. The bottle is beautiful.' },
      { name: 'Sabbir Ahmed', place: 'Chattogram', tag: 'Gift buyer', title: 'Perfect anniversary gift', text: 'Bought this for my wife. The packaging was excellent and she loved the scent. Delivered in two days.' },
      { name: 'Mahira Khan', place: 'Uttara, Dhaka', tag: 'Evening wear', title: 'Smells like a premium perfume', text: 'The scent develops beautifully through the evening. I checked the batch code and it matched, so I am confident it is authentic.' },
      { name: 'Zahid Hasan', place: 'Sylhet', tag: 'Office wear', title: 'Subtle but long-lasting', text: 'Not overpowering, so I can wear it to the office. People notice it in a good way.' },
      { name: 'Ruma Begum', place: 'Rajshahi', tag: 'Daily wear', title: 'Worth every taka', text: 'I compared with the store price and was happy with this one. Secure packaging and a courier who called ahead.' },
      { name: 'Fahim Reza', place: 'Khulna', tag: 'Collector', title: 'Genuine and sealed', text: 'The box was sealed and the bottle looked exactly as expected. Pays to buy from a trusted shop.' },
    ],
    faqs: [
      { q: 'Is this fragrance 100% authentic?', a: 'Yes. We source from authorized distributors and every bottle carries a batch code you can verify with the brand. We refund any product that turns out not to be genuine.' },
      { q: 'How long does the scent last?', a: 'Most customers report 6 to 8 hours on skin. Longevity depends on your skin type and the weather. Apply to moisturized skin for best results.' },
      { q: 'Can I gift it?', a: 'Yes. It arrives in protective packaging, and you can add a gift note when you place your order.' },
      { q: 'Does it contain alcohol?', a: 'Like most perfumes, it contains perfumer\'s alcohol as a carrier. Please avoid contact with eyes and broken skin and patch test if you have sensitive skin.' },
    ],
  },
  body: {
    noun: 'body care', eyebrow: 'Body Care',
    images: [
      { src: catBodycare, label: 'Daily ritual', note: 'Smooths in easily after a bath or shower.' },
      { src: catBodycare, label: 'Close-up', note: 'Rich texture that melts into skin.', scale: 1.8, origin: '70% 40%' },
      { src: catBodycare, label: 'Bathroom shelf', note: 'Neat, simple packaging that suits any bathroom.', scale: 1.7, origin: '85% 70%' },
    ],
    bullets: ['Softer, smoother skin from the first use', 'Fast-absorbing and never sticky', 'Gentle everyday formula'],
    features: [
      { icon: 'Droplets', feature: 'All-day moisture', benefit: 'Keeps skin soft and comfortable for hours, even after a shower or in air-conditioning.' },
      { icon: 'Leaf', feature: 'Nourishing plant butters', benefit: 'Natural butters and oils soften rough patches on elbows, knees and heels.' },
      { icon: 'Sparkles', feature: 'Smooth, healthy glow', benefit: 'Leaves skin looking even and radiant, with no greasy shine.' },
      { icon: 'Timer', feature: 'Quick absorption', benefit: 'Sinks in within a minute, so you can dress straight away.' },
      { icon: 'ShieldCheck', feature: 'Gentle formula', benefit: 'Free from harsh ingredients and suitable for everyday use.' },
      { icon: 'FlaskConical', feature: 'A scent you will enjoy', benefit: 'A soft fragrance that lingers lightly and does not clash with your perfume.' },
    ],
    steps: [
      { title: 'After bathing', text: 'Pat skin dry, leaving it very slightly damp to lock in moisture.' },
      { title: 'Massage in', text: 'Apply an even layer and massage until absorbed, focusing on dry areas.' },
      { title: 'Use daily', text: 'For best results use once or twice a day, especially after showering.' },
    ],
    specs: [['Skin type', 'All skin types'], ['Use', 'Once or twice daily'], ['Free from', 'Parabens, mineral oil'], ['Finish', 'Soft, non-greasy'], ['Shelf life', '24 months unopened']],
    reviews: [
      { name: 'Sumaiya Akter', place: 'Dhanmondi, Dhaka', tag: 'Dry skin', title: 'My legs finally feel soft', text: 'I struggled with dry, flaky skin in winter. After a week of using this after showers, it feels smooth and stays that way.' },
      { name: 'Kamrul Hasan', place: 'Chattogram', tag: 'Daily use', title: 'Absorbs fast', text: 'I hate sticky lotions. This one soaks in quickly and does not leave a film. The scent is subtle.' },
      { name: 'Ayesha Siddika', place: 'Mirpur, Dhaka', tag: 'Gift buyer', title: 'Lovely gift', text: 'Gave this to my mother. She says her elbows have never felt so soft. Packaging was neat.' },
      { name: 'Roksana Begum', place: 'Rangpur', tag: 'Dry skin', title: 'Worth it', text: 'The texture is rich but not heavy. I use it every night. Arrived in 4 days.' },
      { name: 'Nafis Chowdhury', place: 'Sylhet', tag: 'Sensitive skin', title: 'No irritation', text: 'I have sensitive skin and this did not bother it. The pump works well and nothing leaked.' },
      { name: 'Taslima Nasrin', place: 'Khulna', tag: 'Daily use', title: 'Smells wonderful', text: 'A lovely, light scent and skin that feels soft all day. Will order again.' },
    ],
    faqs: [
      { q: 'Is it suitable for sensitive skin?', a: 'It is formulated to be gentle for everyday use. If you have very sensitive skin or allergies, check the ingredients and patch test on your inner arm first.' },
      { q: 'Will it feel greasy?', a: 'No. It absorbs in about a minute and leaves a soft, non-greasy finish.' },
      { q: 'How often should I use it?', a: 'Once or twice a day, ideally after bathing when skin is slightly damp.' },
      { q: 'Can I use it on my face?', a: 'It is designed for the body. For your face, we recommend a dedicated facial moisturizer.' },
    ],
  },
  accessories: {
    noun: 'accessory', eyebrow: 'Accessories',
    images: [
      { src: catAccessories, label: 'Styled', note: 'Finishes an everyday outfit with a touch of polish.' },
      { src: catAccessories, label: 'Close-up', note: 'Refined detailing and quality finish.', scale: 1.9, origin: '35% 70%' },
      { src: catAccessories, label: 'On the go', note: 'Light enough to wear all day.', scale: 1.6, origin: '60% 35%' },
    ],
    bullets: ['Refined design that suits any outfit', 'Durable materials with a quality finish', 'Light, comfortable and easy to wear'],
    features: [
      { icon: 'Sparkles', feature: 'Elegant design', benefit: 'A clean, timeless look that goes with both casual and formal outfits.' },
      { icon: 'ShieldCheck', feature: 'Durable materials', benefit: 'Built to hold up to daily use, so it keeps looking good for longer.' },
      { icon: 'Timer', feature: 'Lightweight comfort', benefit: 'Comfortable enough to wear from morning to night.' },
      { icon: 'Leaf', feature: 'Skin-safe finish', benefit: 'Made to be gentle on skin, with a low risk of irritation.' },
      { icon: 'FlaskConical', feature: 'Careful craftsmanship', benefit: 'Neat finishing and attention to detail you can see and feel.' },
      { icon: 'Droplets', feature: 'Easy care', benefit: 'Wipe clean with a soft cloth and store dry to keep it like new.' },
    ],
    steps: [
      { title: 'Unbox with care', text: 'Remove from the protective packaging and check there is no damage.' },
      { title: 'Wear and style', text: 'Pair with your outfit. Put it on after perfume and lotion so they do not dull the finish.' },
      { title: 'Store dry', text: 'Keep in the original pouch or box, away from moisture and direct sunlight.' },
    ],
    specs: [['Style', 'Everyday, versatile'], ['Care', 'Wipe with a soft cloth'], ['Packaging', 'Gift-ready box'], ['Warranty', '7-day replacement'], ['Origin', 'Imported']],
    reviews: [
      { name: 'Ishrat Jahan', place: 'Dhanmondi, Dhaka', tag: 'Daily wear', title: 'Looks more expensive than it is', text: 'I wear this almost daily and keep getting compliments. The finish has held up well.' },
      { name: 'Rashed Karim', place: 'Chattogram', tag: 'Gift buyer', title: 'Great gift', text: 'Bought for my sister. The packaging was lovely and it arrived in two days.' },
      { name: 'Nusrat Zaman', place: 'Uttara, Dhaka', tag: 'Daily wear', title: 'Light and comfortable', text: 'I forget I am wearing it. It looks just like the photos.' },
      { name: 'Mousumi Akter', place: 'Rajshahi', tag: 'Occasion wear', title: 'Perfect for events', text: 'Wore it to a wedding and received lots of compliments. Well made.' },
      { name: 'Hasan Mahmud', place: 'Sylhet', tag: 'Gift buyer', title: 'Careful packaging', text: 'It came well wrapped with no scratches. The courier called before delivering.' },
      { name: 'Tania Sultana', place: 'Khulna', tag: 'Daily wear', title: 'Good quality', text: 'Good finish for the price. I will order again.' },
    ],
    faqs: [
      { q: 'Is it suitable for sensitive skin?', a: 'It is made from skin-safe materials. If you have a known metal allergy, please check the product description or contact us before ordering.' },
      { q: 'How do I take care of it?', a: 'Wipe with a soft dry cloth and store it in its pouch. Avoid contact with water, perfume and lotion.' },
      { q: 'Will it tarnish or fade?', a: 'With normal care it keeps its finish well. Avoid wearing it while swimming or exercising.' },
      { q: 'Can I exchange it if it does not suit me?', a: 'Yes. Unused items in original packaging can be returned within 7 days of delivery.' },
    ],
  },
};

/* A second page of reviews per family. */
const MORE_REVIEWS = {
  skin: [
    { name: 'Maliha Chowdhury', place: 'Banani, Dhaka', tag: 'Dry skin', title: 'Visible glow in two weeks', text: 'My friends asked what I changed. My skin looks smoother and less flaky, and it layers well with my sunscreen.' },
    { name: 'Arif Hossain', place: 'Comilla', tag: 'Oily skin', title: 'Fine for oily skin', text: 'No shine and no clogged pores so far. I use it twice a day and the texture is pleasant.' },
    { name: 'Jesmin Akter', place: 'Barishal', tag: 'Normal skin', title: 'Arrived well packed', text: 'The bottle was wrapped securely and delivery took four days. Product feels exactly like the description.' },
    { name: 'Sabrina Haque', place: 'Gulshan, Dhaka', tag: 'Sensitive skin', title: 'No stinging', text: 'I patch tested first and had no reaction. After a month my redness is calmer.' },
    { name: 'Kazi Mahbub', place: 'Narayanganj', tag: 'Combination skin', title: 'Simple and effective', text: 'It does what it says without a long routine. I bought one more for my mother.' },
    { name: 'Rubaiya Sultana', place: 'Mymensingh', tag: 'Dry skin', title: 'Good for winter', text: 'My skin used to crack around my nose in winter. This keeps it comfortable all day.' },
  ],
  makeup: [
    { name: 'Orpita Roy', place: 'Dhanmondi, Dhaka', tag: 'Everyday look', title: 'Easy to blend', text: 'Blends in seconds with my fingers and looks natural. The colour matches the photo.' },
    { name: 'Nadia Karim', place: 'Chattogram', tag: 'Evening wear', title: 'Holds up all night', text: 'Wore it to a dinner and it still looked fresh at the end. No creasing at all.' },
    { name: 'Sharmin Akter', place: 'Bogura', tag: 'Student', title: 'Better than expected', text: 'I was unsure about ordering online but the quality is great for the price.' },
    { name: 'Tahsin Rahman', place: 'Uttara, Dhaka', tag: 'Daily wear', title: 'Lightweight feel', text: 'I barely feel it on my skin. It lasts through a full day at work.' },
    { name: 'Bithi Das', place: 'Khulna', tag: 'Gift buyer', title: 'Lovely packaging', text: 'Ordered for my cousin and she loved it. It arrived in perfect condition.' },
    { name: 'Faria Islam', place: 'Sylhet', tag: 'Sensitive skin', title: 'Gentle on my skin', text: 'No breakouts and no itching. I will try more from the same brand.' },
  ],
  hair: [
    { name: 'Sonia Akter', place: 'Mirpur, Dhaka', tag: 'Dry hair', title: 'Softer after one use', text: 'My hair felt softer from the first wash and combing is much easier now.' },
    { name: 'Rakib Hasan', place: 'Chattogram', tag: 'Daily use', title: 'No heavy residue', text: 'It rinses clean and my hair does not feel coated. Pleasant mild scent.' },
    { name: 'Ishita Roy', place: 'Rajshahi', tag: 'Coloured hair', title: 'Colour stays vibrant', text: 'My highlights have lasted longer since I started using it. Happy with the purchase.' },
    { name: 'Munira Begum', place: 'Sylhet', tag: 'Frizzy hair', title: 'Tames frizz', text: 'Humid days are easier now. My hair stays smooth until evening.' },
    { name: 'Saiful Islam', place: 'Gazipur', tag: 'Daily use', title: 'Good value', text: 'Lasts longer than I expected and my hair looks healthier.' },
    { name: 'Lubna Yasmin', place: 'Khulna', tag: 'Fine hair', title: 'Adds shine', text: 'My fine hair has more shine and still feels light. Delivery was quick.' },
  ],
  fragrance: [
    { name: 'Tamanna Ahmed', place: 'Gulshan, Dhaka', tag: 'Daily wear', title: 'Soft and classy', text: 'A refined scent that is not overpowering. It stays with me through the workday.' },
    { name: 'Nayeem Uddin', place: 'Chattogram', tag: 'Evening wear', title: 'Great for events', text: 'I wore it to a wedding and got compliments. It lasted well into the night.' },
    { name: 'Sadiya Rahman', place: 'Rajshahi', tag: 'Gift buyer', title: 'Gift was a hit', text: 'Bought it for my mother. The bottle is beautiful and the box arrived undamaged.' },
    { name: 'Asif Khan', place: 'Mirpur, Dhaka', tag: 'Office wear', title: 'Fresh and clean', text: 'A fresh scent that works at the office. I get around six hours of wear.' },
    { name: 'Moushumi Haque', place: 'Sylhet', tag: 'Daily wear', title: 'Smells expensive', text: 'Smells far more premium than the price suggests. I have already reordered.' },
    { name: 'Jubayer Alam', place: 'Khulna', tag: 'Collector', title: 'Authentic bottle', text: 'Sealed, with a matching batch code. A trustworthy seller.' },
  ],
  body: [
    { name: 'Mahfuza Akter', place: 'Dhanmondi, Dhaka', tag: 'Dry skin', title: 'Soft all day', text: 'Skin still feels soft in the evening after applying in the morning.' },
    { name: 'Sohel Rana', place: 'Chattogram', tag: 'Daily use', title: 'Quick absorption', text: 'No sticky feeling at all. I can dress right after applying.' },
    { name: 'Nasreen Jahan', place: 'Rajshahi', tag: 'Dry skin', title: 'Helps rough patches', text: 'My elbows and knees look much smoother after two weeks.' },
    { name: 'Shakil Ahmed', place: 'Sylhet', tag: 'Daily use', title: 'Nice light scent', text: 'The scent is mild and fades gently. Good for everyday use.' },
    { name: 'Rehana Parvin', place: 'Khulna', tag: 'Gift buyer', title: 'Good gift idea', text: 'Gave it to my sister and she says she uses it every night.' },
    { name: 'Elias Hossain', place: 'Mymensingh', tag: 'Sensitive skin', title: 'No irritation', text: 'My skin is sensitive and I had no problems. Well packed too.' },
  ],
  accessories: [
    { name: 'Rumana Islam', place: 'Mohammadpur, Dhaka', tag: 'Daily use', title: 'Solid build', text: 'Feels sturdier than I expected for the price and works exactly as described.' },
    { name: 'Shuvo Ahmed', place: 'Chattogram', tag: 'Gift buyer', title: 'Nice presentation', text: 'Came in neat packaging, which made it a good gift.' },
    { name: 'Nilufar Yasmin', place: 'Rajshahi', tag: 'Daily use', title: 'Does the job well', text: 'Easy to use and easy to clean. I use it every day.' },
    { name: 'Tushar Das', place: 'Sylhet', tag: 'Daily use', title: 'Good quality', text: 'No scratches or defects on arrival. The finish looks good.' },
    { name: 'Sumi Akter', place: 'Khulna', tag: 'Travel use', title: 'Great for travel', text: 'Compact enough for my bag and has survived a few trips already.' },
    { name: 'Kabir Hossain', place: 'Uttara, Dhaka', tag: 'Daily use', title: 'Worth the price', text: 'Good value and quick delivery. I would order from here again.' },
  ],
};

const COMMON_FAQS = [
  { q: 'Is this product 100% authentic?', a: 'Yes. BeautyShop BD sources from authorized distributors and every product is checked before dispatch. If you ever receive a product that is not genuine, we will refund you in full.' },
  { q: 'How long does delivery take, and what does it cost?', a: 'Inside Dhaka, delivery takes 1 to 2 working days and costs ৳60. Outside Dhaka, it takes 3 to 5 working days and costs ৳120. You will receive a call and SMS confirmation after you order.' },
  { q: 'What payment methods do you accept?', a: 'Cash on Delivery is available nationwide. You can also pay in advance with bKash. We never ask for card details over the phone.' },
  { q: 'What is your return policy?', a: 'If your order arrives damaged or incorrect, tell us within 48 hours and we will replace it or refund you in full. Unopened products can be returned within 7 days of delivery.' },
];

export const trust = [
  { icon: 'Lock', title: 'Secure payment', text: 'Cash on delivery or bKash. No card details needed.' },
  { icon: 'BadgeCheck', title: '100% authentic', text: 'Sourced from authorized distributors and checked.' },
  { icon: 'Truck', title: 'Fast delivery', text: '1-2 days in Dhaka, 3-5 days nationwide.' },
  { icon: 'RotateCcw', title: '7-day easy returns', text: 'Damaged or wrong item? Replaced or refunded.' },
];

const MONTHS = ['October 2026', 'September 2026', 'September 2026', 'August 2026', 'July 2026', 'June 2026'];

/* Star distribution that adds up to the review count and averages to the product's rating. */
const distribution = (rating, total) => {
  const stars = [1, 2, 3, 4, 5];
  const shape = (k) => {
    const w = stars.map((s) => Math.exp(k * s));
    const sum = w.reduce((a, b) => a + b, 0);
    return w.map((x) => x / sum);
  };
  const mean = (p) => p.reduce((a, x, i) => a + x * stars[i], 0);
  let lo = 0, hi = 6;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (mean(shape(mid)) < rating) lo = mid; else hi = mid;
  }
  const p = shape((lo + hi) / 2);
  const counts = p.map((x) => Math.round(x * total));
  counts[4] += total - counts.reduce((a, b) => a + b, 0);
  return [5, 4, 3, 2, 1].map((s) => ({ stars: s, count: Math.max(0, counts[s - 1]) }));
};

export const buildLanding = (product) => {
  const key = FAMILY[product.category] || 'skin';
  const f = FAMILIES[key];
  const total = product.reviews || 120;
  const rating = product.rating || 4.5;
  return {
    ...f,
    gallery: [{ src: productArt(product), label: 'The product', note: 'Packaging may vary slightly by batch.' }, ...f.images]
      .map((g) => ({ ...g, alt: `${product.title} – ${g.label.toLowerCase()}` })),
    reviews: [...f.reviews, ...MORE_REVIEWS[key]].map((r, i) => ({ ...r, rating: i % 4 === 3 ? 4 : 5, date: MONTHS[i % MONTHS.length] })),
    faqs: [...f.faqs, ...COMMON_FAQS],
    stats: { average: rating, total, distribution: distribution(rating, total) },
  };
};
