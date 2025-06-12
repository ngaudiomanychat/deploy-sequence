import { setDeployment } from './shared-state.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    console.log('🚀 Webhook fired! Triggering screen redirect...');
    
    const deployment = {
      id: `REDIRECT-${Date.now()}`,
      timestamp: Date.now(),
      type: 'redirect',
      message: 'Screen redirect triggered'
    };
    
    setDeployment(deployment);
    
    res.status(200).json({
      success: true,
      message: '🚀 Screen redirect triggered!',
      redirectId: deployment.id
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
}
