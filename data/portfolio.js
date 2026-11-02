/**
 * Bossam Factory - Portfolio Data
 * Centralized portfolio data for easy management
 */

const PORTFOLIO_DATA = {
    categories: [
        { id: 'all', name: 'Tout' },
        { id: 'digital', name: 'Digital' },
        { id: 'print', name: 'Print' },
        { id: 'branding', name: 'Branding' },
        { id: 'installation', name: 'Installation' },
        { id: 'illustration', name: 'Illustration' }
    ],
    
    items: [
        {
            id: 1,
            title: 'Identity Redesign',
            category: ['digital', 'branding'],
            description: 'Refonte complète de l\'identité visuelle pour une marque moderne',
            image: 'images/portfolio/identity-redesign.jpg',
            thumbnail: 'images/portfolio/thumbs/identity-redesign.jpg',
            link: '#',
            year: 2024,
            client: 'Client A',
            tags: ['logo', 'branding', 'digital']
        },
        {
            id: 2,
            title: 'Urban Art Project',
            category: ['installation'],
            description: 'Installation artistique urbaine interactive',
            image: 'images/portfolio/urban-art.jpg',
            thumbnail: 'images/portfolio/thumbs/urban-art.jpg',
            link: '#',
            year: 2023,
            client: 'Ville de Paris',
            tags: ['installation', 'art', 'public']
        },
        {
            id: 3,
            title: 'Art Book Collection',
            category: ['print'],
            description: 'Collection de livres d\'art imprimés avec finitions premium',
            image: 'images/portfolio/art-book.jpg',
            thumbnail: 'images/portfolio/thumbs/art-book.jpg',
            link: '#',
            year: 2024,
            client: 'Éditions Art',
            tags: ['print', 'design', 'editorial']
        },
        {
            id: 4,
            title: 'Creative App',
            category: ['digital'],
            description: 'Application mobile pour créateurs et artistes',
            image: 'images/portfolio/creative-app.jpg',
            thumbnail: 'images/portfolio/thumbs/creative-app.jpg',
            link: '#',
            year: 2024,
            client: 'Tech Startup',
            tags: ['mobile', 'ui', 'ux', 'digital']
        },
        {
            id: 5,
            title: 'Visual Identity',
            category: ['branding'],
            description: 'Création d\'une identité visuelle complète',
            image: 'images/portfolio/visual-identity.jpg',
            thumbnail: 'images/portfolio/thumbs/visual-identity.jpg',
            link: '#',
            year: 2023,
            client: 'Brand X',
            tags: ['branding', 'logo', 'design']
        },
        {
            id: 6,
            title: 'Interactive Space',
            category: ['installation', 'print'],
            description: 'Espace interactif combinant impression et installation',
            image: 'images/portfolio/interactive-space.jpg',
            thumbnail: 'images/portfolio/thumbs/interactive-space.jpg',
            link: '#',
            year: 2024,
            client: 'Galerie d\'Art',
            tags: ['installation', 'interactive', 'experience']
        },
        {
            id: 7,
            title: 'Digital Illustration Series',
            category: ['illustration', 'digital'],
            description: 'Série d\'illustrations numériques pour campagne marketing',
            image: 'images/portfolio/digital-illustration.jpg',
            thumbnail: 'images/portfolio/thumbs/digital-illustration.jpg',
            link: '#',
            year: 2024,
            client: 'Agence Marketing',
            tags: ['illustration', 'digital', 'art']
        },
        {
            id: 8,
            title: 'Packaging Design',
            category: ['print', 'branding'],
            description: 'Design de packaging pour produits de luxe',
            image: 'images/portfolio/packaging.jpg',
            thumbnail: 'images/portfolio/thumbs/packaging.jpg',
            link: '#',
            year: 2023,
            client: 'Luxury Brand',
            tags: ['packaging', 'print', 'branding']
        },
        {
            id: 9,
            title: 'Motion Graphics',
            category: ['digital'],
            description: 'Animation motion graphics pour réseaux sociaux',
            image: 'images/portfolio/motion-graphics.jpg',
            thumbnail: 'images/portfolio/thumbs/motion-graphics.jpg',
            link: '#',
            year: 2024,
            client: 'Média Social',
            tags: ['motion', 'animation', 'digital']
        }
    ]
};

// Services data
const SERVICES_DATA = [
    {
        id: 1,
        title: 'Design Graphique',
        description: 'Création d\'identités visuelles, logos, chartes graphiques et supports print qui marquent les esprits.',
        icon: 'fa-paint-brush',
        category: 'design'
    },
    {
        id: 2,
        title: 'Design Digital',
        description: 'Conception d\'interfaces utilisateur, sites web et applications mobiles intuitives et esthétiques.',
        icon: 'fa-code',
        category: 'digital'
    },
    {
        id: 3,
        title: 'Branding',
        description: 'Développement de stratégies de marque complètes pour créer une identité forte et cohérente.',
        icon: 'fa-cubes',
        category: 'branding'
    },
    {
        id: 4,
        title: 'Art & Illustration',
        description: 'Créations artistiques originales, illustrations personnalisées et œuvres uniques pour tous vos besoins.',
        icon: 'fa-chalkboard',
        category: 'art'
    },
    {
        id: 5,
        title: 'Motion Design',
        description: 'Animation, vidéo et motion graphics pour donner vie à vos idées et captiver votre audience.',
        icon: 'fa-video',
        category: 'motion'
    },
    {
        id: 6,
        title: 'Installations',
        description: 'Conception et réalisation d\'installations artistiques et d\'expériences immersives uniques.',
        icon: 'fa-space-shuttle',
        category: 'installation'
    }
];

// Team data
const TEAM_DATA = [
    {
        id: 1,
        name: 'Jean Dupont',
        role: 'Directeur Créatif',
        description: 'Fondateur de Bossam Factory, passionné par l\'art et l\'innovation.',
        image: 'images/team/jean-dupont.jpg',
        social: {
            instagram: '#',
            behance: '#',
            linkedin: '#'
        }
    },
    {
        id: 2,
        name: 'Marie Martin',
        role: 'Designer Graphique',
        description: 'Expert en identité visuelle et design print.',
        image: 'images/team/marie-martin.jpg',
        social: {
            instagram: '#',
            dribbble: '#',
            twitter: '#'
        }
    },
    {
        id: 3,
        name: 'Pierre Bernard',
        role: 'Développeur Frontend',
        description: 'Spécialiste des interfaces utilisateur et animations web.',
        image: 'images/team/pierre-bernard.jpg',
        social: {
            github: '#',
            linkedin: '#',
            twitter: '#'
        }
    },
    {
        id: 4,
        name: 'Sophie Laurent',
        role: 'Illustratrice',
        description: 'Artiste talentueuse créant des illustrations uniques.',
        image: 'images/team/sophie-laurent.jpg',
        social: {
            instagram: '#',
            behance: '#',
            artstation: '#'
        }
    }
];

// Stats data
const STATS_DATA = {
    projects: 150,
    clients: 50,
    years: 10,
    awards: 25
};

// Contact info
const CONTACT_DATA = {
    address: '123 Rue de la Créativité, Paris',
    email: 'hello@bossamfactory.com',
    phone: '+33 1 23 45 67 89',
    social: {
        instagram: '#',
        behance: '#',
        dribbble: '#',
        linkedin: '#',
        twitter: '#'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PORTFOLIO_DATA,
        SERVICES_DATA,
        TEAM_DATA,
        STATS_DATA,
        CONTACT_DATA
    };
}
