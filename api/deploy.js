// Use the same storage approach that was working before
let lastDeployment = null;
let processedDeployments = new Set();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    console.log('🚀 Webhook fired! Triggering screen redirect...');
    
    // Store a simple redirect signal using the existing system
    lastDeployment = {
      id: `REDIRECT-${Date.now()}`,
      timestamp: Date.now(),
      type: 'redirect',
      message: 'Screen redirect triggered'
    };
    
    console.log('📺 Redirect signal stored:', lastDeployment.id);
    
    res.status(200).json({
      success: true,
      message: '🚀 Screen redirect triggered!',
      redirectId: lastDeployment.id
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
}
