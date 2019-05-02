export const wine_countries = [
   '',
   'France',
   'Argentine',
   'Australie',
   'Chili',
   'Espagne',
   'Italie',
   'Hongrie',
   'USA',
   'Autre'
]

export const wine_regions = {
   France: [
      '',
      'Alsace',
      'Beaujolais',
      'Bordeaux',
      'Bourgogne',
      'Champagne',
      'Côte du Rhône',
      'Jura',
      'Languedoc-Roussillon',
      'Loire',
      'Provence',
      'Savoie',
      'Sud-Ouest',
      'Autre'
   ],
   Espagne: [
      'Rioja',
      'Cataluña'
   ],
   Autre: [
      '',
      'Autre'
   ],
}

export const wine_appelations = {
   Bourgogne: [
      '',
      'Aloxe-Corton',
      'Auxey-Duresses',
      'Beaune',
      'Blagny',
      'Bouzeron',
      'Chablis',
      'Chambolle-Musigny',
      'Chassagne-Montrachet',
      'Chorey-les-Beaune',
      'Côte-de-Beaune',
      'Côte-de-Nuits Villages',
      'Fixin',
      'Gevrey-Chambertin',
      'Givry',
      'Irancy',
      'Ladoix',
      'Maranges',
      'Marsannay',
      'Mercurey',
      'Meursault',
      'Montagny',
      'Monthélie',
      'Morey-Saint-Denis',
      'Nuits-Saint-George',
      'Pernand-Vergelesses',
      'Petit-Chablis',
      'Pommard',
      'Pouilly-Fuissé',
      'Pouilly-Loché',
      'Pouilly-Vinzelles',
      'Puligny-Montrachet',
      'Rully',
      'Saint-Aubin',
      'Saint-Bris',
      'Saint-Romain',
      'Saint-Véran',
      'Santenay',
      'Savigny-lès-Beaune',
      'Viré-Clessé',
      'Volnay',
      'Vosne-Romanée',
      'Vougeot',
      'Autre',
   ],
   Bordeaux: [
      '',
      'Barsac',
      'Graves',
      'Haut-Médoc',
      'Margaux',
      'Médoc',
      'Pauillac',
      'Pessac-Léognan',
      'Pomerol',
      'Saint-Emilion',
      'Saint-Estèphe',
      'Saint-Julien',
      'Sauternes',
      'Autre'
   ],
   Autre: [
      '',
      'Autre'
   ],
}

export const empty_or_other = [
   '',
   'Autre'
]

export const test_data = [
   {
      id:1,
      country:"France",
      region:"Bourgogne",
      type:"red",
      appelation:"Vosne-Romanée",
      producer: "Louis Latour",
      vintage:2003,
      cru: "Grand Cru",
      cuvee:"",
      size: "75cl",
      comments: ""
   },
   {
      id:2,
      country:"France",
      region:"Champagne",
      type:"sparkling white",
      appelation:"Brut",
      producer: "A.R. Lenoble",
      vintage:2008,
      cru: "",
      cuvee:"Intense",
      size: "75cl",
      comments: ""
   },
   {
      id:3,
      country:"France",
      region:"Bordeaux",
      type:"red",
      appelation:"Médoc",
      producer: "Château Anthonic",
      vintage:1999,
      cru: "Cru Bourgeois",
      cuvee:"",
      size: "75cl",
      comments: ""
   },
   {
      id:4,
      country:"France",
      region:"Bourgogne",
      type:"white",
      appelation:"Montagny",
      producer: "Xavier Berthenet",
      vintage:2017,
      cru: "1er Cru",
      cuvee:"Vendange Tardives",
      size: "75cl",
      comments: "Excellent !"
   },
   {
      id:5,
      country:"Espagne",
      region:"Rioja",
      type:"red",
      appelation:"",
      producer: "",
      vintage:2010,
      cru: "",
      cuvee:"",
      size: "75cl",
      comments: "Très tanninque..."
   }
]
