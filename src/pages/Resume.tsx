export const Resume = () => {
  return (
    <div className="bg-white min-h-screen py-4 px-2 sm:p-8 flex justify-center font-sans text-gray-900">
      <div className="w-full max-w-[800px] bg-white p-4 sm:p-10 shadow-sm border border-gray-200 overflow-hidden" id="resume-print-area">

        {/* HEADER */}
        <header className="text-center border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-wide mb-2">Humayun Mirza</h1>
          <p className="text-xs sm:text-sm leading-relaxed px-2">
            Sialkot, Pakistan • humayun.mirzaa1@gmail.com • +92-331-681-4569<br />
            linkedin.com/in/humayun3676
          </p>
        </header>

        {/* SUMMARY */}
        <section className="mb-6">
          <h2 className="text-base sm:text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Professional Summary</h2>
          <p className="text-xs sm:text-sm leading-relaxed">
            Software Engineer specializing in Artificial Intelligence, Machine Learning, and Full-Stack Web Development. Proven experience in architecting scalable data-driven applications, deploying computer vision models, and engineering complex backend business logic. Strong foundation in Object-Oriented Programming and Data Structures.
          </p>
        </section>

        {/* SKILLS */}
        <section className="mb-6">
          <h2 className="text-base sm:text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Technical Skills</h2>
          <ul className="text-xs sm:text-sm space-y-1 list-none">
            <li><strong>Languages:</strong> Python, C++, JavaScript, TypeScript, HTML/CSS, Java, C#</li>
            <li><strong>AI / Machine Learning:</strong> PyTorch, TensorFlow, OpenCV, Scikit-learn, Pandas, DeepFace</li>
            <li><strong>Web & Full-Stack:</strong> React.js, Flask, Node.js, Tailwind CSS, REST APIs, State Management</li>
            <li><strong>Tools & Platforms:</strong> Git, Electron.js, Visual Studio, Android Studio</li>
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6">
          <h2 className="text-base sm:text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Professional Experience</h2>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
              <h3 className="font-bold text-sm sm:text-base">Associate Software Engineer</h3>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Current</span>
            </div>
            <p className="text-xs sm:text-sm italic mb-2">Confidential Tech Company</p>
            <ul className="list-disc list-outside ml-4 sm:ml-5 text-xs sm:text-sm space-y-1">
              <li>Architecting and developing data-driven web applications and scalable enterprise solutions.</li>
              <li>Designing relational database schemas and engineering complex backend business logic and workflows.</li>
              <li>Integrating third-party REST APIs and implementing strict data privacy rules and secure authentication.</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
              <h3 className="font-bold text-sm sm:text-base">Web Developer & IT Services</h3>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Contract</span>
            </div>
            <p className="text-xs sm:text-sm italic mb-2">ITC Computers</p>
            <ul className="list-disc list-outside ml-4 sm:ml-5 text-xs sm:text-sm space-y-1">
              <li>Developed a responsive web application highlighting products, services, and training academy courses.</li>
              <li>Implemented front-end layouts and interactive elements using HTML, CSS, and JavaScript.</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
              <h3 className="font-bold text-sm sm:text-base">Remote Developer</h3>
              <span className="text-xs sm:text-sm font-medium text-gray-600">Part-time</span>
            </div>
            <p className="text-xs sm:text-sm italic mb-2">Marketing Agency</p>
            <ul className="list-disc list-outside ml-4 sm:ml-5 text-xs sm:text-sm space-y-1">
              <li>Built and optimized client-facing web components and solved digital implementation problems.</li>
              <li>Collaborated on remote development tasks to improve front-end responsiveness and delivery.</li>
            </ul>
          </div>
        </section>

        {/* RESEARCH & INVESTIGATIONS */}
        <section className="mb-6">
          <h2 className="text-base sm:text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Research & Publications</h2>

          <div className="mb-3">
            <h3 className="font-bold text-xs sm:text-sm">Asthma Severity Prediction Using AI on Real-Time Datasets | <span className="font-normal italic">Python, Scikit-learn, Pandas</span></h3>
            <p className="text-xs sm:text-sm mt-1">Researched and trained classification models to accurately predict asthma severity using real-time laboratory patient metric datasets (PEFR, eosinophil, FEV1%).</p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-xs sm:text-sm">Leather Defect Classification on Industrial Datasets | <span className="font-normal italic">Python, Computer Vision, Deep Learning</span></h3>
            <p className="text-xs sm:text-sm mt-1">Conducted deep learning research on convolutional neural networks for automated surface defect detection and quality control in industrial leather manufacturing.</p>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-6">
          <h2 className="text-base sm:text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Selected Projects</h2>

          <div className="mb-3">
            <h3 className="font-bold text-xs sm:text-sm">FairSelect - Smart Interview Application | <span className="font-normal italic">Python, OpenCV, DeepFace, Electron.js</span></h3>
            <p className="text-xs sm:text-sm mt-1">Built an AI-powered smart interview evaluation system featuring real-time emotion and gesture detection, packaged into a desktop application.</p>
          </div>
          <div className="mb-3">
            <h3 className="font-bold text-xs sm:text-sm">21st Century Physio - Admin & Verification Portal | <span className="font-normal italic">React, Supabase, Vercel</span></h3>
            <p className="text-xs sm:text-sm mt-1">Built a fully live, client-approved administration and certificate verification portal featuring secure database integration, robust record management, and optimized client-side data pagination.</p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-xs sm:text-sm">Hexatech Gadgets Store Mobile App | <span className="font-normal italic">Java, Android Studio, OOP</span></h3>
            <p className="text-xs sm:text-sm mt-1">Developed a native Android e-commerce application for purchasing and managing electronic hardware with intuitive UI navigation and catalog management.</p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-sm">Car Rentals Management System | <span className="font-normal italic">C++, Object-Oriented Programming (OOP)</span></h3>
            <p className="text-xs sm:text-sm mt-1">Designed and implemented a robust vehicle inventory and rental tracking backend leveraging advanced OOP design principles.</p>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section>
          <h2 className="text-base sm:text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Education & Certifications</h2>
          <div className="mb-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
              <h3 className="font-bold text-xs sm:text-sm">Bachelor of Science in Software Engineering</h3>
              <span className="text-xs sm:text-sm text-gray-600">2022 – 2026</span>
            </div>
            <p className="text-xs sm:text-sm">University of Sialkot | CGPA: 3.90/4.00</p>
          </div>
          <div className="text-xs sm:text-sm">
            <p><strong>Certifications:</strong> Introduction to Artificial Intelligence (IBM), AI For Everyone (DeepLearning.ai), Software Design Methods (Univ of Colorado), Problem Solving (Univ of Michigan).</p>
          </div>
        </section>

      </div>
    </div>
  );
};