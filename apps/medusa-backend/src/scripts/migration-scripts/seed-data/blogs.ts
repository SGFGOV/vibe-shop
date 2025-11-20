export interface MongoBlog {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  description: string;
  theme?: string[];
  img?: string;
  image?: string;
  status?: "show" | "hide";
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export const allBlogs: MongoBlog[] = [
  {
    _id: "6860cf87eff74db13b85226d",
    id: "6860cf87eff74db13b85226d",
    title: "Bedroom Furniture",
    category: "Table",
    description:
      "<p>Tips on creating a peaceful sanctuary using minimalist design and functional pieces</p>",
    theme: ["Furniture"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1751175040/grostore/blog-post-3.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1751175040/grostore/blog-post-3.png",
    status: "show",
    createdAt: new Date("2025-06-29T05:30:47.549Z"),
    updatedAt: new Date("2025-06-29T05:30:47.549Z"),
  },
  {
    _id: "6860cf53eff74db13b852269",
    id: "6860cf53eff74db13b852269",
    title: "Wooden Furniture",
    category: "Bed",
    description:
      "<p>Explore timeless dining tables that blend craftsmanship with elegance for family gatherings.</p>",
    theme: ["Furniture"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1751174991/grostore/blog-post-2.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1751174991/grostore/blog-post-2.png",
    status: "show",
    createdAt: new Date("2025-06-29T05:29:55.468Z"),
    updatedAt: new Date("2025-06-29T05:29:55.468Z"),
  },
  {
    _id: "6860cf1aeff74db13b852266",
    id: "6860cf1aeff74db13b852266",
    title: "Modern Furniture",
    category: "Dining Chair",
    description:
      "<p>Discover the latest styles and designs that are transforming modern living spaces into cozy retreats</p>",
    theme: ["Furniture"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1751174933/grostore/blog-post-1.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1751174933/grostore/blog-post-1.png",
    status: "show",
    createdAt: new Date("2025-06-29T05:28:58.156Z"),
    updatedAt: new Date("2025-06-29T05:28:58.156Z"),
  },
  {
    _id: "682db2e3be89b0671f3a8ed9",
    id: "682db2e3be89b0671f3a8ed9",
    title: "Fresh Meat Recently Ordered Food",
    category: "Fresh Mutton",
    description:
      "<p>Every 500 gm of the product will contain 7-10 pcs of Tomato.The tomato is consumed in diverse ways, including raw, as an ingredient in many dishes, sauces, salads, and drinks. While it is botanically a fruit, it is considered a vegetable for culinary purposes. The fruit is rich in lycopene, which may have beneficial health effects.Every 500 gm of the product will contain 7-10 pcs of Tomato.The tomato is consumed in diverse ways, including raw, as an ingredient in many dishes, sauces, salads, and drinks. While it is botanically a fruit, it is considered a vegetable for culinary purposes. The fruit is rich in lycopene, which may have beneficial health effects.</p>",
    theme: ["Halal Food"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1747825269/grostore/event-img-2.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1747825269/grostore/event-img-2.png",
    status: "show",
    createdAt: new Date("2025-05-21T11:02:59.368Z"),
    updatedAt: new Date("2025-06-29T06:02:08.884Z"),
  },
  {
    _id: "682db2b4be89b0671f3a8ed5",
    id: "682db2b4be89b0671f3a8ed5",
    title: "Organic Meat We have Recently Ordered",
    category: "Fresh Mutton",
    description:
      "<p>Every 500 gm of the product will contain 7-10 pcs of Tomato.The tomato is consumed in diverse ways, including raw, as an ingredient in many dishes, sauces, salads, and drinks. While it is botanically a fruit, it is considered a vegetable for culinary purposes. The fruit is rich in lycopene, which may have beneficial health effects.Every 500 gm of the product will contain 7-10 pcs of Tomato.The tomato is consumed in diverse ways, including raw, as an ingredient in many dishes, sauces, salads, and drinks. While it is botanically a fruit, it is considered a vegetable for culinary purposes. The fruit is rich in lycopene, which may have beneficial health effects</p>",
    theme: ["Halal Food"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1747825326/grostore/event-img-3.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1747825326/grostore/event-img-3.png",
    status: "show",
    createdAt: new Date("2025-05-21T11:02:12.140Z"),
    updatedAt: new Date("2025-06-29T06:01:00.205Z"),
  },
  {
    _id: "682db107be89b0671f3a8eab",
    id: "682db107be89b0671f3a8eab",
    title: "Holiday Home Delivery We have Recently Ordere",
    category: "Fresh Beef",
    description:
      "<p>Every 500 gm of the product will contain 7-10 pcs of Tomato.The tomato is consumed in diverse ways, including raw, as an ingredient in many dishes, sauces, salads, and drinks. While it is botanically a fruit, it is considered a vegetable for culinary purposes. The fruit is rich in lycopene, which may have beneficial health effects.Every 500 gm of the product will contain 7-10 pcs of Tomato.The tomato is consumed in diverse ways, including raw, as an ingredient in many dishes, sauces, salads, and drinks. While it is botanically a fruit, it is considered a vegetable for culinary purposes. The fruit is rich in lycopene, which may have beneficial health effects</p>",
    theme: ["Halal Food"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1747825269/grostore/event-img-2.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1747825269/grostore/event-img-2.png",
    status: "show",
    createdAt: new Date("2025-05-21T10:55:03.647Z"),
    updatedAt: new Date("2025-06-29T06:01:10.974Z"),
  },
  {
    _id: "6746d71062fb772d2bb675a2",
    id: "6746d71062fb772d2bb675a2",
    title: "The Changing Face of Indian Food in America By Quickly",
    category: "Baby Care",
    description:
      "<p>Making the American palate bolder by streamlining Indian food, Quicklly resonates with growing South Asians via its diverse Indian offerings. Eminent voices and the growing South Asian population in the USA have put Indian food on the global radar. While global icons like Tom Cruise to Bill Gates openly confess their love for Indian food, the burgeoning population has expedited the rising demand for desi flavors - resulting in Indian eateries and ethnic stores all over the American map. The western population is very aware of 'palak paneer' or 'chicken butter masala' - whether you call samosa, a potato-filled fried pastry, or Chole Bhature, a chickpea curry with fried flatbreads, you can't hide your love for Indian food! Pioneering in the fast-growing food delivery ecosystem, Quicklly's on-time delivery of diverse Indian food and groceries has positioned the company as the nation's leading online South Asian marketplace. Amidst the historical forecast of the online food delivery market reaching US$231.30bn in 2023, Quicklly has taken active and aggressive measures to make authentic Indian food affordable and accessible to every corner of the nation. Powering the DNA of Indian Food in America Indian food is vast. The diversity of tastes and flavors reflecting its vibrant culture continues to enchant its lovers, and every desi swears by the love for masaledaar Indian food. The demand for Indian piquancy is getting stronger, and to meet the cravings of the world's second-largest immigrant group, Quicklly turns heads with an array of locally sourced Indian food delivery prepared by cuisine experts. We are a one-stop shop for South Asian food and groceries. Partnered with 100+ restaurants featuring 1,50,000+ traditional, hard-to-find, specialty, and top-selling Indian products, we are catering to the cravings for a home-cooked taste that was once a distant hope for the Indian population in America. You can simply Indian food order online, and we deliver warm fresh food right to your doors. \"We are unique in many ways. Our products fly off the shelf in no time for being authentic and of the highest quality. We love spicy Indian food and aim to connect its diverse and strong taste to every pocket of America,\" says Keval Raj, Co-founder of Quicklly. \"Indian population in America is growing at lightning speed, and Quicklly is a way to make everyone feel at home while away from their loved ones,\" he added. Our range of Indian food and groceries is a permanent fixture in the dining landscape of every desi family or Indian food lover. Whether you're craving restaurant Indian food, Ready to eat Indian meals, Indian sweets and snacks online, Indian meal kits, homemade Indian snacks online USA, fresh Indian groceries, Indian sweets gift baskets, or Indian traditional food recipes, we've it all</p>  ",
    theme: ["Grocery"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1732695820/grostore/Ug88ABhEwM9ewmG4YqUHMUPeTu7e7kiY2dTPxtwU-min.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1732695820/grostore/Ug88ABhEwM9ewmG4YqUHMUPeTu7e7kiY2dTPxtwU-min.png",
    status: "show",
    createdAt: new Date("2024-11-27T08:23:44.179Z"),
    updatedAt: new Date("2025-05-21T10:55:19.049Z"),
  },
  {
    _id: "6746aee2e9e3636638c03268",
    id: "6746aee2e9e3636638c03268",
    title: "Make Your Life Healthier, Happier & Enjoy",
    category: "Fresh Fruits",
    description:
      "<p>Today we're celebrating episode 5 of Fun With Food! We're making Mini Pizza Bagels with special guest Feeling Fox while learning about the feeling of frustration and how to process feelings in a healthy way, the letter T sound, counting, shapes, colors and the health benefits of tomatoes! If you're looking for learning videos for kids that are quality, wholesome and fun I recommend watching our new show, Fun With Food! Fun With Food is an Educational Cooking Show for Kids. In each episode, we make a recipe or go on a food adventure while learning about letters, numbers, colors, shapes, nutrition, feelings and more. Fun with Food is created and hosted by Megan Roosevelt, Registered Dietitian Nutritionist and mom of 2. Benefits of Tomatoes Tomatoes are a fruit made of mostly water, which make them a great, hydrating food! Tomatoes are also a good source of vitamin C, vitamin K, folate and potassium. Vitamin C is important for a healthy immune system to help us fight sickness such as getting a cold. Tomatoes also contain lycopene, which is what gives tomatoes their red color. Lycopene supports our brain health and memory!</p>",
    theme: ["Grocery"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1732695681/grostore/cO3Tsm7sYIdbrp7ofTXygsGPTvw28XneqoaRlTwU-min.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1732695681/grostore/cO3Tsm7sYIdbrp7ofTXygsGPTvw28XneqoaRlTwU-min.png",
    status: "show",
    createdAt: new Date("2024-11-27T05:32:18.630Z"),
    updatedAt: new Date("2025-05-21T10:55:49.714Z"),
  },
  {
    _id: "6746a8f0f7895700de8cec7a",
    id: "6746a8f0f7895700de8cec7a",
    title: "Republic Day Special - Dive Into The Patriotic Sprit Quickly",
    category: "Fresh Organic",
    description:
      "<p>With those perfectly practiced parades embellishing India's pride, it's hard not to get swept by the patriotic feeling that arises within. The Day that marks the enforcement of one of the longest Constitutions ever written in the world calls for a great celebration to marvel at India's rich culture and heritage. And to make your plans turn into a fool-proof celebration, we deliver the tastiest Indian dishes, embracing the diversity of Indian cuisine. This Republic Day, go Vocal for the Local taste of India with our range of authentic Indian food and groceries. Made using authentic Indian ingredients, our range of Indian delights is an absolute pick to excite your Republic Day celebration. Should this year's menu hint at your undying love for India, we've rounded some of the top Indian delights that say, \"treat yourself\" with every bite. Planning to order Indian sweets, snacks or spicy Indian food? Reunite with your food-loving friends and fam to indulge in our detailed list of gastronomy delights. Ready to Eat Indian Meals Embracing the diversity of Indian cuisine in our offerings, our Ready-to-eat Indian meals are a reassurance of familiar home-cooked flavors. With an expansive range of veg and non-veg options like Paneer Tikka Masala and Rice, Chicken Tikka Masala and Rice, Veg Biryani, Chicken Biryani, and more, Ready-to-eat Indian meals bring you the joy of rich desi flavors while you're away from home. Unpack our freshly packed meal, pop it in the oven and savor it warm. Just that easy! We deliver free doorstep deliveries to every corner of the nation so you can Order. Savor and Repeat! Indian Sweets &amp; Snacks Barfis, Sev, or Motichoor Laddoos hold a special place in every desi's heart. Celebrate your patriotic spirits by indulging in our range of authentic Indian sweets and snacks, including Kaju Barfis, Mawa Barfis, Pista Rolls, Rasgullas, Chewda Mix, Paras, and Alu Bhujia, to name a few. Nothing can beat the decadent melt-in-mouth flavors of Indian sweets. As India revels in pride with flag-hoisting ceremonies, empowering speeches, and parades, you can celebrate the spirit of nationalism with our super tasty desi delights. Order online Indian sweets from the nation's most popular places like Rajbhog Sweets, Mithaas, Sweet Bengal, and more</p>",
    theme: ["Grocery"],
    img: "https://res.cloudinary.com/dmadhbgty/image/upload/v1732695761/grostore/RZXqchNL0kNKU4R4kzF5vuycpVoCbm8nLzOlXjAn-min.png",
    image: "https://res.cloudinary.com/dmadhbgty/image/upload/v1732695761/grostore/RZXqchNL0kNKU4R4kzF5vuycpVoCbm8nLzOlXjAn-min.png",
    status: "show",
    createdAt: new Date("2024-11-27T05:06:56.183Z"),
    updatedAt: new Date("2025-05-21T10:55:56.124Z"),
  },
];

