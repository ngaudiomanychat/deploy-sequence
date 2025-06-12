export default async function handler(req, res) {
  if (req.method === 'POST') {
    // When webhook fires, return a timestamp
    const timestamp = Date.now();
    
    res.status(200).json({
      success: true,
      message: '🚀 Redirect signal sent!',
      timestamp: timestamp
    });
    
  } else if (req.method === 'GET') {
    // Screen checks this endpoint
    // Always return true for now to test
    res.status(200).json({
      redirect: true,
      message: 'Test redirect signal',
      timestamp: Date.now()
    });
    
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
