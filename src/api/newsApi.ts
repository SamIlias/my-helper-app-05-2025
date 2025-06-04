import axios from 'axios';

const baseUrl = 'https://gnews.io/api/v4/search';
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const fetchNews = async (term: string = 'news', lang = 'en') => {
  // term - query for search
  const url = `${baseUrl}?q=${term}&lang=${lang}&apikey=${apiKey}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    const news: NewsItemType[] = response.data.articles;
    return news;
  } else {
    throw new Error('Something went wrong. Try again later.');
  }
};

export type NewsItemType = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

export const initialNewsForPaginationTest = [
  {
    title:
      'Chelsea transfer Q&A: Latest on Mike Maignan, Noni Madueke, Liam Delap, Victor Oshimen discussed',
    description:
      'Sky Sports News chief reporter Kaveh Solhekol answers your questions about Chelseas transfer plans this summer; Kaveh provides updates on AC Milan keeper Mike Maignans proposed move to Stamford Bridge, Noni Maduekes future, Liam Delap and more',
    content:
      "With Chelsea expected to be active across the summer transfer window, Sky Sports News' chief reporter Kaveh Solhekol answers your questions on some potential ins and outs.\nHow much do Chelsea want to sign a goalkeeper?\nRicky: Does Enzo Maresca believ... [8451 chars]",
    url: 'https://www.skysports.com/football/news/30778/13379113/chelsea-transfer-q-a-latest-on-mike-maignan-noni-madueke-liam-delap-victor-oshimen-discussed',
    image:
      'https://e0.365dm.com/25/06/1600x900/skysports-mike-maignan-enzo-maresca_6934539.jpg?20250604160803',
    publishedAt: '2025-06-04T18:03:00Z',
    source: {
      name: 'Sky Sports',
      url: 'https://www.skysports.com',
    },
  },
  {
    title:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request",
    description:
      'Latest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup',
    content:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request\nLatest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup\nCristiano Ronaldo of Al Na... [2844 chars]",
    url: 'https://www.manchestereveningnews.co.uk/sport/football/transfer-news/cristiano-ronaldo-transfer-latest-former-31789068',
    image:
      'https://i2-prod.manchestereveningnews.co.uk/article31789381.ece/ALTERNATES/s1200/0_JS368186065.jpg',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Manchester Evening News',
      url: 'https://www.manchestereveningnews.co.uk',
    },
  },
  {
    title:
      "Money blog: Two London hotels named among best in world - here's how much they'll cost you",
    description:
      "Welcome to the Money blog, Sky News' consumer and personal finance hub. Today: more retailers have been hit by cyber attacks; nearly half of landlords are planning to raise rent; and two London hotels make a top list. Sign up to our new Money newsletter below.",
    content:
      "The £1 ketchup that beat Heinz in our taste test and why you shouldn't book a holiday on your laptop\nSky News is launching a brand-new free Money newsletter - bringing the kind of content you enjoy in the Money blog directly to your inbox.\nEach week ... [883 chars]",
    url: 'https://news.sky.com/story/money-blog-two-london-hotels-named-among-best-in-world-heres-how-much-theyll-cost-you-13040934',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-savoy-hotel-london_6934682.jpg?20250604185659',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting",
    description:
      "Latest Liverpool transfer news with an update on the club's summer transfer business",
    content:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting\nLatest Liverpool transfer news with an update on the club's summer transfer business\nLiverpool head coach Arne Slot met with Rayan Cherki last week (Image: Getty... [2479 chars]",
    url: 'https://www.liverpoolecho.co.uk/sport/football/transfer-news/liverpool-next-transfer-decided-after-31788751',
    image:
      'https://i2-prod.liverpoolecho.co.uk/article31788672.ece/ALTERNATES/s1200/0_Arne-Slot-14.jpg',
    publishedAt: '2025-06-04T17:30:00Z',
    source: {
      name: 'Liverpool Echo',
      url: 'https://www.liverpoolecho.co.uk',
    },
  },
  {
    title: 'Understanding how base editing tools work at the molecular level',
    description:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation.',
    content:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation. The treatment was created using a form of gene editing called base ed... [7002 chars]',
    url: 'https://www.news-medical.net/news/20250604/Understanding-how-base-editing-tools-work-at-the-molecular-level.aspx',
    image: 'https://www.news-medical.net/image-handler/picture/2014/7/Gene-620x480.jpg',
    publishedAt: '2025-06-04T17:15:00Z',
    source: {
      name: 'News-Medical.net',
      url: 'https://www.news-medical.net',
    },
  },
  {
    title: 'Where to start with: Edmund White',
    description:
      'After the news of White’s death, here is a guide to a foundational writer of gay lives and elder statesman of American queer literary fiction',
    content:
      'Edmund White, who has died aged 85, was born in Cincinatti, to conservative, homophobic parents. Although he soon rejected almost all his family’s cultural values, he retained their work ethic: White published 36 books in his lifetime, and was workin... [5189 chars]',
    url: 'https://www.theguardian.com/books/2025/jun/04/where-to-start-with-edmund-white',
    image:
      'https://i.guim.co.uk/img/media/a8d3411af230cafe53cff6e247e760e87e43a3d2/0_0_5000_4000/master/5000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=918b1c49ee29a4bdacdbf26b0f782a0a',
    publishedAt: '2025-06-04T17:06:53Z',
    source: {
      name: 'The Guardian',
      url: 'https://www.theguardian.com',
    },
  },
  {
    title: 'So entlarvt man die vielen Gesichter der Fake News',
    description:
      'Schweizer Forschende zeigen auf, wie man Desinformation erkennt und warum Medienkompetenz heute wichtiger ist denn je.',
    content:
      'Falschmeldungen verbreiten sich oft unbemerkt. Schweizer Forschende zeigen auf, wie man diese Desinformationen erkennt und warum Medienkompetenz heute wichtiger ist denn je.\nFake News können fatale Folgen haben – wie etwa die ausländerfeindlichen Kra... [9972 chars]',
    url: 'https://www.srf.ch/kultur/gesellschaft-religion/forschung-zu-falschnachrichten-unbedingt-teilen-wie-man-fake-news-erkennt',
    image: 'https://www.srf.ch/static/cms/images/branded_srf/9c22c2c.jpg',
    publishedAt: '2025-06-04T16:57:19Z',
    source: {
      name: 'Schweizer Radio und Fernsehen (SRF)',
      url: 'https://www.srf.ch',
    },
  },
  {
    title: 'Ukraine News: Putin: Trump nach Telefonat mit Putin: Kein sofortiger Frieden',
    description:
      'Der US-Präsident spricht erneut mit dem Kreml-Chef, sieht aber keine Chance auf eine sofortige Lösung im Ukraine-Krieg.',
    content:
      'Wenn sich an diesem Mittwoch in Brüssel die Verteidigungsminister der sogenannten Ramstein-Gruppe der Ukraine-Unterstützer treffen, wird zum ersten Mal der US-amerikanische fehlen. Mehrere Medien in den USA berichten, dass Pete Hegseth auch nicht per... [1223 chars]',
    url: 'https://www.sueddeutsche.de/politik/ukraine-krieg-newsblog-putin-trump-telefonat-friedensgespraeche-li.3259729',
    image:
      'https://www.sueddeutsche.de/2025/06/04/e4a3057f-8ac3-4716-af6a-274b86a36f0b.jpeg?q=60&fm=webp&width=1200&rect=0%2C181%2C3275%2C1842',
    publishedAt: '2025-06-04T16:57:00Z',
    source: {
      name: 'Süddeutsche Zeitung',
      url: 'https://www.sueddeutsche.de',
    },
  },
  {
    title: "Where's Rachel Reeves getting her bus money?",
    description: '👉 Listen to Sky News Daily on your podcast app 👈',
    content:
      '👉 Listen to Sky News Daily on your podcast app 👈\nThe chancellor presents the Spending Review next week, where she will outline how the budget will be divided for government departments between 2026 and 2029. Rachel Reeves says she has an extra £113bn... [352 chars]',
    url: 'https://news.sky.com/story/wheres-rachel-reeves-getting-her-bus-money-13379141',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-daily-podcast-spending_6934534.png?20250604160612',
    publishedAt: '2025-06-04T16:47:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title: 'Report: Suns hiring Cavs assistant Ott as next head coach',
    description: 'Trending News & Rumors for Football, Basketball, Baseball, Hockey, Soccer & More',
    content:
      "The Phoenix Suns are hiring Cleveland Cavaliers assistant Jordan Ott to be their next head coach, sources told ESPN's Shams Charania.\nOtt was one of two finalists for the position alongside fellow Cavs assistant Johnnie Bryant.\nLike Bryant, Ott was o... [885 chars]",
    url: 'https://www.thescore.com/nba/news/3295787/report-suns-hiring-cavs-assistant-ott-as-next-head-coach',
    image:
      'https://assets-cms.thescore.com/uploads/image/file/788861/w768xh576_GettyImages-2162616013.jpg?ts=1749055331',
    publishedAt: '2025-06-04T16:45:27Z',
    source: {
      name: 'theScore',
      url: 'https://www.thescore.com',
    },
  },
  {
    title:
      'Chelsea transfer Q&A: Latest on Mike Maignan, Noni Madueke, Liam Delap, Victor Oshimen discussed',
    description:
      'Sky Sports News chief reporter Kaveh Solhekol answers your questions about Chelseas transfer plans this summer; Kaveh provides updates on AC Milan keeper Mike Maignans proposed move to Stamford Bridge, Noni Maduekes future, Liam Delap and more',
    content:
      "With Chelsea expected to be active across the summer transfer window, Sky Sports News' chief reporter Kaveh Solhekol answers your questions on some potential ins and outs.\nHow much do Chelsea want to sign a goalkeeper?\nRicky: Does Enzo Maresca believ... [8451 chars]",
    url: 'https://www.skysports.com/football/news/30778/13379113/chelsea-transfer-q-a-latest-on-mike-maignan-noni-madueke-liam-delap-victor-oshimen-discussed',
    image:
      'https://e0.365dm.com/25/06/1600x900/skysports-mike-maignan-enzo-maresca_6934539.jpg?20250604160803',
    publishedAt: '2025-06-04T18:03:00Z',
    source: {
      name: 'Sky Sports',
      url: 'https://www.skysports.com',
    },
  },
  {
    title:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request",
    description:
      'Latest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup',
    content:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request\nLatest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup\nCristiano Ronaldo of Al Na... [2844 chars]",
    url: 'https://www.manchestereveningnews.co.uk/sport/football/transfer-news/cristiano-ronaldo-transfer-latest-former-31789068',
    image:
      'https://i2-prod.manchestereveningnews.co.uk/article31789381.ece/ALTERNATES/s1200/0_JS368186065.jpg',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Manchester Evening News',
      url: 'https://www.manchestereveningnews.co.uk',
    },
  },
  {
    title:
      "Money blog: Two London hotels named among best in world - here's how much they'll cost you",
    description:
      "Welcome to the Money blog, Sky News' consumer and personal finance hub. Today: more retailers have been hit by cyber attacks; nearly half of landlords are planning to raise rent; and two London hotels make a top list. Sign up to our new Money newsletter below.",
    content:
      "The £1 ketchup that beat Heinz in our taste test and why you shouldn't book a holiday on your laptop\nSky News is launching a brand-new free Money newsletter - bringing the kind of content you enjoy in the Money blog directly to your inbox.\nEach week ... [883 chars]",
    url: 'https://news.sky.com/story/money-blog-two-london-hotels-named-among-best-in-world-heres-how-much-theyll-cost-you-13040934',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-savoy-hotel-london_6934682.jpg?20250604185659',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting",
    description:
      "Latest Liverpool transfer news with an update on the club's summer transfer business",
    content:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting\nLatest Liverpool transfer news with an update on the club's summer transfer business\nLiverpool head coach Arne Slot met with Rayan Cherki last week (Image: Getty... [2479 chars]",
    url: 'https://www.liverpoolecho.co.uk/sport/football/transfer-news/liverpool-next-transfer-decided-after-31788751',
    image:
      'https://i2-prod.liverpoolecho.co.uk/article31788672.ece/ALTERNATES/s1200/0_Arne-Slot-14.jpg',
    publishedAt: '2025-06-04T17:30:00Z',
    source: {
      name: 'Liverpool Echo',
      url: 'https://www.liverpoolecho.co.uk',
    },
  },
  {
    title: 'Understanding how base editing tools work at the molecular level',
    description:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation.',
    content:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation. The treatment was created using a form of gene editing called base ed... [7002 chars]',
    url: 'https://www.news-medical.net/news/20250604/Understanding-how-base-editing-tools-work-at-the-molecular-level.aspx',
    image: 'https://www.news-medical.net/image-handler/picture/2014/7/Gene-620x480.jpg',
    publishedAt: '2025-06-04T17:15:00Z',
    source: {
      name: 'News-Medical.net',
      url: 'https://www.news-medical.net',
    },
  },
  {
    title: 'Where to start with: Edmund White',
    description:
      'After the news of White’s death, here is a guide to a foundational writer of gay lives and elder statesman of American queer literary fiction',
    content:
      'Edmund White, who has died aged 85, was born in Cincinatti, to conservative, homophobic parents. Although he soon rejected almost all his family’s cultural values, he retained their work ethic: White published 36 books in his lifetime, and was workin... [5189 chars]',
    url: 'https://www.theguardian.com/books/2025/jun/04/where-to-start-with-edmund-white',
    image:
      'https://i.guim.co.uk/img/media/a8d3411af230cafe53cff6e247e760e87e43a3d2/0_0_5000_4000/master/5000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=918b1c49ee29a4bdacdbf26b0f782a0a',
    publishedAt: '2025-06-04T17:06:53Z',
    source: {
      name: 'The Guardian',
      url: 'https://www.theguardian.com',
    },
  },
  {
    title: 'So entlarvt man die vielen Gesichter der Fake News',
    description:
      'Schweizer Forschende zeigen auf, wie man Desinformation erkennt und warum Medienkompetenz heute wichtiger ist denn je.',
    content:
      'Falschmeldungen verbreiten sich oft unbemerkt. Schweizer Forschende zeigen auf, wie man diese Desinformationen erkennt und warum Medienkompetenz heute wichtiger ist denn je.\nFake News können fatale Folgen haben – wie etwa die ausländerfeindlichen Kra... [9972 chars]',
    url: 'https://www.srf.ch/kultur/gesellschaft-religion/forschung-zu-falschnachrichten-unbedingt-teilen-wie-man-fake-news-erkennt',
    image: 'https://www.srf.ch/static/cms/images/branded_srf/9c22c2c.jpg',
    publishedAt: '2025-06-04T16:57:19Z',
    source: {
      name: 'Schweizer Radio und Fernsehen (SRF)',
      url: 'https://www.srf.ch',
    },
  },
  {
    title: 'Ukraine News: Putin: Trump nach Telefonat mit Putin: Kein sofortiger Frieden',
    description:
      'Der US-Präsident spricht erneut mit dem Kreml-Chef, sieht aber keine Chance auf eine sofortige Lösung im Ukraine-Krieg.',
    content:
      'Wenn sich an diesem Mittwoch in Brüssel die Verteidigungsminister der sogenannten Ramstein-Gruppe der Ukraine-Unterstützer treffen, wird zum ersten Mal der US-amerikanische fehlen. Mehrere Medien in den USA berichten, dass Pete Hegseth auch nicht per... [1223 chars]',
    url: 'https://www.sueddeutsche.de/politik/ukraine-krieg-newsblog-putin-trump-telefonat-friedensgespraeche-li.3259729',
    image:
      'https://www.sueddeutsche.de/2025/06/04/e4a3057f-8ac3-4716-af6a-274b86a36f0b.jpeg?q=60&fm=webp&width=1200&rect=0%2C181%2C3275%2C1842',
    publishedAt: '2025-06-04T16:57:00Z',
    source: {
      name: 'Süddeutsche Zeitung',
      url: 'https://www.sueddeutsche.de',
    },
  },
  {
    title: "Where's Rachel Reeves getting her bus money?",
    description: '👉 Listen to Sky News Daily on your podcast app 👈',
    content:
      '👉 Listen to Sky News Daily on your podcast app 👈\nThe chancellor presents the Spending Review next week, where she will outline how the budget will be divided for government departments between 2026 and 2029. Rachel Reeves says she has an extra £113bn... [352 chars]',
    url: 'https://news.sky.com/story/wheres-rachel-reeves-getting-her-bus-money-13379141',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-daily-podcast-spending_6934534.png?20250604160612',
    publishedAt: '2025-06-04T16:47:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title: 'Report: Suns hiring Cavs assistant Ott as next head coach',
    description: 'Trending News & Rumors for Football, Basketball, Baseball, Hockey, Soccer & More',
    content:
      "The Phoenix Suns are hiring Cleveland Cavaliers assistant Jordan Ott to be their next head coach, sources told ESPN's Shams Charania.\nOtt was one of two finalists for the position alongside fellow Cavs assistant Johnnie Bryant.\nLike Bryant, Ott was o... [885 chars]",
    url: 'https://www.thescore.com/nba/news/3295787/report-suns-hiring-cavs-assistant-ott-as-next-head-coach',
    image:
      'https://assets-cms.thescore.com/uploads/image/file/788861/w768xh576_GettyImages-2162616013.jpg?ts=1749055331',
    publishedAt: '2025-06-04T16:45:27Z',
    source: {
      name: 'theScore',
      url: 'https://www.thescore.com',
    },
  },
  {
    title:
      'Chelsea transfer Q&A: Latest on Mike Maignan, Noni Madueke, Liam Delap, Victor Oshimen discussed',
    description:
      'Sky Sports News chief reporter Kaveh Solhekol answers your questions about Chelseas transfer plans this summer; Kaveh provides updates on AC Milan keeper Mike Maignans proposed move to Stamford Bridge, Noni Maduekes future, Liam Delap and more',
    content:
      "With Chelsea expected to be active across the summer transfer window, Sky Sports News' chief reporter Kaveh Solhekol answers your questions on some potential ins and outs.\nHow much do Chelsea want to sign a goalkeeper?\nRicky: Does Enzo Maresca believ... [8451 chars]",
    url: 'https://www.skysports.com/football/news/30778/13379113/chelsea-transfer-q-a-latest-on-mike-maignan-noni-madueke-liam-delap-victor-oshimen-discussed',
    image:
      'https://e0.365dm.com/25/06/1600x900/skysports-mike-maignan-enzo-maresca_6934539.jpg?20250604160803',
    publishedAt: '2025-06-04T18:03:00Z',
    source: {
      name: 'Sky Sports',
      url: 'https://www.skysports.com',
    },
  },
  {
    title:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request",
    description:
      'Latest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup',
    content:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request\nLatest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup\nCristiano Ronaldo of Al Na... [2844 chars]",
    url: 'https://www.manchestereveningnews.co.uk/sport/football/transfer-news/cristiano-ronaldo-transfer-latest-former-31789068',
    image:
      'https://i2-prod.manchestereveningnews.co.uk/article31789381.ece/ALTERNATES/s1200/0_JS368186065.jpg',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Manchester Evening News',
      url: 'https://www.manchestereveningnews.co.uk',
    },
  },
  {
    title:
      "Money blog: Two London hotels named among best in world - here's how much they'll cost you",
    description:
      "Welcome to the Money blog, Sky News' consumer and personal finance hub. Today: more retailers have been hit by cyber attacks; nearly half of landlords are planning to raise rent; and two London hotels make a top list. Sign up to our new Money newsletter below.",
    content:
      "The £1 ketchup that beat Heinz in our taste test and why you shouldn't book a holiday on your laptop\nSky News is launching a brand-new free Money newsletter - bringing the kind of content you enjoy in the Money blog directly to your inbox.\nEach week ... [883 chars]",
    url: 'https://news.sky.com/story/money-blog-two-london-hotels-named-among-best-in-world-heres-how-much-theyll-cost-you-13040934',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-savoy-hotel-london_6934682.jpg?20250604185659',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting",
    description:
      "Latest Liverpool transfer news with an update on the club's summer transfer business",
    content:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting\nLatest Liverpool transfer news with an update on the club's summer transfer business\nLiverpool head coach Arne Slot met with Rayan Cherki last week (Image: Getty... [2479 chars]",
    url: 'https://www.liverpoolecho.co.uk/sport/football/transfer-news/liverpool-next-transfer-decided-after-31788751',
    image:
      'https://i2-prod.liverpoolecho.co.uk/article31788672.ece/ALTERNATES/s1200/0_Arne-Slot-14.jpg',
    publishedAt: '2025-06-04T17:30:00Z',
    source: {
      name: 'Liverpool Echo',
      url: 'https://www.liverpoolecho.co.uk',
    },
  },
  {
    title: 'Understanding how base editing tools work at the molecular level',
    description:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation.',
    content:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation. The treatment was created using a form of gene editing called base ed... [7002 chars]',
    url: 'https://www.news-medical.net/news/20250604/Understanding-how-base-editing-tools-work-at-the-molecular-level.aspx',
    image: 'https://www.news-medical.net/image-handler/picture/2014/7/Gene-620x480.jpg',
    publishedAt: '2025-06-04T17:15:00Z',
    source: {
      name: 'News-Medical.net',
      url: 'https://www.news-medical.net',
    },
  },
  {
    title: 'Where to start with: Edmund White',
    description:
      'After the news of White’s death, here is a guide to a foundational writer of gay lives and elder statesman of American queer literary fiction',
    content:
      'Edmund White, who has died aged 85, was born in Cincinatti, to conservative, homophobic parents. Although he soon rejected almost all his family’s cultural values, he retained their work ethic: White published 36 books in his lifetime, and was workin... [5189 chars]',
    url: 'https://www.theguardian.com/books/2025/jun/04/where-to-start-with-edmund-white',
    image:
      'https://i.guim.co.uk/img/media/a8d3411af230cafe53cff6e247e760e87e43a3d2/0_0_5000_4000/master/5000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=918b1c49ee29a4bdacdbf26b0f782a0a',
    publishedAt: '2025-06-04T17:06:53Z',
    source: {
      name: 'The Guardian',
      url: 'https://www.theguardian.com',
    },
  },
  {
    title: 'So entlarvt man die vielen Gesichter der Fake News',
    description:
      'Schweizer Forschende zeigen auf, wie man Desinformation erkennt und warum Medienkompetenz heute wichtiger ist denn je.',
    content:
      'Falschmeldungen verbreiten sich oft unbemerkt. Schweizer Forschende zeigen auf, wie man diese Desinformationen erkennt und warum Medienkompetenz heute wichtiger ist denn je.\nFake News können fatale Folgen haben – wie etwa die ausländerfeindlichen Kra... [9972 chars]',
    url: 'https://www.srf.ch/kultur/gesellschaft-religion/forschung-zu-falschnachrichten-unbedingt-teilen-wie-man-fake-news-erkennt',
    image: 'https://www.srf.ch/static/cms/images/branded_srf/9c22c2c.jpg',
    publishedAt: '2025-06-04T16:57:19Z',
    source: {
      name: 'Schweizer Radio und Fernsehen (SRF)',
      url: 'https://www.srf.ch',
    },
  },
  {
    title: 'Ukraine News: Putin: Trump nach Telefonat mit Putin: Kein sofortiger Frieden',
    description:
      'Der US-Präsident spricht erneut mit dem Kreml-Chef, sieht aber keine Chance auf eine sofortige Lösung im Ukraine-Krieg.',
    content:
      'Wenn sich an diesem Mittwoch in Brüssel die Verteidigungsminister der sogenannten Ramstein-Gruppe der Ukraine-Unterstützer treffen, wird zum ersten Mal der US-amerikanische fehlen. Mehrere Medien in den USA berichten, dass Pete Hegseth auch nicht per... [1223 chars]',
    url: 'https://www.sueddeutsche.de/politik/ukraine-krieg-newsblog-putin-trump-telefonat-friedensgespraeche-li.3259729',
    image:
      'https://www.sueddeutsche.de/2025/06/04/e4a3057f-8ac3-4716-af6a-274b86a36f0b.jpeg?q=60&fm=webp&width=1200&rect=0%2C181%2C3275%2C1842',
    publishedAt: '2025-06-04T16:57:00Z',
    source: {
      name: 'Süddeutsche Zeitung',
      url: 'https://www.sueddeutsche.de',
    },
  },
  {
    title: "Where's Rachel Reeves getting her bus money?",
    description: '👉 Listen to Sky News Daily on your podcast app 👈',
    content:
      '👉 Listen to Sky News Daily on your podcast app 👈\nThe chancellor presents the Spending Review next week, where she will outline how the budget will be divided for government departments between 2026 and 2029. Rachel Reeves says she has an extra £113bn... [352 chars]',
    url: 'https://news.sky.com/story/wheres-rachel-reeves-getting-her-bus-money-13379141',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-daily-podcast-spending_6934534.png?20250604160612',
    publishedAt: '2025-06-04T16:47:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title: 'Report: Suns hiring Cavs assistant Ott as next head coach',
    description: 'Trending News & Rumors for Football, Basketball, Baseball, Hockey, Soccer & More',
    content:
      "The Phoenix Suns are hiring Cleveland Cavaliers assistant Jordan Ott to be their next head coach, sources told ESPN's Shams Charania.\nOtt was one of two finalists for the position alongside fellow Cavs assistant Johnnie Bryant.\nLike Bryant, Ott was o... [885 chars]",
    url: 'https://www.thescore.com/nba/news/3295787/report-suns-hiring-cavs-assistant-ott-as-next-head-coach',
    image:
      'https://assets-cms.thescore.com/uploads/image/file/788861/w768xh576_GettyImages-2162616013.jpg?ts=1749055331',
    publishedAt: '2025-06-04T16:45:27Z',
    source: {
      name: 'theScore',
      url: 'https://www.thescore.com',
    },
  },
  {
    title:
      'Chelsea transfer Q&A: Latest on Mike Maignan, Noni Madueke, Liam Delap, Victor Oshimen discussed',
    description:
      'Sky Sports News chief reporter Kaveh Solhekol answers your questions about Chelseas transfer plans this summer; Kaveh provides updates on AC Milan keeper Mike Maignans proposed move to Stamford Bridge, Noni Maduekes future, Liam Delap and more',
    content:
      "With Chelsea expected to be active across the summer transfer window, Sky Sports News' chief reporter Kaveh Solhekol answers your questions on some potential ins and outs.\nHow much do Chelsea want to sign a goalkeeper?\nRicky: Does Enzo Maresca believ... [8451 chars]",
    url: 'https://www.skysports.com/football/news/30778/13379113/chelsea-transfer-q-a-latest-on-mike-maignan-noni-madueke-liam-delap-victor-oshimen-discussed',
    image:
      'https://e0.365dm.com/25/06/1600x900/skysports-mike-maignan-enzo-maresca_6934539.jpg?20250604160803',
    publishedAt: '2025-06-04T18:03:00Z',
    source: {
      name: 'Sky Sports',
      url: 'https://www.skysports.com',
    },
  },
  {
    title:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request",
    description:
      'Latest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup',
    content:
      "Cristiano Ronaldo transfer latest as former Manchester United star 'responds' to request\nLatest Manchester United news and gossip as Cristiano Ronaldo reportedly responds to a transfer offer ahead of the FIFA Club World Cup\nCristiano Ronaldo of Al Na... [2844 chars]",
    url: 'https://www.manchestereveningnews.co.uk/sport/football/transfer-news/cristiano-ronaldo-transfer-latest-former-31789068',
    image:
      'https://i2-prod.manchestereveningnews.co.uk/article31789381.ece/ALTERNATES/s1200/0_JS368186065.jpg',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Manchester Evening News',
      url: 'https://www.manchestereveningnews.co.uk',
    },
  },
  {
    title:
      "Money blog: Two London hotels named among best in world - here's how much they'll cost you",
    description:
      "Welcome to the Money blog, Sky News' consumer and personal finance hub. Today: more retailers have been hit by cyber attacks; nearly half of landlords are planning to raise rent; and two London hotels make a top list. Sign up to our new Money newsletter below.",
    content:
      "The £1 ketchup that beat Heinz in our taste test and why you shouldn't book a holiday on your laptop\nSky News is launching a brand-new free Money newsletter - bringing the kind of content you enjoy in the Money blog directly to your inbox.\nEach week ... [883 chars]",
    url: 'https://news.sky.com/story/money-blog-two-london-hotels-named-among-best-in-world-heres-how-much-theyll-cost-you-13040934',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-savoy-hotel-london_6934682.jpg?20250604185659',
    publishedAt: '2025-06-04T18:00:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting",
    description:
      "Latest Liverpool transfer news with an update on the club's summer transfer business",
    content:
      "Liverpool next transfer 'decided' after record Florian Wirtz deal amid Arne Slot meeting\nLatest Liverpool transfer news with an update on the club's summer transfer business\nLiverpool head coach Arne Slot met with Rayan Cherki last week (Image: Getty... [2479 chars]",
    url: 'https://www.liverpoolecho.co.uk/sport/football/transfer-news/liverpool-next-transfer-decided-after-31788751',
    image:
      'https://i2-prod.liverpoolecho.co.uk/article31788672.ece/ALTERNATES/s1200/0_Arne-Slot-14.jpg',
    publishedAt: '2025-06-04T17:30:00Z',
    source: {
      name: 'Liverpool Echo',
      url: 'https://www.liverpoolecho.co.uk',
    },
  },
  {
    title: 'Understanding how base editing tools work at the molecular level',
    description:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation.',
    content:
      'You may have seen it in the news recently: a baby in Pennsylvania with a rare genetic disorder was healed with a personalized treatment that repaired his specific genetic mutation. The treatment was created using a form of gene editing called base ed... [7002 chars]',
    url: 'https://www.news-medical.net/news/20250604/Understanding-how-base-editing-tools-work-at-the-molecular-level.aspx',
    image: 'https://www.news-medical.net/image-handler/picture/2014/7/Gene-620x480.jpg',
    publishedAt: '2025-06-04T17:15:00Z',
    source: {
      name: 'News-Medical.net',
      url: 'https://www.news-medical.net',
    },
  },
  {
    title: 'Where to start with: Edmund White',
    description:
      'After the news of White’s death, here is a guide to a foundational writer of gay lives and elder statesman of American queer literary fiction',
    content:
      'Edmund White, who has died aged 85, was born in Cincinatti, to conservative, homophobic parents. Although he soon rejected almost all his family’s cultural values, he retained their work ethic: White published 36 books in his lifetime, and was workin... [5189 chars]',
    url: 'https://www.theguardian.com/books/2025/jun/04/where-to-start-with-edmund-white',
    image:
      'https://i.guim.co.uk/img/media/a8d3411af230cafe53cff6e247e760e87e43a3d2/0_0_5000_4000/master/5000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=918b1c49ee29a4bdacdbf26b0f782a0a',
    publishedAt: '2025-06-04T17:06:53Z',
    source: {
      name: 'The Guardian',
      url: 'https://www.theguardian.com',
    },
  },
  {
    title: 'So entlarvt man die vielen Gesichter der Fake News',
    description:
      'Schweizer Forschende zeigen auf, wie man Desinformation erkennt und warum Medienkompetenz heute wichtiger ist denn je.',
    content:
      'Falschmeldungen verbreiten sich oft unbemerkt. Schweizer Forschende zeigen auf, wie man diese Desinformationen erkennt und warum Medienkompetenz heute wichtiger ist denn je.\nFake News können fatale Folgen haben – wie etwa die ausländerfeindlichen Kra... [9972 chars]',
    url: 'https://www.srf.ch/kultur/gesellschaft-religion/forschung-zu-falschnachrichten-unbedingt-teilen-wie-man-fake-news-erkennt',
    image: 'https://www.srf.ch/static/cms/images/branded_srf/9c22c2c.jpg',
    publishedAt: '2025-06-04T16:57:19Z',
    source: {
      name: 'Schweizer Radio und Fernsehen (SRF)',
      url: 'https://www.srf.ch',
    },
  },
  {
    title: 'Ukraine News: Putin: Trump nach Telefonat mit Putin: Kein sofortiger Frieden',
    description:
      'Der US-Präsident spricht erneut mit dem Kreml-Chef, sieht aber keine Chance auf eine sofortige Lösung im Ukraine-Krieg.',
    content:
      'Wenn sich an diesem Mittwoch in Brüssel die Verteidigungsminister der sogenannten Ramstein-Gruppe der Ukraine-Unterstützer treffen, wird zum ersten Mal der US-amerikanische fehlen. Mehrere Medien in den USA berichten, dass Pete Hegseth auch nicht per... [1223 chars]',
    url: 'https://www.sueddeutsche.de/politik/ukraine-krieg-newsblog-putin-trump-telefonat-friedensgespraeche-li.3259729',
    image:
      'https://www.sueddeutsche.de/2025/06/04/e4a3057f-8ac3-4716-af6a-274b86a36f0b.jpeg?q=60&fm=webp&width=1200&rect=0%2C181%2C3275%2C1842',
    publishedAt: '2025-06-04T16:57:00Z',
    source: {
      name: 'Süddeutsche Zeitung',
      url: 'https://www.sueddeutsche.de',
    },
  },
  {
    title: "Where's Rachel Reeves getting her bus money?",
    description: '👉 Listen to Sky News Daily on your podcast app 👈',
    content:
      '👉 Listen to Sky News Daily on your podcast app 👈\nThe chancellor presents the Spending Review next week, where she will outline how the budget will be divided for government departments between 2026 and 2029. Rachel Reeves says she has an extra £113bn... [352 chars]',
    url: 'https://news.sky.com/story/wheres-rachel-reeves-getting-her-bus-money-13379141',
    image:
      'https://e3.365dm.com/25/06/1600x900/skynews-daily-podcast-spending_6934534.png?20250604160612',
    publishedAt: '2025-06-04T16:47:00Z',
    source: {
      name: 'Sky News',
      url: 'https://news.sky.com',
    },
  },
  {
    title: 'Report: Suns hiring Cavs assistant Ott as next head coach',
    description: 'Trending News & Rumors for Football, Basketball, Baseball, Hockey, Soccer & More',
    content:
      "The Phoenix Suns are hiring Cleveland Cavaliers assistant Jordan Ott to be their next head coach, sources told ESPN's Shams Charania.\nOtt was one of two finalists for the position alongside fellow Cavs assistant Johnnie Bryant.\nLike Bryant, Ott was o... [885 chars]",
    url: 'https://www.thescore.com/nba/news/3295787/report-suns-hiring-cavs-assistant-ott-as-next-head-coach',
    image:
      'https://assets-cms.thescore.com/uploads/image/file/788861/w768xh576_GettyImages-2162616013.jpg?ts=1749055331',
    publishedAt: '2025-06-04T16:45:27Z',
    source: {
      name: 'theScore',
      url: 'https://www.thescore.com',
    },
  },
];

// const baseUrl = 'https://api.first.org/data/v1/news';
// const LIMIT = 200;
//
// export const fetchNews = async (term: string = '', limit: number = LIMIT) => {
//   // term - query for search
//   const url = `${baseUrl}?q=${term}&limit=${limit}`;
//   const response = await axios.get(url).then((response) => response.data);
//   if (response.status === 'OK') {
//     const news: NewsItemType[] = response.data;
//     return news;
//   } else {
//     throw new Error('Something went wrong. Try again later.');
//   }
// };
//
// export type NewsItemType = {
//   id: number;
//   title: string;
//   summary: string;
//   link: string;
//   image: string;
//   published: string;
// };
