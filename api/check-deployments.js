// api/check-deployments.js
// Simple in-memory storage for latest deployment
let latestDeployment = null;

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Screen checking for new deployments
    const hasNewDeployment = latestDeployment && (Date.now() - latestDeployment.timestamp < 15000);
    
    if (hasNewDeployment) {
      const deployment = latestDeployment;
      latestDeployment = null; // Clear it so it only triggers once
      
      res.status(200).json({
        newDeployment: true,
        deployment: deployment
      });
    } else {
      res.status(200).json({
        newDeployment: false
      });
    }
  } else if (req.method === 'POST') {
    // Webhook storing new deployment
    const { deploymentId, user } = req.body;
    
    latestDeployment = {
      id: deploymentId,
      timestamp: Date.now(),
      user: user || 'Anonymous Human'
    };
    
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
