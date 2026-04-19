export const getAvatar = (seed, gender) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&gender=${gender}&backgroundColor=0f0f16`;

const familyData = [
  // ================= GENERATION 1 =================
  {
    id: 'g1_john',
    name: 'John',
    role: 'Great Grandfather',
    generation: 1,
    gender: 'male',
    birthYear: 1890,
    deathYear: 1970,
    avatar: getAvatar('JohnG1', 'male'),
    bio: 'The patriarch of the family who laid the foundation with hard work and strong values.',
    spouseId: 'g1_rosamma',
  },
  {
    id: 'g1_rosamma',
    name: 'Rosamma',
    role: 'Great Grandmother',
    generation: 1,
    gender: 'female',
    birthYear: 1895,
    deathYear: 1980,
    avatar: getAvatar('RosammaG1', 'female'),
    bio: 'The matriarch whose love and wisdom guided multiple generations.',
    spouseId: 'g1_john',
  },

  // ================= GENERATION 2 =================
  {
    id: 'g2_george',
    name: 'George',
    role: 'Maternal Grandfather',
    generation: 2,
    gender: 'male',
    birthYear: 1945,
    deathYear: null,
    avatar: getAvatar('George', 'male'),
    bio: 'A loving grandfather and the pillar of Sigi\'s family.',
    spouseId: 'g2_annakutty',
    isExtended: true,
  },
  {
    id: 'g2_annakutty',
    name: 'Annakutty',
    role: 'Maternal Grandmother',
    generation: 2,
    gender: 'female',
    birthYear: 1950,
    deathYear: null,
    avatar: getAvatar('Annakutty', 'female'),
    bio: 'A kind-hearted grandmother who instilled great values in Sigi and her siblings.',
    spouseId: 'g2_george',
    isExtended: true,
  },
  {
    id: 'g2_john',
    name: 'John Ulahannan',
    role: 'Paternal Grandfather',
    generation: 2,
    gender: 'male',
    birthYear: 1948,
    deathYear: null,
    parentId: 'g1_john',
    avatar: '/images/family/john.jpeg',
    bio: 'A dedicated father and community leader who carried forward the family legacy.',
    spouseId: 'g2_annamma',
  },
  {
    id: 'g2_annamma',
    name: 'Annamma',
    role: 'Paternal Grandmother',
    generation: 2,
    gender: 'female',
    birthYear: 1955,
    deathYear: null,
    avatar: '/images/family/annamma.jpeg',
    bio: 'Known for her wonderful cooking and endless stories about the family history.',
    spouseId: 'g2_john',
  },

  // ================= GENERATION 3 =================
  {
    id: 'g3_shaji_vj',
    name: 'Shaji VJ',
    role: 'Maternal Uncle',
    generation: 3,
    gender: 'male',
    birthYear: 1968,
    deathYear: null,
    parentId: 'g2_george',
    avatar: getAvatar('ShajiVJ', 'male'),
    bio: 'Brother of Sigi.',
    isExtended: true,
    spouseId: 'g3_betty_shaji',
  },
  {
    id: 'g3_betty_shaji',
    name: 'Betty Shaji',
    role: 'Maternal Aunt',
    generation: 3,
    gender: 'female',
    birthYear: 1972,
    deathYear: null,
    avatar: getAvatar('BettyShaji', 'female'),
    bio: 'Wife of Shaji.',
    isExtended: true,
    spouseId: 'g3_shaji_vj',
  },
  {
    id: 'g3_reji_vj',
    name: 'Reji VJ',
    role: 'Maternal Uncle',
    generation: 3,
    gender: 'male',
    birthYear: 1970,
    deathYear: null,
    parentId: 'g2_george',
    avatar: getAvatar('RejiVJ', 'male'),
    bio: 'Brother of Sigi.',
    isExtended: true,
    spouseId: 'g3_jeena_reji',
  },
  {
    id: 'g3_jeena_reji',
    name: 'Jeena Reji',
    role: 'Maternal Aunt',
    generation: 3,
    gender: 'female',
    birthYear: 1974,
    deathYear: null,
    avatar: getAvatar('JeenaReji', 'female'),
    bio: 'Wife of Reji.',
    isExtended: true,
    spouseId: 'g3_reji_vj',
  },
  {
    id: 'g3_saju_vj',
    name: 'Saju VJ',
    role: 'Maternal Uncle',
    generation: 3,
    gender: 'male',
    birthYear: 1972,
    deathYear: null,
    parentId: 'g2_george',
    avatar: getAvatar('SajuVJ', 'male'),
    bio: 'Brother of Sigi.',
    isExtended: true,
  },
  {
    id: 'g3_raju',
    name: 'Raju John',
    role: 'Father',
    generation: 3,
    gender: 'male',
    birthYear: 1960,
    deathYear: null,
    parentId: 'g2_john',
    avatar: '/images/family/raju.jpeg',
    bio: 'A visionary and dedicated family man who inspired his children to pursue their dreams.',
    spouseId: 'g3_sigi',
  },
  {
    id: 'g3_sigi',
    name: 'Sigi',
    role: 'Mother',
    generation: 3,
    gender: 'female',
    birthYear: 1965,
    deathYear: null,
    parentId: 'g2_george',
    avatar: '/images/family/sigi.jpeg',
    bio: 'The heart of the household, bringing joy, care, and compassion to everyone.',
    spouseId: 'g3_raju',
  },
  {
    id: 'g3_babu',
    name: 'Babu John',
    role: 'Paternal Uncle',
    generation: 3,
    gender: 'male',
    birthYear: 1962,
    deathYear: null,
    parentId: 'g2_john',
    avatar: getAvatar('BabuJohn', 'male'),
    bio: 'A person of great intellect and humor, always the life of the family gatherings.',
    spouseId: 'g3_shiny',
  },
  {
    id: 'g3_shiny',
    name: 'Shiny Babu',
    role: 'Paternal Aunt',
    generation: 3,
    gender: 'female',
    birthYear: 1968,
    deathYear: null,
    avatar: getAvatar('ShinyBabu', 'female'),
    bio: 'A wonderful wife and mother who brings warmth to the household.',
    spouseId: 'g3_babu',
    isExtended: true,
  },
  {
    id: 'g3_shija',
    name: 'Shija',
    role: 'Paternal Aunt',
    generation: 3,
    gender: 'female',
    birthYear: 1968,
    deathYear: null,
    parentId: 'g2_john',
    avatar: getAvatar('Shija', 'female'),
    bio: 'A loving aunt known for her kindness and creative spirit.',
    spouseId: 'g3_sunny',
  },
  {
    id: 'g3_sunny',
    name: 'Sunny',
    role: 'Paternal Uncle',
    generation: 3,
    gender: 'male',
    birthYear: 1962,
    deathYear: null,
    avatar: getAvatar('Sunny', 'male'),
    bio: 'A hardworking and caring father who anchors his family with love.',
    spouseId: 'g3_shija',
    isExtended: true,
  },

  // ================= GENERATION 4 ==============
  {
    id: 'g4_alphonsa',
    name: 'Alphonsa Shaji',
    role: 'Cousin',
    generation: 4,
    gender: 'female',
    birthYear: 1995,
    deathYear: null,
    parentId: 'g3_shaji_vj',
    avatar: getAvatar('AlphonsaShaji', 'female'),
    bio: 'Daughter of Shaji and Betty.',
    isExtended: true,
  },
  {
    id: 'g4_ann',
    name: 'Annmariya Shaji',
    role: 'Cousin',
    generation: 4,
    gender: 'female',
    birthYear: 1998,
    deathYear: null,
    parentId: 'g3_shaji_vj',
    avatar: getAvatar('AnnMariya', 'female'),
    bio: 'Daughter of Shaji and Betty.',
    isExtended: true,
  },
  {
    id: 'g4_melbin',
    name: 'Melbin Shaji',
    role: 'Cousin',
    generation: 4,
    gender: 'male',
    birthYear: 2002,
    deathYear: null,
    parentId: 'g3_shaji_vj',
    avatar: getAvatar('MelbinShaji', 'male'),
    bio: 'Son of Shaji and Betty.',
    isExtended: true,
  },
  {
    id: 'g4_godwin',
    name: 'Godwin Reji',
    role: 'Cousin',
    generation: 4,
    gender: 'male',
    birthYear: 2005,
    deathYear: null,
    parentId: 'g3_reji_vj',
    avatar: getAvatar('GodwinReji', 'male'),
    bio: 'Son of Reji and Jeena.',
    isExtended: true,
  },
  {
    id: 'g4_albin',
    name: 'Albin John',
    role: 'Me',
    generation: 4,
    gender: 'male',
    birthYear: 2004,
    deathYear: null,
    parentId: 'g3_raju',
    avatar: '/images/family/albin.png',
    bio: 'Passionate about technology and building modern solutions for the future.',
  },
  {
    id: 'g4_bibin',
    name: 'Bibin John',
    role: 'Brother',
    generation: 4,
    gender: 'male',
    birthYear: 1994,
    deathYear: null,
    parentId: 'g3_raju',
    avatar: '/images/family/bibin.jpeg',
    bio: 'A driven professional with a deep sense of family responsibility.',
    spouseId: 'g4_anjaly',
  },
  {
    id: 'g4_anjaly',
    name: 'Anjaly P Thomas',
    role: 'Sister-in-Law',
    generation: 4,
    gender: 'female',
    birthYear: 1994,
    deathYear: null,
    avatar: '/images/family/anjali.jpeg',
    bio: 'Brings warmth and a beautiful new perspective to the family fold.',
    spouseId: 'g4_bibin',
  },
  {
    id: 'g4_sebin',
    name: 'Sebin John',
    role: 'Brother',
    generation: 4,
    gender: 'male',
    birthYear: 1997,
    deathYear: null,
    parentId: 'g3_raju',
    avatar: '/images/family/sebin.jpeg',
    bio: 'The energetic youngest son with a passion for creative arts and sports.',
  },
  {
    id: 'g4_soniya',
    name: 'Soniya Babu',
    role: 'Cousin',
    generation: 4,
    gender: 'female',
    birthYear: 1990,
    deathYear: null,
    parentId: 'g3_babu',
    avatar: getAvatar('Soniya', 'female'),
    bio: 'Daughter of Babu and Shiny.',
    spouseId: 'g4_sobin',
    isExtended: true,
  },
  {
    id: 'g4_sobin',
    name: 'Sobin',
    role: 'Cousin-in-Law',
    generation: 4,
    gender: 'male',
    birthYear: 1988,
    deathYear: null,
    avatar: getAvatar('Sobin', 'male'),
    bio: 'Husband of Soniya.',
    spouseId: 'g4_soniya',
    isExtended: true,
  },
  {
    id: 'g4_sophia',
    name: 'Sophia Babu',
    role: 'Cousin',
    generation: 4,
    gender: 'female',
    birthYear: 1994,
    deathYear: null,
    parentId: 'g3_babu',
    avatar: getAvatar('Sophia', 'female'),
    bio: 'Daughter of Babu and Shiny.',
    isExtended: true,
  },
  {
    id: 'g4_sebin_sunny',
    name: 'Sebin Sunny',
    role: 'Cousin',
    generation: 4,
    gender: 'male',
    birthYear: 1993,
    deathYear: null,
    parentId: 'g3_shija',
    avatar: getAvatar('SebinSunny', 'male'),
    bio: 'Son of Shija and Sunny.',
    isExtended: true,
  },
  {
    id: 'g4_sherin_sunny',
    name: 'Sherin Sunny',
    role: 'Cousin',
    generation: 4,
    gender: 'female',
    birthYear: 1997,
    deathYear: null,
    parentId: 'g3_shija',
    avatar: getAvatar('SherinSunny', 'female'),
    bio: 'Daughter of Shija and Sunny.',
    spouseId: 'g4_jofin',
    isExtended: true,
  },
  {
    id: 'g4_jofin',
    name: 'Jofin',
    role: 'Cousin-in-Law',
    generation: 4,
    gender: 'male',
    birthYear: 1995,
    deathYear: null,
    avatar: getAvatar('Jofin', 'male'),
    bio: 'Husband of Sherin.',
    spouseId: 'g4_sherin_sunny',
    isExtended: true,
  },

  // ================= GENERATION 5 =================
  {
    id: 'g5_steve',
    name: 'Steve John',
    role: 'Nephew',
    generation: 5,
    gender: 'male',
    birthYear: 2026,
    deathYear: null,
    parentId: 'g4_bibin',
    avatar: '/images/family/steve.jpeg',
    bio: 'The newest addition to the family, bringing endless joy and smiles to everyone.',
  },
  {
    id: 'g5_name',
    name: 'Name',
    role: 'Niece',
    generation: 5,
    gender: 'female',
    birthYear: 2024,
    deathYear: null,
    parentId: 'g4_soniya',
    avatar: getAvatar('Name', 'female'),
    bio: 'Daughter of Soniya and Sobin.',
    isExtended: true,
  },
  {
    id: 'g5_ruth',
    name: 'Ruth',
    role: 'Niece',
    generation: 5,
    gender: 'female',
    birthYear: 2024,
    deathYear: null,
    parentId: 'g4_sherin_sunny',
    avatar: getAvatar('Ruth', 'female'),
    bio: 'Daughter of Sherin and Jofin.',
    isExtended: true,
  },
];

export default familyData;

// Group members by generation for rendering
export const getGenerations = (dataToUse = familyData) => {
  const gens = [...new Set(dataToUse.map((m) => m.generation))];
  return gens.sort((a, b) => a - b);
};

export const generationLabels = {
  1: 'GREAT GRANDPARENTS',
  2: 'GRANDPARENTS',
  3: 'PARENTS & UNCLES',
  4: 'CURRENT GENERATION',
  5: 'NEXT GENERATION',
};

// Groups members into couples or individuals for a given generation
export const getCouples = (generationNumber, dataToUse = familyData) => {
  const membersInGen = dataToUse.filter(
    (m) => m.generation === generationNumber
  );

  const couples = [];
  const visited = new Set();

  membersInGen.forEach((member) => {
    if (visited.has(member.id)) return;

    visited.add(member.id);

    if (member.spouseId) {
      const spouse = membersInGen.find((m) => m.id === member.spouseId);
      if (spouse) {
        visited.add(spouse.id);
        // Order: primary bloodline usually first, but we default to male first for layout symmetry if needed
        const coupleArr = [member, spouse].sort((a, b) => {
          // Explicit override: Sigi must be on the left of Raju to prevent line crossover from George
          if ((a.id === 'g3_sigi' && b.id === 'g3_raju') || (b.id === 'g3_sigi' && a.id === 'g3_raju')) {
            return a.id === 'g3_sigi' ? -1 : 1;
          }
          if (a.gender === 'male' && b.gender !== 'male') return -1;
          if (a.gender !== 'male' && b.gender === 'male') return 1;
          return 0;
        });
        couples.push(coupleArr);
      } else {
        couples.push([member]);
      }
    } else {
      couples.push([member]);
    }
  });

  return couples;
};

// Search functionality
export const searchMembers = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return familyData.filter(member =>
    member.name.toLowerCase().includes(lowerQuery) ||
    member.role.toLowerCase().includes(lowerQuery) ||
    (member.bio && member.bio.toLowerCase().includes(lowerQuery))
  );
};
