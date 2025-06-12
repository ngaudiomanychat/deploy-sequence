// Store active screen connections
let screenConnections = new Set();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    console.log('🚀 Webhook fired! Triggering screen redirect...');
    
    // Store the redirect signal
    global.redirectSignal = {
      timestamp: Date.now(),
      triggered: true
    };
    
    res.status(200).json({
      success: true,
      message: '🚀 Screen redirect triggered!'
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
}
