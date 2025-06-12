// api/screen-check.js
let lastDeployment = null;
let processedDeployments = new Set();

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Screen checking for new deployments
    if (lastDeployment && !processedDeployments.has(lastDeployment.id)) {
      // Mark as processed
      processedDeployments.add(lastDeployment.id);
      
      // Clean up old processed IDs (keep last 20)
      if (processedDeployments.size > 20) {
        const oldIds = Array.from(processedDeployments).slice(0, 10);
        oldIds.forEach(id => processedDeployments.delete(id));
      }
      
      console.log(`📺 Screen displaying deployment ${lastDeployment.id}`);
      
      res.status(200).json({
        newDeployment: true,
        deployment: lastDeployment
      });
    } else {
      res.status(200).json({
        newDeployment: false,
        message: 'No new deployments'
      });
    }
  } else if (req.method === 'POST') {
    // Store new deployment for screen pickup
    const { deployment } = req.body;
    lastDeployment = deployment;
    
    console.log(`💾 Stored deployment ${deployment.id} for screen`);
    
    res.status(200).json({ success: true, message: 'Deployment stored for screen' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
