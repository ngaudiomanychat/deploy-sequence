let redirectSignal = null;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // When ManyChat webhook fires, set the signal
    redirectSignal = {
      timestamp: Date.now(),
      triggered: true
    };
    
    console.log('🚀 ManyChat webhook fired! Redirect signal set.');
    
    res.status(200).json({
      success: true,
      message: '🚀 Redirect signal sent!',
      timestamp: redirectSignal.timestamp
    });
    
  } else if (req.method === 'GET') {
    // Screen checks this endpoint
    if (redirectSignal && redirectSignal.triggered) {
      // Clear the signal so it only triggers once
      redirectSignal.triggered = false;
      
      res.status(200).json({
        redirect: true,
        message: 'Redirect triggered!',
        timestamp: redirectSignal.timestamp
      });
    } else {
      res.status(200).json({
        redirect: false,
        message: 'No redirect signal'
      });
    }
    
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
