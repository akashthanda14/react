import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCompanyLogos() {
    console.log('🔄 Updating company logos...');

    const updates = [
        {
            name: 'Amazon',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png',
        },
        {
            name: 'Goldman Sachs',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/250px-Goldman_Sachs.svg.png',
        },
        {
            name: 'Sumo Logic',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7g-Z03mvYWp-V0fzAUngNU4ZLVExOT0EpwA&s',
        },
        {
            name: 'Microsoft',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVu_punmVpXPehlmF-zb9LO30EZQRtHpK7KA&s',
        },
        {
            name: 'Morgan Stanley',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4b2xFrY7mhOS9pGOnckG88R0ZzHpzYZ7hA&s',
        },
        {
            name: 'PhonePe',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVf6nm-Dk1ELbj1aBfeN_vJH6R1wAqYWnltw&s',
        },
        {
            name: 'Flipkart',
            logo: 'https://www.citypng.com/public/uploads/preview/flipkart-logo-icon-hd-png-701751694706828v1habfry9b.png',
        },
        {
            name: 'Paytm',
            logo: 'https://cdn.iconscout.com/icon/free/png-256/free-paytm-icon-svg-download-png-226448.png?f=webp',
        },
        {
            name: 'D. E. Shaw',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEih3HSg7_49qZjWfXxFwxpUWgapkXYA1u6w&s',
        },
        {
            name: 'DE Shaw',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEih3HSg7_49qZjWfXxFwxpUWgapkXYA1u6w&s',
        },
        {
            name: 'D.E. Shaw',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEih3HSg7_49qZjWfXxFwxpUWgapkXYA1u6w&s',
        },
        {
            name: 'Google',
            logo: 'https://s3-alpha.figma.com/hub/file/6516490032/e7dabd51-4155-4761-a247-b3d6a6f52f73-cover.png'
        },
        {
            name: 'Adobe',
            logo: 'https://companieslogo.com/img/orig/ADBE-fb158b30.png?t=1740130206'
        },
        {
            name: 'Facebook',
            logo: 'https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png'
        },
        {
            name: 'Apple',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6zMotp9rnGOp9uo3sIoYeHi19hsTW2r6pQ&s'
        },
        {
            name: 'Swiggy',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqDecYNB4XzOS5TFHmIBXBgf_DMPzKttsmw&s'
        },
        {
            name: "Zomato",
            logo: "https://1000logos.net/wp-content/uploads/2021/06/Zomato-logo.png"
        },
        {
            name: "PayPal",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg"
        }, {
            name: "LinkedIn",
            logo: "https://img.freepik.com/premium-vector/square-linkedin-logo-isolated-white-background_469489-892.jpg?semt=ais_hybrid&w=740&q=80"
        }
    ];

    for (const update of updates) {
        try {
            const result = await prisma.company_tags.updateMany({
                where: { name: update.name },
                data: { logo: update.logo },
            });

            if (result.count > 0) {
                console.log(`✅ Updated ${update.name}: ${result.count} record(s)`);
            } else {
                console.log(`⚠️  No records found for name: ${update.name}`);
            }
        } catch (error) {
            console.error(`❌ Error updating ${update.name}:`, error);
        }
    }

    console.log('✨ Logo update complete!');
}

updateCompanyLogos()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
