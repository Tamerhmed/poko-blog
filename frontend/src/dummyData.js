export const posts = [
    {
        _id: 1,
        title: "BMW",
        description: "About BMW",
        category: "cars",
        image: "/images/bmw.jpg",
        likes: [1,2],
        createdAt: "Fri Nov 04 2022",
        user: {
            username: "Laura",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 2,
        title: "Explore great ocean road",
        description: "Great ocean road",
        category: "programming",
        image: "/images/javascript.jpeg",
        likes: [1,2,3,4],
        createdAt: "Sun Oct 06 2021",
        user: {
            username: "Lisa",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 3,
        title: "good destination for summer",
        description: "About Travelling",
        category: "travelling",
        image: "/images/istanbul.jpg",
        likes: [],
        createdAt: "Fri Oct 08 2021",
        user: {
            username: "Ryan",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 4,
        title: "Nanga Parbat",
        description: "About Nanga Parbat",
        category: "nature",
        image: "/images/nangaparbat.jpg",
        likes: [1,2,3,4,5],
        createdAt: "Mon Jul 06 2022",
        user: {
            username: "Mathew",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 5,
        title: "Auckland",
        description: "About Auckland",
        category: "travelling",
        image: "/images/baghdad.jpg",
        likes: [1,2,3],
        createdAt: "Fri Oct 12 2022",
        user: {
            username: "Andrew",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 6,
        title: "Turkish Coffee",
        description: "About Turkish Coffee",
        category: "coffee & tea",
        image: "/images/coffee.jpg",
        likes: [1],
        createdAt: "Fri Oct 21 20222",
        user: {
            username: "Mark",
            image: "/images/user-avatar.png"
        }
    },
];


export const categories = [
    {
        _id: 1,
        title: 'Traveling',
    },
    {
        _id: 2,
        title: 'Day trip',
    },
    {
        _id: 3,
        title: 'Food',
    },
    {
        _id: 4,
        title: 'Camping',
    },
    {
        _id: 5,
        title: 'nature',
    },
    {
        _id: 6,
        title: 'coffee',
    },
]
