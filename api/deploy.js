export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, firstName, lastName, message } = req.body;
    
    console.log('🚀 Deploy sequence triggered!');
    console.log('User:', firstName, lastName);
    
    const deploymentId = `DEP-${Date.now()}`;
    const userClass = 'Full Stack Ninja';
    
    // CREATE DEPLOYMENT OBJECT WITH RANDOM TRAITS HERE...
    const deployment = {
      id: deploymentId,
      timestamp: Date.now(),
      user: firstName || 'Anonymous Human',
      traits: {
        alignment: randomAlignment,
        scent: randomScent,
        style: randomStyle
      }
    };

    // **ADD THE SCREEN NOTIFICATION HERE** ⬅️
    try {
      await fetch(`/api/screen-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deployment })
      });
      console.log(`📺 Screen notification sent`);
    } catch (error) {
      console.log('Screen notification failed, continuing...');
    }

    res.status(200).json({
      success: true,
      message: `🚀 Deployment ${deploymentId} initiated!`,
      // ... rest of your response
    });

  } catch (error) {
    // ... your error handling
  }
}
