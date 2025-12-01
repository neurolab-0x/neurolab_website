export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  image: string
  gallery: string[]
  category: string
  tags: string[]
  specs: { label: string; value: string }[]
  features: string[]
  inBox: string[]
  faqs: { question: string; answer: string }[]
}

export const products: Product[] = [
  {
    id: "Neurolab-kit-001",
    name: "NeuroLab EEG Starter Kit",
    description: "Portable 8-channel EEG headset for brain-computer interface applications.",
    longDescription:
      "The NeuroLab EEG Starter Kit is designed for researchers and enthusiasts looking to explore brain-computer interfaces. With 8 high-precision dry electrodes, wireless connectivity, and compatibility with our AI platform, this kit provides everything you need to get started with EEG data acquisition and analysis.",
    price: 275,
    image: "/kit.png",
    gallery: [
      "/kit.png?key=ab12c",
      "/kit2.png?key=cd34d",
      "/kit3.png?key=pj59j",
    ],
    category: "EEG Headsets",
    tags: ["EEG", "BCI", "8-Channel", "Wearable", "Wireless"],
    specs: [
      { label: "Channels", value: "8 Active Electrodes" },
      { label: "Sample Rate", value: "250 Hz / 500 Hz" },
      { label: "Resolution", value: "24-bit ADC" },
      { label: "Battery Life", value: "8+ Hours" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
      { label: "Impedance Check", value: "Built-in" },
      { label: "Weight", value: "320g" },
      { label: "Electrode Type", value: "Dry/Semi-dry" },
    ],
    features: [
      "8 high-precision dry electrodes",
      "Wireless Bluetooth 5.0 connectivity",
      "8-hour rechargeable battery",
      "Real-time impedance monitoring",
      "Comfortable adjustable fit",
      "Compatible with NeuroLab AI Platform",
    ],
    inBox: [
      "1x 8-Channel EEG Headset",
      "1x Wireless USB Receiver",
      "1x USB-C Charging Cable",
      "1x Protective Travel Case",
      "1x Quick Start Guide",
      "1x Electrode Gel Samples (10ml)",
    ],
    faqs: [
      {
        question: "What is the warranty?",
        answer:
          "All NeuroLab hardware comes with a 2-year manufacturer warranty covering defects in materials and workmanship.",
      },
      {
        question: "Is it compatible with third-party software?",
        answer:
          "Yes, the headset supports Lab Streaming Layer (LSL), MATLAB, Python, and other standard EEG software through our open API.",
      },
      {
        question: "How do I clean the electrodes?",
        answer:
          "Wipe electrodes with a soft cloth dampened with water or isopropyl alcohol after each use. Do not submerge the device.",
      },
    ],
  },
    
]

export const categories = ["EEG Headsets", "BCI Systems", "Amplifiers", "Accessories"]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}
