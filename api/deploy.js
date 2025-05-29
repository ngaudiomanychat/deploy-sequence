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
    
    res.status(200).json({
      success: true,
      message: `🚀 Deployment ${deploymentId} initiated for ${firstName}!`,
      deploymentId: deploymentId,
      userClass: userClass,
      redirectUrl: `https://deploy-sequence-lq82w8lxr-nick-gaudios-projects.vercel.app?user=${firstName}&id=${deploymentId}&class=${userClass}`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }

  // Notify the screen about the new deployment
fetch('/api/check-deployments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    deploymentId: deploymentId,
    user: firstName || 'Anonymous Human'
  })
}).catch(err => console.log('Screen notification sent'));
  
}
