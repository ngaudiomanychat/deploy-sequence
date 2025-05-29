// api/deploy.js
// This goes in your Vercel project under /api/deploy.js

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract data from ManyChat webhook
    const { 
      userId, 
      firstName, 
      lastName, 
      message,
      customField 
    } = req.body;

    // Log the incoming webhook data
    console.log('🚀 Deploy sequence triggered!');
    console.log('User ID:', userId);
    console.log('User:', firstName, lastName);
    console.log('Message:', message);
    console.log('Custom data:', customField);

    // You can add logic here to:
    // - Store data in a database
    // - Trigger other services (IFTTT, Discord, Slack, etc.)
    // - Generate dynamic responses
    // - Update your HTML page with real-time data

    // Example: Trigger IFTTT webhook (optional)
    // const iftttKey = 'YOUR_IFTTT_WEBHOOK_KEY';
    // fetch(`https://maker.ifttt.com/trigger/deploy_started/with/key/${iftttKey}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     value1: `${firstName} ${lastName}`,
    //     value2: userId,
    //     value3: 'Deploy sequence initiated'
    //   })
    // });

    // Generate a dynamic response for ManyChat
    const deploymentId = `DEP-${Date.now()}`;
    const userClass = determineUserClass(firstName);
    
    // Return success response to ManyChat
    res.status(200).json({
      success: true,
      message: `🚀 Deployment ${deploymentId} initiated for ${firstName}!`,
      deploymentId: deploymentId,
      userClass: userClass,
      redirectUrl: `https://your-vercel-app.vercel.app?user=${firstName}&id=${deploymentId}&class=${userClass}`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Deployment failed' 
    });
  }
}

// Fun function to assign user "classes" based on name
function determineUserClass(name) {
  const classes = [
    'Full Stack Ninja',
    'DevOps Wizard',
    'Frontend Sorcerer',
    'Backend Architect',
    'Database Whisperer',
    'Cloud Engineer',
    'Security Specialist'
  ];
  
  // Simple hash based on name length
  const index = (name?.length || 0) % classes.length;
  return classes[index];
}
