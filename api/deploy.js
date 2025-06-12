// api/deploy.js
// In-memory deployment queue (resets when Vercel restarts, but good for demo)
let deploymentQueue = [];
let deploymentCounter = 0;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, firstName, lastName, message } = req.body;
    
    console.log('🚀 Deploy sequence triggered!');
    console.log('User:', firstName, lastName);
    
    const deploymentId = `DEP-${Date.now()}`;
    deploymentCounter++;
    
    // Create deployment with all the random traits
    const alignments = [
      'Chaotic Neutral', 'Lawful Good', 'Chaotic Good', 'Neutral Evil',
      'Lawful Evil', 'True Neutral', 'Chaotic Evil', 'Lawful Neutral', 'Neutral Good'
    ];
    
    const scents = [
      'Existential Dread', 'The Color Purple', 'Wednesday Morning', 'Forgotten Dreams',
      'Static Electricity', 'The Sound of Silence', 'Regret and Paprika', 'Digital Nostalgia',
      'Expired Hope', 'Quantum Uncertainty', 'Your Childhood Bedroom', 'Unfinished Sentences',
      'The Internet in 1997', 'Invisible Disappointment', 'Theoretical Physics'
    ];
    
    const conversationalStyles = [
      'Philosophical Platypus in Crocs', 'Anxious Axolotl Wearing Cargo Shorts',
      'Pretentious Pangolin in a Beret', 'Caffeinated Capybara with Reading Glasses',
      'Melancholic Mantis Shrimp in Suspenders', 'Overthinking Octopus in a Turtleneck',
      'Sarcastic Shoebill Stork in Flip-Flops', 'Existential Quokka Wearing Fingerless Gloves',
      'Passive-Aggressive Pufferfish in a Vest', 'Neurotic Naked Mole Rat in Overalls',
      'Oversharing Ocelot in Yoga Pants', 'Dramatic Dik-Dik in a Cape',
      'Conspiracy Theorist Tapir in Tin Foil Hat', 'Depressed Dugong in Sweatpants',
      'Motivational Manatee in a Power Suit'
    ];

    // Generate random traits
    const randomAlignment = alignments[Math.floor(Math.random() * alignments.length)];
    const randomScent = scents[Math.floor(Math.random() * scents.length)];
    const randomStyle = conversationalStyles[Math.floor(Math.random() * conversationalStyles.length)];
    
    // Store deployment for screen to pick up
    const deployment = {
      id: deploymentId,
      counter: deploymentCounter,
      timestamp: Date.now(),
      user: firstName || 'Anonymous Human',
      traits: {
        alignment: randomAlignment,
        scent: randomScent,
        style: randomStyle
      },
      status: 'pending'
    };
    
    // Add to queue (keep only last 5 deployments)
    deploymentQueue.push(deployment);
    if (deploymentQueue.length > 5) {
      deploymentQueue.shift();
    }
    
    console.log(`💾 Stored deployment ${deploymentId} for screen pickup`);
    
    res.status(200).json({
      success: true,
      message: `🚀 Deployment ${deploymentId} initiated!`,
      deploymentId: deploymentId,
      screenMessage: "🖥️ Watch the big screen for your deployment!",
      traits: {
        alignment: randomAlignment,
        scent: randomScent,
        style: randomStyle
      }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
}

// Export the queue for other API endpoints to access
export { deploymentQueue };
