export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'EEG' | 'BCI' | 'Amplifier' | 'Accessories';
  specifications: {
    channels: number;
    samplingRate: string;
    resolution: string;
    connectivity: string[];
    power: string;
    dimensions: string;
    weight: string;
    compatibility: string[];
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Custom EEG Hardware System",
    description: "High-precision EEG acquisition system with 32 channels, designed for research-grade brain activity recording",
    price: 2493.29,
    image: "/products/hardware_system.jpg",
    category: "EEG",
    specifications: {
      channels: 32,
      samplingRate: "2048 Hz",
      resolution: "24-bit",
      connectivity: ["USB 3.0", "Ethernet"],
      power: "12V DC",
      dimensions: "30 x 20 x 10 cm",
      weight: "2.5 kg",
      compatibility: ["Windows", "Linux", "macOS"]
    }
  },
  {
    id: 2,
    name: "Wearable EEG Headset",
    description: "Portable 8-channel EEG headset with wireless connectivity, perfect for mobile brain-computer interface applications",
    price: 1299.99,
    image: "/products/eeg_headset.webp",
    category: "EEG",
    specifications: {
      channels: 8,
      samplingRate: "128 Hz",
      resolution: "16-bit",
      connectivity: ["Bluetooth 5.0", "USB-C"],
      power: "Built-in battery (8 hours)",
      dimensions: "Adjustable headband",
      weight: "350 g",
      compatibility: ["Windows", "Android", "iOS"]
    }
  },
  {
    id: 3,
    name: "BCI Hardware System",
    description: "Complete brain-computer interface system with real-time signal processing and machine learning capabilities",
    price: 3499.99,
    image: "/products/bci_hardware.webp",
    category: "BCI",
    specifications: {
      channels: 16,
      samplingRate: "250 Hz",
      resolution: "24-bit",
      connectivity: ["WiFi", "Bluetooth", "USB"],
      power: "12V DC",
      dimensions: "40 x 30 x 15 cm",
      weight: "3.2 kg",
      compatibility: ["Windows", "Linux", "ROS"]
    }
  },
  {
    id: 4,
    name: "Neural Signal Amplifier",
    description: "High-gain neural signal amplifier with noise reduction technology for precise electrophysiological recordings",
    price: 1999.99,
    image: "/products/signal-amplifier-4.jpg",
    category: "Amplifier",
    specifications: {
      channels: 64,
      samplingRate: "30 kHz",
      resolution: "24-bit",
      connectivity: ["USB 3.0", "Optical"],
      power: "110-240V AC",
      dimensions: "25 x 20 x 8 cm",
      weight: "1.8 kg",
      compatibility: ["Windows", "Linux"]
    }
  },
  {
    id: 5,
    name: "EEG Electrode Kit",
    description: "Professional-grade EEG electrode kit with 64 channels, including conductive gel and mounting accessories",
    price: 899.99,
    image: "/products/electrode_kit.webp",
    category: "Accessories",
    specifications: {
      channels: 64,
      samplingRate: "N/A",
      resolution: "N/A",
      connectivity: ["Standard EEG connectors"],
      power: "N/A",
      dimensions: "Various sizes",
      weight: "1.2 kg",
      compatibility: ["Universal"]
    }
  }
]; 