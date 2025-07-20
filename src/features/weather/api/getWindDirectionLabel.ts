type WindDirectionLabel = {
  en: string;
  ru: string;
};

export const getWindDirectionLabel = (degree: number): WindDirectionLabel => {
  const directions = {
    en: [
      'North',
      'North-Northeast',
      'Northeast',
      'East-Northeast',
      'East',
      'East-Southeast',
      'Southeast',
      'South-Southeast',
      'South',
      'South-Southwest',
      'Southwest',
      'West-Southwest',
      'West',
      'West-Northwest',
      'Northwest',
      'North-Northwest',
    ],
    ru: [
      'север',
      'северо-северо-восток',
      'северо-восток',
      'востоко-северо-восток',
      'восток',
      'востоко-юго-восток',
      'юго-восток',
      'юго-юго-восток',
      'юг',
      'юго-юго-запад',
      'юго-запад',
      'западо-юго-запад',
      'запад',
      'западо-северо-запад',
      'северо-запад',
      'северо-северо-запад',
    ],
  };

  const index = Math.round(degree / 22.5) % 16;
  return {
    en: directions.en[index],
    ru: directions.ru[index],
  };
};
