const AboutPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide mb-4">
            About Us
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Dawn of JTT - Jagath Tours & Travels
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            BLESSED with decade-long experience in the tourism & hotel trade in several
            countries, Mr. Jagath De Silva could not resist the ambition to develop his own venture
            in the same industry. Accordingly, Jagath Tours & Travels was founded by Mr. Jagath in
            the year 2005, located in the vicinity of the main international airport in Sri Lanka.
          </p>

          <div className="space-y-8 mt-12">
            {/* Company in the Making */}
            <section className="border-t-4 border-black shadow-lg rounded-lg bg-white p-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Company in the Making</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Jagath Tours staff consists of experienced professionals with firm commitment to
                respond to all trade inquiries 24x7 throughout the year. The competitive advantage
                lies in their personal attention and ability to customize tours to individual needs.
              </p>
            </section>

            {/* Vision */}
            <section className="border-t-4 border-blue-600 shadow-lg rounded-lg bg-blue-50 p-6">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">🌍 Our Vision</h2>
              <p className="text-lg text-blue-700 leading-relaxed max-w-3xl mx-auto">
                Win the world to make JTT a renowned brand name in the global Tourism
                Industry whilst becoming the most preferred inbound & outbound tour operator in
                Sri Lanka.
              </p>
            </section>

            {/* Mission */}
            <section className="border-t-4 border-green-600 shadow-lg rounded-lg bg-green-50 p-6">
              <h2 className="text-3xl font-bold text-green-800 mb-4">🎯 Our Mission</h2>
              <p className="text-lg text-green-700 leading-relaxed max-w-3xl mx-auto">
                To showcase the pride & prestige of Sri Lanka by providing the best service with
                personal attention & prompt response to all our clients at an affordable price.
              </p>
            </section>

            {/* Legal Compliance */}
            <section className="border-t-4 border-gray-600 shadow-lg rounded-lg bg-white p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">⚖️ Legal Compliance</h2>
              <ul className="list-inside list-disc text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto space-y-2">
                <li>Business registration with the Government Provincial Council.</li>
                <li>Registered with the SLTDA (Sri Lanka Tourism Development Authority).</li>
                <li>Member of ASMET (Association of Small and Medium Enterprises in Tourism in Sri Lanka).</li>
              </ul>
            </section>
          </div>
        </header>
      </div>
    </div>
  );
};

export default AboutPage;
