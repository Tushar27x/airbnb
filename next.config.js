/** @type {import('next').NextConfig} */
module.exports  = {
    images: {domains: 
        ['res.cloudinary.com'],
    },
    async redirects(){
        return [
            {
                source:"/:path",
                has:[{type:'query', key:'favorites'}],
                destination: "/favorites",
                permanent: true
            },
            {
                source:"/:path",
                has:[{type:'query', key:'trips'}],
                destination: "/trips",
                permanent: true
            },
            {
                source:"/:path",
                has:[{type:'query', key:'listings'}],
                destination: "/listings",
                permanent: true
            },
            {
                source:"/:path",
                has:[{type:'query', key:'reservations'}],
                destination: "/reservations",
                permanent: true
            },
            {
                source:"/:path",
                has:[{type:'query', key:'properties'}],
                destination: "/properties",
                permanent: true
            },
        ]
    }
};
