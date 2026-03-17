const careers = [
    {
        career_id: "engineering",
        title: "Engineering",
        description:
            "Engineering is a broad and demanding career that involves applying science, mathematics, and technology to solve real-world problems. Engineers design systems, build products, and optimize processes across fields like software, mechanical, civil, and electronics. While it is one of the most popular career choices, it is also highly competitive and often misunderstood. Simply getting a degree is not enough — success in engineering depends heavily on practical skills, problem-solving ability, and continuous learning.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "3-6 LPA",
        img: "https://mvjce.edu.in/wp-content/uploads/2023/02/Why-is-Innovation-Important-in-Engineering-Education.webp"
    },
    {
        career_id: "medical",
        title: "Medical",
        description:
            "Medical career mainly involves becoming a doctor or working in healthcare. The most common path is to pursue an MBBS degree, which trains students in medicine and surgery. Doctors diagnose illnesses, treat patients, and specialize in fields like cardiology, neurology, or pediatrics. Other options include dentistry (BDS), alternative medicines (BAMS, BHMS), and paramedical courses like nursing, physiotherapy, and medical lab technology. Entrance exams like NEET UG are essential for admission.",
        stream: "Science",
        avgSalary: "6-10 LPA",
        source: "prefilled",
        img: "https://familyfirster.com/wp-content/uploads/2023/05/different-types-of-medical-treatment.jpeg"
    },
    {
        career_id: "chartered_accountant",
        title: "Chartered Accountant",
        description:
            "Chartered Accountants are finance professionals qualified to handle auditing, taxation, financial reporting, and advising businesses on financial practices. They work in diverse areas like tax planning, auditing financial statements, corporate finance, forensic accounting, and management consulting. CAs ensure legal compliance and help optimize financial operations for organizations and individuals.",
        stream: "Commerce",
        avgSalary: "7-12 LPA",
        source: "prefilled",
        img: "https://arihantacademy.com/wp-content/uploads/2023/04/paper-analysis-1024x683.jpg"
    },
    {
        career_id: "economist",
        title: "Economist",
        description:
            "Economists study and analyze economic data and trends to understand how economies function. They use statistical and mathematical models to forecast market trends, advise businesses and governments on economic policies, and help solve economic problems. Economists work in research, public policy, finance, and international organizations, providing insights that influence decisions on taxes, employment, trade, and development. Advanced degrees like a Master’s or Ph.D. are usually required.",
        stream: "Commerce",
        avgSalary: "6.5-9 LPA",
        source: "prefilled",
        img: "https://p7.hiclipart.com/preview/955/853/225/5be1c6d091ca0.jpg"
    },
    {
        career_id: "lawyer",
        title: "Lawyer",
        description:
            "Lawyers in India represent clients in court, provide legal advice, draft legal documents, and ensure compliance with laws. They work in civil, criminal, corporate, family, intellectual property, and other legal domains. Becoming a lawyer involves strong analytical, communication, and reasoning skills. They can work as advocates, corporate lawyers, legal advisors, or judges. A law degree (LLB) and passing the All India Bar Examination (AIBE) are required for practice.",
        stream: "Arts",
        avgSalary: "3-5 LPA",
        source: "prefilled",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKjHD9J7w-J2i57MdLTkN4BtPP0tg5Sd3Iuw&s"
    },
    {
        career_id: "psychologist",
        title: "Psychologist",
        description:
            "Psychologists study human behavior, emotions, and mental processes to help people manage mental health issues and improve well-being. They assess, diagnose, and treat psychological disorders using therapies like cognitive-behavioral therapy (CBT), counseling, and mindfulness. Psychologists work in schools, hospitals, clinics, corporations, and research organizations. They often specialize in fields like clinical psychology, counseling, developmental psychology, or industrial-organizational psychology.",
        stream: "Arts",
        avgSalary: "3.5-4 LPA",
        source: "prefilled",
        img: "https://www.onlinepsychologydegree.info/wp-content/uploads/2021/06/shutterstock_1837184797-scaled.jpg"
    },
    {
        career_id: "graphic_design",
        title: "Graphic Design",
        description:
            "Graphic Design is a creative career focused on visual communication through digital and print media. Designers create logos, branding, social media content, websites, and marketing materials that influence how people perceive products and ideas. While it may seem like an easy or ‘fun’ career, the reality is that it requires strong design fundamentals, creativity under constraints, and the ability to handle client feedback and deadlines.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "3-7 LPA",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "hotel_management",
        title: "Hotel Management",
        description:
            "Hotel Management is a career in the hospitality industry that focuses on managing hotels, resorts, restaurants, and event services. It involves handling operations, customer service, staff coordination, and business management. While it may appear glamorous from the outside, especially in luxury hotels, the reality includes long working hours, high-pressure environments, and starting from entry-level roles.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "3-6 LPA",
        img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&q=80"
    }, {
        career_id: "ai_engineer",
        title: "AI Engineer",
        description:
            "AI Engineers design and build intelligent systems that can learn from data and make decisions. They work on machine learning models, deep learning systems, and real-world AI applications like chatbots, recommendation systems, and automation tools. This field requires strong programming, mathematics, and problem-solving skills.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "8-25 LPA",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "blockchain_developer",
        title: "Blockchain Developer",
        description:
            "Blockchain Developers build decentralized applications and smart contracts using technologies like Ethereum and Web3. They focus on secure, transparent systems used in finance, NFTs, and digital identity. This career requires strong coding skills and understanding of cryptography.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "10-30 LPA",
        img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "cybersecurity_analyst",
        title: "Cybersecurity Analyst",
        description:
            "Cybersecurity Analysts protect systems, networks, and data from cyber threats. They monitor security breaches, perform vulnerability testing, and ensure organizations remain safe from hacking attempts. With rising digital risks, this field is in high demand.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "6-18 LPA",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "ui_ux_designer",
        title: "UI/UX Designer",
        description:
            "UI/UX Designers focus on creating user-friendly and visually appealing digital experiences. They design apps, websites, and products by understanding user behavior and improving usability, accessibility, and aesthetics.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "5-15 LPA",
        img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "cloud_engineer",
        title: "Cloud Engineer",
        description:
            "Cloud Engineers design and manage cloud infrastructure using platforms like AWS, Azure, and Google Cloud. They ensure scalability, reliability, and performance of applications deployed on the cloud.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "8-20 LPA",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "game_developer",
        title: "Game Developer",
        description:
            "Game Developers create video games for mobile, PC, and consoles. They work with game engines like Unity and Unreal, combining programming, storytelling, and design to build immersive gaming experiences.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "5-15 LPA",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "content_creator",
        title: "Content Creator",
        description:
            "Content Creators produce digital content for platforms like YouTube, Instagram, and blogs. They build personal brands, engage audiences, and monetize through ads, sponsorships, and products.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "2-20 LPA",
        img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "data_analyst",
        title: "Data Analyst",
        description:
            "Data Analysts interpret data to help businesses make informed decisions. They use tools like Excel, SQL, and visualization platforms to identify trends and insights from datasets.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "4-12 LPA",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "devops_engineer",
        title: "DevOps Engineer",
        description:
            "DevOps Engineers streamline software development and deployment processes. They automate workflows, manage CI/CD pipelines, and ensure faster and reliable product delivery.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "8-22 LPA",
        img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "digital_entrepreneur",
        title: "Digital Entrepreneur",
        description:
            "Digital Entrepreneurs build online businesses such as startups, SaaS products, or e-commerce stores. They combine marketing, technology, and business strategy to generate revenue online.",
        stream: "Commerce",
        source: "prefilled",
        avgSalary: "Variable",
        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "ethical_hacker",
        title: "Ethical Hacker",
        description:
            "Ethical Hackers test systems for vulnerabilities by simulating cyberattacks. They help organizations identify weaknesses and improve security before real hackers can exploit them.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "6-20 LPA",
        img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "robotics_engineer",
        title: "Robotics Engineer",
        description:
            "Robotics Engineers design and build robots used in industries like manufacturing, healthcare, and automation. This field combines mechanical engineering, electronics, and AI.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "6-18 LPA",
        img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "ar_vr_developer",
        title: "AR/VR Developer",
        description:
            "AR/VR Developers create immersive experiences using augmented and virtual reality technologies. Applications include gaming, education, healthcare, and training simulations.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "7-20 LPA",
        img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "fintech_specialist",
        title: "FinTech Specialist",
        description:
            "FinTech Specialists work at the intersection of finance and technology, developing digital payment systems, trading platforms, and financial apps.",
        stream: "Commerce",
        source: "prefilled",
        avgSalary: "6-18 LPA",
        img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "business_analyst",
        title: "Business Analyst",
        description:
            "Business Analysts bridge the gap between business needs and technology solutions. They analyze processes, identify improvements, and help organizations make data-driven decisions.",
        stream: "Commerce",
        source: "prefilled",
        avgSalary: "6-15 LPA",
        img: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "mobile_app_developer",
        title: "Mobile App Developer",
        description:
            "Mobile App Developers build applications for Android and iOS using technologies like Flutter, React Native, or native development frameworks.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "5-18 LPA",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&q=80"
    }, {
        career_id: "sports_analyst",
        title: "Sports Analyst",
        description:
            "Sports Analysts use data, statistics, and video analysis to evaluate player performance, team strategies, and match outcomes. They work with sports teams, media houses, and analytics companies. With the rise of data-driven decision-making in sports like cricket and football, this career combines passion for sports with analytical thinking and technology.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "4-12 LPA",
        img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "nutritionist",
        title: "Nutritionist / Dietitian",
        description:
            "Nutritionists guide individuals on healthy eating habits, diet plans, and lifestyle changes to improve overall well-being. They work in hospitals, fitness centers, or independently. With increasing awareness about health and fitness, this field is rapidly growing and requires strong knowledge of biology and human physiology.",
        stream: "Science",
        source: "prefilled",
        avgSalary: "3-10 LPA",
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "fashion_designer",
        title: "Fashion Designer",
        description:
            "Fashion Designers create clothing, accessories, and trends for the fashion industry. They combine creativity with business understanding to build brands or work with established fashion houses. Social media and e-commerce have made it easier for designers to launch their own labels.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "3-15 LPA",
        img: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "teacher_educator",
        title: "Educator / Teacher",
        description:
            "Educators play a critical role in shaping students’ knowledge and skills. Modern teaching goes beyond classrooms into online platforms, ed-tech, and personalized learning. This career offers stability and impact but requires patience and continuous learning.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "3-10 LPA",
        img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "psychotherapist",
        title: "Psychotherapist",
        description:
            "Psychotherapists help individuals manage mental health issues like stress, anxiety, and depression through counseling and therapy techniques. With rising mental health awareness, this field is gaining importance and requires deep emotional intelligence and formal training.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "4-15 LPA",
        img: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "journalist",
        title: "Journalist",
        description:
            "Journalists research, investigate, and report news across various platforms including print, television, and digital media. In today’s era, digital journalism and independent reporting are rapidly growing fields, requiring strong communication and critical thinking skills.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "3-12 LPA",
        img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "lawyer",
        title: "Lawyer",
        description:
            "Lawyers provide legal advice, represent clients in court, and handle disputes across corporate, criminal, and civil domains. With increasing legal complexities in business and society, law remains a powerful and respected career path.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "5-20 LPA",
        img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "photographer",
        title: "Professional Photographer",
        description:
            "Photographers capture moments for events, brands, media, and art. With social media and digital marketing, photography has become a key skill in multiple industries, from weddings to advertising.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "3-15 LPA",
        img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "chef",
        title: "Chef / Culinary Artist",
        description:
            "Chefs create dishes and manage kitchen operations in restaurants, hotels, or their own ventures. With food blogging and global cuisine trends, culinary careers now extend beyond kitchens into media and entrepreneurship.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "4-15 LPA",
        img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "interior_designer",
        title: "Interior Designer",
        description:
            "Interior Designers plan and design functional and aesthetic indoor spaces. They work on homes, offices, and commercial spaces, combining creativity with practical knowledge of materials and layouts.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "4-12 LPA",
        img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "travel_blogger",
        title: "Travel Blogger / Vlogger",
        description:
            "Travel Bloggers create content about destinations, experiences, and cultures. They earn through sponsorships, ads, and brand deals. This career requires storytelling, content creation, and consistency.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "2-15 LPA",
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=300&fit=crop&q=80"
    },
    {
        career_id: "real_estate_consultant",
        title: "Real Estate Consultant",
        description:
            "Real Estate Consultants help clients buy, sell, or invest in properties. This career requires strong negotiation skills, market knowledge, and networking abilities.",
        stream: "Arts",
        source: "prefilled",
        avgSalary: "4-20 LPA",
        img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&q=80"
    },
];

module.exports = { data: careers };