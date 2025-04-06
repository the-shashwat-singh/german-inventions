export interface Invention {
  id: string;
  name: string;
  year: number;
  inventor: string;
  description: string | string[];
  image: string;
  model?: string; // Path to 3D model if available
  sketchfabId?: string; // Sketchfab model ID
  category: string;
  facts: string[];
  impact: string;
  featured?: boolean; // Whether to feature on home page
}

export const inventions: Invention[] = [
  {
    id: "printing-press",
    name: "Printing Press",
    year: 1440,
    inventor: "Johannes Gutenberg",
    description: [
      "The printing press was one of the most transformative inventions in human history, and Johannes Gutenberg's version from around 1440 was the first to use movable metal type in Europe.",
      "Gutenberg's innovation combined several technologies: oil-based inks, metal type made from an alloy of lead, tin, and antimony, a wooden press similar to those used for pressing grapes, and paper.",
      "This combination allowed for mass production of books at a fraction of the cost of manual copying, leading to a dramatic increase in literacy and the spread of knowledge throughout Europe."
    ],
    image: "/assets/images/inventions/printing-press.webp",
    sketchfabId: "92bfd8b4a863400995134761fba73f38", // Corrected printing press model ID
    category: "Communication",
    facts: [
      "It dramatically reduced the cost of book production",
      "Increased literacy rates across Europe",
      "Enabled the spread of knowledge during the Renaissance"
    ],
    impact: "The printing press revolutionized the spread of information, leading to the Renaissance, Reformation, Scientific Revolution, and democratization of knowledge.",
    featured: true
  },
  {
    id: "automobile",
    name: "Automobile (Modern Car)",
    year: 1886,
    inventor: "Karl Benz",
    description: "Karl Benz patented the first practical automobile powered by an internal combustion engine, revolutionizing transportation forever.",
    image: "/assets/images/inventions/benz-patent-motor-car.avif",
    category: "Transportation",
    facts: [
      "The Benz Patent-Motorwagen was the first vehicle designed to be propelled by an internal combustion engine",
      "Bertha Benz, Karl's wife, undertook the first long-distance journey by automobile",
      "The original had a top speed of about 16 km/h (10 mph)"
    ],
    impact: "The automobile transformed human mobility, urban planning, and global economies, creating one of the world's largest industries.",
    featured: true
  },
  {
    id: "x-ray",
    name: "X-Ray",
    year: 1895,
    inventor: "Wilhelm Conrad Röntgen",
    description: "Röntgen discovered a new type of radiation that could pass through many materials that absorb visible light, revolutionizing medical diagnosis.",
    image: "/assets/images/inventions/xrays.jpg",
    sketchfabId: "2d39763734824e999850b12376fa6bbf",
    category: "Medicine",
    facts: [
      "Röntgen named them 'X-rays' because of their unknown nature",
      "He received the first Nobel Prize in Physics in 1901 for this discovery",
      "The first X-ray image was of his wife's hand, showing her wedding ring"
    ],
    impact: "X-rays transformed medicine by allowing doctors to see inside the human body without surgery, saving countless lives.",
    featured: true
  },
  {
    id: "aspirin",
    name: "Aspirin",
    year: 1897,
    inventor: "Felix Hoffmann (Bayer)",
    description: "Aspirin was the first mass-produced synthetic drug and remains one of the most widely used medications worldwide.",
    image: "/assets/images/inventions/aspirin.jpeg",
    sketchfabId: "9e1c158010684a1593b941820c6fc431",
    category: "Medicine",
    facts: [
      "Developed at Bayer under Felix Hoffmann",
      "Based on compounds found in willow bark",
      "Used for pain, fever, and inflammation"
    ],
    impact: "Aspirin changed pharmaceutical development and has been used for over 100 years to treat pain, reduce inflammation, and prevent heart attacks.",
    featured: true
  },
  {
    id: "diesel-engine",
    name: "Diesel Engine",
    year: 1893,
    inventor: "Rudolf Diesel",
    description: "The diesel engine is a more efficient alternative to the gasoline engine, now powering everything from cars to ships and generators.",
    image: "/assets/images/inventions/diesel enginer.webp",
    sketchfabId: "5454444654c84c87bf84d1d9b1fc24eb",
    category: "Engineering",
    facts: [
      "More efficient than gasoline engines",
      "Originally designed to run on peanut oil",
      "Became the standard for heavy machinery and vehicles"
    ],
    impact: "Diesel engines revolutionized transportation, agriculture, and industry with their greater efficiency and reliability.",
    featured: true
  },
  {
    id: "jet-engines",
    name: "Jet Engine",
    year: 1939,
    inventor: "Hans von Ohain",
    description: "Hans von Ohain developed the first operational jet engine, which powered the first jet aircraft and revolutionized air travel.",
    image: "/assets/images/inventions/jet-engines.jpg",
    sketchfabId: "75c731548e4b42ad9d376e0342b5ef9c",
    category: "Aviation",
    facts: [
      "First operational flight was on August 27, 1939",
      "Developed independently but at the same time as Frank Whittle in the UK",
      "Led to dramatic increases in aircraft speed and altitude capabilities"
    ],
    impact: "Jet engines transformed aviation by enabling faster and higher-altitude flights, making international air travel commonplace.",
    featured: true
  },
  {
    id: "contact-lenses",
    name: "Contact Lenses",
    year: 1887,
    inventor: "Adolf Gaston Eugen Fick",
    description: "Adolf Fick created the first successful contact lens from glass, laying the foundation for modern vision correction technology.",
    image: "/assets/images/inventions/contact-lenses.jpg",
    sketchfabId: "996c35ce810a4a978d1eb5f5963c8c17",
    category: "Medicine",
    facts: [
      "First made from heavy blown glass",
      "Could only be worn for a few hours initially",
      "Modern soft contact lenses were developed later in 1971"
    ],
    impact: "Contact lenses revolutionized vision correction, offering an alternative to glasses and eventually leading to refractive surgery techniques.",
    featured: false
  },
  {
    id: "electron-microscope",
    name: "Electron Microscope",
    year: 1931,
    inventor: "Ernst Ruska and Max Knoll",
    description: "The electron microscope uses beams of electrons instead of light, allowing scientists to see objects thousands of times smaller than what's visible with optical microscopes.",
    image: "/assets/images/inventions/electron-microscope.avif",
    sketchfabId: "39d882d22227475a8e1ec8ba2a7cee6f",
    category: "Science",
    facts: [
      "Capable of magnifications up to 10,000,000x",
      "Enabled visualization of viruses, molecules, and atoms",
      "Won Ruska the Nobel Prize in Physics in 1986"
    ],
    impact: "Electron microscopes revolutionized scientific research by allowing visualization of the nanoscopic world, advancing fields from biology to materials science.",
    featured: false
  },
  {
    id: "fax-machine",
    name: "Fax Machine",
    year: 1843,
    inventor: "Alexander Bain",
    description: "The fax (facsimile) machine was first patented by Scottish inventor Alexander Bain, but German physicist Arthur Korn made significant improvements that led to the first practical fax service.",
    image: "/assets/images/inventions/fax-machine.webp",
    sketchfabId: "f191d4cdea204d3e91d338e507ebb67a",
    category: "Communication",
    facts: [
      "Korn's improvements in 1902 made commercial fax possible",
      "The first commercial fax services began in 1865 between Paris and Lyon",
      "Became essential business equipment in the 1980s before email"
    ],
    impact: "Fax machines transformed business communication, allowing documents to be transmitted instantly across great distances for the first time.",
    featured: false
  },
  {
    id: "morphine",
    name: "Morphine",
    year: 1804,
    inventor: "Friedrich Wilhelm Sertürner",
    description: "Friedrich Sertürner isolated morphine from opium, creating the first alkaloid ever isolated from a plant and revolutionizing pain management in medicine.",
    image: "/assets/images/inventions/morphine.png",
    sketchfabId: "313a789653114f87b6d9e7bfeb4d1a4f",
    category: "Medicine",
    facts: [
      "Named after Morpheus, the Greek god of dreams",
      "First widely used analgesic drug",
      "Led to the development of many other alkaloid medications"
    ],
    impact: "Morphine and its derivatives have provided essential pain relief for millions and established the foundation for modern pharmacology.",
    featured: false
  },
  {
    id: "gramophone",
    name: "Gramophone",
    year: 1887,
    inventor: "Emile Berliner",
    description: "The gramophone, invented by German-American Emile Berliner, was the first commercial flat disc record player and revolutionized how music was recorded and played.",
    image: "/assets/images/inventions/gramaphone.jpg",
    sketchfabId: "8dbc3e99e1ea4ff0a8f32d39c72c4d8d",
    category: "Entertainment",
    facts: [
      "Used flat discs instead of cylinders (Edison's phonograph)",
      "Enabled mass production of recorded music",
      "Established the record industry as we know it"
    ],
    impact: "The gramophone transformed the music industry by making recorded music widely available to the public, creating the foundation for modern music consumption.",
    featured: false
  },
  {
    id: "tram",
    name: "Electric Tram",
    year: 1881,
    inventor: "Werner von Siemens",
    description: "Werner von Siemens developed the world's first electric tramway, revolutionizing urban transportation with clean, efficient electric power.",
    image: "/assets/images/inventions/electric-tram.jpg",
    sketchfabId: "543c7d2661b5408ea0c371ec713a21df",
    category: "Transportation",
    facts: [
      "First line opened in Berlin-Lichterfelde in 1881",
      "Eliminated the need for horses in urban transport",
      "Sparked the development of electric urban transit worldwide"
    ],
    impact: "Electric trams transformed urban mobility, making city transportation faster, cleaner, and more accessible while shaping modern urban development.",
    featured: false
  },
  {
    id: "tape-recorder",
    name: "Tape Recorder",
    year: 1928,
    inventor: "Fritz Pfleumer",
    description: "Fritz Pfleumer invented magnetic tape recording, which revolutionized audio recording and broadcasting and later became essential for early computers.",
    image: "/assets/images/inventions/tape-recorder.webp",
    sketchfabId: "f5475f5eab234abcb356dd003f5a1e02",
    category: "Technology",
    facts: [
      "First demonstrated by AEG at the 1935 Berlin Radio Show",
      "Used paper tape coated with iron oxide",
      "Transformed radio broadcasting and music production"
    ],
    impact: "Magnetic tape recording changed how audio was produced and edited, enabling multitrack recording and revolutionizing the music, film, and broadcasting industries.",
    featured: false
  },
  {
    id: "glider",
    name: "Glider Aircraft",
    year: 1891,
    inventor: "Otto Lilienthal",
    description: "Otto Lilienthal made the first well-documented, successful glider flights, laying the foundations for modern aviation and inspiring the Wright brothers.",
    image: "/assets/images/inventions/glider-aircraft.webp",
    sketchfabId: "54367ae947174982b3a00015cad2ea3c",
    category: "Aviation",
    facts: [
      "Made over 2,000 flights in his gliders",
      "Published detailed data on wing design and aerodynamics",
      "His work directly influenced the Wright brothers"
    ],
    impact: "Lilienthal's pioneering work on glider flight provided critical insights into aerodynamics and flight control that made powered flight possible.",
    featured: false
  },
  {
    id: "z3-computer",
    name: "Z3 Computer",
    year: 1941,
    inventor: "Konrad Zuse",
    description: "The Z3 was the world's first working programmable, fully automatic digital computer, created by German engineer Konrad Zuse. It was a remarkable breakthrough in computing technology years before similar developments elsewhere.",
    image: "/assets/images/inventions/Z3 computer.JPG",
    sketchfabId: "295a60499bce41ccba5013bade53d740",
    category: "Computing",
    facts: [
      "First fully functional programmable computer completed in 1941",
      "Used 2,400 relays for computation and storage",
      "Could perform floating-point arithmetic and was capable of solving complex engineering equations",
      "Was destroyed in Allied bombing of Berlin in 1943"
    ],
    impact: "The Z3 set the foundation for modern computing architecture and demonstrated the viability of binary systems and program-controlled calculations, influencing all future computer development.",
    featured: true
  }
].filter(invention => invention.id !== 'programmable-calculator');

export const getInventionById = (id: string): Invention | undefined => {
  return inventions.find(invention => invention.id === id);
};

export const getInventionsByCategory = (category: string): Invention[] => {
  return inventions.filter(invention => invention.category === category);
};

export const getInventionsByTimeperiod = (startYear: number, endYear: number): Invention[] => {
  return inventions.filter(invention => invention.year >= startYear && invention.year <= endYear);
}; 