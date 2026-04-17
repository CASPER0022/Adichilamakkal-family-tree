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
    id: 'g2_john',
    name: 'John Ulahannan',
    role: 'Grandfather',
    generation: 2,
    gender: 'male',
    birthYear: 1925,
    deathYear: 2005,
    parentId: 'g1_john',
    avatar: '/images/family/john.jpeg',
    bio: 'A dedicated father and community leader who carried forward the family legacy.',
    spouseId: 'g2_annamma',
  },
  {
    id: 'g2_annamma',
    name: 'Annamma',
    role: 'Grandmother',
    generation: 2,
    gender: 'female',
    birthYear: 1930,
    deathYear: null,
    avatar: '/images/family/annamma.jpeg',
    bio: 'Known for her wonderful cooking and endless stories about the family history.',
    spouseId: 'g2_john',
  },

  // ================= GENERATION 3 =================
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
    avatar: '/images/family/sigi.jpeg',
    bio: 'The heart of the household, bringing joy, care, and compassion to everyone.',
    spouseId: 'g3_raju',
  },
  {
    id: 'g3_babu',
    name: 'Babu John',
    role: 'Uncle',
    generation: 3,
    gender: 'male',
    birthYear: 1962,
    deathYear: null,
    parentId: 'g2_john',
    avatar: getAvatar('BabuJohn', 'male'),
    bio: 'A person of great intellect and humor, always the life of the family gatherings.',
  },
  {
    id: 'g3_shija',
    name: 'Shija',
    role: 'Aunt',
    generation: 3,
    gender: 'female',
    birthYear: 1968,
    deathYear: null,
    parentId: 'g2_john',
    avatar: getAvatar('Shija', 'female'),
    bio: 'A loving aunt known for her kindness and creative spirit.',
  },

  // ================= GENERATION 4 ==============
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
    role: 'Son',
    generation: 4,
    gender: 'male',
    birthYear: 1992,
    deathYear: null,
    parentId: 'g3_raju',
    avatar: '/images/family/bibin.jpeg',
    bio: 'A driven professional with a deep sense of family responsibility.',
    spouseId: 'g4_anjaly',
  },
  {
    id: 'g4_anjaly',
    name: 'Anjaly P Thomas',
    role: 'Daughter-in-Law',
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
    role: 'Son',
    generation: 4,
    gender: 'male',
    birthYear: 1998,
    deathYear: null,
    parentId: 'g3_raju',
    avatar: '/images/family/sebin.jpeg',
    bio: 'The energetic youngest son with a passion for creative arts and sports.',
  },

  // ================= GENERATION 5 =================
  {
    id: 'g5_steve',
    name: 'Steve John',
    role: 'Grandson',
    generation: 5,
    gender: 'male',
    birthYear: 2022,
    deathYear: null,
    parentId: 'g4_bibin',
    avatar: '/images/family/steve.jpeg',
    bio: 'The newest addition to the family, bringing endless joy and smiles to everyone.',
  },
];

export default familyData;

// Group members by generation for rendering
export const getGenerations = () => {
  const gens = [...new Set(familyData.map((m) => m.generation))];
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
export const getCouples = (generationNumber) => {
  const membersInGen = familyData.filter(
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
