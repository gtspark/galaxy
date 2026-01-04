import { create } from 'zustand';

// Galaxy color palette
const GALAXY_COLORS = {
  'Core AI': '#00ffff',
  'Data & Learning': '#00ff88',
  'Neural Architectures': '#ff00ff',
  'Mathematics & Theory': '#aa00ff',
  'Applications & Tools': '#ffaa00',
  'Ethics & Society': '#ff6688',
  'Hardware & Infrastructure': '#88aaff',
  'Natural Language': '#00ffaa',
  'Computer Vision': '#ffff00',
  'default': '#aaddff'
};

const getGalaxyColor = (galaxy) => GALAXY_COLORS[galaxy] || GALAXY_COLORS.default;

const useStore = create((set, get) => ({
  // Initial State - Rich portfolio demo
  activeNode: 'artificial_intelligence',

  // Galaxy tracking
  galaxies: {
    'Core AI': { nodes: new Set(['artificial_intelligence']), centroid: { x: 0, y: 0, z: 0 } },
    'Neural Architectures': { nodes: new Set(['neural_networks', 'deep_learning', 'transformers', 'convolutional_networks', 'recurrent_networks']), centroid: { x: -80, y: 40, z: -30 } },
    'Data & Learning': { nodes: new Set(['machine_learning', 'supervised_learning', 'unsupervised_learning', 'training_data', 'feature_engineering']), centroid: { x: 70, y: -30, z: 40 } },
    'Applications & Tools': { nodes: new Set(['natural_language_processing', 'computer_vision', 'robotics', 'recommendation_systems']), centroid: { x: 30, y: 60, z: -60 } },
    'Mathematics & Theory': { nodes: new Set(['backpropagation', 'gradient_descent', 'loss_functions', 'optimization']), centroid: { x: -50, y: -50, z: 50 } }
  },

  graphData: {
    nodes: [
      // Core
      { id: 'artificial_intelligence', name: 'Artificial Intelligence', val: 80, color: '#00ffff', galaxy: 'Core AI', type: 'core', fx: 0, fy: 0, fz: 0, content: '# Artificial Intelligence\n\nThe simulation of human intelligence by machines.' },

      // Neural Architectures Galaxy
      { id: 'neural_networks', name: 'Neural Networks', val: 45, color: '#ff00ff', galaxy: 'Neural Architectures', x: -60, y: 30, z: -20, content: '# Neural Networks\n\nComputing systems inspired by biological neural networks.' },
      { id: 'deep_learning', name: 'Deep Learning', val: 50, color: '#ff00ff', galaxy: 'Neural Architectures', x: -90, y: 50, z: -40, content: `# Deep Learning

## Galaxy
**Galaxy: Neural Architectures**

## Overview
Deep Learning is a subset of [[Machine Learning]] that uses [[Neural Networks]] with multiple layers (hence "deep") to progressively extract higher-level features from raw input. It has revolutionized fields from [[Computer Vision]] to [[Natural Language Processing]].

## Key Concepts
- **Hidden Layers**: Multiple intermediate layers between input and output that learn increasingly abstract representations
- **Feature Hierarchy**: Early layers detect simple patterns (edges, textures), deeper layers recognize complex concepts (faces, objects)
- **End-to-End Learning**: The network learns the entire pipeline from raw data to final output without manual feature engineering

## Deep Dive
Deep learning emerged from the convergence of three factors: massive datasets, powerful GPUs, and algorithmic innovations like [[Backpropagation]] and [[Gradient Descent]].

### Architectures
The field has spawned specialized architectures:
- **[[Convolutional Networks]]** (CNNs): Dominant in image processing
- **[[Recurrent Networks]]** (RNNs): Designed for sequential data
- **[[Transformers]]**: Attention-based models powering modern AI

### Training
Deep networks require careful [[Optimization]] using techniques like batch normalization, dropout, and adaptive learning rates. The [[Loss Functions]] guide the network toward better predictions.

## Connections
Explore related concepts: [[Backpropagation]], [[Gradient Descent]], [[Transformers]], [[Computer Vision]], [[Natural Language Processing]]
` },
      { id: 'transformers', name: 'Transformers', val: 40, color: '#ff00ff', galaxy: 'Neural Architectures', x: -100, y: 25, z: -15, content: '# Transformers\n\nAttention-based architecture revolutionizing NLP and beyond.' },
      { id: 'convolutional_networks', name: 'CNNs', val: 35, color: '#ff00ff', galaxy: 'Neural Architectures', x: -70, y: 60, z: -50, content: '# Convolutional Neural Networks\n\nSpecialized for processing grid-like data such as images.' },
      { id: 'recurrent_networks', name: 'RNNs', val: 35, color: '#ff00ff', galaxy: 'Neural Architectures', x: -85, y: 35, z: -60, content: '# Recurrent Neural Networks\n\nNetworks with loops for sequential data processing.' },

      // Data & Learning Galaxy
      { id: 'machine_learning', name: 'Machine Learning', val: 55, color: '#00ff88', galaxy: 'Data & Learning', x: 50, y: -20, z: 30, content: '# Machine Learning\n\nAlgorithms that learn patterns from data.' },
      { id: 'supervised_learning', name: 'Supervised Learning', val: 35, color: '#00ff88', galaxy: 'Data & Learning', x: 80, y: -40, z: 50, content: '# Supervised Learning\n\nLearning from labeled training examples.' },
      { id: 'unsupervised_learning', name: 'Unsupervised Learning', val: 35, color: '#00ff88', galaxy: 'Data & Learning', x: 90, y: -15, z: 35, content: '# Unsupervised Learning\n\nDiscovering hidden patterns without labels.' },
      { id: 'training_data', name: 'Training Data', val: 30, color: '#00ff88', galaxy: 'Data & Learning', x: 60, y: -45, z: 60, content: '# Training Data\n\nDatasets used to train machine learning models.' },
      { id: 'feature_engineering', name: 'Feature Engineering', val: 30, color: '#00ff88', galaxy: 'Data & Learning', x: 75, y: -30, z: 25, content: '# Feature Engineering\n\nCreating informative features from raw data.' },

      // Applications Galaxy
      { id: 'natural_language_processing', name: 'NLP', val: 45, color: '#ffaa00', galaxy: 'Applications & Tools', x: 20, y: 50, z: -50, content: '# Natural Language Processing\n\nEnabling machines to understand human language.' },
      { id: 'computer_vision', name: 'Computer Vision', val: 45, color: '#ffaa00', galaxy: 'Applications & Tools', x: 40, y: 70, z: -70, content: '# Computer Vision\n\nTeaching machines to interpret visual information.' },
      { id: 'robotics', name: 'Robotics', val: 40, color: '#ffaa00', galaxy: 'Applications & Tools', x: 25, y: 55, z: -80, content: '# Robotics\n\nIntelligent machines that interact with the physical world.' },
      { id: 'recommendation_systems', name: 'Recommender Systems', val: 35, color: '#ffaa00', galaxy: 'Applications & Tools', x: 45, y: 65, z: -55, content: '# Recommendation Systems\n\nPredicting user preferences and suggesting items.' },

      // Math & Theory Galaxy
      { id: 'backpropagation', name: 'Backpropagation', val: 35, color: '#aa00ff', galaxy: 'Mathematics & Theory', x: -40, y: -40, z: 40, content: '# Backpropagation\n\nAlgorithm for training neural networks via gradient computation.' },
      { id: 'gradient_descent', name: 'Gradient Descent', val: 35, color: '#aa00ff', galaxy: 'Mathematics & Theory', x: -55, y: -55, z: 55, content: '# Gradient Descent\n\nOptimization algorithm for minimizing loss functions.' },
      { id: 'loss_functions', name: 'Loss Functions', val: 30, color: '#aa00ff', galaxy: 'Mathematics & Theory', x: -45, y: -65, z: 45, content: '# Loss Functions\n\nMeasures of prediction error guiding model training.' },
      { id: 'optimization', name: 'Optimization', val: 35, color: '#aa00ff', galaxy: 'Mathematics & Theory', x: -60, y: -45, z: 60, content: '# Optimization\n\nFinding the best parameters for a model.' }
    ],
    links: [
      // Core connections
      { source: 'artificial_intelligence', target: 'neural_networks' },
      { source: 'artificial_intelligence', target: 'machine_learning' },
      { source: 'artificial_intelligence', target: 'natural_language_processing' },
      { source: 'artificial_intelligence', target: 'computer_vision' },
      { source: 'artificial_intelligence', target: 'robotics' },

      // Neural Architectures internal
      { source: 'neural_networks', target: 'deep_learning' },
      { source: 'neural_networks', target: 'backpropagation' },
      { source: 'deep_learning', target: 'transformers' },
      { source: 'deep_learning', target: 'convolutional_networks' },
      { source: 'deep_learning', target: 'recurrent_networks' },
      { source: 'convolutional_networks', target: 'computer_vision' },
      { source: 'recurrent_networks', target: 'natural_language_processing' },
      { source: 'transformers', target: 'natural_language_processing' },

      // Data & Learning internal
      { source: 'machine_learning', target: 'supervised_learning' },
      { source: 'machine_learning', target: 'unsupervised_learning' },
      { source: 'machine_learning', target: 'training_data' },
      { source: 'machine_learning', target: 'feature_engineering' },
      { source: 'supervised_learning', target: 'training_data' },
      { source: 'machine_learning', target: 'neural_networks' },

      // Math connections
      { source: 'backpropagation', target: 'gradient_descent' },
      { source: 'gradient_descent', target: 'loss_functions' },
      { source: 'gradient_descent', target: 'optimization' },
      { source: 'deep_learning', target: 'backpropagation' },

      // Applications internal
      { source: 'natural_language_processing', target: 'recommendation_systems' },
      { source: 'computer_vision', target: 'robotics' }
    ]
  },

  // Compute centroid for a galaxy
  updateGalaxyCentroid: (galaxyName) => {
    const { graphData, galaxies } = get();
    const galaxy = galaxies[galaxyName];
    if (!galaxy || galaxy.nodes.size === 0) return;

    let sumX = 0, sumY = 0, sumZ = 0, count = 0;
    graphData.nodes.forEach(node => {
      if (galaxy.nodes.has(node.id) && node.x !== undefined) {
        sumX += node.x;
        sumY += node.y;
        sumZ += node.z;
        count++;
      }
    });

    if (count > 0) {
      set(state => ({
        galaxies: {
          ...state.galaxies,
          [galaxyName]: {
            ...state.galaxies[galaxyName],
            centroid: { x: sumX / count, y: sumY / count, z: sumZ / count }
          }
        }
      }));
    }
  },

  // Actions
  setActiveNode: (nodeId) => set({ activeNode: nodeId }),

  fetchNodeContent: async (nodeId, topicName) => {
    const { graphData } = get();
    const node = graphData.nodes.find(n => n.id === nodeId);
    const name = topicName || node?.name || 'Unknown Topic';

    if (node && node.content) return; // Already has content

    // Set initial streaming state
    set(state => ({
      graphData: {
        ...state.graphData,
        nodes: state.graphData.nodes.map(n =>
          n.id === nodeId ? { ...n, content: '', streaming: true } : n
        )
      }
    }));

    try {
      const eventSource = new EventSource(`/galaxy-api/expand-stream?topic=${encodeURIComponent(name)}`);

      eventSource.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === 'chunk') {
          // Append chunk to content
          set(state => ({
            graphData: {
              ...state.graphData,
              nodes: state.graphData.nodes.map(n =>
                n.id === nodeId ? { ...n, content: (n.content || '') + msg.text } : n
              )
            }
          }));
        } else if (msg.type === 'complete') {
          const galaxyName = msg.data.galaxy || 'Core AI';
          const bridges = msg.data.bridges || [];

          // Final update with galaxy assignment
          set(state => {
            // Add node to its galaxy
            const updatedGalaxies = { ...state.galaxies };
            if (!updatedGalaxies[galaxyName]) {
              updatedGalaxies[galaxyName] = { nodes: new Set(), centroid: { x: 0, y: 0, z: 0 } };
            }
            updatedGalaxies[galaxyName].nodes = new Set([...updatedGalaxies[galaxyName].nodes, nodeId]);

            return {
              graphData: {
                ...state.graphData,
                nodes: state.graphData.nodes.map(n =>
                  n.id === nodeId
                    ? {
                        ...n,
                        content: msg.data.content,
                        galaxy: galaxyName,
                        bridges: bridges,
                        color: getGalaxyColor(galaxyName),
                        streaming: false
                      }
                    : n
                )
              },
              galaxies: updatedGalaxies
            };
          });

          // Update galaxy centroid after a short delay (let positions settle)
          setTimeout(() => get().updateGalaxyCentroid(galaxyName), 500);

          eventSource.close();
        } else if (msg.type === 'error') {
          console.error('Stream error:', msg.message);
          set(state => ({
            graphData: {
              ...state.graphData,
              nodes: state.graphData.nodes.map(n =>
                n.id === nodeId
                  ? { ...n, content: `# ${name}\n\nFailed to load content. Try again later.`, streaming: false }
                  : n
              )
            }
          }));
          eventSource.close();
        }
      };

      eventSource.onerror = () => {
        console.error('EventSource error');
        eventSource.close();
        set(state => ({
          graphData: {
            ...state.graphData,
            nodes: state.graphData.nodes.map(n =>
              n.id === nodeId
                ? { ...n, content: `# ${name}\n\nConnection error. Try again later.`, streaming: false }
                : n
            )
          }
        }));
      };

    } catch (error) {
      console.error('Error fetching node content:', error);
      set(state => ({
        graphData: {
          ...state.graphData,
          nodes: state.graphData.nodes.map(n =>
            n.id === nodeId
              ? { ...n, content: `# ${name}\n\nFailed to load. Try again.`, streaming: false }
              : n
          )
        }
      }));
    }
  },

  handleLinkClick: async (term, parentNodeId) => {
    const { graphData, setActiveNode, fetchNodeContent } = get();

    // 1. Normalize ID to ensure graph connectivity (Graph vs Tree)
    const newNodeId = term.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_');

    // 2. Check if node already exists
    const existingNode = graphData.nodes.find(n => n.id === newNodeId);

    if (existingNode) {
      // Just link to it if not linked
      const linkExists = graphData.links.some(l =>
        (l.source.id === parentNodeId && l.target.id === newNodeId) ||
        (l.source === parentNodeId && l.target === newNodeId)
      );

      if (!linkExists) {
         set(state => ({
            graphData: {
                ...state.graphData,
                links: [...state.graphData.links, { source: parentNodeId, target: newNodeId }]
            }
         }));
      }

      setActiveNode(newNodeId);
      return;
    }

    // 3. Create new node
    // Get parent and LOCK its position so it doesn't fly away
    const parentNode = graphData.nodes.find(n => n.id === parentNodeId);

    // Spawn near parent
    const px = parentNode?.x ?? 0;
    const py = parentNode?.y ?? 0;
    const pz = parentNode?.z ?? 0;

    const spawnPos = {
        x: px + (Math.random() - 0.5) * 10,
        y: py + (Math.random() - 0.5) * 10,
        z: pz + (Math.random() - 0.5) * 10
    };

    const newNode = {
      id: newNodeId,
      name: term,
      val: 20,
      color: '#aaddff',
      parent: parentNodeId,
      ...spawnPos
    };

    const newLink = {
      source: parentNodeId,
      target: newNodeId
    };

    // Add new node with FIXED position initially (prevents flying)
    const fixedNewNode = {
      ...newNode,
      fx: spawnPos.x,
      fy: spawnPos.y,
      fz: spawnPos.z
    };

    // Force complete new object to trigger react-force-graph re-render
    set(state => {
      const newNodes = [...state.graphData.nodes, fixedNewNode];
      const newLinks = [...state.graphData.links, newLink];
      return {
        graphData: {
          nodes: newNodes,
          links: newLinks
        },
        activeNode: newNodeId
      };
    });

    // Release the node after simulation settles (let it find natural position)
    setTimeout(() => {
      set(state => ({
        graphData: {
          ...state.graphData,
          nodes: state.graphData.nodes.map(n =>
            n.id === newNodeId
              ? { ...n, fx: undefined, fy: undefined, fz: undefined }
              : n
          )
        }
      }));
    }, 1500);

    // 4. Fetch content for the new node
    await get().fetchNodeContent(newNodeId, term);
  }
}));

export default useStore;
