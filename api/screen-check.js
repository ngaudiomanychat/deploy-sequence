let lastDeployment = null;
let processedDeployments = new Set();

export default function handler(req, res) {
  try {
    // Check for redirect signal
    if (lastDeployment && !processedDeployments.has(lastDeployment.id)) {
      // Mark as processed
      processedDeployments.add(lastDeployment.id);
      
      console.log(`📺 Screen redirect triggered: ${lastDeployment.id}`);
      
      res.status(200).json({
        redirect: true,
        deployment: lastDeployment,
        message: 'Redirect triggered!'
      });
    } else {
      res.status(200).json({
        redirect: false,
        message: 'No redirect signal'
      });
    }
  } catch (error) {
    console.error('Screen check error:', error);
    res.status(500).json({ 
      redirect: false, 
      error: 'Server error' 
    });
  }
}
