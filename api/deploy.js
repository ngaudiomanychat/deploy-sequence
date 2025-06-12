import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    console.log('🚀 Webhook fired! Triggering screen redirect...');
    
    // Create redirect signal file in /tmp directory
    const signalFile = '/tmp/redirect-signal.json';
    const signal = {
      timestamp: Date.now(),
      triggered: true
    };
    
    fs.writeFileSync(signalFile, JSON.stringify(signal));
    
    res.status(200).json({
      success: true,
      message: '🚀 Screen redirect triggered!'
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
}
