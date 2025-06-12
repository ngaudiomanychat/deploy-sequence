export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    console.log('🚀 Deploy sequence triggered!');
    console.log('Message:', message);
    
    // Instead of storing, trigger immediate redirect
    // You could use Server-Sent Events, WebSockets, or a simpler approach
    
    res.status(200).json({
      success: true,
      message: '🚀 Deployment initiated!',
      redirect: true
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
}
